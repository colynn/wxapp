var apiUrls = require('../../services/api_urls.js'),
    request = require('../../services/index.js');

Page({
    data: {
        topic: {},
        imageStyleData: {} //图片样式数据
    },
    //图片点击事件
    imageTab: function(e){
		var url = e.currentTarget.dataset.url,
			urls = [];
		for(var p in this.data.imageStyleData){
			urls.push(p)
		}
		wx.previewImage({
			current: url,
			urls: urls
		});
	},
	//图片加载事件:全屏宽度750rpx减去padding值80rpx;计算出比率得到高度,用图片的URL作为key来设置data
	imageLoad: function(e){
		var id = e.currentTarget.dataset.src,
			img_w = e.detail.width,
			img_h = e.detail.height,
			ratio = (750-80)/img_w;

		if((img_w/this.dp)>=(750-80)){
			var imageStyle = 'width: '+(750-80)+'rpx; height:'+ img_h*ratio +'rpx;';
		}else{
			var imageStyle = 'width: '+img_w+'px; height:'+ img_h +'px;';
		}
		var imageStyleData = this.data.imageStyleData;
		imageStyleData[id] = imageStyle;
		this.setData({
			imageStyleData: imageStyleData
		});
	},
    //获取图片
    onLoad: function (options) {
		var winWidth = null, dp = 1;
		try {var winWidth = wx.getSystemInfoSync().windowWidth;
		} catch (e) { };
		if(winWidth){
			dp = winWidth/750;
		}
        this.dp = dp;

        var self = this;
        request.get(apiUrls.getImageContent, {
            id: '1'
        }).then(function (res) {
            self.setData({
                topic: res
            })
        })
    }
})