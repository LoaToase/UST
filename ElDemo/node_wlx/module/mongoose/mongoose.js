const mongoose = require('mongoose')


mongoose.connect("mongodb://localhost:27017/wlxST")
.then(
    ()=>{
        console.log("mongoose连接成功...");
    }
).catch(
    ()=>{
        console.log("mongoose链接失败...");
    }
)
// mongoose.connect("mongodb://localhost:27017/try02")
// .then(
//     ()=>{
//         console.log("mongoose02链接成功");
//     }
// ).catch(
//     ()=>{
//         console.log("mongoose02链接失败");
//     }
// )