// const nodemailer = require('nodemailer');

// const transporter = nodemailer.createTransport({
//   host:'smtp.gmail.com',
//   port:587,
//   secure:false,
//   auth: {
//     user: 'satyampandit021@gmail.com',
//     pass: 'mnlm kfcp wzwb dthw'
//   },
// });

// async function sendEmail(to, subject, text, html) {
//   try {
//     const mailOptions = {
//       from: 'satyampandit021@gmail.com',
//       to: to,
//       subject: subject,
//       text: text,
//       html: html
//     };
//     const info = await transporter.sendMail(mailOptions);

//     return { success: true, messageId: info.messageId };
//   } catch (error) {
//     console.error('Error sending email: ', error);
//     return { success: false, error: error.message };
//   }
// }
const nodemailer = require('nodemailer');

const transporter = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'support@fashionneedles.com',
    pass: '2017Satyam@#'
  },
});
const transporter1 = nodemailer.createTransport({
  host: 'smtp.hostinger.com',
  port: 465,
  secure: true,
  auth: {
    user: 'orders@fashionneedles.com',
    pass: '2017Satyam@#'
  },
});

async function sendEmail(to, subject, text, html) {
  console.log('to')
  try {
    const mailOptions = {
      from: 'support@fashionneedles.com',
      to: to,
      subject: subject,
      text: text,
      html: html
    };
    const mailOptions1 = {
      from: 'support@fashionneedles.com',
      to: 'orders@fashionneedles.com',
      subject: subject,
      text: text,
      html: html
    };
    const info = await transporter.sendMail(mailOptions);
    const info1 = await transporter1.sendMail(mailOptions1);

    return { success: true, messageId: info.messageId };
  } catch (error) {
    console.error('Error sending email: ', error);
    return { success: false, error: error.message };
  }
}




module.exports = { sendEmail };





























// _id: new ObjectId("673339878ea05f828a6866a4"),
// name: 'Men',
// url: 'men',
// desc: "<p>Stay ahead with the latest in <strong>men's fashion trends 2024</strong>. From <strong>stylish men's clothing</strong> to essential <strong>men's outfit ideas</strong>, discover how to elevate your style with expert advice. Explore the best in <strong>men's street style</strong>, <strong>smart casuals</strong>, and exclusive <strong>fashion tips</strong> for every occasion. Upgrade your wardrobe with <strong>designer clothes</strong>, <strong>fashion accessories</strong>, and learn <strong>how to dress well</strong> effortlessly. Get inspired by <strong>seasonal fashion trends</strong> and make a statement.</p>",
// metatitle: "Men's Fashion Trends 2024 | Upgrade Your Style with Expert Tips",
// metadesc: "Stay ahead in men's fashion with the latest 2024 trends. Discover expert styling tips, wardrobe essentials, and where to shop to elevate your look effortlessly.",
// meta_keywords: "men's fashion trends 2024, stylish men's clothing, men's style tips, fashion for men, men's wardrobe essentials, latest men's fashion, men's outfit ideas, men's street style, casual wear for men, smart casual for men, men's fashion advice, designer clothes for men, men's fashion accessories, how to dress well for men, men's seasonal fashion trends.",
// parentcategory: [],
// attribute: [],
// status: 'Active',
// banner: '1731410311491-06271946-be59-476d-bb62-0b4d81c961611672651142670-Roadster-Men-Sweatshirts-91672651142282-1.jpg',
// createdAt: 2024-11-12T11:18:31.580Z,
// updatedAt: 2024-11-12T11:18:31.580Z,
// __v: 0
// },