import type { Handler, HandlerEvent } from '@netlify/functions';
import { sendEmail, emailTemplate, optionsResponse, errorResponse, successResponse } from './utils/email-helpers';

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
      <p style="color:#A0A0A0;font-size:16px;line-height:1.6;margin:0 0 20px 0;">
        Hi <strong style="color:#EDEDED;">${name}</strong>,
      </p>
      <p style="color:#A0A0A0;font-size:16px;line-height:1.6;margin:0 0 32px 0;">
        Welcome back. We've recorded a new login from your device at <strong style="color:#EDEDED;">${loginTime}</strong>. 
      </p>
      
      <div style="background-color: #111111; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
        <p style="color:#A0A0A0; font-size:15px; line-height:1.6; margin:0;">
          If this was you, you can safely ignore this email. If you did not authorize this login, please reply to this email immediately to secure your account.
        </p>
      </div>

      <table cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
        <tr>
          <td style="background-color: #EDEDED; border-radius: 8px; padding: 14px 28px;">
            <a href="https://28webhub.netlify.app/dashboard" style="color:#050505; font-size:14px; font-weight:600; text-decoration:none; display:inline-block; letter-spacing: 0.02em;">
              Go to Dashboard &rarr;
            </a>
          </td>
        </tr>
      </table>
      
      <p style="color:#666666;font-size:13px;line-height:1.6;margin:0;border-top: 1px solid #1A1A1A; padding-top: 24px;">
        For security purposes, we log all account access times. We're here to help you stay secure.
      </p>
    `);

    await sendEmail({
      to: email,
      subject: 'Welcome Back to S-Web Hub 👋',
      html,
    });

    return successResponse({ message: 'Welcome back email sent' });
  } catch (error: any) {
    console.error('send-welcome-back error:', error);
    return errorResponse(error.message || 'Failed to send welcome back email');
  }
};

export { handler };
