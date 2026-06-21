import type { Handler, HandlerEvent } from '@netlify/functions';
import { sendEmail, emailTemplate, optionsResponse, errorResponse, successResponse, RESEND_FROM } from './utils/email-helpers';

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') return optionsResponse();
  if (event.httpMethod !== 'POST') return errorResponse('Method not allowed', 405);

  try {
    const { name, email } = JSON.parse(event.body || '{}');

    if (!name || !email) {
      return errorResponse('Name and email are required', 400);
    }

    const loginTime = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const html = emailTemplate('Welcome Back! 👋', `
      <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.6;margin:0 0 20px 0;">
        Hi <strong style="color:#ffffff;">${name}</strong>,
      </p>
      <p style="color:rgba(255,255,255,0.7);font-size:16px;line-height:1.6;margin:0 0 32px 0;">
        We've detected a successful secure login to your S-Web Hub account.
      </p>
      <div style="background-color:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:24px;margin:0 0 32px 0;">
        <p style="color:rgba(255,255,255,0.4);font-size:12px;margin:0 0 6px 0;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Secure Login Verified</p>
        <p style="color:#ffffff;font-size:15px;margin:0;font-family: monospace;">${loginTime}</p>
      </div>
      <table cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
        <tr>
          <td style="background: linear-gradient(135deg, #3b82f6 0%, #2563eb 100%); border-radius: 100px; padding: 14px 32px; box-shadow: 0 4px 12px rgba(59,130,246,0.3);">
            <a href="https://s-web-hub.netlify.app/dashboard" style="color:#ffffff; font-size:15px; font-weight:600; text-decoration:none; display:inline-block; letter-spacing: 0.02em;">
              Enter Dashboard &rarr;
            </a>
          </td>
        </tr>
      </table>
      <p style="color:rgba(255,255,255,0.4);font-size:13px;line-height:1.6;margin:0;border-top: 1px solid rgba(255,255,255,0.05); padding-top: 24px;">
        If you did not authorize this login, please secure your account immediately by resetting your password or contacting support.
      </p>
    `);

    await sendEmail({
      to: email,
      subject: 'Welcome Back to S-Web Hub 👋',
      html,
      from: RESEND_FROM,
    });

    return successResponse({ message: 'Welcome back email sent' });
  } catch (error: any) {
    console.error('send-welcome-back error:', error);
    return errorResponse(error.message || 'Failed to send welcome back email');
  }
};

export { handler };
