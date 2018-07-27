import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

//全页面
//const MusicAlbum = resolve => require(['./../view/MusicAlbum.vue'], resolve)
//tabbar - view
const ElemeView = resolve => require(['./../view/ElemeView.vue'], resolve)
const ElemeHome = resolve => require(['./../view/ElemeHome.vue'], resolve)
const ElemeOrder = resolve => require(['./../view/ElemeOrder.vue'], resolve)
const ElemePersonal = resolve => require(['./../view/ElemePersonal.vue'], resolve)
const ElemeCity = resolve => require(['./../view/ElemeCity.vue'], resolve)

//Seller页面
const ElemeSeller = resolve => require(['./../view/ElemeSeller.vue'], resolve)
const SellerComment = resolve => require(['./../view/seller/SellerComment.vue'], resolve)
const SellerIndex = resolve => require(['./../view/seller/SellerIndex.vue'], resolve)
const SellerInfo = resolve => require(['./../view/seller/SellerInfo.vue'], resolve)
//Order页面
const OrderIndex = resolve => require(['./../view/order/OrderIndex.vue'], resolve)
const OrderComplete = resolve => require(['./../view/order/OrderComplete.vue'], resolve)
const OrderRefund = resolve => require(['./../view/order/OrderRefund.vue'], resolve)
const OrderInfo = resolve => require(['./../view/order/OrderInfo.vue'], resolve)

export default new Router({
	mode: 'history',
	routes: [{
		name: 'index',
		path: '/',
		component: ElemeView,
		meta: {
			title: "外卖APP",
			description: "防制外卖APP,外卖APP,美食,外卖",
			//			keepAlive: false
		},
		redirect: '/home',
		children: [{
			name: 'home',
			path: 'home',
			component: ElemeHome,
			meta: {
				title: "外卖APP",
				description: "防制外卖APP,外卖APP,美食,外卖"
			}
		}, {
			name: 'order',
			path: 'order',
			component: ElemeOrder,
			redirect: '/order/home',
			children: [{
				name: 'orderIndex',
				path: 'home',
				component: OrderIndex
			}, {
				name: 'orderComplete',
				path: 'complete',
				component: OrderComplete,
				meta: {
					keepAlive: false
				}
			}, {
				name: 'orderRefund',
				path: 'refund',
				component: OrderRefund,
				meta: {
					keepAlive: false
				}
			}]
		}, {
			name: 'personal',
			path: 'personal',
			component: ElemePersonal
		}]
	}, {
		name: 'seller',
		path: '/seller/:id',
		component: ElemeSeller,
		redirect: '/seller/:id/home',
		children: [{
			name: 'sellerIndex',
			path: 'home',
			component: SellerIndex
		}, {
			name: 'sellerComment',
			path: 'comment',
			component: SellerComment
		}, {
			name: 'sellerInfo',
			path: 'info',
			component: SellerInfo
		}]
	}, {
		name: 'orderInfo',
		path: '/order/:id',
		component: OrderInfo
	}, {
		name: 'city',
		path: '/city',
		component: ElemeCity
	}, {
		path: '*',
		redirect: '/home'
	}]
})