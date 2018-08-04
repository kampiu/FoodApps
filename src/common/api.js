//const _baseUrl = 'https://api.billson.club/api/'
const _baseUrl = 'http://localhost:3002/api/'


export default {
	getMenu() {		
		return _baseUrl + 'eleme/catalog'
	},
	getSellerList(page, limit, cataid){
		return _baseUrl + "eleme/seller?page=" + page + "&limit=" + limit + "&type=" + cataid
	},
	getSeller(id){
		if(!id){
			return
		}
		return _baseUrl + "eleme/seller?id=" + id
	},
	search(word){
		return _baseUrl + "eleme/search?word=" + word
	},
	getCity(){
		return _baseUrl + "eleme/map"
	},
	modifyIcon(){
		return _baseUrl + "user/modify"
	},
	login(){
		return _baseUrl + "user/login"
	},
	register(){
		return _baseUrl + "user/register"
	},
	getUserInfo(){
		return _baseUrl + "user/getinfo"
	},
	addOrder(){
		return _baseUrl + "eleme/addOrder"
	},
	addAddress(){
		return _baseUrl + "user/addAddress"
	},
	getAddress(){
		return _baseUrl + "user/address"
	},
	getPhoneCode(){
		return _baseUrl + "user/code"
	}
}