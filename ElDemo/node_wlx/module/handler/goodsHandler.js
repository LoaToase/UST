const mongoGoods = require("../mongoose/mongoGoods")
const mongoNewUser = require("../mongoose/mongoNewUser")
const mongoShopCar = require('../mongoose/mongoShopCar')
const mongoSecUser = require('../mongoose/mongoSecUser')
const mongoAuction = require("../mongoose/mongoAuction")
const path = require("path")
const fs = require("fs")

const goodsImgs = async (ID, imgPath) => {

    let bol = await mongoGoods.updateOne({ _id: ID }, { $push: { goodsImg: imgPath } })
    // console.log(bol);
}

//上传商品信息
const goodsInfo = async (data) => {
    // console.log(data);
    let user = await mongoNewUser.findOne({ _id: data.id })
    // console.log(user);
    let bol = await mongoGoods.create({
        goodsName: data.goodsName,
        goodsDescription: data.goodsDesc,
        goodsPrize: data.goodsPrize,
        goodsLabel: data.goodsLabel,
        categoryOwner: user
    })
    // console.log(bol);
    return bol._id;
}

//获取商品详细信息
const getGoodsInfo = async (data) => {
    // console.log(data);
    if (data.id == '') {
        let bol = await mongoGoods.find({ ifRecommand: true }).limit(10)
        return bol
    } else {
        let bol = await mongoGoods.find({ categoryOwner: { $ne: data.id }, ifRecommand: true }).limit(10)
        return bol
    }
    // let bol = await mongoGoods.find({categoryOwner:{$ne:data.id}}).limit(10)
    // return bol;
}

//获取user
const getUserData = async (data) => {
    // console.log(data.id);
    let bol = await mongoGoods.findOne({ categoryOwner: data.id }).populate("categoryOwner")
    let bol02 = await mongoGoods.find({ categoryOwner: data.myid })
    // console.log(bol.categoryOwner);
    return {
        _id: bol.categoryOwner._id,
        userName: bol.categoryOwner.userName,
        userNickName: bol.categoryOwner.userNickName,
        userLogo: bol.categoryOwner.userLogo,
        mygoods: bol02
    }
}

//处理商品点击的热度
const addGoodsHotOnce = async (data) => {
    // console.log(data);
    let time = await mongoGoods.findById(data.id)
    // console.log(time.clickHotTimes);
    await mongoGoods.updateOne({ _id: data.id }, { clickHotTimes: ++time.clickHotTimes })
}

//将商品加入购物车
const addIntoShopCar = async (data) => {
    // console.log(data);
    let bol = await mongoShopCar.findOne({ catoUser: data.userid })
    let bl = false
    if (bol) {
        bol.carGoods.forEach((item, index) => {
            if (item == data.goodsid) {
                bl = true
            }
        })
    }
    if (!bol) {
        await mongoShopCar.create({ catoUser: data.userid, carGoods: data.goodsid })
        return { code: 1, value: "成功加入购物车" }
    } else if (bl) {
        return { code: 0, value: "请勿重复加入购物车" }
    } else {
        await mongoShopCar.updateOne({ catoUser: data.userid }, { $push: { carGoods: data.goodsid } })
        return { code: 1, value: "成功加入购物车" }
    }
    // console.log(data);
}

//获取购物车商品信息
const getShopCarInfo = async (data) => {
    // console.log(data);
    let bol = await mongoShopCar.findOne({ catoUser: data.id }).populate('carGoods')
    if (bol) {
        return bol.carGoods;
    }
}

//购物车的商品买了
const buyTheGoods = async (data) => {
    // console.log(data);
    // console.log(bol.carGoods);
    let bol = await mongoShopCar.findOne({ catoUser: data.catoUser })

    for (let i = 0; i < data.cargoods.length; i++) {
        let element = data.cargoods[i];
        if (bol?.carGoods && bol.carGoods.length != 0 && bol) {
            for (let j = 0; j < bol.carGoods.length; j++) {
                let index = bol.carGoods[j];
                if (index == element) {
                    await mongoShopCar.updateOne({ catoUser: data.catoUser }, { $pull: { carGoods: element } })
                }
            }
        }
        let goods = await mongoGoods.findOne({ _id: element })
        goods.goodsImg.forEach(item => {
            let img = item
            fs.unlinkSync(path.resolve(__dirname, '../../public' + img))
        })
        await mongoSecUser.updateOne({ catoUser: data.catoUser }, { $pull: { collectGoods: element } })
        await mongoGoods.deleteOne({ _id: element })
        let ownShop = await mongoShopCar.find({catoUser:element})
        if(ownShop.length != 0){
            ownShop.forEach(async(item)=>{
                await mongoShopCar.updateOne({_id:item._id},{$pull:{carGoods:element}})
            })
        }
    }
    
    // console.log(ww.carGoods);
    return { code: 1, value: "已购买,后续跳转支付宝页面" }

}

//
const getGoodsInfoNew = async (data) => {
    // console.log(data);
    let date = new Date();
    date.setDate(date.getDate() - 2)
    // let last = new Date(date - 1000*60*60*24*2)
    if (data.id == '') {

        let bol = await mongoGoods.find({ goodsCreateTime: { $gte: date } }).limit(10)
        return bol
    } else {
        let bol = await mongoGoods.find({ categoryOwner: { $ne: data.id }, goodsCreateTime: { $gte: date } }).limit(10)
        return bol
    }
    // let bol = await mongoGoods.find({categoryOwner:{$ne:data.id}}).limit(10)
    // return bol;
}

//获取我的商品
const getMyGoodsData = async (data) => {
    let bol = await mongoGoods.find({ categoryOwner: data.id })
    // console.log(bol);
    return bol
}

//admin获取全部商品
const getAllgoodsAdmin = async () => {
    let bol = await mongoGoods.find()
    // console.log(bol);
    return bol
}

//下架我的商品
const removeMygoods = async (data) => {
    let bol = await mongoGoods.findOne({ _id: data.id })
    // console.log(bol);
    bol.goodsImg.forEach(item => {
        // console.log(item);
        fs.unlinkSync(path.resolve(__dirname, '../../public' + item))
    })
    await mongoGoods.deleteOne({ _id: data.id })
    return { code: 1, value: "下架商品成功" }
}

//获取我收藏的商品
const getColMyGoodsData = async (data) => {
    // let bol2 = await mongoGoods.find({categoryOwner:data.id})
    let bol = await mongoSecUser.findOne({ catoUser: data.id }).populate("collectGoods")
    // console.log(bol.collectGoods);
    let final = bol.collectGoods
    return final
}

//取消收藏我的商品
const removeColMygoods = async (data) => {
    await mongoSecUser.updateOne({ catoUser: data.catoUser }, { $pull: { collectGoods: data.goodsid } })
    return { code: 1, value: "取消收藏商品成功" }
}

//获取百货页面商品
const getAllGoods = async (data) => {
    // console.log(data);
    let bol;
    switch (data.mode) {
        case "a":
            // let bol = await mongoGoods.find({ categoryOwner: { $ne: data.id }, goodsCreateTime: { $gte: date } }).limit(10)
            if (data.id == '') {
                bol = await mongoGoods.find().sort({ clickHotTimes: -1 }).limit(10)
            } else {
                bol = await mongoGoods.find({ categoryOwner: { $ne: data.id } }).sort({ clickHotTimes: -1 }).limit(10)
            }
            // console.log(bol.length);
            break;
        case "b":
            if (data.id == '') {
                bol = await mongoGoods.find().sort({ clickHotTimes: 1 }).limit(10)
            } else {
                bol = await mongoGoods.find({ categoryOwner: { $ne: data.id } }).sort({ clickHotTimes: 1 }).limit(10)
            }

            break;
        case "c":
            if (data.id == '') {
                bol = await mongoGoods.find().sort({ goodsPrize: -1 }).limit(10)
            } else {
                bol = await mongoGoods.find({ categoryOwner: { $ne: data.id } }).sort({ goodsPrize: -1 }).limit(10)
            }

            break;
        case "d":
            if (data.id == '') {
                bol = await mongoGoods.find().sort({ goodsPrize: 1 }).limit(10)
            } else {
                bol = await mongoGoods.find({ categoryOwner: { $ne: data.id } }).sort({ goodsPrize: 1 }).limit(10)

            }
            break;
    }
    return bol
}

//auctionInfo
const auctionInfo = async (data) => {
    // console.log(data);
    let bol1 = await mongoAuction.findOne()
    if (!bol1) {
        let bol = await mongoAuction.create({
            catoUser: data.id, goodsDesc: data.goodsDesc,
            goodsName: data.goodsName, startTime: data.startTime, goodsFirstPrize: data.goodsPrize
        })
        return {
            code: 1,
            value: "提交信息成功",
            goods: bol
        }
    } else {
        let dd = new Date(data.startTime)

        year = dd.getFullYear();
        month = dd.getMonth() + 1;
        day = dd.getDate();
        hours = dd.getHours();
        min = dd.getMinutes();
        sec = dd.getSeconds();
        // console.log(year,month,day,hours,min,sec);
        let laster = new Date(year, month, day + 1, hours, min, sec)
        let bol2 = await mongoAuction.findOne({ startTime: { "$gte": dd, "$lte": laster } })
        if (bol2) {
            return {
                code: 0,
                value: "该时间段内已有商品在竞拍，请重新填写时间"
            }
        } else {
            let bol = await mongoAuction.create({
                catoUser: data.id, goodsDesc: data.goodsDesc,
                goodsName: data.goodsName, startTime: data.startTime, goodsFirstPrize: data.goodsPrize
            })
            return {
                code: 1,
                value: "提交信息成功",
                goods: bol
            }
        }
    }
}

//上传auction图片
const auctionImgs = async (ID, imgPath) => {

    let bol = await mongoAuction.updateOne({ _id: ID }, { $push: { goodsImg: imgPath } })
    // console.log(bol);
}

//getAuctiondata
const getAuctiondata = async () => {
    let bol = await mongoAuction.find()
    // console.log(new Date(bol[0].startTime));
    return { auction: bol }
}

//getKindGoods
const getKindGoods = async (data) => {
    // console.log(data.type);
    let bol = null
    switch (data.type) {
        case "1":              //手机
            bol = await mongoGoods.find({ goodsLabel: "手机", categoryOwner: { $ne: data.id } })
            // console.log("手机");
            break;
        case "2":              //家具
            bol = await mongoGoods.find({ goodsLabel: "家具", categoryOwner: { $ne: data.id } })
            // console.log("家具");
            break;
        case "3":              //电器
            bol = await mongoGoods.find({ goodsLabel: "电器", categoryOwner: { $ne: data.id } })
            // console.log("电器");
            break;
        case "4":              //电脑
            bol = await mongoGoods.find({ goodsLabel: "电脑", categoryOwner: { $ne: data.id } })
            // console.log("电脑");
            break;
        case "5":              //运动
            bol = await mongoGoods.find({ goodsLabel: "运动", categoryOwner: { $ne: data.id } })
            // console.log("运动");
            break;
        case "6":              //男装
            bol = await mongoGoods.find({ goodsLabel: "男装", categoryOwner: { $ne: data.id } })
            // console.log("男装");
            break;
        case "7":              //女装
            bol = await mongoGoods.find({ goodsLabel: "女装", categoryOwner: { $ne: data.id } })
            // console.log("女装");
            break;
        case "8":              //鞋子
            bol = await mongoGoods.find({ goodsLabel: "鞋子", categoryOwner: { $ne: data.id } })
            // console.log("鞋子");
            break;
        case "9":              //食品
            bol = await mongoGoods.find({ goodsLabel: "食品", categoryOwner: { $ne: data.id } })
            // console.log("食品");
            break;
        case "10":             //饰品
            bol = await mongoGoods.find({ goodsLabel: "饰品", categoryOwner: { $ne: data.id } })
            // console.log("饰品");
            break;
    }
    // console.log(bol);
    return bol;
}

//获取搜索数据
const searchBtn = async (data) => {
    // console.log(data);
    let bol = []
    if (data.id == "0") {
        bol = await mongoGoods.find({ goodsLabel: data.value }).limit(3)
    } else {
        bol = await mongoGoods.find({ goodsLabel: data.value, categoryOwner: { $ne: data.id } }).limit(3)
    }

    // console.log(bol);
    return bol
}

module.exports = {
    goodsImgs,
    goodsInfo,
    getGoodsInfo,
    getUserData,
    addGoodsHotOnce,
    addIntoShopCar,
    getShopCarInfo,
    buyTheGoods,
    getGoodsInfoNew,
    getMyGoodsData,
    removeMygoods,
    getColMyGoodsData,
    removeColMygoods,
    getAllGoods,
    auctionInfo,
    auctionImgs,
    getAuctiondata,
    getKindGoods,
    searchBtn,
    getAllgoodsAdmin,
}