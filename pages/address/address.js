//index.js
//获取应用实例
var app = getApp()
Page({
  data: {
    addressList:[]
  },

  selectTap: function (e) {
    var id = e.currentTarget.dataset.id;
    wx.request({
      url: app.globalData.domain +'/api/userAddress/setDft',
      data: {
        token: app.globalData.token,
        id: id
      },
      success: (res) =>{
        wx.navigateBack({})
      }
    })
  },

  addAddess : function () {
    wx.navigateTo({
      url:"/pages/addAddress/addAddress"
    })
  },
  
  // editAddess: function (e) {
  //   wx.navigateTo({
  //     url: "/pages/addAddress/addAddress?id=" + e.currentTarget.dataset.id
  //   })
  // },
  
  // onLoad: function () {
  //   console.log('onLoad')

   
  // },
  // onShow : function () {
  //   this.initShippingAddress();
  // },
  // initShippingAddress: function () {
  //   var that = this;
  //   wx.request({
  //     // url: app.globalData.domain +'/api/userAddress/list',
  //     data: {
  //       token: app.globalData.token, storeId: app.globalData.storeId
  //     },
  //     success: (res) =>{
  //       if (res.data.code == 0) {
  //         that.setData({
  //           addressList: res.data.userAddressList
  //         });
  //       }
  //     }
  //   })
  // }

})
