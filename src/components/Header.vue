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
			<RouterLink to="/picking">Picking</RouterLink>
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
		gap: 20px;
	}
}
</style>
