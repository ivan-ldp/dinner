// pages/order/order.js
Page({
 
  /**
   * 页面的初始数据
   */
  data: {
    currtab: 0,
    swipertab: [{ name: '全 部', index: 0 }, { name: '待付款', index: 1 }, { name: '已付款', index: 2 },{ name:"配送中",index:3},{name:"已完成",index:4}],
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
    // 页面渲染完成
    this.getDeviceInfo()
    this.orderShow()
  },
 
  getDeviceInfo: function () {
    let that = this
    wx.getSystemInfo({
      success: function (res) {
        that.setData({
          deviceW: res.windowWidth,
          deviceH: res.windowHeight
        })
      }
    })
  },
 
  /**
  * @Explain：选项卡点击切换
  */
  tabSwitch: function (e) {
    var that = this
    if (this.data.currtab === e.target.dataset.current) {
      return false
    } else {
      that.setData({
        currtab: e.target.dataset.current
      })
    }
  },
 
  tabChange: function (e) {
    this.setData({ currtab: e.detail.current })
    this.orderShow()
  },
 
  orderShow: function () {
    let that = this
    switch (this.data.currtab) {
      case 0:
        that.alreadyShow()
        break
      case 1:
        that.waitPayShow()
        break
      case 2:
        that.lostShow()
        break
      case 3:
        that.pszShow()
         break  
      case 4:
        that.ywcShow()
         break
    }
  },
  alreadyShow: function(){
    this.setData({
      alreadyOrder: [{ name: "635219506", state: "待付款", time: "2018-09-30 14:00-16:00", status: "已结束", url: "", money: "132" }, { name: "532521652", state: "配送中", time: "2018-10-12 18:00-20:00", status: "未开始", url: "", money: "205" }]
    })
  },
 
  waitPayShow:function(){
    this.setData({
      waitPayOrder: [{ name: "100454577", state: "待付款", time: "2018-10-14 14:00-16:00", status: "未开始", url: "", money: "186" }],
    })
  },
 
  lostShow: function () {
    this.setData({
      lostOrder: [{ name: "931717287", state: "已付款", time: "2018-10-4 10:00-12:00", status: "未开始", url: "", money: "122" }],
    })
  },
 pszShow: function(){
    this.setData({
      pszOrder: [{ name: "5526265136", state: "配送中", time: "2018-09-30 14:00-16:00", status: "已结束", url: "", money: "132" }]
    })
  },
 ywcShow: function(){
    this.setData({
      ywcOrder: [{ name: "555555554", state: "已完成", time: "2018-09-30 14:00-16:00", status: "已结束", url: "", money: "132" }]
    })
  },
  
})
