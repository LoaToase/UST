const mongoNewUser = require('../mongoose/mongoNewUser')
const mongoSecUser = require('../mongoose/mongoSecUser')
const mongoMessage = require("../mongoose/mongoMessage")
const path = require("path")
const fs = require("fs")

//
const handlerInfoLogo = async (id, imgPath) => {
    let former = await mongoNewUser.findOne({ _id: id });
    // console.log(former);
    let bol = await mongoNewUser.updateOne({ _id: id }, { userLogo: imgPath })
    if (former.userLogo != "/userImg/userLogo.webp") {
        fs.unlinkSync(path.resolve(__dirname, '../../public' + former.userLogo))
    }
    return {
        code: 1,
        value: "头像修改成功"
    }
}

//
const loadUserMessage = async (id) => {
    // console.log(id);
    let bol = await mongoNewUser.findOne({ _id: id })
    return bol;
}

//更改用户信息
const changeselfInf = async (data) => {
    // console.log(data.userId);
    if (data.ifPass == false && data.ifNName == false) {
        await mongoNewUser.updateOne({ _id: data.userId }, { userNickName: data.userNickName, userPass: data.userPass })
        return { code: 1, value: "修改昵称,密码成功" }
    } else if (data.ifPass == true && data.ifNName == false) {
        await mongoNewUser.updateOne({ _id: data.userId }, { userNickName: data.userNickName })
        return { code: 1, value: "修改昵称成功" }
    } else if (data.ifPass == false && data.ifNName == true) {
        await mongoNewUser.updateOne({ _id: data.userId }, { userPass: data.userPass })
        return { code: 1, value: "修改密码成功" }
    } else {
        return { code: 1, value: "昵称密码都没改,所以你改了头像? ? ?" }
    }
}

//更改进阶用户信息
const changeSecBg = async (data) => {
    let former = await mongoSecUser.findOne({ catoUser: data.id });
    // console.log(former);
    // let bol = await mongoNewUser.updateOne({ _id: id }, { userLogo: imgPath })
    if (former.userBgImg != "/userImg/selfInfoBg.webp") {
        fs.unlinkSync(path.resolve(__dirname, '../../public' + former.userBgImg))
    }
    // console.log(data);
    await mongoSecUser.updateOne({ catoUser: data.id }, { userBgImg: data.img })
    let latter = await mongoSecUser.find({ catoUser: data.id })
    return { secuser: latter }
}

//更新进阶资料
const changeSecondInfoTwo = async (data) => {
    // console.log(data);
    await mongoSecUser.updateOne({ catoUser: data.id }, {
        userLabel: data.myLabel, userDescr: data.selfDesc,
        userWantsGoods: data.wannaLabel, userPhoneNum: data.phoneNum
    })
    let bol = await mongoSecUser.findOne({ catoUser: data.id })
    return { code: 1, value: '更改个人信息成功', user: bol }
}

//获取用户进阶信息
const getSecondMess = async (data) => {
    // console.log(data);
    let bol = await mongoSecUser.findOne({ catoUser: data.id })
    return bol;
}

//获取收藏
const goodsCollection = async (data) => {
    await mongoSecUser.updateOne({ catoUser: data.userid }, { $push: { collectGoods: data.goodsid } })
    return { code: 1, value: '收藏成功' }
}

//获取seller
const getSellerInfo = async (data) => {
    // console.log(data.id);
    let bol1 = await mongoNewUser.findOne({ _id: data.id })
    let nol = {
        userLogo: bol1.userLogo,
        userNickName: bol1.userNickName,
        _id: bol1._id,
    }
    let bol2 = await mongoSecUser.findOne({ catoUser: data.id })
    let bol3 = {
        userBgImg: bol2.userBgImg,
        userDescr: bol2.userDescr,
        userLabel: bol2.userLabel,
        userWantsGoods: bol2.userWantsGoods.length == 0 ? ["[空]"] : bol2.userWantsGoods,
        userPhoneNum: bol2.userPhoneNum ? bol2.userPhoneNum : "[空]"
    }
    return { userData: nol, userSec: bol3 }
}

//获取all消息
const getallmess = async (data) => {
    // console.log(data);
    let bol = await mongoMessage.findOne({ senderId: data.sender, getterId: data.getter })
    await mongoMessage.updateOne({ senderId: data.getter, getterId: data.sender }, { noReadMes: 0 })
    let bol2 = await mongoMessage.findOne({ senderId: data.getter, getterId: data.sender })
    let getter22 = await mongoNewUser.findOne({ _id: data.getter })
    let getter = {
        userLogo: getter22.userLogo,
        userNickName: getter22.userNickName,
    }
    return { bol: bol, bol2: bol2, getter: getter }
}

//获取会话列表
const getMyMes = async (data) => {
    // console.log(data.id);
    let bol1 = await mongoMessage.find({ getterId: data.id })
    let bol2 = await mongoMessage.find({ senderId: data.id })
    // console.log(bol1);
    // console.log(bol2);
    let final = []
    if (bol1.length == 0 && bol2.length != 0) {
        for (let i = 0; i < bol2.length; i++) {
            let element = bol2[i];
            let user = await mongoNewUser.findOne({ _id: element.getterId })
            final.push({
                oppoId: user._id,
                userNickName: user.userNickName,
                userLogo: user.userLogo,
                times: 0
            })
        }
        return final
    }
    if (bol2.length == 0 && bol1.length != 0) {
        for (let i = 0; i < bol1.length; i++) {
            let element = bol1[i];
            let user = await mongoNewUser.findOne({ _id: element.senderId })
            final.push({
                oppoId: user._id,
                userNickName: user.userNickName,
                userLogo: user.userLogo,
                times: user.noReadMes
            })
        }
        return final
    }
    // let test = []
    // test[0] = bol1[0]
    let firstLen = bol1.length
    for (let i = 0; i < firstLen; i++) {
        let item = bol1[i];
        let user = await mongoNewUser.findOne({ _id: item.senderId })
        final.push({
            oppoId: user._id,
            userNickName: user.userNickName,
            userLogo: user.userLogo,
            times: item.noReadMes
        })
    }
    // console.log(final);
    for (let m = 0; m < bol2.length; m++) {
        let ele = bol2[m];
        let bl = true
        for (let n = 0; n < firstLen; n++) {
            let item = bol1[n];
            if (item.senderId.toString() == ele.getterId.toString() && item.getterId.toString() == ele.senderId.toString()) {
                bl = false
            }
            // if()
        }
        if (bl) {
            bol1.push(ele)
        }
    }

    let lastLen = bol1.length
    for (let k = firstLen ; k < lastLen; k++) {
        let item = bol1[k];
        let user = await mongoNewUser.findOne({ _id: item.getterId })
        final.push({
            oppoId: user._id,
            userNickName: user.userNickName,
            userLogo: user.userLogo,
            times: 0
        })
    }


    // for (let i = 0; i < bol1.length; i++) {
    //     let ele = bol1[i];
    //     for (let j = 0; j < bol2.length; j++) {
    //         let item = bol2[j];
    //         if (item.senderId.toString() == ele.getterId.toString() && item.getterId.toString() == ele.senderId.toString()) {
    //             let user = await mongoNewUser.findOne({ _id: item.getterId })
    //             final.push({
    //                 oppoId: user._id,
    //                 userNickName: user.userNickName,
    //                 userLogo: user.userLogo,
    //                 times:ele.noReadMes
    //             })
    //         } else {
    //             let user3 = await mongoNewUser.findOne({ _id: ele.senderId })

    //             if (user3) {
    //                 final.push({
    //                     oppoId: user3._id,
    //                     userNickName: user3.userNickName,
    //                     userLogo: user3.userLogo,
    //                     times:ele.noReadMes
    //             })
    //             }
    //         }
    //     }
    // }
    // console.log(final);
    return final
}

module.exports = {
    handlerInfoLogo,
    loadUserMessage,
    changeselfInf,
    changeSecondInfoTwo,
    changeSecBg,
    getSecondMess,
    goodsCollection,
    getSellerInfo,
    getallmess,
    getMyMes,
}