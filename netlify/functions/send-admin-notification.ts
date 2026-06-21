import type { Handler, HandlerEvent } from '@netlify/functions';
import { sendEmail, emailTemplate, optionsResponse, errorResponse, successResponse, RESEND_FROM, ADMIN_EMAIL } from './utils/email-helpers';

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') return optionsResponse();
  if (event.httpMethod !== 'POST') return errorResponse('Method not allowed', 405);

  try {
    const { name, email, phone, method } = JSON.parse(event.body || '{}');

    if (!name || !email) {
      return errorResponse('Name and email are required', 400);
    }

    const signupDate = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const html = emailTemplate('🔔 New User Signed Up', `
      <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 24px 0;">
        A new user has completed onboarding on S-Web Hub.
      </p>
      <div style="background-color:rgba(255,255,255,0.03);border:1px solid rgba(255,255,255,0.06);border-radius:16px;padding:24px;margin:24px 0;">
        <table cellpadding="0" cellspacing="0" width="100%">
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;width:120px;">Name</td>
            <td style="padding:8px 0;color:#ffffff;font-size:15px;font-weight:500;">${name}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Email</td>
            <td style="padding:8px 0;color:#ffffff;font-size:15px;">
              <a href="mailto:${email}" style="color:#60A5FA;text-decoration:none;">${email}</a>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Phone</td>
            <td style="padding:8px 0;color:#ffffff;font-size:15px;">${phone || 'Not provided'}</td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Method</td>
            <td style="padding:8px 0;">
              <span style="display:inline-block;background-color:${method === 'google' ? 'rgba(66,133,244,0.15)' : 'rgba(255,255,255,0.08)'};color:${method === 'google' ? '#60A5FA' : '#ffffff'};padding:4px 12px;border-radius:8px;font-size:13px;font-weight:600;">
                ${method === 'google' ? '🔵 Google' : '📧 Email/Password'}
              </span>
            </td>
          </tr>
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Date</td>
            <td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">${signupDate}</td>
          </tr>
        </table>
      </div>
    `);

    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `🔔 New User: ${name} (${method})`,
      html,
      from: RESEND_FROM,
    });

    return successResponse({ message: 'Admin notification sent' });
  } catch (error: any) {
    console.error('send-admin-notification error:', error);
    return errorResponse(error.message || 'Failed to send admin notification');
  }
};

export { handler };
