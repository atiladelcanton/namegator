import Vue from "vue";
import App from "./App.vue";
import  VueRouter from "vue-router";
import DomainList from "./components/DomainList.vue";
import DomainView from "./components/DomainView.vue";
Vue.use(VueRouter);

const router = new VueRouter({
	routes:[
		{
			path:	"/domains",
			component:	DomainList
		},
		{
			path:"/domains/:domain",
			component:	DomainView,
			props:true
		},
		{
			path:"/",
			redirect:"/domains"
		}
	]
});

import "@fortawesome/fontawesome-free/css/all.css";
import "@fortawesome/fontawesome-free/js/all.js";
Vue.config.productionTip = false;

new Vue({
	router,
	render: h => h(App),
}).$mount("#app");
