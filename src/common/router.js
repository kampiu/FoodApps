import Vue from 'vue'
import store from '@/store/store'
import Router from 'vue-router'
import Ajax from '@/common/http'
import api from '@/common/api'

Vue.use(Router)

//tabbar - view
const ElemeView = resolve => require(['./../view/ElemeView.vue'], resolve)
const ElemeHome = resolve => require(['./../view/ElemeHome.vue'], resolve)
const ElemeOrder = resolve => require(['./../view/ElemeOrder.vue'], resolve)
const ElemePersonal = resolve => require(['./../view/ElemePersonal.vue'], resolve)
const ElemeCity = resolve => require(['./../view/ElemeCity.vue'], resolve)
const ElemeIconPut = resolve => require(['./../view/ElemeIconPut.vue'], resolve)
const ElemeLogin = resolve => require(['./../view/ElemeLogin.vue'], resolve)
const ElemeRegister = resolve => require(['./../view/ElemeRegister.vue'], resolve)

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
const OrderConfirm = resolve => require(['./../view/order/OrderConfirm.vue'], resolve)
//Address页面
const addressList = resolve => require(['./../view/address/addressList.vue'], resolve)
const addressEdit = resolve => require(['./../view/address/addressEdit.vue'], resolve)
const addressMap = resolve => require(['./../view/address/addressMap.vue'], resolve)

const router = new Router({
	routes: [{
			name: 'index',
			path: '/',
			component: ElemeView,
			meta: {
				title: "外卖APP",
				description: "防制外卖APP,外卖APP,美食,外卖",
				show: '',
				hide: 'all-view-overlay'
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
				meta: {
					requireAuth: true
				},
				redirect: '/order/home',
				children: [{
					name: 'orderIndex',
					path: 'home',
					component: OrderIndex,
					meta: {
						title: "订单首页",
						description: "用户历史订单，全部订单，订单列表",
						requireAuth: true
					}
				}, {
					name: 'orderComplete',
					path: 'complete',
					component: OrderComplete,
					meta: {
						title: "订单已完成",
						description: "用户历史订单，已完成订单，订单列表",
						requireAuth: true
					}
				}, {
					name: 'orderRefund',
					path: 'refund',
					component: OrderRefund,
					meta: {
						title: "订单已退款",
						description: "用户历史订单，已退款订单，订单列表",
						requireAuth: true
					}
				}]
			}, {
				name: 'personal',
				path: 'personal',
				component: ElemePersonal,
				meta: {
					title: "个人",
					description: "用户个人设置，外卖个人设置"
				}
			}]
		}, {
			name: 'seller',
			path: '/seller/:id',
			component: ElemeSeller,
			redirect: '/seller/:id/home',
			meta: {
				show: '',
				hide: ''
			},
			children: [{
				name: 'sellerIndex',
				path: 'home',
				component: SellerIndex,
				meta: {
					title: "商家首页",
					description: "商家首页"
				}
			}, {
				name: 'sellerComment',
				path: 'comment',
				component: SellerComment,
				meta: {
					title: "用户评价",
					description: "用户评价"
				}
			}, {
				name: 'sellerInfo',
				path: 'info',
				component: SellerInfo,
				meta: {
					title: "商家营业信息",
					description: "商家营业信息，商家地址，营业电话"
				}
			}]
		}, {
			name: 'orderInfo',
			path: '/order/:id',
			component: OrderInfo,
			meta: {
				title: "订单详情",
				description: "订单详情页面，订单商品，交易时间",
				requireAuth: true
			}
		}, {
			name: 'modifyUpload',
			path: '/upload',
			component: ElemeIconPut,
			meta: {
				title: "用户头像修改",
				description: "用户头像修改，上传头像",
				requireAuth: true
			}
		},
		{
			name: 'register',
			path: '/register',
			component: ElemeRegister,
			meta: {
				title: "用户注册",
				description: "APP用户注册，手机验证"
			}
		},
		{
			name: 'orderConfirm',
			path: '/orderConfirm/:id',
			component: OrderConfirm,
			meta: {
				title: "订单确认",
				description: "订单的详情，订单的商品信息，确认订单",
				requireAuth: true
			}
		},
		{
			name: 'addressList',
			path: '/address',
			component: addressList,
			meta: {
				title: "收货地址",
				description: "用户收货地址列表",
				requireAuth: true
			}
		},
		{
			name: 'addressAdd',
			path: '/address/add',
			component: addressEdit,
			meta: {
				title: "添加收货地址",
				description: "用户的收货地址，添加收货地址",
				requireAuth: true,
				keeyAlive:false
			}
		},
		{
			name: 'addressEdit',
			path: '/address/edit/:id',
			component: addressEdit,
			meta: {
				title: "修改收货地址",
				description: "用户的收货地址，修改收货地址",
				requireAuth: true,
				keeyAlive:false
			}
		},
		{
			name: 'addressMap',
			path: '/address/map',
			component: addressMap,
			meta: {
				title: "选择地区",
				description: "城市区域选择，地区分布选择，城市选择，收货地址选择",
				requireAuth: true
			}
		},
		{
			name: 'login',
			path: '/login',
			component: ElemeLogin,
			meta: {
				title: "用户登录",
				description: "用户登录，手机号码登录，帐号登录"
			}
		},
		{
			name: 'city',
			path: '/city',
			component: ElemeCity,
			meta: {
				title: "城市选择",
				description: "用户选择所在的城市，商家分布区域"
			}
		},
		{
			path: '*',
			redirect: '/home'
		}
	]
})

router.beforeEach((to, from, next) => {
	if(to.meta && to.meta.title) {
		document.title = to.meta.title
	}
	if(to.meta && to.meta.requireAuth) {
		if(store.getters.token !== "" || localStorage.getItem("eleme_billson_token")) {
			next()
		} else {
//			if(to.name === "modifyUpload") {
//				next({
//					path: '/home'
//				})
//			} else {
				next({
					path: '/login'
				})
//			}
		}
	} else {
		next()
	}
})

export default router