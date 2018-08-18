import ajax from '@/common/http'
import api from '@/common/api'
import { Toast } from 'vant'

const orderStore = {
	namespaced: true,
	state: {
		orderList: [],
		createOrder: {}
	},
	getters: {

	},
	mutations: {
		initCreate(state, data) {
			state.createOrder = data
		},
		initOrder(state, list) {
			state.orderList = list
			localStorage.setItem("eleme_orderList", JSON.stringify(list))
		},
		addOrder(state, list) {
			state.orderList = Array.from(new Set(state.orderList.concat(list)))
			localStorage.setItem("eleme_orderList", JSON.stringify(state.orderList))
		},
		refundOrder(state, id) {
			let list = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []
			for(let item of list) {
				if(item.orderCode == id) {
					item.orderState = 3
					break
				}
			}
			state.orderList = list
			localStorage.setItem("eleme_orderList", JSON.stringify(list))
		},
		finishOrder(state, id) {
			let list = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []
			for(let item of list) {
				if(item.orderCode == id) {
					item.orderState = 2
					break
				}
			}
			state.orderList = list
			localStorage.setItem("eleme_orderList", JSON.stringify(list))
		},
		filter(tate, order) {
			let list = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []
			list = order
			localStorage.setItem("eleme_orderList", list)
			state.orderList = order
		}
	},
	actions: {
		initNewOrder({
			commit,
			state
		}, data) {
			let list = state.orderList
			for(let i = 0, len = list.lenght; i < len; i++) {
				if(list[i].id == data.oldId) {
					list[i] = data.order
					commit("filter", list)
					return
				}
			}
		},
		getOrderForServer({
			commit,
			state
		}) {
			if(localStorage.getItem("eleme_billson_token")) {
				ajax.post(api.getOrderList()).then(res => {
					console.log("ORDER",res)
					res.code === 200 && Toast({
						message: '获取订单列表成功!!',
						duration: 1000
					})
					res.code === 200 && commit("initOrder", res.result)
				}).catch(err => {
					Toast({
						message: '获取订单列表失败!!',
						duration: 1000
					})
				})
			}
		}
	}
}

export default orderStore