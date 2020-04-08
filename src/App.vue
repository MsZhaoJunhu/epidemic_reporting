<template>
	<div id="app">
		<router-view />
	</div>
</template>
<script>
	export default {
		data: {},
		created: function() {
			document.body.removeChild(document.getElementById('Loading'));
			// this.$api.isFollow().then(function(res){
			// 	console.info(res)
			// })
		},
	}
</script>

<style lang="scss" scoped>
	#app {
		height: 100%;
		width: 100%;
	}
</style>
