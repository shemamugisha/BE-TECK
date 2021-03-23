import 'dotenv/config';
import nodemailer from 'nodemailer';
import Mailgen from 'mailgen';
import { signToken } from './auth';

const { EMAIL, PASS, HOST } = process.env;

const sendEmail = async (type, data = {}) => {
  try {
    const mailGenerator = new Mailgen({
      theme: 'default',
      product: {
        name: 'ZipTech',
        link: HOST,
      },
    });

    const token = signToken(data);
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      auth: {
        user: EMAIL,
        pass: PASS,
      },
    });

    const mailOptions = {
      to: `${data.email}`,
      subject: `${type}`,
      html: '',
    };

    let email = '';

    switch (type) {
      case 'forgotPassword':
        email = {
          body: {
            name: data.name,
            intro: 'Your request of reseting password has been received',
            action: {
              instructions:
                'Please click the button below to reset your password',
              button: {
                color: '#008c52',
                text: 'Reset your password',
                link: `${HOST}/reset/?${token}`,
              },
            },
            outro:
              "Remember, if you don't do it this link will expire in 1day.",
          },
        };
        mailOptions.html = mailGenerator.generate(email);
        break;

      default:
        mailOptions.html = '';
    }
    const info = await transporter.sendMail(mailOptions);
    console.log('Preview URL:', nodemailer.getTestMessageUrl(info));
  } catch (error) {
    console.log(error);
  }
};

export default sendEmail;
