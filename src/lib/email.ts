// Email service — calls Netlify Functions (Resend backend)
// No API keys are exposed in frontend code

// Use Netlify proxy port (8888) during local dev, and relative paths in production
const API_BASE = import.meta.env.DEV ? 'http://localhost:8888/.netlify/functions' : '/.netlify/functions';

async function callEmailFunction(endpoint: string, data: Record<string, string>): Promise<void> {
  try {
    const response = await fetch(`${API_BASE}/${endpoint}`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
      keepalive: true,
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      console.error(`Email function ${endpoint} failed:`, errorData);
    }
  } catch (error) {
    // Never crash auth flow — log and continue
    console.error(`Email function ${endpoint} error:`, error);
  }
}

export const sendWelcomeEmail = async (name: string, email: string): Promise<void> => {
  // Fire-and-forget — don't await to avoid blocking onboarding
  callEmailFunction('send-welcome', { name, email });
};

export const sendAdminNotification = async (name: string, email: string, phone: string, method: string): Promise<void> => {
  // Fire-and-forget — don't await to avoid blocking onboarding
  callEmailFunction('send-admin-notification', { name, email, phone, method });
};

export const sendWelcomeBackEmail = async (name: string, email: string): Promise<void> => {
  // Fire-and-forget — don't await to avoid blocking login
  callEmailFunction('send-welcome-back', { name, email });
};

export const sendContactFormEmail = async (name: string, email: string, phone: string, message: string): Promise<void> => {
  // This one we await since the user expects confirmation
  await callEmailFunction('send-contact-form', { name, email, phone, message });
};

export const sendConsultationEmail = async (data: {
  name: string;
  email: string;
  phone?: string;
  service?: string;
  budget?: string;
  timeline?: string;
  details?: string;
}): Promise<void> => {
  await callEmailFunction('send-consultation', data as Record<string, string>);
};
