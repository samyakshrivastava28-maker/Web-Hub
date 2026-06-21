import type { Handler, HandlerEvent } from '@netlify/functions';
import { sendEmail, emailTemplate, optionsResponse, errorResponse, successResponse, ADMIN_EMAIL } from './utils/email-helpers';

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') return optionsResponse();
  if (event.httpMethod !== 'POST') return errorResponse('Method not allowed', 405);

  try {
    const { name, email, phone, message } = JSON.parse(event.body || '{}');

    if (!name || !email || !message) {
      return errorResponse('Name, email, and message are required', 400);
    }

    const submittedAt = new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
      timeZoneName: 'short',
    });

    const html = emailTemplate('📩 New Contact Form Submission', `
      <p style="color:rgba(255,255,255,0.8);font-size:16px;line-height:1.6;margin:0 0 20px 0;">
        A new message has been submitted through the contact form on S-Web Hub.
      </p>
      <div style="background: rgba(59,130,246,0.05); border: 1px solid rgba(59,130,246,0.15); border-radius: 12px; padding: 24px; margin-bottom: 24px;">
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
          ${phone ? `
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Phone</td>
            <td style="padding:8px 0;color:#ffffff;font-size:15px;">${phone}</td>
          </tr>
          ` : ''}
          <tr>
            <td style="padding:8px 0;color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;">Submitted</td>
            <td style="padding:8px 0;color:rgba(255,255,255,0.6);font-size:14px;">${submittedAt}</td>
          </tr>
        </table>
      </div>
      <div style="margin-top:24px;">
        <p style="color:rgba(255,255,255,0.4);font-size:13px;text-transform:uppercase;letter-spacing:0.1em;font-weight:600;margin:0 0 12px 0;">Message</p>
        <div style="background-color:rgba(255,255,255,0.02);border:1px solid rgba(255,255,255,0.05);border-radius:12px;padding:20px;">
          <p style="color:rgba(255,255,255,0.8);font-size:15px;line-height:1.7;margin:0;white-space:pre-wrap;">${message}</p>
        </div>
      </div>
    `);

    await sendEmail({
      to: ADMIN_EMAIL,
      subject: `📩 Contact Form: ${name}`,
      html,
    });

    return successResponse({ message: 'Contact form email sent' });
  } catch (error: any) {
    console.error('send-contact-form error:', error);
    return errorResponse(error.message || 'Failed to send contact form email');
  }
};

export { handler };
