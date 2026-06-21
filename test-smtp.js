import nodemailer from 'nodemailer';

async function testEmail() {
  console.log('Testing SMTP connection...');
  try {
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: 'webhub2811@gmail.com',
        pass: 'fjndohekaikzvqyh',
      },
    });

    const info = await transporter.sendMail({
      from: '"S-Web Hub Test" <webhub2811@gmail.com>',
      to: 'webhub2811@gmail.com',
      subject: 'SMTP Test',
      text: 'If you get this, SMTP is working perfectly from the local machine!',
    });

    console.log('Success!', info.messageId);
  } catch (error) {
    console.error('SMTP Error:', error);
  }
}

testEmail();
