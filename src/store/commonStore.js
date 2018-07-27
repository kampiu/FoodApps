const commonStore = {
	namespaced: true,
	state: {
		router: "home",
		sellerInfo: {},
		sellerList: []
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
		}
	},
	actions: {
		
	}
}

export default commonStore