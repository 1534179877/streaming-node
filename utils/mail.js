const nodemailer = require('nodemailer')
let transporter = nodemailer.createTransport({
  service: 'QQ',
  port: 465,
  secure: true, // true for 465, false for other ports
  auth: {
    user: '1534179877@qq.com', // generated ethereal user
    pass: 'axlfpnbqmjzpbaah' // generated ethereal password
  }
})

async function sendMail (mail, code) {
  // send mail with defined transport object
  let content = {
    from: '"pxy:" <1534179877@qq.com>', // sender address
    to: mail, // list of receivers
    subject: '邮箱验证码', // Subject line
    html: `本次请求的邮件验证码是：<b style='font-size: 18px;color: red'>${code}</b><br/>本验证码5分钟内有效，请及时输入！` // html body
  }

  return transporter.sendMail(content)
}

module.exports = {sendMail}
