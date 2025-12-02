// Email service using Nodemailer
const nodemailer = require('nodemailer');
const { emailTemplates, sendEmail, sendAdminNotification } = require('./emailTemplates');

// Create transporter
const createTransporter = () => {
  // Use environment variables for email configuration
  // For Gmail, you can use OAuth2 or App Password
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST || 'smtp.gmail.com',
    port: parseInt(process.env.EMAIL_PORT || '587'),
    secure: process.env.EMAIL_SECURE === 'true', // true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER || '',
      pass: process.env.EMAIL_PASS || '', // Use App Password for Gmail
    },
  });

  return transporter;
};

// Send notification email to admin
const sendNotificationEmail = async (type, data) => {
  try {
    const adminEmail = process.env.ADMIN_EMAIL || process.env.EMAIL_USER || 'contato.brainywrite@gmail.com';

    let template;
    switch (type) {
      case 'contact':
        template = emailTemplates.contactNotification;
        break;
      case 'quote':
        template = emailTemplates.quoteNotification;
        break;
      case 'appointment':
        template = emailTemplates.appointmentNotification;
        break;
      default:
        throw new Error(`Unknown notification type: ${type}`);
    }

    const emailContent = template(data);
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'contato.brainywrite@gmail.com',
      to: adminEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Notification email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending notification email:', error);
    // Don't throw error, just log it - we don't want to break the API if email fails
    return { success: false, error: error.message };
  }
};

// Send confirmation email to user
const sendConfirmationEmail = async (type, data) => {
  try {
    let template;
    let recipientEmail;

    switch (type) {
      case 'newsletter':
        template = emailTemplates.newsletterConfirmation;
        recipientEmail = data.email;
        break;
      default:
        throw new Error(`Unknown confirmation type: ${type}`);
    }

    const emailContent = template(recipientEmail);
    const transporter = createTransporter();

    const mailOptions = {
      from: process.env.EMAIL_FROM || process.env.EMAIL_USER || 'contato.brainywrite@gmail.com',
      to: recipientEmail,
      subject: emailContent.subject,
      html: emailContent.html,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log('Confirmation email sent successfully:', info.messageId);
    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending confirmation email:', error);
    // Don't throw error, just log it
    return { success: false, error: error.message };
  }
};

module.exports = {
  sendNotificationEmail,
  sendConfirmationEmail,
  createTransporter,
};
