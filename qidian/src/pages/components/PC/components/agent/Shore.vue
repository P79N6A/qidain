<template>
	<div class="shore">
		<div class="txt">
			<p>扫码加入 大学生理财家园</p>
			<p>信用开门 踏上起点</p>
			<img :src="url+'wechatManage/getQrCode?extCode='+this.$store.state.code"/>
		</div>
		<div class="btn">
			<button @click="shore">分享</button>
			<!--<a :href="url+'wechatManage/getQrCode?extCode='+this.$store.state.code" download>--><button @click="download">保存图片</button><!--</a>-->
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import wx from 'weixin-js-sdk'
	import getUrl from '@/assets/js/getUrl.js';
	import Qs from 'qs'
	export default{
		name:'Shore',
		filiers:{
			img(val){
				let arr=val.split('')
				if(arr.indexOf('/')>0){
					return val
				}else{
					let url=getUrl()
					return url+'attachManage/getAttach?attachid='+val
				}
				
			}
		},
		data(){
			return{
				url:'',
				code:'',
			}
		},
		methods:{
			download(){
				wx.downloadImage({
				serverId: this.url+'wechatManage/getQrCode?extCode='+this.$store.state.code, // 需要下载的图片的服务器端ID，由uploadImage接口获得
				isShowProgressTips: 1, // 默认为1，显示进度提示
				success: function (res) {
					var localId = res.localId; // 返回图片下载后的本地ID
					alert(localId)
				}
				});
			},
			shore(){
				
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
//			var urls = location.href.split('#').toString();//url不能写死
			axios.get(this.url+"wechatManage/wechatParam",{params:{
				url:location.href.split('#').toString()
			}}).then(res=>{
//				console.log(res)
				wx.config({
	                debug: true,////生产环境需要关闭debug模式
	                appId: res.data.appid,//appId通过微信服务号后台查看
	                timestamp: res.data.timestamp,//生成签名的时间戳
	                nonceStr: res.data.nonceStr,//生成签名的随机字符串
	                signature: res.data.signature,//签名
	                jsApiList: [//需要调用的JS接口列表
	                    'checkJsApi',//判断当前客户端版本是否支持指定JS接口
	                    'onMenuShareTimeline',//分享给好友
	                    'onMenuShareAppMessage',//分享到朋友圈
	                    'downloadImage',
	                    'translateVoice'
	                ]
	            });
			})
		    wx.ready(function(){
					var link = window.location.href;
				    var protocol = window.location.protocol;
				    var host = window.location.host;
				    var descText='兼职，没时间怎么搞？别急，想让您成为合伙人，一起躺着数钱！';
				    wx.onMenuShareTimeline({
				        title: descText,
				        link: link,
				        imgUrl: protocol+'//'+host+'/FengYingAPI2018/feng_ying/images/wxfx_hhryq2.jpg',// 自定义图标
				        trigger: function (res) {
				            // 不要尝试在trigger中使用ajax异步请求修改本次分享的内容，因为客户端分享操作是一个同步操作，这时候使用ajax的回包会还没有返回.
//				            alert('click shared');
				        },
				        success: function (res) {
//				            alert('shared success');
				            //some thing you should do
				        },
				        cancel: function (res) {
//				            alert('shared cancle');
				        },
				        fail: function (res) {
//				            alert(JSON.stringify(res));
				        }
				    });
				    //分享给好友 
				    wx.onMenuShareAppMessage({
				        title: '合伙人邀请函 ！', // 分享标题
				        desc:descText,
				        link: link, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
				        imgUrl: protocol+'//'+host+'/FengYingAPI2018/feng_ying/images/wxfx_hhryq2.jpg', // 自定义图标
				        type: 'link', // 分享类型,music、video或link，不填默认为link
				        dataUrl: '', // 如果type是music或video，则要提供数据链接，默认为空
				        success: function () {
				            // 用户确认分享后执行的回调函数
				        },
				        cancel: function () {
				            // 用户取消分享后执行的回调函数
				        }
				    });
				})
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.shore{
		height: 100vh;
		position: relative;
		background-image: url(../../../../../../static/image/shore.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.txt{
		text-align: center;
		padding-top: 2.55rem;
		color: #333333;
		
	}
	.txt p{
		font-family:Source Han Sans CN;
		font-weight:bold;
		font-size: .18rem;
	}
	.txt img{
		width: 1.8rem;
		height: 1.8rem;
	}
	.btn{
		text-align: center;
	}
	.btn button{
		width: 1.5rem;
		height: .4rem;
		margin: 0 .05rem;
		border: none;
		background: #F8681F;
		outline: none;
		color: white;
		border-radius: .2rem;
	}
</style>