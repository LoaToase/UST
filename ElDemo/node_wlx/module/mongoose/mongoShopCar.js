const mongoose =require('mongoose');

const mongoShopCar = new mongoose.Schema(
    {
        catoUser:{                                   //关联owner
            type:mongoose.SchemaTypes.ObjectId,
            ref:'newUser'
        },
        carGoods:[{
            type:mongoose.SchemaTypes.ObjectId,
            ref:'goodsData'
        }],
    },
    {
        versionKey: false
    }
)


module.exports = mongoose.model(
    "mongoShopCar",
    mongoShopCar
)