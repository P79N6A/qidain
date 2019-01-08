<template>
	<div class="upPicture">
		<div class="tabs">
			<el-tabs stretch v-model="activeName" @tab-click="handleClick">
				<el-tab-pane class='labelTxt' label="银行成功短信截图" name="first"></el-tab-pane>
				<el-tab-pane class='labelTxt' label="卡片拍照图片" name="second"></el-tab-pane>
			</el-tabs>
		</div>
		<div v-if="activeName=='first'" class="photo">
			<div class="file">
				<label  class="firLabel"><p>示例</p><img id="zheng"  :src="data.figure2|img"/>
				</label>
				<label for="reverse"  class="secLabel"><p>上传截图</p><img id="fan" :class="img1==''?'fan':'fan2'" :src="img1==''?'../../../static/image/noUp.png':img1|img"/></label><input @change="changeIMg($event)" :disabled="state>=1" type="file" id="reverse" accept="image/*" mutiple  />
			</div>
			<p class="tip"><img src="../../../static/image/bingo.png"/><span v-if='state==0'>未提交</span><span v-if="state==1">已提交</span><span v-if="state==-1">审核失败</span><span v-if="state==2">审核通过</span></p>
			<div class="btn">
				<button :class="state|state" @click="upMsg($event)">上传</button>
				<p>重要提醒：如果您已办理过该信用卡，将无法获得补贴</p>
			</div>
		</div>
		<div v-if="activeName=='second'" class="photo">
			<div class="file">
				<label  class="firLabel"><p>示例</p><img id="zheng" :src="data.figure3|img"/>
				</label>
				<label for="reverse"  class="secLabel"><p>上传截图</p><img id="fan" :class="img2==''?'fan':'fan2'" :src="img2==''?'../../../static/image/noUp.png':img2|img"/></label><input @change="changeIMg($event)" :disabled="state>=1" type="file" id="reverse" accept="image/*" mutiple="mutiple"  />
			</div>
			<p class="tip"><img src="../../../static/image/bingo.png"/><span v-if='state==0'>未提交</span><span v-if="state==1">已提交</span><span v-if="state==-1">审核失败</span><span v-if="state==2">审核通过</span></p>
			<div class="btn">
				<button :class="state|state" @click="upCard($event)">上传</button>
				<p>重要提醒：如果您已办理过该信用卡，将无法获得补贴</p>
			</div>
		</div>
	</div>
</template>

<script>
	import axios from 'axios'
	import getUrl from '@/assets/js/getUrl.js';
	import Qs from 'qs'
	export default{
		name:'UpPicture',
		filters:{
			state(val){
				switch (val){
					case 0:return ''
					break;
					case 1:return 'gray'
					break;
					case -1:return ''
					break;
					case 2:return 'gray'
					break;
				}
			},
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
				activeName:'first',
				url:'',
				data:{},
				eventOjb:{},
				img1:'',
				img2:'',
				state:'0'
			}
		},
		methods:{
			back(){
				this.$router.push('/home2')
			},
			handleClick(){
				if(this.activeName=='first'){
					//切换为短信截图
					let data={
						"type": "0"
					}
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'wechatManage/getMyUploadApply',
						data:Qs.stringify(data)
					}).then(res=>{
//						console.log(res.data.rows[0])
						this.state=res.data.rows[0].imgState
						this.img1=res.data.rows[0].img
					})
				}else{
					//切换为卡片截图
					let data={
						"type": "1"
					}
					axios({
						headers:{'Content-Type':'application/x-www-form-urlencoded'},
						method: 'post',
						url: this.url+'wechatManage/getMyUploadApply',
						data:Qs.stringify(data)
					}).then(res=>{
//						console.log(res)
						this.state=res.data.rows[0].imgState
						this.img2=res.data.rows[0].img
					})
				}
			},
			changeIMg(e){
				let reads= new FileReader();
		        let f=document.getElementById('reverse').files[0];
		        reads.readAsDataURL(f);
		        reads.onload=function (e) {
		            document.getElementById('fan').src=this.result;
		        };
		        this.eventOjb=e
			},
			upMsg(){
				//上传短信截图并预览
				if(this.state==1||this.state==2){
					return
				}
		        var formData = new FormData(); 
			    formData.append('img', this.eventOjb.target.files[0]);
			    formData.append('productId', this.data.productId);
			    formData.append('type', '0');
			      $.ajax({
			        url: this.url+'wechatManage/updUploadApplyImg',//这里是后台接口需要换掉
			        type: 'POST',
			        dataType: 'json',
			        cache: false,
			        data: formData,
			        processData: false,
			        contentType: false,
			        success:(res)=>{   
			        	alert('上传成功！')
//			        	console.log(res)
			        }
			      })
			},
			upCard(){
				//上传卡片截图并预览
				if(this.state==1||this.state==2){
					return
				}
		        var formData = new FormData(); 
			    formData.append('img', this.eventOjb.target.files[0]);
			    formData.append('productId', this.data.productId);
			    formData.append('type', '1');
			      $.ajax({
			        url: this.url+'wechatManage/updUploadApplyImg',//这里是后台接口需要换掉
			        type: 'POST',
			        dataType: 'json',
			        cache: false,
			        data: formData,
			        processData: false,
			        contentType: false,
			        success:(res)=>{   
			        	alert('上传成功！')
//			        	console.log(res)
			        }
			      })
			},
			getProductList(){
				axios({
					headers:{'Content-Type':'application/x-www-form-urlencoded'},
					method: 'post',
					url: this.url+'wechatManage/getProductList',
				}).then(res=>{
//					console.log(res.data.rows[0])
					this.data=res.data.rows[0]
				})
			}
		},
		mounted(){
			let url=getUrl()
			this.url=url
			this.getProductList()
			let data={
				"type": "0"
			}
			axios({
				headers:{'Content-Type':'application/x-www-form-urlencoded'},
				method: 'post',
				url: this.url+'wechatManage/getMyUploadApply',
				data:Qs.stringify(data)
			}).then(res=>{
//				console.log(res.data.rows[0])
				this.state=res.data.rows[0].imgState
				this.img1=res.data.rows[0].img
			})
		}
	}
</script>

<style scoped>
	*{
		font-size: .14rem;
	}
	.upPicture{
		background: #F5F5F5;
		height: 100vh;
	}
	.fan{
		width: .6rem !important;
		height: .6rem !important;
		margin: .35rem .45rem;
	}
	.fan2{
		width: .6rem ;
		height: .6rem ;
		margin: 0 !important;
	}
	.gray{
		background: gainsboro !important;
		color: #666666 !important;
	}
	.file{
		background: white;
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
		color: #666666;
		text-align: center;
		height: .3rem;
		margin-bottom: .1rem;
		font-size: .14rem;
		line-height: .3rem;
		border: none !important;
	}
	.photo{
		margin-top: .1rem;
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
	.photo img{
		width: 1.5rem;
		height: 1.3rem;
	}
	.tip{
		padding: 0 .2rem;
		margin-top: .2rem;
		
	}
	.tip img{
		width: .15rem;
		height: .15rem;
		vertical-align: middle;
		margin-right: .1rem;
	}
	.btn{
		text-align: center;
	}
	.btn button{
		background: #F8681F;
		width: 3.5rem;
		height: .4rem;
		text-align: center;
		border: none;
		outline: none;
		border-radius: .2rem;
		color: white;
		font-family:Microsoft YaHei;
		margin: .2rem 0;
	}
</style>