'use strict'
const express = require('express')
const session = require('express-session')
const path = require('path')
const cors = require('cors')
const logger = require('./utils/logger')
//引入alipay
//const Alipay = require('alipay-sdk').default
//const AlipayForm = require('alipay-sdk/lib/form').default

const app = express()
require('./server/nms')
require('./db/connect')
/*
 //压缩html css js静态文件
 const compression = require('compression')
 //尽量在其他中间件前使用compression
 app.use(compression());
 */
//跨域访问
app.use(cors({
  origin: ['http://localhost', 'http://localhost:81'],
  credentials: true
}))
//session
app.use(
  session({
    cookie: {maxAge: 7 * 24 * 60 * 60 * 1000},
    secret: 'gdgdgjhr4yhrtghfg',
    resave: true,
    saveUninitialized: false
  })
)
//静态文件路径
app.use('/res', express.static(path.join(__dirname, './upload'), {
  maxAge: '1y',
  etag: false
}))
// 解析json 和表单
app.use(express.json())
app.use(express.urlencoded({extended: true}))
//路由
app.use('/user', require('./router/userRouter'))
app.use('/upload', require('./router/fileRouter'))
app.use('/video', require('./router/videoRouter'))
app.use('/danmu', require('./router/danmuRouter'))
app.use('/comment', require('./router/commentRouter'))
app.use('/live', require('./router/liveRouter'))
app.use('/msg', require('./router/messageRouter'))
app.use('/notice', require('./router/noticeRouter'))
//app.use('/qrCode', require('./router/qrRouter'))
//管理员路由
app.use('/admin', (req, res, next) => {
  // if (req.url === '/login' || req.session.login) next()
  // else res.sendStatus(403)
  next()
}, require('./router/adminRouter'))
app.use('/pay',require('./router/alipayRouter'))


//端口
app.listen(3000, args => logger.newInfo('服务器启动'))
