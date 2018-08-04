const orderStore = {
	namespaced: true,
	state: {
		orderList:[],
		createOrder:{}
	},
	getters: {
		
	},
	mutations: {
		initCreate(state, data){
			state.createOrder = data
		},
		initOrder(state){
			state.orderList = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []
		},
		refundOrder(state, id){
			let list = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []
			for(let item of list){
				if(item.orderId == id){
					item.type = 3
					break
				}
			}
			state.orderList = list
			localStorage.setItem("eleme_orderList", JSON.stringify(list))
		},
		finishOrder(state, id){
			let list = localStorage.getItem("eleme_orderList") ? JSON.parse(localStorage.getItem("eleme_orderList")) : []
			for(let item of list){
				if(item.orderId == id){
					item.type = 2
					break
				}
			}
			state.orderList = list
			localStorage.setItem("eleme_orderList", JSON.stringify(list))
		}
	},
	actions: {

	}
}

export default orderStore