const commonStore = {
	namespaced: true,
	state: {
		router: "home",
		sellerInfo: {},
		sellerList: [],
		city:"东莞"
	},
	getters: {

	},
	mutations: {
		initRouter(state, router) {
			state.router = router
		},
		initSeller(state){
			state.sellerList = []
			state.sellerInfo = {}
		},
		initCity(state, city){
			state.city = city
		}
	},
	actions: {
		
	}
}

export default commonStore