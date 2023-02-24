
const express = require("express")
const router = express.Router()
const expressWs = require('express-ws');
expressWs(router)

const { sendAMes, getRealTime, getNoReadMes, adminChangeuser } = require("../module/handler/wshandler");

let loginuser = []

//用户登录
router.ws("/wsson", (ws, req) => {
        //一个用户登录就记录一个
        loginuser.push(req.session.user)

        ws.onmessage = (mes) => {
                // console.log(mes.data);
                let former = []
                let latter = []
                setInterval(async () => {
                        // ws.send("avoid sleep!")
                        let result = await getNoReadMes(req.session.user._id, former, latter)
                        let offline = true
                        loginuser.forEach((item, index) => {
                                if (item._id == req.session.user._id) {
                                        // console.log(req.session.user);
                                        // req.session.user = item
                                        offline = false
                                }
                        })
                        // console.log(result);
                        if (result) {
                                ws.send(JSON.stringify({shuju:result,type:1}))
                        }
                        if (offline) {
                                // console.log("123");
                                ws.send(JSON.stringify({type:2}))
                        }
                }, 1000)
        }
        ws.onclose = (ss) => {
                console.log(req.session.user.userName + " " + req.session.user.userNickName + " 客户端关闭");
                loginuser.forEach((item, index) => {
                        if (item._id == req.session.user._id) {
                                //用户退出登录则删除该用户
                                loginuser.splice(index, 1)
                        }
                })
        }

})

//消息发送与回复
router.ws("/sendandget", (ws, req) => {
        // console.log(req.session.user._id);
        ws.onmessage = (mes) => {
                let data = JSON.parse(mes.data)
                if (data.type == 1) {
                        sendAMes(data)
                }
                if (data.type == 2) {
                        setInterval(async () => {
                                let result = await getRealTime(req.session.user._id, data.getter)
                                if (result) {
                                        ws.send(JSON.stringify(result))
                                }
                        }, 200)
                }

                // setInterval(()=>{
                //         ws.send("123")
                // },1000)
        }
})

router.ws("/adminUser", (ws, req) => {
        ws.onmessage = async (mes) => {
                let data = JSON.parse(mes.data)
                // console.log(data);
                switch (data.type) {
                        case 1:
                                ws.send(JSON.stringify({ onlineUser: loginuser, type: 1 }))
                                break;
                        case 2:
                                // console.log(data);
                                await adminChangeuser(data)
                                loginuser.forEach((item, index) => {
                                        if (item._id == data.id) {
                                                //修改信息
                                                item.userName = data.userName
                                                item.userNickName = data.userNickName
                                                item.userPass = data.userPass
                                                // console.log(loginuser);
                                        }
                                })
                                break;
                        case 3:
                                loginuser.forEach((item, index) => {
                                        if (item._id == data.userId) {
                                                //强制下线
                                                loginuser.splice(index, 1)
                                        }
                                })
                                break;
                }
        }

        ws.onclose = (e) => {
                console.log("admin close");
        }
})

module.exports = router