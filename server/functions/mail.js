const nodemailer = require('nodemailer');
module.exports = async function mail(full_name, email) {

  let transporter = nodemailer.createTransport(
    {
      host: 'smtp.gmail.com',
      port: 465,
      secure: true,
      auth: {
        user: 'rainwalkeraliasalex@gmail.com',
        pass: 'Andysayz@100691'
      },
      logger: false,
      debug: true
    },
    {
      from: 'Hackzone <noreply@hackzone.herokuapp.com>',
      headers: {
        'X-Laziness-level': 1000
      }
    }
  );
  let htmlTemplate = 'Hello hi'

  let message = {
    to: `${full_name} <${email}>`,
    subject: 'Nodemailer is unicode friendly ✔',
    html: htmlTemplate
  };

  let info = await transporter.sendMail(message);

  console.log('Message sent successfully!');
  console.log(nodemailer.getTestMessageUrl(info));
  transporter.close();
  return nodemailer.getTestMessageUrl(info)
}