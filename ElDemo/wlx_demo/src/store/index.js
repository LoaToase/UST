import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    userForm:{
      userLogo:"/userImg/userLogo.webp",
      userName:" ",
      userNickName:"未登录",
      // userPass
      _id:" ",
      createDate:" ",
      
    },
    unReadmes:{
      unreadTime:0,
      unreadArr:[]
    },
    //进阶资料
    userSecond:{
      userBgImg:"/userImg/selfInfoBg.webp",
      userWantsGoods:[],
      userDescr:'这个人很懒,什么都没有留下~',
      userLabel:[],
      userPhoneNum:'',
      collectGoods:[]
    },
    emoji:[
      '😀',
      '😃',
      '😄',
      '😁',
      '😆',
      '😅',
      '🤣',
      '😂',
      '🙂',
      '🙃',
      '😉',
      '😊',
      '😇',
      '😍',
      '😋',
      '😝',
      '🤑',
      '🤭',
      '😑',
      '🤐',
      '😒',
      '😐',
      '😪',
    ],
    movement:[
      '🎁',
      '🏸',
      '🥊',
      '🪁',
      '🎱',
      '♟️',
      '🏟️',
      '🌍',
      '⛰️',
      '🚲',
      '🛴',
      '🚏',
      '🛹',
      '🏎️',
      '🧳',
      '🛩️',
    ],
    animals:[
      '🐵',
      '🐐',
      '🦒',
      '🦓',
      '🐫',
      '🦏',
      '🐰',
      '🐹',
      '🦃',
      '🐔',
      '🕊️',
      '🦩',
    ],
    food:[
      '🥑',
      '🌽',
      '🥜',
      '🥒',
      '🍞',
      '🥐',
      '🧇',
      '🍖',
      '🍟',
      '🍕',
    ],
    traffic:[
      '🧭',
      '🚂',
      '🚃',
      '🛬',
      '⛴️',
      '🛥️',
      '🚢',
      '🚤',
      '🛳️',
      '🛺',
      '🛵',
    ],

    goodsUserLogo:"/userImg/userLogo.webp",
    ifIntoGoodsPage:false,
  },
  getters: {
  },
  mutations: {
    changeUnRead(state,value){
      state.unReadmes.unreadArr = value
      // console.log(value);
      let total = 0
      value.forEach((item)=>{
        total += item
      })
      state.unReadmes.unreadTime = total
    },
    ChangeInfoSecond(state,value){
      // console.log(value);
      state.userSecond.userWantsGoods = value.userWantsGoods
      state.userSecond.userDescr = value.userDescr
      state.userSecond.userLabel = value.userLabel
      state.userSecond.userPhoneNum = value.userPhoneNum
      state.userSecond.collectGoods = value.collectGoods
    },
    ChangeInfoSecImg(state,value){
      state.userSecond.userBgImg = value
    },
    RemoveCol(state,value){
      state.userSecond.collectGoods.forEach((item,index)=>{
        if(item == value){
          state.userSecond.collectGoods.splice(index,1)
        }
      })
    },
    ChangeUserForm(state,value){
      // console.log(value);
      state.userForm.userLogo = value.userLogo;
      state.userForm.userName = value.userName;
      state.userForm._id = value._id;
      state.userForm.userNickName = value.userNickName;
      state.userForm.createDate = value.userCreateTime;
    },
    ChangeSelfLogo(state,value){
      state.userForm.userLogo = value
    },
    ChangeNName(state,value){
      state.userForm.userNickName = value
    },
    QuitLogin(state,value){
      state.userForm.userLogo = "/userImg/userLogo.webp";
      state.userForm.userName = " ";
      state.userForm._id = " ";
      state.userForm.userNickName = "未登录";
      state.userForm.createDate = " ";
    },
    ChangeGoodsUserLogo(state,value){
      state.goodsUserLogo = value
    },
    ChangeifIntoGoodsPage(state,value){
      state.ifIntoGoodsPage = value
    }
  },
  actions: {
  },
  modules: {
  }
})
