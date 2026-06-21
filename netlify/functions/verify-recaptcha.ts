import { RecaptchaEnterpriseServiceClient } from '@google-cloud/recaptcha-enterprise';

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
    const recaptchaKey = "6LejKistAAAAADnrM2_zwmV5y3qODkNszPAkf5vQ";

    const client = new RecaptchaEnterpriseServiceClient();
    const projectPath = client.projectPath(projectID);

    const request = {
      assessment: {
        event: {
          token: token,
          siteKey: recaptchaKey,
          expectedAction: recaptchaAction,
        },
      },
      parent: projectPath,
    };

    const [response] = await client.createAssessment(request);
    
    // Close client to prevent memory leaks in serverless functions
    await client.close();

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
