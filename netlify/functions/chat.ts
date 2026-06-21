import type { Handler, HandlerEvent } from '@netlify/functions';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'Content-Type',
  'Access-Control-Allow-Methods': 'POST, OPTIONS',
};

const handler: Handler = async (event: HandlerEvent) => {
  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers: corsHeaders, body: '' };
  }

  if (event.httpMethod !== 'POST') {
    return {
      statusCode: 405,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Method Not Allowed' }),
    };
  }

  try {
    const { messages, model } = JSON.parse(event.body || '{}');

    if (!messages || !Array.isArray(messages)) {
      return {
        statusCode: 400,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'Messages array is required' }),
      };
    }

    const aiModel = model || 'google/gemma-4-31b-it';

    const openRouterKey = process.env.VITE_OPENROUTER_API_KEY || process.env.OPENROUTER_API_KEY;
    const nvidiaKey = process.env.VITE_NVIDIA_API_KEY || process.env.NVIDIA_API_KEY;

    if (!openRouterKey && !nvidiaKey) {
      return {
        statusCode: 500,
        headers: corsHeaders,
        body: JSON.stringify({ error: 'No API Keys configured for OpenRouter or NVIDIA' }),
      };
    }

    const payload: any = {
      model: aiModel,
      messages: messages,
      temperature: 0.2,
      max_tokens: 1024,
    };

    let lastError = 'Unknown error';

    // 1. Try NVIDIA First
    if (nvidiaKey) {
      try {
        // NVIDIA uses a specific model string, or we pass the requested model
        // If Deepseek is requested via NVIDIA, we must append thinking: false
        if (aiModel.includes('deepseek')) {
          payload.chat_template_kwargs = { thinking: false };
        }

        const response = await fetch('https://integrate.api.nvidia.com/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${nvidiaKey}`,
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(payload),
        });

        if (response.ok) {
          const data = await response.json();
          return { statusCode: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
        } else {
          lastError = `NVIDIA returned ${response.status}: ${await response.text()}`;
          console.warn('NVIDIA Failed:', lastError);
        }
      } catch (err: any) {
        lastError = `NVIDIA Fetch Error: ${err.message}`;
        console.warn(lastError);
      }
    }

    // 2. Fallback to OpenRouter
    if (openRouterKey) {
      try {
        const fallbackPayload = { ...payload };
        delete fallbackPayload.chat_template_kwargs;

        const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
          method: 'POST',
          headers: {
            'Authorization': `Bearer ${openRouterKey}`,
            'Content-Type': 'application/json',
            'HTTP-Referer': 'https://s-webhub.com',
            'X-Title': 'S-Web Hub Chatbot'
          },
          body: JSON.stringify(fallbackPayload),
        });

        if (response.ok) {
          const data = await response.json();
          return { statusCode: 200, headers: { ...corsHeaders, 'Content-Type': 'application/json' }, body: JSON.stringify(data) };
        } else {
          lastError = `OpenRouter returned ${response.status}: ${await response.text()}`;
          console.warn('OpenRouter Failed:', lastError);
        }
      } catch (err: any) {
        lastError = `OpenRouter Fetch Error: ${err.message}`;
        console.warn(lastError);
      }
    }

    // 3. Both failed
    return {
      statusCode: 502,
      headers: corsHeaders,
      body: JSON.stringify({ error: `All Providers Failed. Last Error: ${lastError}` }),
    };
  } catch (error) {
    console.error('Chat function error:', error);
    return {
      statusCode: 500,
      headers: corsHeaders,
      body: JSON.stringify({ error: 'Internal Server Error' }),
    };
  }
};

export { handler };
