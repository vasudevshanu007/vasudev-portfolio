const nodemailer = require('nodemailer');

function validate({ name, email, message }) {
  if (!name || typeof name !== 'string' || name.trim().length < 2)
    return 'Name must be at least 2 characters.';
  if (!email || typeof email !== 'string' || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email))
    return 'A valid email address is required.';
  if (!message || typeof message !== 'string' || message.trim().length < 10)
    return 'Message must be at least 10 characters.';
  if (name.length > 100 || email.length > 200 || message.length > 2000)
    return 'Input exceeds maximum length.';
  return null;
}

module.exports = async function handler(req, res) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { name, phone, email, message } = req.body ?? {};
  const error = validate({ name, email, message });
  if (error) return res.status(400).json({ error });

  const s = (v) => String(v ?? '').replace(/</g, '&lt;').replace(/>/g, '&gt;');

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS,
    },
  });

  try {
    await transporter.sendMail({
      from:    `"Portfolio Contact" <${process.env.EMAIL_USER}>`,
      to:      process.env.EMAIL_USER,
      replyTo: email,
      subject: `[Portfolio] New message from ${s(name)}`,
      text: `Name: ${s(name)}\nEmail: ${s(email)}\nPhone: ${s(phone) || 'Not provided'}\n\nMessage:\n${s(message)}`,
      html: `
<div style="font-family:sans-serif;max-width:500px;margin:auto;padding:24px;background:#f9f9f9;border-radius:12px;">
  <h2 style="color:#f07484;margin-bottom:16px;">New Portfolio Message</h2>
  <table style="width:100%;border-collapse:collapse;">
    <tr><td style="padding:6px 0;color:#666;width:80px;"><strong>Name</strong></td><td style="padding:6px 0;">${s(name)}</td></tr>
    <tr><td style="padding:6px 0;color:#666;"><strong>Email</strong></td><td style="padding:6px 0;"><a href="mailto:${s(email)}">${s(email)}</a></td></tr>
    <tr><td style="padding:6px 0;color:#666;"><strong>Phone</strong></td><td style="padding:6px 0;">${s(phone) || '<em>Not provided</em>'}</td></tr>
  </table>
  <hr style="margin:16px 0;border:none;border-top:1px solid #eee;"/>
  <p style="color:#333;white-space:pre-wrap;">${s(message)}</p>
</div>`,
    });
    res.status(200).json({ message: 'Email sent successfully.' });
  } catch (err) {
    console.error('[mail] Error:', err.message);
    res.status(500).json({ error: 'Failed to send email.' });
  }
};
