const express = require('express');
const { hashPassword, comparePassword, generateToken } = require('../utils/auth');
const { sanitizeBody } = require('../middleware/sanitizer');
const { authLimiter, registerLimiter } = require('../middleware/rateLimiter');

module.exports = (pool) => {
  const router = express.Router();

  /**
   * POST /api/auth/register
   * Register a new user for the exam system
   */
  router.post(
    '/register',
    registerLimiter,
    sanitizeBody({
      name: { type: 'string', required: true, maxLength: 255 },
      email: { type: 'email', required: true },
      password: { type: 'string', required: true, maxLength: 100 },
      phone: { type: 'phone', required: false },
      institution: { type: 'string', required: false, maxLength: 255 }
    }),
    async (req, res) => {
      try {
        const { name, email, password, phone, institution } = req.body;

        // Validate password strength
        if (password.length < 6) {
          return res.status(400).json({
            error: 'A senha deve ter pelo menos 6 caracteres'
          });
        }

        // Check if user already exists
        const existingUser = await pool.query(
          'SELECT id FROM users WHERE email = $1',
          [email]
        );

        if (existingUser.rows.length > 0) {
          return res.status(400).json({
            error: 'Este email já está registado'
          });
        }

        // Hash password
        const passwordHash = await hashPassword(password);

        // Insert new user
        const result = await pool.query(
          `INSERT INTO users (name, email, password_hash, phone, institution, created_at)
           VALUES ($1, $2, $3, $4, $5, NOW())
           RETURNING id, name, email, phone, institution, created_at`,
          [name, email, passwordHash, phone || null, institution || null]
        );

        const user = result.rows[0];

        // Generate JWT token
        const token = generateToken(user);

        res.status(201).json({
          success: true,
          message: 'Conta criada com sucesso!',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            institution: user.institution
          }
        });
      } catch (error) {
        console.error('Error in user registration:', error);
        res.status(500).json({
          error: 'Erro ao criar conta. Tente novamente.'
        });
      }
    }
  );

  /**
   * POST /api/auth/login
   * Login user for exam system
   */
  router.post(
    '/login',
    authLimiter,
    sanitizeBody({
      email: { type: 'email', required: true },
      password: { type: 'string', required: true }
    }),
    async (req, res) => {
      try {
        const { email, password } = req.body;

        // Get user from database
        const result = await pool.query(
          'SELECT * FROM users WHERE email = $1 AND is_active = true',
          [email]
        );

        if (result.rows.length === 0) {
          return res.status(401).json({
            error: 'Email ou senha incorretos'
          });
        }

        const user = result.rows[0];

        // Compare password
        const isPasswordValid = await comparePassword(password, user.password_hash);

        if (!isPasswordValid) {
          return res.status(401).json({
            error: 'Email ou senha incorretos'
          });
        }

        // Update last login
        await pool.query(
          'UPDATE users SET last_login = NOW() WHERE id = $1',
          [user.id]
        );

        // Generate token
        const token = generateToken(user);

        res.json({
          success: true,
          message: 'Login efetuado com sucesso!',
          token,
          user: {
            id: user.id,
            name: user.name,
            email: user.email,
            phone: user.phone,
            institution: user.institution
          }
        });
      } catch (error) {
        console.error('Error in user login:', error);
        res.status(500).json({
          error: 'Erro ao fazer login. Tente novamente.'
        });
      }
    }
  );

  /**
   * GET /api/auth/me
   * Get current user info (requires authentication)
   */
  router.get('/me', async (req, res) => {
    try {
      // Token should be verified by authenticate middleware
      const userId = req.user?.id;

      if (!userId) {
        return res.status(401).json({
          error: 'Não autenticado'
        });
      }

      const result = await pool.query(
        `SELECT id, name, email, phone, institution, created_at, last_login
         FROM users WHERE id = $1 AND is_active = true`,
        [userId]
      );

      if (result.rows.length === 0) {
        return res.status(404).json({
          error: 'Usuário não encontrado'
        });
      }

      res.json({
        success: true,
        user: result.rows[0]
      });
    } catch (error) {
      console.error('Error getting user info:', error);
      res.status(500).json({
        error: 'Erro ao buscar informações do usuário'
      });
    }
  });

  /**
   * POST /api/auth/forgot-password
   * Request password reset
   */
  router.post(
    '/forgot-password',
    authLimiter,
    sanitizeBody({
      email: { type: 'email', required: true }
    }),
    async (req, res) => {
      try {
        const { email } = req.body;

        const result = await pool.query(
          'SELECT id, name, email FROM users WHERE email = $1 AND is_active = true',
          [email]
        );

        // Always return success to prevent email enumeration
        if (result.rows.length === 0) {
          return res.json({
            success: true,
            message: 'Se o email existir, você receberá instruções para redefinir a senha.'
          });
        }

        // TODO: Generate reset token and send email
        // For now, just return success
        res.json({
          success: true,
          message: 'Se o email existir, você receberá instruções para redefinir a senha.'
        });
      } catch (error) {
        console.error('Error in forgot password:', error);
        res.status(500).json({
          error: 'Erro ao processar solicitação'
        });
      }
    }
  );

  return router;
};
