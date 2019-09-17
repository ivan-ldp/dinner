//index.js
//获取应用实例
var app = getApp()
var that = this
Page({

  data: {
    motto: 'Hello World',
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },
  wddz: function(e) {
    console.log(12121331);
    wx.navigateTo({
      url: "../address/address"
    })
  },
  dianjia: function(e) {
    console.log(12121331);
    wx.navigateTo({
      url: '../guanyuwomen/guanyuwomen'
    })
  },

  calling: function() {

    wx.makePhoneCall({

      phoneNumber: '18538749150',

      success: function() {

        console.log("拨打电话成功！")

      },

      fail: function() {

        console.log("拨打电话失败！")

      }

    })

  },
  //事件处理函数

  // onLoad: function() {
  //   let that = this;
  //   if (app.globalData.userInfo) {
  //     this.setData({
  //       userInfo: app.globalData.userInfo,
  //       hasUserInfo: true
  //     })
  //   } else if (this.data.canIUse) {
  //     // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
  //     // 所以此处加入 callback 以防止这种情况
  //     app.userInfoReadyCallback = res => {
  //       this.setData({
  //         userInfo: res.userInfo,
  //         hasUserInfo: true
  //       })
  //     }
  //   } else {
  //     // 在没有 open-type=getUserInfo 版本的兼容处理
  //     wx.getUserInfo({
  //       success: res => {
  //         app.globalData.userInfo = res.userInfo
  //         this.setData({
  //           userInfo: res.userInfo,
  //           hasUserInfo: true
  //         })
  //       }
  //     })
  //   }
  // },
  getUserInfo: function(e) {
    // console.log(e)
    // app.globalData.userInfo = e.detail.userInfo
    // this.setData({
    //   userInfo: e.detail.userInfo,
    //   hasUserInfo: true
    // })
    wx.login({
      success: function(res) {

        //获取登录的临时凭证
        var code = res.code;
        console.log(code);
        //调用后端，获取微信的session_key,secret
        wx.getUserInfo({
          success: function(res) {

            var encryptedData = res.encryptedData;
            var iv = res.iv
            wx.request({
              url: 'http://localhost:8080/wxLogin',
              data: {
                code: code,
                encryptedData: encryptedData,
                iv: iv
              },
              method: "GET",
              success: function(result) {
                console.log(result);
                console.log("******************************");
                console.log(result.data.userInfo.nickName);

                app.globalData.userInfo = result.data.userInfo;



              }

            })
            //

          }
        })

      },

    })

  }

})