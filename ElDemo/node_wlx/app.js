const express = require('express');
const app = express()
const expressWs = require('express-ws');
expressWs(app)

//设置静态文件
app.use(express.static('./public'))
//解析文件格式
app.use(express.urlencoded({extended:true}))
app.use(express.json())

//引入mongo数据库
const mongoose =require('../node_wlx/module/mongoose/mongoose')
//引入session
app.use(require('./module/plugin/session'))

app.use('/login',require('./router/login'))
app.use('/changeInfo',require('./router/changeinfo'))
app.use('/goodsRou',require('./router/goodsRou'))
app.use('/webSocket',require('./router/wsOne'))


require("./router/auction")





app.listen('80',()=>{
    console.log("80端口启动成功...");
})