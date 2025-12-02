const express = require("express");
const cors = require("cors");
const { Pool } = require("pg");
const swaggerUi = require("swagger-ui-express");
const YAML = require("yamljs");
const path = require("path");
require("dotenv").config();

const {
  sendNotificationEmail,
  sendConfirmationEmail,
} = require("./utils/emailService");
const {
  authenticate,
  requireAdmin,
  generateToken,
  comparePassword,
  hashPassword,
} = require("./utils/auth");

// Import middlewares
const { apiLimiter, formLimiter } = require("./middleware/rateLimiter");
const { sanitizeBody } = require("./middleware/sanitizer");

// Import route modules
const authRoutes = require("./routes/auth");
const examRoutes = require("./routes/exams");
const certificateRoutes = require("./routes/certificates");

const app = express();

// Swagger Documentation
const swaggerDocument = YAML.load(path.join(__dirname, "./docs/swagger.yaml"));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));

app.use(
  cors({
    origin: process.env.FRONTEND_URL || "http://localhost:5173",
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
app.use(express.json());

// Apply rate limiting to all API routes
app.use('/api/', apiLimiter);

// PostgreSQL connection - use environment variables if available, fallback to defaults
const pool = new Pool({
  user: process.env.PGUSER || "postgres",
  host: process.env.PGHOST || "localhost",
  database: process.env.PGDATABASE || "brainywrite_db",
  password: process.env.PGPASSWORD || "",
  port: process.env.PGPORT || 5432,
});

// Test database connection
pool.on("connect", () => {
  console.log("✅ Connected to PostgreSQL database");
});

pool.on("error", (err) => {
  console.error("❌ Unexpected error on idle client", err);
});

// Test route
app.get("/api/health", async (req, res) => {
  try {
    await pool.query("SELECT NOW()");
    res.json({ status: "ok", message: "API is running" });
  } catch (err) {
    res.status(500).json({ status: "error", message: err.message });
  }
});

// Testing Hub API Routes
const emailService = { sendCertificateEmail: sendNotificationEmail };
app.use("/api/auth", authRoutes(pool));
app.use("/api/exams", examRoutes(pool));
app.use("/api/certificates", certificateRoutes(pool, emailService));

// Contact form submission
app.post(
  "/api/contact",
  formLimiter,
  sanitizeBody({
    nome: { type: 'string', required: true, maxLength: 255 },
    apelido: { type: 'string', required: true, maxLength: 255 },
    email: { type: 'email', required: true },
    telefone: { type: 'phone', required: true },
    assunto: { type: 'string', required: true, maxLength: 255 },
    mensagem: { type: 'text', required: true, maxLength: 5000 }
  }),
  async (req, res) => {
  try {
    const { nome, apelido, email, telefone, assunto, mensagem } = req.body;

    // Insert into database (if table exists)
    let contactId;
    try {
      const result = await pool.query(
        `INSERT INTO contactos (nome, apelido, email, telefone, assunto, mensagem, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, NOW())
         RETURNING id`,
        [nome, apelido, email, telefone, assunto, mensagem]
      );
      contactId = result.rows[0]?.id;
    } catch (dbError) {
      // If table doesn't exist, just log and continue
      console.log(
        "Database table not found, skipping database insert:",
        dbError.message
      );
    }

    // Send email notification to admin
    try {
      await sendNotificationEmail("contact", {
        nome,
        apelido,
        email,
        telefone,
        assunto,
        mensagem,
      });
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    res.json({
      success: true,
      message: "Mensagem enviada com sucesso! Entraremos em contato em breve.",
    });
  } catch (error) {
    console.error("Error in contact form:", error);
    res
      .status(500)
      .json({ error: "Erro ao enviar mensagem. Tente novamente." });
  }
});

// Quote request submission
app.post(
  "/api/quote",
  formLimiter,
  sanitizeBody({
    name: { type: 'string', required: true, maxLength: 255 },
    email: { type: 'email', required: true },
    phone: { type: 'phone', required: true },
    institution: { type: 'string', required: false, maxLength: 255 },
    workType: { type: 'string', required: true, maxLength: 255 },
    category: { type: 'string', required: false, maxLength: 255 },
    pages: { type: 'int', required: true, min: 1, max: 10000 },
    deadline: { type: 'date', required: true, future: true },
    academicLevel: { type: 'string', required: false, maxLength: 255 },
    formatting: { type: 'string', required: false, maxLength: 255 },
    language: { type: 'string', required: false, maxLength: 50 },
    title: { type: 'string', required: false, maxLength: 500 },
    description: { type: 'text', required: false, maxLength: 5000 },
    hasReferences: { type: 'string', required: false, maxLength: 10 },
    calculatedPrice: { type: 'decimal', required: false, min: 0 }
  }),
  async (req, res) => {
  try {
    console.log("Recebido dados de cotação:", req.body);

    const {
      name,
      email,
      phone,
      institution,
      workType,
      category,
      pages,
      deadline,
      academicLevel,
      formatting,
      language,
      title,
      description,
      hasReferences,
      additionalServices,
      calculatedPrice,
    } = req.body;

    // Garantir que additionalServices seja um array
    const servicesArray = Array.isArray(additionalServices)
      ? additionalServices
      : additionalServices
      ? [additionalServices]
      : [];

    // Insert into database (if table exists)
    let quoteId;
    try {
      const result = await pool.query(
        `INSERT INTO cotacoes (
          name, email, phone, institution, work_type, category, pages, deadline,
          academic_level, formatting, language, title, description, has_references,
          additional_services, calculated_price, created_at
        ) VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13, $14, $15, $16, NOW())
        RETURNING id`,
        [
          name,
          email,
          phone,
          institution || "",
          workType,
          category || "",
          parseInt(pages) || 10,
          deadline,
          academicLevel || "",
          formatting || "",
          language || "",
          title || "",
          description || "",
          hasReferences || "nao",
          JSON.stringify(servicesArray),
          calculatedPrice || 0,
        ]
      );
      quoteId = result.rows[0]?.id;
      console.log("Cotação salva no banco de dados com sucesso");
    } catch (dbError) {
      // Se a tabela não existir, apenas loga o erro mas continua
      console.log(
        "Database table not found, skipping database insert:",
        dbError.message
      );
      console.log("Dados da cotação (não salvos no DB):", {
        name,
        email,
        phone,
        workType,
        pages,
        deadline,
      });
    }

    // Send email notification to admin
    try {
      await sendNotificationEmail("quote", {
        name,
        email,
        phone,
        institution,
        workType,
        category,
        pages,
        deadline,
        academicLevel,
        formatting,
        language,
        title,
        description,
        additionalServices: servicesArray,
        calculatedPrice,
      });
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    res.json({
      success: true,
      message:
        "Cotação solicitada com sucesso! Entraremos em contato em breve.",
    });
  } catch (error) {
    console.error("Error in quote request:", error);
    res
      .status(500)
      .json({ error: "Erro ao solicitar cotação. Tente novamente." });
  }
});

// Appointment booking submission
app.post(
  "/api/appointment",
  formLimiter,
  sanitizeBody({
    name: { type: 'string', required: true, maxLength: 255 },
    email: { type: 'email', required: true },
    phone: { type: 'phone', required: true },
    service: { type: 'string', required: true, maxLength: 255 },
    date: { type: 'date', required: true, future: true },
    time: { type: 'string', required: true, maxLength: 10 },
    message: { type: 'text', required: false, maxLength: 2000 }
  }),
  async (req, res) => {
  try {
    const { name, email, phone, service, date, time, message } = req.body;

    // Insert into database (if table exists)
    let appointmentId;
    try {
      const result = await pool.query(
        `INSERT INTO agendamentos (name, email, phone, service, date, time, message, created_at)
         VALUES ($1, $2, $3, $4, $5, $6, $7, NOW())
         RETURNING id`,
        [name, email, phone, service, date, time, message || ""]
      );
      appointmentId = result.rows[0]?.id;
    } catch (dbError) {
      console.log(
        "Database table not found, skipping database insert:",
        dbError.message
      );
    }

    // Send email notification to admin
    try {
      await sendNotificationEmail("appointment", {
        name,
        email,
        phone,
        service,
        date,
        time,
        message: message || "",
      });
    } catch (emailError) {
      console.error("Error sending email notification:", emailError);
    }

    res.json({
      success: true,
      message: "Consulta agendada com sucesso! Entraremos em contato em breve.",
    });
  } catch (error) {
    console.error("Error in appointment booking:", error);
    res
      .status(500)
      .json({ error: "Erro ao agendar consulta. Tente novamente." });
  }
});

// Admin login
app.post("/api/admin/login", async (req, res) => {
  try {
    const { username, password } = req.body;

    if (!username || !password) {
      return res
        .status(400)
        .json({ error: "Username and password are required" });
    }

    // Get user from database
    const result = await pool.query(
      "SELECT * FROM admin_users WHERE username = $1 AND is_active = true",
      [username]
    );

    if (result.rows.length === 0) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    const user = result.rows[0];

    // Compare password
    const isPasswordValid = await comparePassword(password, user.password_hash);

    if (!isPasswordValid) {
      return res.status(401).json({ error: "Invalid credentials" });
    }

    // Update last login
    await pool.query(
      "UPDATE admin_users SET last_login = NOW() WHERE id = $1",
      [user.id]
    );

    // Generate token
    const token = generateToken(user);

    res.json({
      success: true,
      token,
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    console.error("Error in admin login:", error);
    res.status(500).json({ error: "Error logging in" });
  }
});

// Get appointments (admin endpoint - requires authentication)
app.get("/api/appointments", authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM agendamentos ORDER BY created_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (error) {
    // If table doesn't exist, return empty array
    if (error.message.includes("does not exist")) {
      return res.json([]);
    }
    res.status(500).json({ error: error.message });
  }
});

// Get quotes (admin endpoint - requires authentication)
app.get("/api/quotes", authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM cotacoes ORDER BY created_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (error) {
    if (error.message.includes("does not exist")) {
      return res.json([]);
    }
    res.status(500).json({ error: error.message });
  }
});

// Get contacts (admin endpoint - requires authentication)
app.get("/api/contacts", authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM contactos ORDER BY created_at DESC LIMIT 50"
    );
    res.json(result.rows);
  } catch (error) {
    if (error.message.includes("does not exist")) {
      return res.json([]);
    }
    res.status(500).json({ error: error.message });
  }
});

// Newsletter subscription
app.post("/api/newsletter", async (req, res) => {
  try {
    const { email } = req.body;

    // Validation
    if (!email) {
      return res.status(400).json({ error: "Email é obrigatório" });
    }

    // Email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return res.status(400).json({ error: "Email inválido" });
    }

    // Insert into database (if table exists)
    try {
      await pool.query(
        `INSERT INTO newsletter_subscribers (email, subscribed_at, is_active)
         VALUES ($1, NOW(), true)
         ON CONFLICT (email) DO UPDATE SET is_active = true, subscribed_at = NOW()`,
        [email]
      );
      console.log("Newsletter subscription saved:", email);
    } catch (dbError) {
      // If table doesn't exist, just log and continue
      console.log(
        "Database table not found, skipping database insert:",
        dbError.message
      );
    }

    // Send confirmation email to subscriber
    try {
      await sendConfirmationEmail("newsletter", { email });
    } catch (emailError) {
      console.error("Error sending confirmation email:", emailError);
      // Continue even if email fails
    }

    res.json({
      success: true,
      message: "Inscrição realizada com sucesso! Verifique seu email.",
    });
  } catch (error) {
    console.error("Error in newsletter subscription:", error);
    res
      .status(500)
      .json({ error: "Erro ao inscrever-se na newsletter. Tente novamente." });
  }
});

// Get newsletter subscribers (admin endpoint - requires authentication)
app.get("/api/newsletter", authenticate, requireAdmin, async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM newsletter_subscribers WHERE is_active = true ORDER BY subscribed_at DESC"
    );
    res.json(result.rows);
  } catch (error) {
    if (error.message.includes("does not exist")) {
      return res.json([]);
    }
    res.status(500).json({ error: error.message });
  }
});

// Dashboard stats endpoint (requires authentication)
app.get("/api/admin/stats", authenticate, requireAdmin, async (req, res) => {
  try {
    const stats = await pool.query("SELECT * FROM dashboard_stats");
    res.json(stats.rows[0] || {});
  } catch (error) {
    if (error.message.includes("does not exist")) {
      // Return default stats if view doesn't exist
      return res.json({
        total_contacts: 0,
        unread_contacts: 0,
        total_quotes: 0,
        pending_quotes: 0,
        converted_quotes: 0,
        total_appointments: 0,
        pending_appointments: 0,
        confirmed_appointments: 0,
        active_subscribers: 0,
        total_revenue: 0,
      });
    }
    res.status(500).json({ error: error.message });
  }
});

// Update contact status (mark as read) - requires authentication
app.patch(
  "/api/contacts/:id/read",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      await pool.query("UPDATE contactos SET read_at = NOW() WHERE id = $1", [
        id,
      ]);
      res.json({ success: true, message: "Contact marked as read" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update quote status - requires authentication
app.patch(
  "/api/quotes/:id/status",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updateFields = ["status = $1"];
      const updateValues = [status];
      let paramIndex = 2;

      if (status === "converted" && !req.body.converted_at) {
        updateFields.push(`converted_at = NOW()`);
      }
      if (req.body.contacted_at) {
        updateFields.push(`contacted_at = NOW()`);
      }

      await pool.query(
        `UPDATE cotacoes SET ${updateFields.join(
          ", "
        )}, updated_at = NOW() WHERE id = $${paramIndex}`,
        [...updateValues, id]
      );
      res.json({ success: true, message: "Quote status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Update appointment status - requires authentication
app.patch(
  "/api/appointments/:id/status",
  authenticate,
  requireAdmin,
  async (req, res) => {
    try {
      const { id } = req.params;
      const { status } = req.body;

      const updateFields = ["status = $1"];
      const updateValues = [status];

      if (status === "confirmed") {
        updateFields.push(`confirmed_at = NOW()`);
      }
      if (status === "cancelled") {
        updateFields.push(`cancelled_at = NOW()`);
      }

      await pool.query(
        `UPDATE agendamentos SET ${updateFields.join(", ")} WHERE id = $2`,
        [...updateValues, id]
      );
      res.json({ success: true, message: "Appointment status updated" });
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
);

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 API running on http://localhost:${PORT}`);
  console.log(`📡 Health check: http://localhost:${PORT}/api/health`);
});
