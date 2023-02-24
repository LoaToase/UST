# wlx_demo

## Project setup
```
npm install
```

### Compiles and hot-reloads for development
```
npm run serve
```

### Compiles and minifies for production
```
npm run build
```

### Customize configuration
See [Configuration Reference](https://cli.vuejs.org/config/).


## 学校二手交易平台
        1.根据学生位置绑定学校，形成区域二手交易
           相较于一般的交易平台，免去了邮费等，可协商线下拿货,或者找骑手
        2.不只可以拿钱购物，也可以拿货购物
           将原始的物物交换呈现，将根据喜欢和闲置进行等价的物物交换，可协商补差价
        3.有校内拍卖模块
           若你有珍藏的闲置物品，可以挂售拍卖
        4.更多模块有待开发

## 用到的依赖
        electron 前端桌面客户端
        element-ui 饿了么的开源组件库
        vue2语法
        less  css写法
        animate动画库
        后端nodejs
        后端数据库mongoose
        后端验证码的 svg 
        后端文件上传 multer
        后端信息缓存 session
        webSocket 拉取用户在线，会话，拍卖大会

### 侧边栏分类
1.首页

2.拍卖

3.最新发布

4.买家秀

5.百货

6.盲盒

7.收藏

### 数据库

用户基础表 ==

​        用户名称，用户昵称。用户密码，用户创建时间，用户头像

用户信息进阶表 ==

​        所属哪个用户(表关联),用户标签arr，用户简介，用户联系方式，用户首页背景，

        想要的物品arr，收藏的物品(arr 表关联该物品id)

商品表 ==

​        商品名称，商品价格，实物照片arr，商品标签arr，商品所属(通过id表关联，

​        关联至用户基础表的owner)，商品热度(点击量)

购物车表 ==
        
        所属的个人(表关联),购物车物品(arr 的 表关联)

拍卖商品表 ==

​        商品名称，起拍价格，实物照片arr，商品所属(通过id表关联，关联至用户基础表的owner)

<!-- 盲盒表

​        盲盒名称，商品所属(关联)，盲盒价格，盲盒商品有啥(arr 包括的商品的名称)，盲盒图片，标签arr，热度 -->

信息表 ==

​        发送者(关联)，接收者(关联)，内容(arr{value,ifcheck})