<template>
	<nav>
		<ul>
			<RouterLink to="/">Home</RouterLink>
			<RouterLink to="/fog">Fog</RouterLink>
			<RouterLink to="/fit">ZoomFitModel</RouterLink>
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
