<template>
	<div id="slogan">
		<div class="text-center">
			<h1>NanoGator <span class="fa fa-check"></span></h1>
			<br/>
			<h6 class="text-secondary">Gerador de nomes</h6>
		</div>
		<div id="main">
				<router-view></router-view>
		</div>
	</div>
</template>

<script>
import  "bootstrap/dist/css/bootstrap.css";
export default {
	name: "App",

};
</script>

<style>
#slogan{
	margin-top: 30px;
	margin-bottom: 30px;
}
#main{
	background-color: #F1F1F1;
	padding-top: 30px;
	padding-bottom: 20px;
}
</style>
