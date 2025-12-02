const validator = require('validator');

/**
 * Sanitize and validate email
 */
const sanitizeEmail = (email) => {
  if (!email || typeof email !== 'string') {
    throw new Error('Email inválido');
  }

  const sanitized = validator.normalizeEmail(email.trim());

  if (!validator.isEmail(sanitized)) {
    throw new Error('Formato de email inválido');
  }

  return sanitized;
};

/**
 * Sanitize string (remove dangerous characters)
 */
const sanitizeString = (str, maxLength = 500) => {
  if (!str) return '';

  let sanitized = String(str).trim();

  // Remove null bytes
  sanitized = sanitized.replace(/\0/g, '');

  // Escape HTML to prevent XSS
  sanitized = validator.escape(sanitized);

  // Limit length
  if (sanitized.length > maxLength) {
    sanitized = sanitized.substring(0, maxLength);
  }

  return sanitized;
};

/**
 * Sanitize phone number
 */
const sanitizePhone = (phone) => {
  if (!phone) return '';

  // Remove all non-numeric characters except + and spaces
  let sanitized = String(phone).replace(/[^\d+\s()-]/g, '').trim();

  // Limit length
  if (sanitized.length > 20) {
    sanitized = sanitized.substring(0, 20);
  }

  return sanitized;
};

/**
 * Validate and sanitize date
 */
const sanitizeDate = (date) => {
  if (!date) {
    throw new Error('Data inválida');
  }

  const parsedDate = new Date(date);

  if (isNaN(parsedDate.getTime())) {
    throw new Error('Formato de data inválido');
  }

  return parsedDate.toISOString().split('T')[0]; // Return YYYY-MM-DD format
};

/**
 * Validate future date
 */
const validateFutureDate = (date) => {
  const parsedDate = new Date(date);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  if (parsedDate < today) {
    throw new Error('A data deve ser no futuro');
  }

  return true;
};

/**
 * Sanitize URL
 */
const sanitizeUrl = (url) => {
  if (!url) return '';

  const sanitized = String(url).trim();

  if (!validator.isURL(sanitized, { require_protocol: true })) {
    throw new Error('URL inválida');
  }

  return sanitized;
};

/**
 * Sanitize integer
 */
const sanitizeInt = (value, min = 0, max = Number.MAX_SAFE_INTEGER) => {
  const parsed = parseInt(value, 10);

  if (isNaN(parsed)) {
    throw new Error('Número inválido');
  }

  if (parsed < min || parsed > max) {
    throw new Error(`Número deve estar entre ${min} e ${max}`);
  }

  return parsed;
};

/**
 * Sanitize decimal
 */
const sanitizeDecimal = (value, min = 0, max = Number.MAX_VALUE) => {
  const parsed = parseFloat(value);

  if (isNaN(parsed)) {
    throw new Error('Número decimal inválido');
  }

  if (parsed < min || parsed > max) {
    throw new Error(`Número deve estar entre ${min} e ${max}`);
  }

  return Math.round(parsed * 100) / 100; // Round to 2 decimal places
};

/**
 * Middleware to sanitize request body
 */
const sanitizeBody = (fieldsConfig) => {
  return (req, res, next) => {
    try {
      const sanitized = {};

      for (const [field, config] of Object.entries(fieldsConfig)) {
        const value = req.body[field];

        // Skip if optional and not provided
        if (!config.required && (value === undefined || value === null || value === '')) {
          continue;
        }

        // Check required fields
        if (config.required && (value === undefined || value === null || value === '')) {
          return res.status(400).json({
            error: `Campo obrigatório: ${field}`
          });
        }

        // Sanitize based on type
        try {
          switch (config.type) {
            case 'email':
              sanitized[field] = sanitizeEmail(value);
              break;
            case 'string':
              sanitized[field] = sanitizeString(value, config.maxLength || 500);
              break;
            case 'text':
              sanitized[field] = sanitizeString(value, config.maxLength || 5000);
              break;
            case 'phone':
              sanitized[field] = sanitizePhone(value);
              break;
            case 'date':
              sanitized[field] = sanitizeDate(value);
              if (config.future) {
                validateFutureDate(sanitized[field]);
              }
              break;
            case 'url':
              sanitized[field] = sanitizeUrl(value);
              break;
            case 'int':
              sanitized[field] = sanitizeInt(value, config.min, config.max);
              break;
            case 'decimal':
              sanitized[field] = sanitizeDecimal(value, config.min, config.max);
              break;
            default:
              sanitized[field] = value;
          }
        } catch (err) {
          return res.status(400).json({
            error: `${field}: ${err.message}`
          });
        }
      }

      // Replace request body with sanitized version
      req.body = { ...req.body, ...sanitized };
      next();
    } catch (error) {
      return res.status(400).json({
        error: 'Erro ao validar dados',
        details: error.message
      });
    }
  };
};

module.exports = {
  sanitizeEmail,
  sanitizeString,
  sanitizePhone,
  sanitizeDate,
  sanitizeUrl,
  sanitizeInt,
  sanitizeDecimal,
  validateFutureDate,
  sanitizeBody
};
