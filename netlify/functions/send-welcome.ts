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

    const html = emailTemplate('Welcome to S-Web Hub! 🚀', `
      <p style="color:#A0A0A0;font-size:16px;line-height:1.6;margin:0 0 20px 0;">
        Hi <strong style="color:#EDEDED;">${name}</strong>,
      </p>
      <p style="color:#A0A0A0;font-size:16px;line-height:1.6;margin:0 0 32px 0;">
        Welcome to S-Web Hub. Your premium account has been successfully provisioned. You now have exclusive access to our elite digital solutions, AI automation tools, and personalized agency dashboard.
      </p>
      
      <div style="background-color: #111111; border-radius: 12px; padding: 24px; margin-bottom: 32px;">
        <h3 style="color:#EDEDED; font-size: 13px; text-transform: uppercase; letter-spacing: 0.05em; margin: 0 0 16px 0;">Next Steps</h3>
        <ul style="color:#A0A0A0; font-size:15px; line-height:1.6; margin:0; padding-left: 20px;">
          <li style="margin-bottom: 8px;">Explore your customized project dashboard</li>
          <li style="margin-bottom: 8px;">Talk to our AI Assistant for instant answers</li>
          <li>Review our elite portfolio and pricing</li>
        </ul>
      </div>

      <table cellpadding="0" cellspacing="0" style="margin:0 0 32px 0;">
        <tr>
          <td style="background-color: #EDEDED; border-radius: 8px; padding: 14px 28px;">
            <a href="https://28webhub.netlify.app/dashboard" style="color:#050505; font-size:14px; font-weight:600; text-decoration:none; display:inline-block; letter-spacing: 0.02em;">
              Access Dashboard &rarr;
            </a>
          </td>
        </tr>
      </table>
      
      <p style="color:#666666;font-size:13px;line-height:1.6;margin:0;border-top: 1px solid #1A1A1A; padding-top: 24px;">
        Need assistance? Reply directly to this email or reach out to your dedicated account manager. We're here to help you scale.
      </p>
    `);

    await sendEmail({
      to: email,
      subject: 'Welcome to S-Web Hub 🚀',
      html,
    });
    return successResponse({ message: 'Welcome email sent' });
  } catch (error: any) {
    console.error('send-welcome error:', error);
    return errorResponse(error.message || 'Failed to send welcome email');
  }
};

export { handler };
