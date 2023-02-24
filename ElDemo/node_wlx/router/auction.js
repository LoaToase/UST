// console.log("qq");
//该模块用于多用户界面

const { getAucAndUser, getOnUserInfo, getNickName } = require("../module/handler/wshandler")

let njws = require("nodejs-websocket")

let onUser = []
let updateprize = 0
let startTime = new Date()
let callTime = 0
let stopId = ""
let server = njws.createServer((con) => {


    try {
        con.on("text", async (str) => {
            let data = JSON.parse(str)
            // console.log(data);

            if (data.code == 1) {
                let result = await getAucAndUser(data.catoUser)
                updateprize = result.goodsFirstPrize
                startTime = result.startTime
                // console.log(startTime - new Date("2022-11-19T13:23:48.000Z"));
                con.send(JSON.stringify(result))
            } else if (data.code == 2) {
                // console.log(data);
                let result = await getOnUserInfo(data.userId)
                // console.log(result);
                onUser.push(result)
                con.send(JSON.stringify(onUser))
            } else if (data.code == 4) {
                updateprize = data.prize
                let ss = await getNickName(data.userId)
                let result = {
                    code: 4,
                    value: ss.userNickName + " 竞价 ￥ " + updateprize,
                    // userNickName:ss.userNickName
                }
                // stopId = data.userId
                server.connections.forEach(function (conn) {
                    conn.send(JSON.stringify(result))
                })
                callTime = 0
                stopId = data.userId
                let clock = setInterval(() => {
                    if (stopId == "" || stopId == data.userId) {
                        callTime++
                        if (callTime > 0 && callTime < 4) {
                            let robot = {
                                code: 4,
                                value: ss.userNickName + " 竞价 " + callTime + " 次",
                            }
                            server.connections.forEach(function (conn) {

                                conn.send(JSON.stringify(robot))
                            })
                        } else {
                            let robot = {
                                code: 4,
                                value: ss.userNickName + " 竞价成功",
                                tpye: true
                            }
                            server.connections.forEach(function (conn) {

                                conn.send(JSON.stringify(robot))
                            })
                            onUser = []
                            updateprize = 0
                            startTime = new Date()
                            callTime = 0
                            stopId = ""
                            // server.close()

                        }
                    } else {
                        clearInterval(clock)
                        callTime = 0
                    }
                }, 5000)


                // con.send(JSON.stringify(result))
            }

            // con.sendText("there!")
            // console.log(server.connections.length);
            server.connections.forEach(function (conn) {
                conn.send("qunfa")
            })

        })

        let fianl = {}
        if (server.connections.length != 0) {
            let ccll = null
            let bll = true
            ccll = setInterval(() => {
                // console.log("11");
                if (server.connections.length == 0) {
                    clearInterval(ccll)
                    return
                }
                fianl = {
                    code: 3,
                    theUsers: onUser,
                    prize: updateprize,
                }
                if (new Date() - startTime >= 0 && bll) {
                    fianl = {
                        code: 4,
                        value: "拍卖开始",
                        start: true,
                    }
                    bll = false
                }
                // console.log(fianl);
                server.connections.forEach(function (conn) {
                    conn.send(JSON.stringify(fianl))
                })

            }, 200)
        }


        ws.onerror = (e) => {
            console.log(e)
        }

        con.on("close", (code, reason) => {
            console.log("cloase");
        })
    } catch {
        console.log("error");
    }
}).listen(12345)