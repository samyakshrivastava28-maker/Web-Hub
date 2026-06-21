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
  <style>
    .body-bg {
      background-color: #050505;
    }
    .card-pro {
      background-color: #0A0A0A;
      border: 1px solid #1A1A1A;
      border-radius: 16px;
      padding: 48px 40px;
    }
    .text-gradient {
      background: linear-gradient(to right, #FF5E00, #FF007A);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
    }
  </style>
</head>
<body class="body-bg" style="margin:0;padding:0;background-color:#050505;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" class="body-bg" style="background-color:#050505;padding:60px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">
          <!-- Logo -->
          <tr>
            <td align="center" style="padding-bottom:32px;">
              <img src="https://ik.imagekit.io/hx85ktgzm/S-Web-Hub-logo%20(1).webp" alt="S-Web Hub" width="48" height="48" style="border-radius:12px;display:block;" />
            </td>
          </tr>
          <!-- Card -->
          <tr>
            <td class="card-pro" style="background-color: #0A0A0A; border: 1px solid #1A1A1A; border-radius: 16px; padding: 48px 40px;">
              <h1 style="color:#ffffff;font-size:24px;font-weight:600;margin:0 0 24px 0;letter-spacing:-0.02em;line-height:1.3;">${title}</h1>
              ${body}
            </td>
          </tr>
          <!-- Footer -->
          <tr>
            <td align="center" style="padding-top:32px;">
              <p style="color:#666666;font-size:13px;margin:0;letter-spacing:0.01em;">© ${new Date().getFullYear()} S-Web Hub. All rights reserved.</p>
              <p style="color:#444444;font-size:11px;margin:8px 0 0 0;text-transform:uppercase;letter-spacing:0.05em;font-weight:500;">Premium Digital Solutions</p>
            </td>
          </tr>
        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
}
