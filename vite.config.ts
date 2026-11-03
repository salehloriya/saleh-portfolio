import { defineConfig, loadEnv } from 'vite'
import react from '@vitejs/plugin-react'
import nodemailer from 'nodemailer'

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')

  return {
    plugins: [
      react(),
      {
        name: 'api-contact-handler',
        configureServer(server) {
          server.middlewares.use('/api/contact', async (req, res) => {
            if (req.method !== 'POST') {
              res.statusCode = 405
              res.setHeader('Content-Type', 'application/json')
              res.end(JSON.stringify({ success: false, message: 'Method Not Allowed' }))
              return
            }

            let body = ''
            req.on('data', (chunk) => {
              body += chunk
            })

            req.on('end', async () => {
              try {
                const data = JSON.parse(body || '{}')
                const { name, email, message } = data

                if (!name || !email || !message) {
                  res.statusCode = 400
                  res.setHeader('Content-Type', 'application/json')
                  res.end(JSON.stringify({ success: false, message: 'All fields are required.' }))
                  return
                }

                const emailUser = env.EMAIL_USER || process.env.EMAIL_USER
                const emailPass = env.EMAIL_PASS || process.env.EMAIL_PASS
                const recipient = env.RECIPIENT_EMAIL || emailUser

                const transporter = nodemailer.createTransport({
                  service: 'gmail',
                  auth: {
                    user: emailUser,
                    pass: emailPass,
                  },
                })

                await transporter.sendMail({
                  from: `"Saleh Loriya Portfolio" <${emailUser}>`,
                  to: recipient,
                  replyTo: email,
                  subject: `💼 New Contact Message from ${name}`,
                  html: `
                    <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 600px; margin: 0 auto; background: #ffffff; border: 1px solid #e2e8f0; border-radius: 16px; overflow: hidden; box-shadow: 0 4px 20px rgba(0,0,0,0.05);">
                      <div style="background: linear-gradient(135deg, #004E7A 0%, #0284C7 100%); padding: 24px; color: #ffffff; text-align: center;">
                        <h2 style="margin: 0; font-size: 22px; font-weight: 700;">New Portfolio Message</h2>
                        <p style="margin: 6px 0 0; opacity: 0.9; font-size: 13px;">Someone reached out through your portfolio</p>
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
                })

                res.statusCode = 200
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: true, message: 'Email sent successfully!' }))
              } catch (err: any) {
                console.error('Local mail error:', err)
                res.statusCode = 500
                res.setHeader('Content-Type', 'application/json')
                res.end(JSON.stringify({ success: false, message: err?.message || 'Failed to send email' }))
              }
            })
          })
        },
      },
    ],
    server: {
      host: '0.0.0.0',
      port: 5173,
      open: false,
    },
  }
})
