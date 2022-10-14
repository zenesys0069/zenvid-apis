import transporter from '../configs/nodemailer.mjs'

export const sendOneTimePassword = (address, subject, otp) => {
  return new Promise((resolve, reject) => {
    const options = {
      from: process.env.SENDER_ADDRESS,
      to: address,
      subject: subject,
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ZenVid</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing ZenVid. Use the following OTP to complete your Sign Up procedures. OTP is valid for next 5 mins</p>
    <h2 style="background: #00466a;margin: 0 auto;width: max-content;padding: 0 10px;color: #fff;border-radius: 4px;">${otp}</h2>
    <p style="font-size:0.9em;">Regards,<br />ZenVid</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>ZenVid Inc</p>
      <p>Steller Parkway</p>
      <p>Noida</p>
    </div>
  </div>
</div>`,
    }

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}

export const sendResetPassword = (address, resetLink) => {
  return new Promise((resolve, reject) => {
    const options = {
      from: process.env.SENDER_ADDRESS,
      to: address,
      subject: 'Reset your password!',
      html: `<div style="font-family: Helvetica,Arial,sans-serif;min-width:1000px;overflow:auto;line-height:2">
  <div style="margin:50px auto;width:70%;padding:20px 0">
    <div style="border-bottom:1px solid #eee">
      <a href="" style="font-size:1.4em;color: #00466a;text-decoration:none;font-weight:600">ZenVid</a>
    </div>
    <p style="font-size:1.1em">Hi,</p>
    <p>Thank you for choosing ZenVid. Use the following link to complete your reset password procedures. This link  is valid for next 5 mins</p>
    <a target="_blank" href="${resetLink}" style="font-size:1.4em;color: #00466a;font-weight:600">Click here</a>
    <p style="font-size:0.9em;">Regards,<br />ZenVid</p>
    <hr style="border:none;border-top:1px solid #eee" />
    <div style="float:right;padding:8px 0;color:#aaa;font-size:0.8em;line-height:1;font-weight:300">
      <p>ZenVid Inc</p>
      <p>Steller Parkway</p>
      <p>Noida</p>
    </div>
  </div>
</div>`,
    }

    transporter.sendMail(options, (error, info) => {
      if (error) {
        console.log(error)
        reject(error)
      } else {
        resolve(info)
      }
    })
  })
}
