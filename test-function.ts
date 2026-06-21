import { handler } from './netlify/functions/send-welcome.js';
import dotenv from 'dotenv';
dotenv.config();

async function run() {
  console.log('Testing send-welcome function...');
  
  const event = {
    httpMethod: 'POST',
    body: JSON.stringify({
      name: 'Test User',
      email: 'webhub2811@gmail.com'
    })
  };

  try {
    const result = await handler(event as any, {} as any);
    console.log('Function result:', result);
    if (result && result.statusCode === 200) {
      console.log('✅ SUCCESS! Email was sent via Netlify function handler.');
    } else {
      console.error('❌ FAILED!', result);
    }
  } catch (error) {
    console.error('❌ ERROR!', error);
  }
}

run();
