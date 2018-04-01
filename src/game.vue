<template>
	<div id="game">
		<Header></Header>
		<game-interface></game-interface>
		<Footer></Footer>
	</div>
</template>

<script>
	import Header from './Game/header.vue';
	import gameInterface from './Game/interface.vue';
	import Footer from './Game/footer.jsx';
	export default{
		components:{
			Header,
			gameInterface,
			Footer
		}
	}
</script>

<style>
	#game{
		display: flex;
		flex-flow: column;
		width: 100%;
		height: 100%;
		text-align: center;
		background-color: rgba(205, 191, 179, 0.62);		
	}
</style>