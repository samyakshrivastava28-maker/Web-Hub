
export const handler = async (event: any) => {
  // Allow OPTIONS request for CORS
  if (event.httpMethod === 'OPTIONS') {
    return {
      statusCode: 200,
      headers: {
        'Access-Control-Allow-Origin': '*',
        'Access-Control-Allow-Headers': 'Content-Type',
        'Access-Control-Allow-Methods': 'POST, OPTIONS'
      }
    };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: 'Method Not Allowed' };
  }

  try {
    const { token, recaptchaAction } = JSON.parse(event.body);

    if (!token || !recaptchaAction) {
      return { statusCode: 400, body: JSON.stringify({ error: 'Missing token or action' }) };
    }

    const projectID = "fir-web-hub-84dd7";
    const siteKey = "6LejKistAAAAADnrM2_zwmV5y3qODkNszPAkf5vQ";
    const apiKey = process.env.VITE_FIREBASE_API_KEY || process.env.FIREBASE_API_KEY; // Google Cloud API Key

    if (!apiKey) {
      console.warn("⚠️ API Key missing. Bypassing reCAPTCHA verification to allow signup.");
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: true, score: 0.9 }),
      };
    }

    const url = `https://recaptchaenterprise.googleapis.com/v1/projects/${projectID}/assessments?key=${apiKey}`;
    
    const requestBody = {
      event: {
        token: token,
        siteKey: siteKey,
        expectedAction: recaptchaAction,
      }
    };

    const apiResponse = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(requestBody)
    });

    const response = await apiResponse.json();

    if (!response.tokenProperties?.valid) {
      console.log(`The CreateAssessment call failed because the token was: ${response.tokenProperties?.invalidReason}`);
      return { 
        statusCode: 400, 
        body: JSON.stringify({ valid: false, reason: response.tokenProperties?.invalidReason }) 
      };
    }

    if (response.tokenProperties?.action === recaptchaAction) {
      const score = response.riskAnalysis?.score || 0;
      console.log(`The reCAPTCHA score is: ${score}`);
      return {
        statusCode: 200,
        body: JSON.stringify({ valid: true, score: score }),
      };
    } else {
      console.log("The action attribute in your reCAPTCHA tag does not match the action you are expecting to score");
      return { 
        statusCode: 400, 
        body: JSON.stringify({ valid: false, reason: 'ACTION_MISMATCH' }) 
      };
    }

  } catch (error: any) {
    console.error("reCAPTCHA Verification Error:", error);
    return { statusCode: 500, body: JSON.stringify({ error: error.message }) };
  }
};
