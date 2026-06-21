import nodemailer from 'nodemailer';
import fs from 'fs';

async function testEmail() {
  console.log('Sending Welcome Email Preview...');
  try {
    const htmlContent = fs.readFileSync('public/email-preview.html', 'utf8');

    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'webhub2811@gmail.com',
        pass: 'fjndohekaikzvqyh',
      },
    });

    const info = await transporter.sendMail({
      from: '"S-Web Hub" <webhub2811@gmail.com>',
      to: 'webhub2811@gmail.com',
      subject: 'LATEST: Clean & Professional Email Theme 🚀',
      html: htmlContent,
    });

    console.log('Success! Sent to webhub2811@gmail.com. Message ID:', info.messageId);
  } catch (error) {
    console.error('SMTP Error:', error);
  }
}

testEmail();
