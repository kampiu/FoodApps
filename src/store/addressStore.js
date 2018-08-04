const commonStore = {
	namespaced: true,
	state: {
		userAddress: [],
		adrSelect: {
			adr: "",
			location: "",
			uid: "",
			point: {
				lat: null,
				lng: null
			},
			city: ""
		}
	},
	getters: {

	},
	mutations: {
		initAdrList(state, list) {
			console.log(list)
			state.userAddress = list
		},
		pushAddress(state, data){
			state.userAddress.push(data)
		},
		addAdrSelect(state, data) {
			state.adrSelect = data
		},
		initaddAdrSelect(state) {
			state.adrSelect = {
				adr: "",
				location: "",
				uid: "",
				point: {
					lat: null,
					lng: null
				},
				city: ""
			}
		}
	},
	actions: {

	}
}

export default commonStore