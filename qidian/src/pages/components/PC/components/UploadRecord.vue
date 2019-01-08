<template>
	<div class="uploadrecord" >
		<div class="tabs">
			<el-tabs stretch v-model="activeName" @tab-click="handleClick">
				<el-tab-pane label="待审核" name="first"></el-tab-pane>
				<el-tab-pane label="待领红包" name="second"></el-tab-pane>
				<el-tab-pane label="已领红包" name="third"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="wapper" ref='wapper'>
			<div>
			<div v-if="activeName=='first'" class="audit">
				<div class="tips" v-if='auditList.length==0'>暂无数据!</div>
				<div class="auditList" v-for="item of auditList">
					<h2>{{item.productName}}</h2>
					<div>
						<img :src="item.img|img"/>
						<div class="cont">
							<p>上传截图: <span>{{item.type|picType}}</span></p>
							<p>上传时间: <span>{{item.imgUpTime}}</span></p>
							<p>审核状态: <span>待审核</span></p>
							<p>审核时间:无</p>
						</div>
					</div>
					
				</div>
			</div>
			<div v-if="activeName=='second'" class="getRed">
				<div class="tips" v-if='notGet.length==0'>暂无数据!</div>
				<div class="auditList" v-for="item of notGet" >
					<h2>{{item.productName}}<button @click="receive(item.applyId,$event)">立即领取</button></h2>
					<div>
						<img :src="item.img|img"/>
						<div class="cont">
							<p>上传截图: <span>{{item.type|picType}}</span></p>
							<p>上传时间: <span>{{item.imgUpTime}}</span></p>
							<p>审核状态: <span>待领红包</span></p>
							<p>审核时间:{{item.approverTime}}</p>
						</div>
					</div>
					
				</div>
			</div>
			<div v-if="activeName=='third'" class="getedRed">
				<div class="tips" v-if='geted.length==0'>暂无数据!</div>
				<div class="auditList" v-for="item of geted" >
					<h2>{{item.productName}}<button disabled>已领</button></h2>
					<div>
						<img :src="item.img|img"/>
						<div class="cont">
							<p>上传截图: <span>{{item.type|picType}}</span></p>
							<p>上传时间: <span>{{item.imgUpTime}}</span></p>
							<p>审核状态: <span>已领红包</span></p>
							<p>审核时间:{{item.approverTime}}</p>
						</div>
					</div>
					
				</div>
			</div>
			</div>
		</div>
		<div class="tip" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{tip}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	import Qs from 'qs'
	import BScroll from 'better-scroll'
	export default{
		name:'UploadRecord',
		filters:{
			picType(val){
				switch (val){
					case 0:return '银行短信通知截图'
					break
					case 1:return '卡片截图'
				}
			},
			imgstate(val){
				switch (val){
					case -1:return '审核失败'
					break;
					case 0:return '待上传'
					break;
					case 1:return '待审核'
					break;
					case 2:return '审核成功'
				}
			},
			img(val){
				let url=getUrl()
				return url+'attachManage/getAttach?attachid='+val
			}
		},
		data(){
			return{
				url:'',
				activeName:'first',
				record:[],
				notAudit:[],
				notGet:[],
				geted:[],
				auditList:[],
				tip:"领取成功!"
			}
		},
		methods:{
			close(){
				$('.tip').css('display','none')
			},
			receive(id,e){
				//领取红包
				let data={
					"applyId": id, // 上传截图记录id（必传）
					"type": 0// 领取类型 0:红包 1:奖励金
				}
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/sendRedPack',
					data:Qs.stringify(data)
				}).then(res=>{
//					console.log(res.data.error_code)
					if(res.data.error_code==0){
						$('.tip').css('display','block')
						let delateId=this.notGet.filter((item,index)=>{
							return item.applyId==id
						})
				    	this.notGet.splice(this.notGet.indexOf(delateId[0]),1)
				    	this.geted.push(delateId[0])
					}else{
						this.tip=res.data.error_message
						$('.tip').css('display','block')
						
					}
					
			    	
				})
			},
			back(){
				this.$router.go(-1)
			},
			handleClick(){
				this.scroll.scrollToElement('div')
			},
			getMyUploadApply(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getMyUploadApply',
				}).then(res=>{
//					console.log(res.data.rows)
					this.record=res.data.rows
					//获取待审核列表
					this.auditList.filter(item=>{
						return item.imgState==1
					})
					//获取未领红包列表
					this.notGet=this.record.filter(item=>{
						return item.receiveState==0
					})
					//获取已领红包列表
					this.geted=this.record.filter(item=>{
						return item.receiveState==1
					})
//					console.log(this.auditList,this.notGet,this.geted)
				})
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.scroll= new BScroll (this.$refs.wapper,{click:true})
			this.getMyUploadApply()
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.uploadrecord{
		width: 100%;
		height: 100vh;
		position:absolute;
		overflow: hidden;
		z-index: 1;
	}
	.wapper{
		width: 100%;
		height: 91.5vh;
		background: #f5f5f5;
		position:absolute;
		overflow: hidden;
		z-index: 1;
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
	.shore{
		font-size: .22rem;
		
	}
	header p{
		margin-left: -.3rem;
		font-size: .18rem;
		color: white;
	}
	.tabs{
		background: white;
	}
	.tips{
		color: black;
		z-index: 99;
		padding: 0 .2rem;
		text-align: center;
	}
	.uploadrecord{
		background: white;
	}
	.auditList{
		background: white;
		padding: .15rem;
		padding-top: 0;
		margin-bottom: .1rem;
	}
	.auditList img{
		width: 1.2rem;
		height: .85rem;
		margin-right: .15rem;
	}
	.auditList>div{
		display: flex;
	}
	.auditList h2{
		padding-bottom: .1rem;
		margin-bottom: .1rem;
		font-weight: bold;
		line-height: .35rem;
		height: .35rem;
		display: flex;
		justify-content: space-between;
		border-bottom: 1px solid gainsboro;
	}
	.cont p{
		line-height: .25rem;
		height: .25rem;
	}
	.audit{
		background: #f5f5f5;
	}
	.audit >div{
		padding-top: .15rem;
	}
	.getedRed >div{
		padding-top: .15rem;
	}
	.getedRed button{
		background:rgba(153,153,153,1);
		height: .2rem;
		width: .6rem;
		color: white;
		font-size: .12rem;
		border: none;
		border-radius: .05rem;
	}
	.getRed button{
		background:rgba(248,104,31,1);
		height: .2rem;
		width: .6rem;
		color: white;
		font-size: .12rem;
		border: none;
		border-radius: .05rem;
	}
	.getRed >div{
		padding-top: .15rem;
	}
</style>