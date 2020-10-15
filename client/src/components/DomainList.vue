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
							<ul class="list-group">
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
import axios from "axios/dist/axios";
import	AppItemList from "./AppItemList";
export default {
	name: "DomainList",
	components:{
		AppItemList
	},
	data: function(){
		return {
			items:	{
				prefix:	[],
				sufix:	[],
			},
			domains:[]
		};
	},
	methods:{
		addItem(item){
			
			axios({
				url:"http://localhost:4000",
				method: "post",
				data:{
					query:`
						mutation ($item: ItemInput) {
							newItem: saveItem(item:  $item) {
								id,
								type,
								description
							}
						}
					`,
					variables:{
						item
					}
				}
			})
				.then( response =>{
					const query	=	response.data;
					const	newItem	=	query.data.newItem;
					this.items.[item.type].push(newItem);
					this.generateDomains();
				});
		},
		deleteItem(item){
			axios({
				url:"http://localhost:4000",
				method: "post",
				data:{
					query: `
						mutation ($id: Int) {
							deleteItem(id: $id)
						}
					`,
					variables:{
						id: item.id
					}
				}
			}).then(() => {
				this.items[item.type].splice(this.items[item.type].indexOf(item),1);
				this.generateDomains();
			});
		},

		getItems(type){
			return	axios({
				url:"http://localhost:4000",
				method: "post",
				data:{
					query:`
						query ($type: String) {
							items: items(type: $type) {
								id
								type
								description
							}
						}
					`,
					variables:{
						type
					}
				}
			})
				.then(response => {
					const query = response.data;
					this.items.[type] = query.data.items;
				});
		},
		generateDomains(){
			axios({
				url:"http://localhost:4000",
				method: "post",
				data:{
					query:
						`
							mutation	{
									domains: generateDomains{
										name
										checkout
										available
									}
							}
						`
				}
			}).then((response) => {
				const query = response.data;
				this.domains = query.data.domains;
			});
		},
		opendDomain(domain){
			this.$router.push({
				path: `/domains/${domain.name}`
			});
		},
		
	},
	created(){
		Promise.all([
			this.getItems("prefix"),
			this.getItems("sufix")
		]).then(()=>{
			this.generateDomains();
		});
	
	}
};
</script>

<style>

</style>
