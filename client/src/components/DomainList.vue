<template>
		<div id="main">
				<div class="container">
					<div class="row">
							
						<div class="col-md">
								<AppItemList title="Prefixos" :items="items.prefix" type="prefix"  v-on:addItem="addItem"  v-on:deleteItem="deleteItem"></AppItemList>
						</div>

						<div class="col-md">
							<AppItemList  title="Sufixos" :items="items.sufix" type="sufix"  v-on:addItem="addItem"  v-on:deleteItem="deleteItem"></AppItemList>
						</div>

					</div>
					<br/>
					<h5>Domínios  <span class="badge badge-info">{{domains.length}}</span></h5>
					<div class="card">
						<div class="card-body">
							<h3 v-show="isLoading"><small><code>Consultando Dominios...</code></small></h3>
							<ul class="list-group" v-show="!isLoading">
								<li class="list-group-item" v-for="domain in domains" :key="domain.name">
									<div class="row">
										<div class="col-md">
											<div class="col-md-6">
												{{domain.name}}
											</div>
											<div class="col-md-3">
												<span class="badge badge-info">{{(domain.available) ? "Disponível" : "Indisponivel"}}</span>
											</div>
										</div>
										<div class="col-md-3 text-right">
												<a  :href="domain.checkout" target="_blank" class="btn btn-info">
													<span class="fa fa-shopping-cart"></span>
												</a>
												&nbsp;
												<button class="btn btn-info" @click="opendDomain(domain)">
													<span class="fa fa-search"></span>
												</button>
										</div>
									</div>
								</li>
							</ul>
						</div>
					</div>
				</div>
		</div>
</template>

<script>
import  "bootstrap/dist/css/bootstrap.css";
import {mapState, mapActions} from "vuex";
import	AppItemList from "./AppItemList";
export default {
	name: "DomainList",

	components:{
		AppItemList
	},
	data: function(){
		return { };
	},
	methods:{
		...mapActions(["addItem", "deleteItem", "getItems", "generateDomains"]),
		opendDomain(domain){
			this.$router.push({
				path: `/domains/${domain.name}`
			});
		},
		
	},
	computed:{
		...mapState(["items","domains","isLoading"])
	}
};
</script>

<style>

</style>
