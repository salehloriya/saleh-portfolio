import type { VercelRequest, VercelResponse } from '@vercel/node';
import nodemailer from 'nodemailer';

export default async function handler(req: VercelRequest, res: VercelResponse) {
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,OPTIONS,PATCH,DELETE,POST,PUT');
  res.setHeader(
    'Access-Control-Allow-Headers',
    'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
  );

  if (req.method === 'OPTIONS') {
    return res.status(200).end();
  }

  if (req.method !== 'POST') {
    return res.status(405).json({ success: false, message: 'Method Not Allowed' });
  }

  try {
    const { name, email, message } = req.body || {};

    if (!name || !email || !message) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and message are all required.',
      });
    }

    const emailUser = process.env.EMAIL_USER;
    const emailPass = process.env.EMAIL_PASS;
    const recipient = process.env.RECIPIENT_EMAIL || emailUser;

    if (!emailUser || !emailPass) {
      return res.status(500).json({
        success: false,
        message: 'Server email credentials are not configured.',
      });
    }

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    });

    const mailOptions = {
      from: `"Saleh Loriya Portfolio" <${emailUser}>`,
      to: recipient,
      replyTo: email,
      subject: `💼 New Contact Message from ${name}`,
      html: `
        <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
          <div style="background: linear-gradient(135deg, #004E7A 0%, #0284C7 100%); padding: 24px; color: #ffffff; text-align: center;">
            <h2 style="margin: 0; font-size: 22px; font-weight: 700; letter-spacing: -0.5px;">New Portfolio Message</h2>
            <p style="margin: 6px 0 0; opacity: 0.9; font-size: 13px;">Someone reached out to you through your portfolio</p>
          </div>
          
          <div style="padding: 24px 28px;">
            <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">Sender Name</span>
              <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #0f172a;">${name}</p>
            </div>

            <div style="margin-bottom: 18px; padding-bottom: 14px; border-bottom: 1px solid #f1f5f9;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">Sender Email</span>
              <p style="margin: 4px 0 0; font-size: 16px; font-weight: 600; color: #004E7A;">
                <a href="mailto:${email}" style="color: #004E7A; text-decoration: none;">${email}</a>
              </p>
            </div>

            <div style="margin-bottom: 8px;">
              <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 1px; color: #64748b; font-weight: 600;">Message</span>
              <div style="margin-top: 8px; padding: 16px; background-color: #f8fafc; border: 1px solid #e2e8f0; border-radius: 10px; font-size: 14px; line-height: 1.6; color: #334155; white-space: pre-wrap;">${message}</div>
            </div>
          </div>

          <div style="background-color: #f8fafc; padding: 16px 24px; text-align: center; border-top: 1px solid #f1f5f9; font-size: 12px; color: #94a3b8;">
            You can reply directly to this email to respond to <strong>${name}</strong> (${email}).
          </div>
        </div>
      `,
    };

    await transporter.sendMail(mailOptions);

    return res.status(200).json({
      success: true,
      message: 'Email sent successfully!',
    });
  } catch (error: any) {
    console.error('Nodemailer Error:', error);
    return res.status(500).json({
      success: false,
      message: error?.message || 'Failed to send email. Please try again.',
    });
  }
}
