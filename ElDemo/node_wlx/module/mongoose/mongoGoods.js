const mongoose = require('mongoose');


const goodsData = new mongoose.Schema(
    {
        goodsName: {                                   //商品名称
            type: String, 
            // default:"[没有取名]",
        },
        goodsLabel:{                                   //商品标签
            type:Array, 
        },
        goodsDescription: {                            //商品描述
            type: String,
        },
        goodsPrize: {                                  //商品价格
            type: Number,
            // default: "[没有取名]"
        },
        goodsCreateTime: {                             //商品发布时间
            type: Date,
            default: Date.now() + 1000 * 60 * 60 * 8       //默认北京时间
        },
        goodsImg: {                                    //商品图片
            type: Array,
            // default: "/userImg/userLogo.webp"
        },
        categoryOwner:{                                //商品关联的所有者
            type: mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        clickHotTimes:{
            type:Number,
            default:0
        },
        ifRecommand:{
            type:Boolean,
            default:false
        }
    },
    {
        versionKey: false
    }
)

module.exports = mongoose.model(
    "goodsData",
    goodsData
)