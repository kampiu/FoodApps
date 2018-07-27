const shopcartStore = {
	namespaced: true,
	state: {
		cartList: {},
		cartCount: {},
		cartPay: {}
	},
	getters: {

	},
	mutations: {
		initOrder(state) {
			let cartList = localStorage.getItem("eleme_cartList") ? JSON.parse(localStorage.getItem("eleme_cartList")) : {}
			state.cartList = cartList
			for(let key in cartList) {
				state.cartCount[key] = []
				state.cartPay[key] = []
				let count = 0,
					pay = 0
				cartList[key].forEach((item, index) => {
					count += parseInt(item.pro_num)
					pay += parseInt(item.pro_num) * parseFloat(item.pro_price)
				})
				state.cartCount[key] = count
				state.cartPay[key] = pay
			}
		},
		addOrder(state, data) {
			state.cartList[data.seller] = state.cartList[data.seller] ? state.cartList[data.seller] : []
			state.cartCount[data.seller] = state.cartCount[data.seller] ? state.cartCount[data.seller] : 0
			state.cartPay[data.seller] = state.cartPay[data.seller] ? state.cartPay[data.seller] : 0
			if(state.cartList[data.seller].length === 0) {
				let cartList = localStorage.getItem("eleme_cartList") ? JSON.parse(localStorage.getItem("eleme_cartList")) : {}
				cartList[data.seller] = cartList[data.seller] ? cartList[data.seller] : []
				cartList[data.seller].push(Object.assign({}, data.order))
				//第一次购物车存放有效商品，初始化价格与数量,与购物车
				state.cartCount[data.seller]++
					state.cartPay[data.seller] = data.order.pro_price
				state.cartList[data.seller].push(Object.assign({}, data.order))

				localStorage.setItem("eleme_cartList", JSON.stringify(cartList))
				return
			}
			state.cartCount[data.seller]++
				state.cartPay[data.seller] = parseFloat(state.cartPay[data.seller]) + parseFloat(data.order.pro_price)
			let bool = true
			let cartList = localStorage.getItem("eleme_cartList") ? JSON.parse(localStorage.getItem("eleme_cartList")) : [] //添加商品问题：数组轮加。。
			cartList[data.seller].forEach((item, index) => { //判断属性是否相同，不相同就当作新的商品添加
				if(item.pro_id === data.order.pro_id) { //相同ID的商品，没判断属性是否相同
					if(item.pro_select ? (item.pro_select.toString() === data.order.pro_select.toString()) : item.pro_select === data.order.pro_select) {
						bool = false
						cartList[data.seller][index].pro_num++
					} 					//!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!添加相同商品不同的属性有问题
				}
			})
			if(bool) {
				data.order.pro_num = 1
				cartList[data.seller].push(data.order)
			}
			state.cartList[data.seller] = cartList[data.seller]
			localStorage.setItem("eleme_cartList", JSON.stringify(cartList))
		},
		removeOrder(state, data) {
			state.cartCount[data.seller]--
				state.cartPay[data.seller] = parseFloat(state.cartPay[data.seller]) - parseFloat(data.order.pro_price)
			let cartList = localStorage.getItem("eleme_cartList") ? JSON.parse(localStorage.getItem("eleme_cartList")) : []
			cartList[data.seller].forEach((item, index) => { //商品的移除，判断了商品ID，还需判断商品的属性，根据相同商品的不同属性移除不同的属性
				if(item.pro_id === data.order.pro_id) { //相同商品的时候，判断ID后，需要判断商品的属性是否一样来进行删除，还需以商品的属性键值来删除			
					if(item.pro_select ? (item.pro_select.toString() === data.order.pro_select.toString()) : item.pro_select === data.order.pro_select) {
						if(cartList[data.seller][index].pro_num === 1) {
							cartList[data.seller].splice(index, 1)
						} else {
							cartList[data.seller][index].pro_num--
						}
					}
				}
			})
			state.cartList[data.seller] = cartList[data.seller]
			localStorage.setItem("eleme_cartList", JSON.stringify(cartList))
		}
	},
	actions: {

	}
}

export default shopcartStore