import Vue from 'vue'
import Vuex from 'vuex'
Vue.use(Vuex)

export default new Vuex.Store({
	state:{
		level:window.sessionStorage.getItem('level'),
		code:''
	},
	actions:{
		changeLevel(val,level){
			val.commit('changeLevel',level)
		},
		getCode(val,code){
			val.commit('getCode',code)
		}
	},
	mutations:{
		changeLevel(state,level){
			state.level=level
			window.sessionStorage.setItem('level', level);
		},
		getCode(state,code){
			state.code=code
			window.sessionStorage.setItem('code', code);
		}
	}
})
