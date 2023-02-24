const mongoose =require('mongoose');

const mongoAuction = new mongoose.Schema(
    {
        catoUser:{                                   //关联owner
            type:mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        goodsName:{                                  //商品名称 
            type:String,
        },
        goodsFirstPrize:{                            //起拍价格
            type:Number
        },
        goodsImg:{                                   //商品图片
            type:Array
        },
        startTime:{                                  //竞拍时间
            type:Date,
        },
        goodsDesc:{
            type:String
        }
        // carGoods:[{
        //     type:mongoose.SchemaTypes.ObjectId,
        //     ref:'goodsData'
        // }],
    },
    {
        versionKey: false
    }
)


module.exports = mongoose.model(
    "mongoAuction",
    mongoAuction
)