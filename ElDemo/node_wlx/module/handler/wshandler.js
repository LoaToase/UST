const mongoAuction = require("../mongoose/mongoAuction")
const mongoMessage = require("../mongoose/mongoMessage")
const mongoNewUser = require("../mongoose/mongoNewUser")

const sendAMes = async (data) => {
    // console.log(data);
    let value = {
        mesValue: data.mesValue,
        sendTime: data.sendTime,
        // ifcheck: data.ifcheck
    }
    let bol = await mongoMessage.findOne({ senderId: data.sender, getterId: data.getter })
    // console.log(bol);
    if (bol) {
        await mongoMessage.updateOne({ senderId: data.sender, getterId: data.getter }, { $inc: { noReadMes: 1 }, $push: { message: value } })
    } else {
        await mongoMessage.create({ senderId: data.sender, getterId: data.getter, message: value, noReadMes: 1 })
    }
}

//获取getter信息
const getRealTime = async (sender, getter) => {
    // console.log(senderId,getterId);
    let bol = await mongoMessage.findOne({ getterId: sender, senderId: getter, noReadMes: { $ne: 0 } })
    // console.log(bol.message);
    if (bol) {
        let len = bol.message.length
        let start = len - bol.noReadMes
        let rest = []
        for (let i = start; i < len; i++) {
            rest.push({
                mes: bol.message[i].mesValue,
                sendTime: bol.message[i].sendTime,
                senderId: bol.senderId,
            })
        }
        await mongoMessage.updateOne({ getterId: sender, senderId: getter }, { noReadMes: 0 })
        // console.log(rest);
        return rest
    }
}

//getNoReadMes

const getNoReadMes = async (id, former, latter) => {
    let bol = await mongoMessage.find({ getterId: id })
    if (bol.length != 0) {
        for (let i = 0; i < bol.length; i++) {
            latter[i] = bol[i].noReadMes
        }
        if (panduan(former, latter)) {
            return
        } else {
            for (let i = 0; i < latter.length; i++) {
                former[i] = latter[i]
            }
            return former
        }
    }
}
function panduan(former, latter) {
    if (former.length != latter.length) {
        return false
    } else {
        for (let i = 0; i < former.length; i++) {
            if (former[i] != latter[i]) {
                return false
            }
        }

    }
    return true

}

const getAucAndUser = async (data) => {
    // console.log(data);
    let bol1 = await mongoNewUser.findOne({ _id: data })
    let bol2 = await mongoAuction.findOne({ catoUser: data })
    // console.log(bol1);
    // console.log(bol2);
    let final = {
        code: 1,
        userNickName: bol1.userNickName,
        userLogo: bol1.userLogo,
        goodsName: bol2.goodsName,
        goodsFirstPrize: bol2.goodsFirstPrize,
        startTime: bol2.startTime,
        goodsDesc: bol2.goodsDesc,
        goodsImg: bol2.goodsImg,
        startTime: bol2.startTime
    }
    return final
}

//getOnUserInfo
const getOnUserInfo = async (id) => {
    let bol = await mongoNewUser.findOne({ _id: id })
    let final = {
        code: 2,
        userLogo: bol.userLogo,
        userId: id
    }
    return final;
}

//getNickName
const getNickName = async (id) => {
    let bol = await mongoNewUser.findOne({ _id: id })
    return bol
}

//admin修改用户信息
const adminChangeuser = async (data) => {
    await mongoNewUser.updateOne({ _id: data.id }, { userName: data.userName, userNickName: data.userNickName, userPass: data.userPass })
}

module.exports = {
    sendAMes,
    getRealTime,
    getNoReadMes,
    getAucAndUser,
    getOnUserInfo,
    getNickName,
    adminChangeuser,
}