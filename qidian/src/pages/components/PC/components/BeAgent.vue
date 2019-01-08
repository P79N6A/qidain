<template>
	<div class="beagent" ref='wapper'>
		<div class="tabs">
			<el-tabs stretch v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class='labelTxt' label="代理人权益" name="first"></el-tab-pane>
				<el-tab-pane class='labelTxt' label="填写资料" name="second"></el-tab-pane>
			</el-tabs>
		</div>
		<div class="msgCont">
			<div v-if="activeName=='first'" class="benefits">
				<p>代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益代理人权益</p>
			</div>
			<div v-if="activeName=='second'" class='subMsg'>
				<!--<h2>状态：<span>{{states}}</span></h2>-->
				<p class="name"><label for="name">姓名</label><input :disabled="state==2" v-model="name" id="name" type="text" placeholder="请输入姓名"/></p>
				<p class="phoneNum"><label for='phoneNum'>手机号</label><input :disabled="state==2" v-model="phone" id="phoneNum" type="text" placeholder="请输入手机号"/></p>
				<p class="school" @click="toSchool"><span>学校</span><span>{{school==''?'请选择学校':school}}<i class="iconfont"><img src="../../../../assets/image/PC (2).png"/></i></span></p>
				<div class="photo">
					<p><label>身份证照片</label></p>
					<div class="file">
						<label for="positive" class="firLabel"><img id="zheng" :src="idCardPositive==''?'./static/image/msg (5).png':idCardPositive|img"/>
						<p>身份证正面照</p></label><input @change="Idpositive($event)" :disabled="state==2" type="file" id="positive" multiple="multiple" accept="image/*" />
						<label for="reverse"  class="secLabel"><img id="fan" :src="idCardPeverse==''?'./static/image/msg (1).png':idCardPeverse|img"/><p>身份证反面照</p></label><input @change="Idreverse" :disabled="state==2" type="file" id="reverse" accept="image/*" mutiple="mutiple"  />
					</div>
				</div>
				<p class="tip"><img :src="state!=2?'./static/image/msg.png':'./static/image/bingo.png'"/><span v-if='state==0'>未提交</span><span v-if="state==1">已提交</span><span v-if="state==-1">审核失败</span><span v-if="state==2">您提交的申请资料,平台已审核通过,点击"转变为代理人身份"按钮吧</span></p>
				<div class="btn">
					<!--<h2 v-if="states=='审核已通过'">您提交的申请资料,平台已审核通过,点击"转变为代理人身份"按钮吧</h2>-->
					<button v-if='state!=2' @click="JudgeState">提交</button>
					<button v-if="state==2" @click="changeLevel">转变为代理人身份</button>
				</div>
			</div>
		</div>
		<div class="tips" style="display: none;">
		    <div class="weui-mask"></div>
		    <div class="weui-dialog">
		        <div class="weui-dialog__hd"><strong class="weui-dialog__title">提示</strong></div>
		        <div class="weui-dialog__bd">{{txt}}</div>
		        <div class="weui-dialog__ft">
		            <a href="javascript:;" @click="close" class="weui-dialog__btn weui-dialog__btn_primary">确定</a>
		        </div>
		    </div>
		</div>
	</div>
</template>

<script>
	import getUrl from '@/assets/js/getUrl.js';
	import store from '@/store';
	import BScroll from 'better-scroll'
	import axios from 'axios'
	import Qs from 'qs'
	export default{
		name:"BeAgent",
		filters:{
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
				agent:{},
				show:false,
				activeName:'second',
				name:'',
				phone:'',
				idCardPositive:'',
				idCardPeverse:'',
				school:'',
				state:0,
				txt:'提交成功！'
			}
		},
		methods:{
			handleClick(){
				
			},
			close(){
				$('.tips').css('display','none')
			},
			Idpositive(e){
				//上传身份证正面并预览
				let reads= new FileReader();
		        let f=document.getElementById('positive').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('zheng').src=this.result;
		        };
		        var formData = new FormData(); 
			    formData.append('img', e.target.files[0]);
			    formData.append('type', 'idCardPositive ');
			      $.ajax({
			        url: this.url+'wechatManage/updApplicationMaterialsImg',//这里是后台接口需要换掉
			        type: 'POST',
			        dataType: 'json',
			        cache: false,
			        data: formData,
			        processData: false,
			        contentType: false,
			        success:(res)=>{   
//			        	console.log(res)
			        }
			      })
			},
			Idreverse(e){
				//上传身份证反面并预览
				let reads= new FileReader();
		        let f=document.getElementById('reverse').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('fan').src=this.result;
		        };
		        var formData = new FormData(); 
			    formData.append('img', e.target.files[0]);
			    formData.append('type', 'IdCardPeverse');
			      $.ajax({
			        url: this.url+'wechatManage/updApplicationMaterialsImg',//这里是后台接口需要换掉
			        type: 'POST',
			        dataType: 'json',
			        cache: false,
			        data: formData,
			        processData: false,
			        contentType: false,
			        success:(res)=>{   
//			        	console.log(res)
			        }
			      })
			},
			toSchool(){
				//获取学校列表
				if(this.state!=2){
					//提交后不可修改学校
					this.$router.push({name:'School',params:{name:this.name,phone:this.phone}})
				}
			},
			JudgeState(){
				//判断审核状态,未提交即提交,通过即转换身份
				if(this.$route.params.province!=''&&this.IdCardPeverse!=''&&this.IdCardPosition!=''){
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'wechatManage/subApplicationMaterialsImg',
					}).then(res=>{
//						console.log(res.data.error_code)
						if(res.data.error_code==0){
							this.state=1
							$('.tips').css('display','block')
						}else{
							this.txt=res.data.error_message
							$('.tips').css('display','block')
						}
//						this.$router.push('/Agent')
					})
					
				}else{
					alert('选择学校或添加身份证图片')
				}
			},
			changeLevel(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/changeToAgent',
				}).then(res=>{
//					console.log(res)
					store.dispatch('changeLevel','second')
					this.$router.push({name:'Agent',params:{show:true}})
				})
			},
			getMyApplicationMaterials(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getMyApplicationMaterials',
				}).then(res=>{
//					console.log(res.data.application_materials)
					this.agent=res.data.application_materials
					this.state=res.data.application_materials.state
					this.idCardPeverse=res.data.application_materials.idCardPeverse
					this.idCardPositive=res.data.application_materials.idCardPositive
//					this.agent.IdCardPeverse=res.data.application_materials.IdCardPeverse
//					this.agent.IdCardPosition=res.data.application_materials.IdCardPosition
					this.name=res.data.application_materials.xm
					this.school=res.data.application_materials.name
					this.phone=res.data.application_materials.mobile
				})
			}
		},
		mounted(){
			
			let url=getUrl()
			this.url=url
			this.scroll= new BScroll (this.$refs.wapper,{click:true})
			if(this.$route.params.activeName){
				this.name=this.$route.params.name
				this.phone=this.$route.params.phone
			}
			this.getMyApplicationMaterials();
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
	.shore{
		font-size: .22rem;
		
	}
	header p{
		margin-left: -.3rem;
		font-size: .18rem;
		color: white;
	}
	.name input{
		background: transparent;
	}
	.phoneNum input{
		background: transparent;
	}
	.beagent{
		overflow: hidden;
		height: 100vh;
		width: 100%;
		background:white;
	}
	.msgCont{
		background: gainsboro;
		
	}
	.benefits{
		background: white;
		padding: .2rem;
	}
	.subMsg{
		background:#F5F5F5;
		margin-top: .1rem;
	}
	.subMsg h2{
		text-align: center;
		height: .5rem;
		line-height: .5rem;
		font-size: .16px;
		font-weight: bold;
	}
	.subMsg p{
		background: white;
		height: .45rem;
		line-height: .45rem;
		text-indent: .14rem;
		position: relative;
	}
	.phoneNum{
		border-bottom: 1px solid #E5E5E5;
	}
	.subMsg p label{
		display: inline-block;
		width: .9rem;	
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.subMsg p input{
		width: 2.5rem;
		outline: none;
		border: none;
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:#666666;
	}
	.school{
		margin-bottom: .1rem;
	}
	.school span:first-child{
		width: .8rem;
		display: inline-block;
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.school span:last-child{
		float: right;
		padding-right: .3rem;
		font-size:.15rem;
		font-family:Source Han Sans CN;
		font-weight:400;
		color:rgba(153,153,153,1);
	}
	.school i img{
		width: .07rem;
		height: .12rem;
		margin-left: .07rem;
		margin-bottom: .04rem;
	}
	.photo{
		background: white;
	}
	.file{
		display: flex;
		justify-content: center;
		padding: .2rem 0;
		box-sizing: border-box;
	}
	.firLabel{
		margin-right: .15rem;
	}
	.secLabel{
		margin-left: .15rem;
	}
	.file p{
		background:rgba(248,104,31,1);
		color: white;
		border-bottom-left-radius: 7px;
		border-bottom-right-radius: 7px;
		height: .3rem;
		font-size: .13rem;
		line-height: .3rem;
		border: none !important;
	}
	.photo >p label{
		width: 1.5rem;
	}
	.photo input{
		visibility: hidden;
		position: absolute;
		width: 0px;
		height: 0px;
	}
	.photo p{
		border-bottom: 1px solid gainsboro;
	}
	.photo img{
		width: 1.13rem;
		height: .75rem;
	}
	.tip{
		font-size: .15rem;
		line-height: .18rem;
		display: flex;
		/*align-items: center;*/
		padding-left: .14rem;
	}
	.tip span{
		display: inline-block;
		width: 3.5rem;
		line-height: .18rem;
		text-indent: 0;
		text-align: left
	}
	.tip img{
		margin-right: .06rem;
		width: .15rem;
		height: .15rem;
		margin-left: .14rem;
	}
	.btn{
		text-align: center;
		background: white;
	}
	.btn h2{
		line-height: .25rem;
		height: .5rem;
		text-align: left;
		width: 90%;
		padding-left: 10%;
		margin-top: .2rem;
	}
	.btn button{
		outline: none;
		width: 3.3rem;
		height: .4rem;
		background:rgba(248,104,31,1);
		color: white;
		border-radius: .2rem;
		border: none;
		margin: 0 .15rem;
	}
</style>