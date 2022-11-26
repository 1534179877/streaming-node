const express = require('express')
const router = express.Router()
const alipaySdk = require('../utils/alipay')
const AlipayFormData = require('alipay-sdk/lib/form').default;


router.post('/alipay',(req,res)=>{
    const orderId = req.body;
    const formData = new AlipayFormData()
    formData.setMethod('get')
    formData.addField('returnUrl','http://www.baidu.com')
    formData.addField('bizContent',{
        outTradeNo: orderId,
        productCode:'FAST_INSTANT_TRADE_PAY',
        totalAmount:'0.01',
        subject:'商品',
        body:'商品详情'
    })
    const result  = alipaySdk.Exec(
        'alipay.system.oauth.pay',
        {},
        {formData:formData},
    );

    result.then(res=>{
        res.send({
            success:true,
            code:200,
            'result':res
        })
    })
})

module.exports = router