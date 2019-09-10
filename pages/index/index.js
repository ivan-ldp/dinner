Page({
  /**
   * 页面的初始数据
   */
  data: {
    imgUrls: [
      {
        link: '/pages/index/index',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567765156754&di=5592b8eedce5bf82b9c8802814734b9d&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201307%2F30%2F20130730104030_dHEML.jpeg'
      }, {
        link: '/pages/index/index',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567765156753&di=ad890c8d0043c2c05d4518973da517b7&imgtype=0&src=http%3A%2F%2Fb-ssl.duitang.com%2Fuploads%2Fblog%2F201510%2F20%2F20151020195245_yU82G.jpeg'
      }, {
        link: '/pages/index/index',
        url: 'https://timgsa.baidu.com/timg?image&quality=80&size=b9999_10000&sec=1567765156753&di=7eaed84e521480d661328a6bc362af9c&imgtype=0&src=http%3A%2F%2Fimg.pconline.com.cn%2Fimages%2Fupload%2Fupc%2Ftx%2Fphotoblog%2F1406%2F20%2Fc2%2F35489246_1403250875219_mthumb.jpg'
      }
    ],
    indicatorDots: true,  //小点
    autoplay: true,  //是否自动轮播
    interval: 3000,  //间隔时间
    duration: 3000,  //滑动时间
    Hei: "" ,
    height:0,
     result: "",//扫一扫
  }, calling: function () {

    wx.makePhoneCall({

      phoneNumber: '18538749150',

      success: function () {

        console.log("拨打电话成功！")

      },

      fail: function () {

        console.log("拨打电话失败！")

      }

    })

  },
  //扫一扫
  scancode: function () {
    let that = this;
    let result;
    wx.scanCode({
      success: (res) => {
        this.result = res.result;
        that.setData({
          result: this.result
        })
      }
    })
  }, getLocation: function () {
    wx.getLocation({
      type: 'wgs84',
      success: function (res) {
        wx.openLocation({//​使用微信内置地图查看位置。
          latitude:  34.640422, //要去的纬度-地址
          longitude: 112.371703,//要去的经度-地址
          name: "风味小店",
          address: '洛阳市北航科技园'
        })
      }
    })
  },
  imgH: function (e) {
    var winWid = wx.getSystemInfoSync().windowWidth;         //获取当前屏幕的宽度
    var imgh = e.detail.height;　　　　　　　　　　　　　　　　//图片高度
    var imgw = e.detail.width;
    var swiperH = winWid * imgh / imgw;　　　　　　　
    this.setData({
      Hei: swiperH　　　　　　　　//设置高度
    })
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
    
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
    
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
    
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
    
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
    
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
    
  },
  
  jump: function (e) {
    console.log(12121331);
    wx.navigateTo({
      url: '/pages/index/memu/memu'
    })
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
    
  }
})

// jump:function(){
//   wx.navigateTo({
//     url: 'pages/index/memu1/memu',
//     success:function(res){

//     },
//     fail:function(res){

//     },
//     complete:function(res){

//     },
//   })
// }





























//index.js
//获取应用实例
//const app = getApp()
// Page({
//   data: {
//     motto: 'Hello World',
//     userInfo: {},
//     hasUserInfo: false,
//     canIUse: wx.canIUse('button.open-type.getUserInfo')
//   },
//   //事件处理函数
//   bindViewTap: function() {
//     wx.navigateTo({
//       url: '../logs/logs'
//     })
//   },
//   onLoad: function () {
//     if (app.globalData.userInfo) {
//       this.setData({
//         userInfo: app.globalData.userInfo,
//         hasUserInfo: true
//       })
//     } else if (this.data.canIUse){
//       // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
//       // 所以此处加入 callback 以防止这种情况
//       app.userInfoReadyCallback = res => {
//         this.setData({
//           userInfo: res.userInfo,
//           hasUserInfo: true
//         })
//       }
//     } else {
//       // 在没有 open-type=getUserInfo 版本的兼容处理
//       wx.getUserInfo({
//         success: res => {
//           app.globalData.userInfo = res.userInfo
//           this.setData({
//             userInfo: res.userInfo,
//             hasUserInfo: true
//           })
//         }
//       })
//     }
//   },
//   getUserInfo: function(e) {
//     console.log(e)
//     app.globalData.userInfo = e.detail.userInfo
//     this.setData({
//       userInfo: e.detail.userInfo,
//       hasUserInfo: true
//     })
//   }
// })
