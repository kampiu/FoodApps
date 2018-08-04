import ajax from '@/common/http'
import api from '@/common/api'


const userStore = {
	namespaced: true,
	state: {
		token: "",
		email:"",
		picurl:"https://web.billson.club/images/default.jpg",
		nickname:"用户昵称",
		sex:2,
		waller:0,
		birth:"",
		acount:"用户帐号"
	},
	getters: {

	},
	mutations: {
		getToken(state, token) {
			state.token = token
			if(token && token !== "") {
				ajax.get(api.getAddress()).then(res => {
					res.code === 200 && this.commit("address/initAdrList", res.data)
				}).catch(err => {
					console.log("获取地址列表失败", err)
				})
			}
		},
		initInfo(state, data){
			state.email = data.us_email && data.us_email !== "" ? data.us_email : ""
			state.picurl = data.us_picurl && data.us_picurl !== "" ? data.us_picurl : "https://web.billson.club/images/default.jpg"
			state.nickname = data.us_nickname && data.us_nickname !== "" ? data.us_nickname : "用户昵称"
			state.sex = data.us_sex && data.us_sex !== "" ? data.us_sex : "2"
			state.waller = data.us_waller && data.us_waller !== "" ? data.us_waller : 0
			state.birth = data.us_birthday && data.us_birthday !== "" ? data.us_birthday : ""
			state.acount = data.us_acount && data.us_acount !== "" ? data.us_acount : "用户帐号"
		}
	},
	actions: {
		initToken({
			commit,
			state
		}) {
			if(localStorage.getItem("eleme_billson_token") && localStorage.getItem("eleme_billson_token") !== ""){
				ajax.defaults.headers['authorization'] = localStorage.getItem("eleme_billson_token") || ""
				ajax.post(api.getUserInfo()).then(res => {
					if(res.code === 200){
						commit("initInfo", res.result.data[0])
						commit("getToken", localStorage.getItem("eleme_billson_token"))
					}else{
						localStorage.removeItem("eleme_billson_token")
					}
					console.log(res)
				}).catch(err => {
					console.log(err)
				})
			}
		}
	}
}

export default userStore