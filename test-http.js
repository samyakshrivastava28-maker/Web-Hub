console.log("Sending POST to http://localhost:8888/.netlify/functions/send-welcome...");
try {
  const res = await fetch('http://localhost:8888/.netlify/functions/send-welcome', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      name: 'Local API Test',
      email: 'webhub2811@gmail.com'
    })
  });
  
  const text = await res.text();
  console.log("Status:", res.status);
  console.log("Response:", text);
} catch (err) {
  console.error("Fetch failed:", err);
}
