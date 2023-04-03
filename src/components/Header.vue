<template>
	<nav>
		<ul>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/fog">Fog</RouterLink>
			<RouterLink to="/fit">ZoomFitModel</RouterLink>
			<RouterLink to="/fbx">Fbx</RouterLink>
			<RouterLink to="/background">Background</RouterLink>
			<RouterLink to="/dynamic">DynamicMap</RouterLink>
			<RouterLink to="/glass">Glass</RouterLink>
			<RouterLink to="/hdr">Hdr</RouterLink>
			<RouterLink to="/jewel">Jewel</RouterLink>
			<RouterLink to="/tunnel">Tunnel</RouterLink>
			<RouterLink to="/test">Test</RouterLink>
			<RouterLink to="/test2">Test2</RouterLink>
			<RouterLink to="/test3">Test3</RouterLink>
			<RouterLink to="/test4">Test4</RouterLink>
			<RouterLink to="/test5">Test5</RouterLink>
			<RouterLink to="/test6">Test6</RouterLink>
		</ul>
	</nav>
</template>

<style lang="scss" scoped>
nav {
	position: absolute;
	background: white;
	z-index: 9;
	ul {
		display: flex;
		flex-wrap: wrap;
		gap: 20px;
	}
}
</style>
