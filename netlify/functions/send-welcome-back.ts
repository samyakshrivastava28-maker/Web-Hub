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
      <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 24px 0;">
        Hi <strong style="color:#ffffff;">${name}</strong>,
      </p>
      <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 24px 0;">
        You've successfully signed in to your S-Web Hub account.
      </p>
      <div style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:12px;padding:20px;margin:24px 0;">
        <p style="color:rgba(255,255,255,0.4);font-size:13px;margin:0 0 4px 0;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Login Time</p>
        <p style="color:rgba(255,255,255,0.7);font-size:15px;margin:0;">${loginTime}</p>
      </div>
      <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
        <tr>
          <td style="background-color:#ffffff;border-radius:12px;padding:14px 32px;">
            <a href="https://s-web-hub.netlify.app/dashboard" style="color:#000000;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">
              Open Dashboard →
            </a>
          </td>
        </tr>
      </table>
      <p style="color:rgba(255,255,255,0.3);font-size:13px;line-height:1.6;margin:0;">
        If this wasn't you, please secure your account immediately by resetting your password.
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
