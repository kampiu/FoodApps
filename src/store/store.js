import Vue from 'vue'
import Vuex from 'vuex'
import shopcartStore from '@/store/shopcartStore'
import commonStore from '@/store/commonStore'
import orderStore from '@/store/orderStore'
import userStore from '@/store/userStore'
import addressStore from '@/store/addressStore'

Vue.use(Vuex)

const Store = new Vuex.Store({
	getters: {
		router: state => state.common.router,
		cartList: state => state.cart.cartList,
		cartCount: state => state.cart.cartCount,
		cartPay: state => state.cart.cartPay,
		sellerInfo: state => state.common.sellerInfo,
		sellerList: state => state.common.sellerList,
		orderList: state => state.order.orderList,
		token: state => state.user.token,
		email: state => state.user.email,
		picurl: state => state.user.picurl,
		nickname: state => state.user.nickname,
		sex: state => state.user.sex,
		waller: state => state.user.waller,
		birth: state => state.user.birth,
		acount: state => state.user.acount,
		userAddress: state => state.address.userAddress,
		adrSelect: state => state.address.adrSelect,
		createOrder: state => state.order.createOrder,
		city: state => state.common.city
	},
	mutations: {
		initSellerInfo(state, data) {
			let { list:list  , ...info } = data
			state.common.sellerList = []
			state.common.sellerInfo = info
			if(state.cart.cartList[info.sel_ele_id]) {
				list.forEach((item, index) => {
					item.foodList.forEach((_item, _index) => {
						_item.pro_num = 0
						_item.pro_select = _item.pro_param.length > 0 ? [] : null
						state.cart.cartList[info.sel_ele_id].forEach((item_, index_) => {
							if(_item.pro_id === item_.pro_id) {
								_item.pro_num = item_.pro_num
							}
						})
					})
					state.common.sellerList.push(item)
				})
			} else {
				list.forEach((item, index) => {
					item.foodList.forEach((_item, _index) => {
						_item.pro_num = 0
						_item.pro_select = _item.pro_param.length > 0 ? [] : null
					})
					state.common.sellerList.push(item)
				})
			}
		},
		addOrder(state, data){					//添加下单的单号
			let orderList = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []				//获取订单列表
			let order = data
			order.order.forEach((item, index) => {
				order.order[index] = {
					id: item.pro_id,
					name: item.pro_name,
					describe: item.pro_describe,
					price: item.pro_price,   
					num: item.pro_num,
					attr: item.pro_select,
					icon: item.pro_icon,
					param: item.pro_param
				}
			})

			let cartlist = JSON.parse(localStorage.getItem("eleme_cartList"))				//初始化购物车并更新保存
			cartlist[data.seller.id] = []
			localStorage.setItem("eleme_cartList", JSON.stringify(cartlist))
			state.cart.cartList = cartlist
			
			orderList.unshift(order)
			localStorage.setItem("eleme_orderList", JSON.stringify(orderList))
			state.order.orderList = orderList
			//初始化购物车的价格与购物车数量
			state.cart.cartCount[data.seller.id] = 0
			state.cart.cartPay[data.seller.id] = 0
		}
	},
	modules: {
		address: addressStore,
		common: commonStore,
		cart: shopcartStore,
		order: orderStore,
		user: userStore,
	}
})




export default Store