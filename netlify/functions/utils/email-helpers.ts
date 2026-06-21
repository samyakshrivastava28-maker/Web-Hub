// Shared types and helpers for Netlify email functions
export interface EmailPayload {
  to: string;
  subject: string;
  html: string;
  from?: string;
}

export const RESEND_FROM = 'S-Web Hub <onboarding@resend.dev>';
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
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    throw new Error('RESEND_API_KEY environment variable is not set');
  }

  const response = await fetch('https://api.resend.com/emails', {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${apiKey}`,
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      from: payload.from || RESEND_FROM,
      to: [payload.to],
      subject: payload.subject,
      html: payload.html,
    }),
  });

  if (!response.ok) {
    const errorData = await response.text();
    throw new Error(`Resend API error: ${response.status} - ${errorData}`);
  }

  return response.json();
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
    @keyframes aurora {
      0% { background-position: 0% 50%; }
      50% { background-position: 100% 50%; }
      100% { background-position: 0% 50%; }
    }
    .animated-bg {
      background: linear-gradient(-45deg, #000000, #0a0f1c, #000000, #0f0a1c);
      background-size: 400% 400%;
      animation: aurora 15s ease infinite;
    }
  </style>
</head>
<body class="animated-bg" style="margin:0;padding:0;background-color:#000000;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,'Helvetica Neue',Arial,sans-serif;color:#ffffff;">
  <table width="100%" cellpadding="0" cellspacing="0" class="animated-bg" style="background-color:#000000;padding:40px 20px;">
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
