import Vue from 'vue'
import App from '@/App'
import Router from '@/common/router'
import VueResource from 'vue-resource'
import store from '@/store/store'
import Http from '@/common/http'
import PullTo from 'vue-pull-to'
import 'swiper/dist/css/swiper.min.css'
import '@/common/common.css'



(function(d, w) {
	let dw = d.documentElement.clientWidth;
	d.documentElement.style.fontSize = dw / 7.5 + "px"
	w.onresize = () => {
		d.documentElement.style.fontSize = d.documentElement.clientWidth / 7.5 + "px"
	}
})(document, window)
//开启debug模式
Vue.config.debug = true

Vue.config.productionTip = false
Vue.prototype.$ajax = Http
Vue.use(Router)
Vue.use(VueResource)


const app = new Vue({
	el: "#app",
	router: Router,
	render: h => h(App),
	store,
	components: {
		App
	},
	created(){
		this.initApp()
	},
	methods:{
		initApp(){
			this.$store.commit("cart/initOrder")
			this.$store.commit("order/initOrder")
		}
	},
	watch: {
		$route(to){
			store.commit("common/initRouter",to.name)
		}
	}
})

