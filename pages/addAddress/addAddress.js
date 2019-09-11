let keys = 'SGXBZ-6X3K6-NYLSF-MALZD-QC6PK-BABOS';
let _page, _this;
//获取应用实例
var app = getApp()
Page({
  data: {
    provinces: [],
    citys: [],
    districts: [],
    selProvince: '请选择',
    selCity: '请选择',
    selDistrict: '请选择',
    selProvinceIndex: 0,
    selCityIndex: 0,
    selDistrictIndex: 0,
    selProvinceId: 0,
    selCityId: 0,
    selDistrictId: 0,
    addressData: {},
    id: '',
    customItem: '全部'
  }, /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    _this = this;
    wx.getLocation({
      success: function (res) {
        _this.getDistrict(res.latitude, res.longitude)
      },
    })
  },


  getDistrict(latitude, longitude) {
    _page = this;
    wx.request({
      url: `https://apis.map.qq.com/ws/geocoder/v1/?location=${latitude},${longitude}&key=${keys}`,
      header: {
        'Content-Type': 'application/json'
      },
      success: function (res) {
        console.log(res.data.result.address_component.district, res.data.result)

        // 省
        let province = res.data.result.address_component.province;
        // 市
        let city = res.data.result.address_component.city;
        // 区
        let district = res.data.result.address_component.district;

        _page.setData({
          district: res.data.result.address_component.district,
          region: [province, city, district]
        })
      }
    })
  },

  bindRegionChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    this.setData({
      region: e.detail.value
    })
  },
  bindCancel: function () {
    wx.navigateBack({})
  },
  changeContacts: function (e) {
    var addressData = this.data.addressData;
    addressData.contacts = e.detail.value;
    this.setData({ addressData: addressData });
  },
  changeMobile: function (e) {
    var addressData = this.data.addressData;
    addressData.mobile = e.detail.value;
    this.setData({ addressData: addressData });
  },
  changeDoorNumber: function (e) {
    var addressData = this.data.addressData;
    addressData.doorNumber = e.detail.value;
    this.setData({ addressData: addressData });
  },
  bindSave: function (e) {
    var that = this;
    var linkMan = e.detail.value.linkMan;
    var addressName = e.detail.value.addressName;
    var mobile = e.detail.value.mobile;
    var code = e.detail.value.code;
    var doorNumber = e.detail.value.doorNumber;

    if (linkMan == "") {
      wx.showModal({
        title: '提示',
        content: '请填写联系人姓名',
        showCancel: false
      })
      return
    }
    if (mobile == "", !(/^1[34578]\d{9}$/.test(mobile))) {
      wx.showModal({
        title: '提示',
        content: '请填写正确手机号码',
        showCancel: false
      })
      return
    }

    if (addressName == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    } if (doorNumber == "") {
      wx.showModal({
        title: '提示',
        content: '请填写详细地址',
        showCancel: false
      })
      return
    }
    var apiAddoRuPDATE = "add";
    var apiAddid = that.data.id;
    if (apiAddid) {
      apiAddoRuPDATE = "update";
    } else {
      apiAddid = 0;
    }

    var addressData = that.data.addressData;
    wx.request({
      url: app.globalData.domain + '/api/userAddress/' + apiAddoRuPDATE,
      data: {
        token: app.globalData.token,
        id: apiAddid,
        contacts: linkMan,
        address: addressData.provinceName + addressData.cityName + addressData.address + addressName,
        mobile: mobile,
        isDefault: true,
        storeId: app.globalData.storeId,
        latitude: addressData.latitude,
        longitude: addressData.longitude,
        doorNumber: doorNumber
      },
      success: function (res) {
        if (res.data.code != 0) {
          // 登录错误 
          wx.hideLoading();
          wx.showModal({
            title: '失败',
            content: res.data.msg,
            showCancel: false
          })
          return;
        }
        // 跳转到结算页面
        wx.navigateBack({})
      }
    })
  },
  // initCityData: function (level, obj) {
  //   if (level == 1) {
  //     var pinkArray = [];
  //     for (var i = 0; i < commonCityData.cityData.length; i++) {
  //       pinkArray.push(commonCityData.cityData[i].name);
  //     }
  //     this.setData({
  //       provinces: pinkArray
  //     });
  //   } else if (level == 2) {
  //     var pinkArray = [];
  //     var dataArray = obj.cityList
  //     for (var i = 0; i < dataArray.length; i++) {
  //       pinkArray.push(dataArray[i].name);
  //     }
  //     this.setData({
  //       citys: pinkArray
  //     });
  //   } else if (level == 3) {
  //     var pinkArray = [];
  //     var dataArray = obj.districtList
  //     for (var i = 0; i < dataArray.length; i++) {
  //       pinkArray.push(dataArray[i].name);
  //     }
  //     this.setData({
  //       districts: pinkArray
  //     });
  //   }

  // },
  // bindPickerProvinceChange: function (event) {
  //   var selIterm = commonCityData.cityData[event.detail.value];
  //   this.setData({
  //     selProvince: selIterm.name,
  //     selProvinceId: selIterm.id,
  //     selProvinceIndex: event.detail.value,
  //     selCity: '请选择',
  //     selDistrict: '请选择'
  //   })
  //   this.initCityData(2, selIterm)
  // },
  // bindPickerCityChange: function (event) {
  //   var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[event.detail.value];
  //   this.setData({
  //     selCity: selIterm.name,
  //     selCityId: selIterm.id,
  //     selCityIndex: event.detail.value,
  //     selDistrict: '请选择'
  //   })
  //   this.initCityData(3, selIterm)
  // },
  // bindPickerChange: function (event) {
  //   var selIterm = commonCityData.cityData[this.data.selProvinceIndex].cityList[this.data.selCityIndex].districtList[event.detail.value];
  //   if (selIterm && selIterm.name && event.detail.value) {
  //     this.setData({
  //       selDistrict: selIterm.name,
  //       selDistrictId: selIterm.id,
  //       selDistrictIndex: event.detail.value
  //     })
  //   }
  // },
  // onLoad: function (e) {
  //   var that = this;
  //   this.initCityData(1);
  //   var id = e.id;
  //   that.data.id = id;
  //   if (id) {
  //     // 初始化原数据
  //     wx.showLoading();
  //     wx.request({
  //       url: app.globalData.domain + '/api/userAddress/detail',
  //       data: {
  //         token: app.globalData.token,
  //         id: id
  //       },
  //       success: function (res) {
  //         wx.hideLoading();
  //         if (res.data.code == 0) {
  //           console.log('res.data' + res.data);
  //           var memberAddress = res.data.memberAddress;
  //           // memberAddress.address = memberAddress.addressName;
  //           that.setData({
  //             id: id,
  //             addressData:memberAddress,
  //             selProvince: res.data.memberAddress.provinceName,
  //             selCity: res.data.memberAddress.cityName,
  //             selDistrict: res.data.memberAddress.districtName,
  //             selProvinceId: res.data.memberAddress.provinceId,
  //             selCityId: res.data.memberAddress.cityId,
  //             selDistrictId: res.data.memberAddress.districtId
  //           });
  //           return;
  //         } else {
  //           wx.showModal({
  //             title: '提示',
  //             content: '无法获取快递地址数据',
  //             showCancel: false
  //           })
  //         }
  //       }
  //     })
  //   }
  // },
  // selectCity: function () {

  // },
  deleteAddress: function (e) {
    var that = this;
    var id = e.currentTarget.dataset.id;
    wx.showModal({
      title: '提示',
      content: '确定要删除该收货地址吗？',
      success: function (res) {
        if (res.confirm) {
          wx.request({
            url: app.globalData.domain + '/api/userAddress/delete',
            data: {
              token: app.globalData.token,
              id: id
            },
            success: (res) => {
              wx.navigateBack({})
            }
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  openMap: function (e) {
    var that = this;
    wx.chooseLocation({
      success: function (res) {
        console.log(res);
        var addressData = that.data.addressData;
        addressData.address = res.address;
        addressData.addressName = res.name;
        addressData.latitude = res.latitude;
        addressData.longitude = res.longitude;
        that.setData({
          addressData: addressData
        })
      },
      fail: function (res) {
        console.log(res)
      }
    })
  },
})
