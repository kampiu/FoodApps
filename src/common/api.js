//const _baseUrl = 'https://api.billson.club/api/'
const _baseUrl = 'http://localhost:3002/api/'


export default {
	getMenu() {		
		return _baseUrl + "eleme/catalog"
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
	addOrder(){
		return _baseUrl + "eleme/addOrder"
	},
	getOrderList(){
		return _baseUrl + "eleme/orderList"
	},
	updateOrder(){
		return _baseUrl + "eleme/order/state"
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
	modifyInfo(){
		return _baseUrl + "user/modify/info"
	},
	addAddress(){
		return _baseUrl + "user/addAddress"
	},
	getAddress(){
		return _baseUrl + "user/address"
	},
	getPhoneCode(){
		return _baseUrl + "user/code"
	},
	modifyAddress(){
		return _baseUrl + "user/modifyAddress"
	}
}