const rateLimit = require('express-rate-limit');

// General API rate limiter
const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // Limit each IP to 100 requests per windowMs
  message: {
    error: 'Demasiadas requisições deste IP, por favor tente novamente mais tarde.',
    retryAfter: '15 minutos'
  },
  standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
  legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  skip: (req) => {
    // Skip rate limiting for health check
    return req.path === '/api/health';
  }
});

// Strict rate limiter for authentication endpoints
const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 5, // Limit each IP to 5 login requests per windowMs
  message: {
    error: 'Demasiadas tentativas de login. Por favor, tente novamente em 15 minutos.',
    retryAfter: '15 minutos'
  },
  skipSuccessfulRequests: true, // Don't count successful requests
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for form submissions (contact, quote, appointment)
const formLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 10, // Limit each IP to 10 form submissions per hour
  message: {
    error: 'Demasiados envios de formulário. Por favor, aguarde antes de enviar novamente.',
    retryAfter: '1 hora'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for registration
const registerLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 3, // Limit each IP to 3 registration attempts per hour
  message: {
    error: 'Demasiadas tentativas de registo. Por favor, tente novamente em 1 hora.',
    retryAfter: '1 hora'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for exam submissions
const examLimiter = rateLimit({
  windowMs: 60 * 1000, // 1 minute
  max: 10, // Limit to 10 exam-related actions per minute
  message: {
    error: 'Demasiadas ações de exame. Por favor, aguarde um momento.',
    retryAfter: '1 minuto'
  },
  standardHeaders: true,
  legacyHeaders: false
});

// Rate limiter for certificate generation
const certificateLimiter = rateLimit({
  windowMs: 60 * 60 * 1000, // 1 hour
  max: 20, // Limit to 20 certificate requests per hour
  message: {
    error: 'Demasiadas solicitações de certificado. Por favor, aguarde antes de tentar novamente.',
    retryAfter: '1 hora'
  },
  standardHeaders: true,
  legacyHeaders: false
});

module.exports = {
  apiLimiter,
  authLimiter,
  formLimiter,
  registerLimiter,
  examLimiter,
  certificateLimiter
};
