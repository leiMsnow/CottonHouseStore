const app = getApp();
const util = require('../../utils/util.js');
const decryptData = require('../../utils/decryptData.js');
const userInfoBiz = require('../../biz/userInfoBiz.js');

let that;

Page({
  data: {
    motto: "进店逛逛",
    userInfo: {},
    hasLogin: false,
    welcome: util.welcome(),
  },
  //事件处理函数
  bindViewTap: function () {
    app.routerTab();
  },
  onLoad: function () {
    that = this;
    wx.getStorage({
      key: 'userInfo',
      success: function(res) {
          console.log(res.data)
          app.routerTab();
      },
      fail: function(){
        that.login();
      }
    })
  },
  login: function () {
    wx.login({
      success: (res) => {
        if (res.code) {
          userInfoBiz.requestOpenId(res.code,
            function success(userData) {
              wx.getUserInfo({
                success: (result) => {
                  let newUser = decryptData.decryptData(userData.session_key, result.encryptedData, result.iv);
                  that.saveUserInfo(newUser, userData.session_key);
                }
              });
            });
        } else {
          console.log('获取用户登录态失败！' + res.errMsg);
        }
      },
      error: function (error) {
        console.log("登录error: " + error.code + " " + error.message);
      }
    });
  },
  saveUserInfo: function (userInfo, session_key) {
    app.globalData.userInfo = userInfo;
    app.globalData.session_key = session_key;
    that.setData({
      userInfo: userInfo,
      hasLogin: true
    });
    wx.setStorage({
      key: "userInfo",
      data: userInfo
    })
    // that.uploadUserInfo(userInfo);
  },
  uploadUserInfo: function (userInfo) {
    userInfoBiz.findUserByOpenId(userInfo.openId, function success(results) {
      userInfoBiz.setUserInfo(userInfo, results);
    });
  }
});
