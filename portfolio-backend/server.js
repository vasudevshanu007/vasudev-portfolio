// Portfolio Contact API — server.js
require('dotenv').config();
const express   = require('express');
const cors      = require('cors');
const rateLimit = require('express-rate-limit');
const nodemailer = require('nodemailer');

const app  = express();
const PORT = process.env.PORT || 5000;

// ── Allowed origins ─────────────────────────────────────────────────────────
const ALLOWED_ORIGINS = (process.env.ALLOWED_ORIGINS || '')
  .split(',')
  .map((o) => o.trim())
  .filter(Boolean);

app.use(
  cors({
    origin: (origin, cb) => {
      // Allow requests with no origin (same-origin, Postman, etc.)
      if (!origin) return cb(null, true);
      if (ALLOWED_ORIGINS.length === 0 || ALLOWED_ORIGINS.includes(origin)) {
        return cb(null, true);
      }
      cb(new Error(`CORS: origin ${origin} not allowed`));
    },
    methods: ['POST'],
  })
);

app.use(express.json({ limit: '16kb' }));

// ── Rate limiting: 5 emails per 10 minutes per IP ────────────────────────────
const emailLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 5,
  message: { error: 'Too many requests. Please wait a few minutes before trying again.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// ── Input validation helper ──────────────────────────────────────────────────
function validateContactInput({ name, email, message }) {
  if (!name    || typeof name    !== 'string' || name.trim().length < 2)
    return 'Name must be at least 2 characters.';
  if (!email   || typeof email   !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'A valid email address is required.';
  if (!message || typeof message !== 'string' || message.trim().length < 10)
    return 'Message must be at least 10 characters.';
  if (name.length > 100 || email.length > 200 || message.length > 2000)
    return 'Input exceeds maximum length.';
  return null;
}

// ── Nodemailer transporter ───────────────────────────────────────────────────
const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,  // Use a Gmail App Password
  },
});

// Verify connection at startup (won't crash if it fails — just logs)
transporter.verify((err) => {
  if (err) console.error('[mail] Transport verification failed:', err.message);
  else     console.log('[mail] Ready to send emails');
});

// ── Contact endpoint ─────────────────────────────────────────────────────────
app.post('/send-email', emailLimiter, async (req, res) => {
  const { name, phone, email, message } = req.body ?? {};

  const validationError = validateContactInput({ name, email, message });
  if (validationError) {
    return res.status(400).json({ error: validationError });
  }

  const sanitize = (s) => String(s ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const mailOptions = {
    from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
    to:      process.env.EMAIL_USER,
    replyTo: email,
    subject: `[Portfolio] New message from ${sanitize(name)}`,
    text: `
Name:    ${sanitize(name)}
Email:   ${sanitize(email)}
Phone:   ${sanitize(phone) || 'Not provided'}

Message:
${sanitize(message)}
    `.trim(),
    html: `
<div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#f9f9f9;border-radius:12px;">
  <h2 style="color:#f07484;margin-bottom:16px;">New Portfolio Message</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:6px 0;color:#666;width:80px;"><strong>Name</strong></td><td style="padding:6px 0;">${sanitize(name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;"><strong>Email</strong></td><td style="padding:6px 0;"><a href="mailto:${sanitize(email)}">${sanitize(email)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#666;"><strong>Phone</strong></td><td style="padding:6px 0;">${sanitize(phone) || '<em>Not provided</em>'}</td></tr>
  </table>
  <hr style="margin:16px 0;border:none;border-top:1px solid #eee;"/>
  <p style="color:#333;white-space:pre-wrap;">${sanitize(message)}</p>
</div>
    `,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`[mail] Sent from ${email} at ${new Date().toISOString()}`);
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (err) {
    console.error('[mail] Send error:', err.message);
    res.status(500).json({ error: 'Failed to send email. Please try again later.' });
  }
});

// ── Health check ──────────────────────────────────────────────────────────────
app.get('/health', (_req, res) => res.json({ status: 'ok', ts: Date.now() }));

// ── 404 handler ──────────────────────────────────────────────────────────────
app.use((_req, res) => res.status(404).json({ error: 'Not found' }));

app.listen(PORT, () => console.log(`[server] Listening on port ${PORT}`));
