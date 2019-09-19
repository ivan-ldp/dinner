Page({

  data: {
    // 凭借分类查询
    sortInfo:null,
     // 凭借Id查询
    goodsInfo:null,
    goods: [
  
      // {

      //   "name": "全部",
      //   "type": 2,
      //   "foods": [
      //     {
      //       "name": "酸爽莲藕",
      //       "price": 60.5,
      //       "brand": "藕片口感爽脆，凉拌吃清爽又美味",
      //       "Count": 0,
      //       "type": "凉菜",
      //       "icon": "/images/ms1.jpeg",
      //     }

      //   ]

      // },
      // {

      //   "name": "热菜",

      //   "type": -1,

      //   "foods": [

      //     {

      //       "name": "凉拌茄子",

      //       "price": 20,

      //       "brand": "味道酸酸甜甜，还带点辣，挺不错的",

      //       "Count": 0,

      //       "type": "酸甜",

      //       "icon": "/images/ms1.jpeg",

      //     },

      //   ]

      // },
      // {

      //   "name": "凉菜",

      //   "type": 2,

      //   "foods": [

      //     {

      //       "name": "酸爽莲藕",

      //       "price": 60.5,

      //       "brand": "藕片口感爽脆，凉拌吃清爽又美味",

      //       "Count": 0,

      //       "type": "凉菜",

      //       "icon": "/images/ms1.jpeg",

      //     }

      //   ]

      // }, 
      // {

      //   "name": "主食",

      //   "type": 2,

      //   "foods": [

      //     {

      //       "name": "酸爽莲藕",

      //       "price": 60.5,

      //       "brand": "藕片口感爽脆，凉拌吃清爽又美味",

      //       "Count": 0,

      //       "type": "凉菜",

      //       "icon": "/images/ms1.jpeg",

      //     }

      //   ]

      // }, 
      // {

      //   "name": "饮料",

      //   "type": 2,

      //   "foods": [

      //     {

      //       "name": "酸爽莲藕",

      //       "price": 60.5,

      //       "brand": "藕片口感爽脆，凉拌吃清爽又美味",

      //       "Count": 0,

      //       "type": "凉菜",

      //       "icon": "/images/ms1.jpeg",

      //     }

      //   ]

      // },

    ],
    // goods End
    toView: 'sss',

    scrollTop: 100,

    foodCounts: 0,

    totalPrice: 0, // 总价格

    totalCount: 0, // 总商品数

    carArray: [],

    minPrice: 15, //起送價格

    payDesc: '',

    fold: true,

    selectFoods: [{
      price: 20,
      count: 2
    }],

    cartShow: 'none',

    status: 0,

    url: "",

    showPopup: false,



  },
  // 请求商品信息
  /**
    * 生命周期函数--监听页面加载
    */
  onLoad: function (options) {
  var that=this;
    // 页面初始化 options为页面跳转所带来的参数
    wx.request({
      url: 'http://localhost:8080/goods/sortList',
      method: 'post',
      success: function (res) {
        // for(var i=0;i<res.data.length;i++){
        //   console.info(res.data[i]);
        // }
        console.info(res.data);
        that.setData({sortInfo:res.data});
      }
    }),
      wx.request({
      url: 'http://localhost:8080/goods/goodsList2',
        method: 'post',
        success: function (res) {
          // for(var i=0;i<res.data.length;i++){
          //   console.info(res.data[i]);
          // }
          console.info(res.data);
          that.setData({ goodsInfo: res.data });
        }
      }),
   

    this.setData({

      payDesc: this.payDesc()

    });

  },
  selectMenu: function (e) {

    var index = e.currentTarget.dataset.itemIndex;

    this.setData({

      toView: 'order' + index.toString()

    })

    console.log(this.data.toView);

  },

  //移除商品

  decreaseCart: function (e) {

    var index = e.currentTarget.dataset.itemIndex;

    var parentIndex = e.currentTarget.dataset.parentindex;

    this.data.goods[parentIndex].foods[index].Count--

    var name = this.data.goods[parentIndex].foods[index].name;

    var num = this.data.goods[parentIndex].foods[index].Count;

    var mark = 'a' + index + 'b' + parentIndex

    var price = this.data.goods[parentIndex].foods[index].price;

    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex
    };

    var carArray1 = this.data.carArray.filter(item => item.mark != mark);

    carArray1.push(obj);

    console.log(carArray1);

    for (var m = 0; m < carArray1.length; m++) {

      if (carArray1[m].num == 0) {

        carArray1.splice(m, 1); // splice(a,b); a需要删除的位置,b删除几个

      }

    }

    this.setData({

      carArray: carArray1,

      goods: this.data.goods

    })

    this.calTotalPrice()

    this.setData({

      payDesc: this.payDesc(),

    })

    //关闭弹起

    var count1 = 0

    for (let i = 0; i < carArray1.length; i++) {

      if (carArray1[i].num == 0) {

        count1++;

      }

    }

    //console.log(count1)

    if (count1 == carArray1.length) {

      if (num == 0) {

        this.setData({

          cartShow: 'none'

        })

      }

    }

  },

  decreaseShopCart: function (e) {

    console.log('1');

    this.decreaseCart(e);

  },

  //添加到购物车

  addCart(e) {

    var index = e.currentTarget.dataset.itemIndex;

    var parentIndex = e.currentTarget.dataset.parentindex;

    this.data.goods[parentIndex].foods[index].Count++;

    var mark = 'a' + index + 'b' + parentIndex

    var price = this.data.goods[parentIndex].foods[index].price;

    var num = this.data.goods[parentIndex].foods[index].Count;

    var name = this.data.goods[parentIndex].foods[index].name;

    var obj = {
      price: price,
      num: num,
      mark: mark,
      name: name,
      index: index,
      parentIndex: parentIndex
    };

    var carArray1 = this.data.carArray.filter(item => item.mark != mark)

    carArray1.push(obj)

    console.log(carArray1);

    this.setData({

      carArray: carArray1,

      goods: this.data.goods

    })

    this.calTotalPrice();

    this.setData({

      payDesc: this.payDesc()

    })

  },

  addShopCart: function (e) {

    this.addCart(e);

  },

  //计算总价

  calTotalPrice: function () {

    var carArray = this.data.carArray;

    var totalPrice = 0;

    var totalCount = 0;

    for (var i = 0; i < carArray.length; i++) {

      totalPrice += carArray[i].price * carArray[i].num;

      totalCount += carArray[i].num

    }

    this.setData({

      totalPrice: totalPrice,

      totalCount: totalCount,

      //payDesc: this.payDesc()

    });

  },

  //差几元起送

  payDesc() {

    if (this.data.totalPrice === 0) {

      return `￥${this.data.minPrice}元起送`;

    } else if (this.data.totalPrice < this.data.minPrice) {

      let diff = this.data.minPrice - this.data.totalPrice;

      return '还差' + diff + '元起送';

    } else {

      return '去结算';

    }

  },



  //购物车

  toggleList: function () {

    if (!this.data.totalCount) {

      return;

    }

    this.setData({

      fold: !this.data.fold,

    })

    var fold = this.data.fold

    //console.log(this.data.fold);

    this.cartShow(fold)

  },

  cartShow: function (fold) {

    console.log(fold);

    if (fold == false) {

      this.setData({

        cartShow: 'block',

      })

    } else {

      this.setData({

        cartShow: 'none',

      })

    }

    console.log(this.data.cartShow);

  },

  /**   

  * 预览图片  

  */

  togglePopup: function (event) {

    var image_path = event.currentTarget.dataset.id;

    this.setData({

      url: image_path,

      showPopup: !this.data.showPopup

    });

  },



  tabChange: function (e) {

    var showtype = e.target.dataset.type;

    this.setData({

      status: showtype,

    });

  },



  

  onReady: function () {

    // 页面渲染完成

  },

  onShow: function () {

    // 页面显示

  },

  onHide: function () {

    // 页面隐藏

  },

  onUnload: function () {

    // 页面关闭

  }

})