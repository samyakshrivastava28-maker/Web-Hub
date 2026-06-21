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

    const html = emailTemplate('Welcome to S-Web Hub! 🚀', `
      <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 24px 0;">
        Hi <strong style="color:#ffffff;">${name}</strong>,
      </p>
      <p style="color:rgba(255,255,255,0.6);font-size:16px;line-height:1.7;margin:0 0 24px 0;">
        Welcome to S-Web Hub! Your account has been successfully set up and you're ready to explore premium digital solutions.
      </p>
      <table cellpadding="0" cellspacing="0" style="margin:32px 0;">
        <tr>
          <td style="background-color:#ffffff;border-radius:12px;padding:14px 32px;">
            <a href="https://s-web-hub.netlify.app/dashboard" style="color:#000000;font-size:14px;font-weight:600;text-decoration:none;display:inline-block;">
              Go to Dashboard →
            </a>
          </td>
        </tr>
      </table>
      <p style="color:rgba(255,255,255,0.4);font-size:14px;line-height:1.6;margin:0;">
        If you have any questions, reply to this email or reach out to us on WhatsApp. We're here to help you build something extraordinary.
      </p>
    `);

    await sendEmail({
      to: email,
      subject: 'Welcome to S-Web Hub 🚀',
      html,
      from: RESEND_FROM,
    });

    return successResponse({ message: 'Welcome email sent' });
  } catch (error: any) {
    console.error('send-welcome error:', error);
    return errorResponse(error.message || 'Failed to send welcome email');
  }
};

export { handler };
