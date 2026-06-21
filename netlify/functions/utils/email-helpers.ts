import nodemailer from 'nodemailer';

// Shared types and helpers for Netlify email functions
export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const ADMIN_EMAIL = 'webhub2811@gmail.com';

export function corsHeaders() {
  return {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Access-Control-Allow-Headers': 'Content-Type',
  };
}

export function optionsResponse() {
  return {
    statusCode: 204,
    headers: corsHeaders(),
    body: '',
  };
}

export function errorResponse(message: string, statusCode = 500) {
  return {
    statusCode,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ error: message }),
  };
}

export function successResponse(data: Record<string, unknown> = {}) {
  return {
    statusCode: 200,
    headers: { ...corsHeaders(), 'Content-Type': 'application/json' },
    body: JSON.stringify({ success: true, ...data }),
  };
}

export async function sendEmail(payload: EmailPayload) {
  const emailUser = process.env.VITE_GMAIL_USER || process.env.GMAIL_USER;
  const emailPass = process.env.VITE_GMAIL_PASS || process.env.GMAIL_PASS;

  if (!emailUser || !emailPass) {
    throw new Error('GMAIL_USER or GMAIL_PASS environment variables are not set');
  }

  const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: emailUser,
      pass: emailPass,
    },
  });

  const mailOptions = {
    from: `"S-Web Hub" <${emailUser}>`,
    to: payload.to,
    subject: payload.subject,
    html: payload.html,
  };

  const info = await transporter.sendMail(mailOptions);
  return info;
}

// Premium email template wrapper
export function emailTemplate(title: string, body: string): string {
  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${title}</title>
</head>
<body style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background-color:#000000;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:40px;">
              <img src="https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-logo%20(1).webp" alt="S-Web Hub" width="64" height="64" style="border-radius:50%;border:2px solid rgba(255,255,255,0.15);display:block;box-shadow:0 0 25px rgba(59,130,246,0.25);" />
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td style="background: linear-gradient(to bottom, #0d0d0f, #050505);border:1px solid rgba(255,255,255,0.08);border-top:1px solid rgba(255,255,255,0.15);border-radius:24px;padding:48px 40px;box-shadow:0 20px 40px rgba(0,0,0,0.5);">
              <h1 style="color:#ffffff;font-size:28px;font-weight:700;margin:0 0 24px 0;letter-spacing:-0.03em;line-height:1.2;">${title}</h1>
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:40px;">
              <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0;letter-spacing:0.02em;">© ${new Date().getFullYear()} S-Web Hub. All rights reserved.</p>
              <p style="color:rgba(255,255,255,0.25);font-size:11px;margin:12px 0 0 0;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Elite Digital Solutions & AI Automation</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
