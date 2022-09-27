import NodeMailer from 'nodemailer'
const transporter = NodeMailer.createTransport({
  service: 'hotmail',
  auth: {
    user: process.env.OUTLOOK_USER,
    pass: process.env.OUTLOOK_PASSWORD,
  },
})

export default transporter
