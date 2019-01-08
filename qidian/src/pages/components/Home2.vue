<template>
	<div>
		
		<div class="homeCont">
			<div class="tips"><span @click="process">办卡流程</span> | <span @click="attention">注意事项</span></div>
			<p class="card">中国银行赞卡</p>
			<h2>人生理财 从学校开始</h2>
			<p><img src="../../assets/image/homeBG2.png"/></p>
			<p class="benefit"><span>★ 七彩卡面任意选     ★ 终身免年费     ★ 中行请你看电影
</span><span>★ 移动支付多倍积分     ★ 银联闪付月月享视频会员</span><span>★ 透支利息7折，分期手续费8.5折</span></p>
			<div class="homeBtn">
				<button>立即申请</button>
				<button @click="upPicture">上传截图</button>
			</div>
		</div>
		<div class="foot">
			<el-row>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../assets/image/home2(6).png"/><br /><i>首页</i></span>
				</el-col>
				<router-link to='/mine'>
				<el-col :span='12'>
					<span class="iconfont"><img src="../../assets/image/home2(7).png"/><br /><i>我的</i></span>
				</el-col>
				</router-link>
			</el-row>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	import Qs from 'qs'
	export default{
		name:'Home2',
		data(){
			return{
				url:''
			}
		},
		methods:{
			upPicture(){
				this.$router.push('/upPicture')
			},
			getProductList(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getProductList',
				}).then(res=>{
//					console.log(res.data.rows[0])
				})
			},
			process(){
				this.$router.push('/process')
			},
			attention(){
				this.$router.push('/attention')
			}
		},
		created(){
			let url=getUrl()
			this.url=url
			this.getProductList();
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	header{
		display: flex;
		justify-content: space-between;
		height: .44rem;
		color: white;
		padding: 0 .2rem;
		background: #1A191F;
		line-height: .44rem;
	}
	header span{
		font-size: .16rem;
		color: white;
	}
	header span:last-child{
		font-size: .22rem;
		
	}
	header p{
		margin-left: -.3rem;
		font-size: .18rem;
		color: white;
	}
	.homeCont{
		width: 100%;
		height: 93vh;
		position: relative;
		background-image: url(../../../static/image/homeBG1.png);
		background-position: center;
		background-repeat: no-repeat;
		background-size: 100% 100%;
	}
	.homeCont p{
		text-align: center;
	}
	.homeCont h2{
		color: #333333;
		font-family:Source Han Sans CN;
		font-weight:500;
		font-size: .29rem;
		text-align: center;
		margin-bottom: .23rem;
	}
	.homeCont img{
		width: 2.13rem;
		height: 1.38rem;
		margin-bottom: .35rem;
	}
	.benefit{
		width: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		text-align: left !important;
	}
	.benefit span{
		line-height:.2rem;
		width: 3.4rem;
		display: block;
		font-size: .14rem;
	}
	.card{
		text-align: center;
		font-size: .2rem;
		color: #343434;
		font-family:Source Han Sans CN;
		padding-top: .84rem;
		margin-bottom: .13rem;
	}
	.tips{
		position: absolute;
		right: .12rem;
		top:.25rem;
		font-size: .12rem;
	}
	.tips span{
		font-size: .14rem;
		color: black;
	}
	.homeBtn{
		
		text-align: center;
		margin-top: .3rem;
	}
	.homeBtn button{
		outline: none;
		width: 1.3rem;
		height: .35rem;
		margin: 0 .1rem;
		border-radius:.18rem;
		border: none;
	}
	.homeBtn button:first-child{
		background:rgba(248,104,31,1);
		font-size:.16rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.2rem;
		color:rgba(255,255,255,1);
	}
	.homeBtn button:last-child{
		font-size:.16rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		line-height:.2rem;
		color:rgba(248,104,31,1);
		background:white;
		border:1px solid rgba(248,104,31,1);
	}
	.foot{
		position: absolute;
		bottom: 0;
		background:rgba(255,254,255,1);
		border-top: 1px solid rgba(238,238,238,1);
		text-align: center;
		width: 100%;
		height: .5rem;
	}
	.foot .iconfont{
		font-size: .20rem;
		line-height: .20rem;
		height: .2rem;
		display: block;
		padding-top: .05rem;
	}
	.foot i{
		font-style: normal;
		color: #999999;
		font-size: .12rem;
	}
	.foot img{
		width: .2rem;
		height: .2rem;
	}
</style>