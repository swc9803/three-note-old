<template>
	<div class="wrapper">
		<!-- <img src="@/assets/preview.webp" /> -->
		<div class="pw">
			<p>hi</p>
			<p>hello</p>
			<p>hello</p>
			<p>hello</p>
		</div>
	</div>
</template>

<style lang="scss" scoped>
.wrapper {
	position: absolute;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	background: #555555;
	// img {
	// 	position: absolute;
	// 	height: 100%;
	// 	object-fit: cover;
	// }
	.pw {
		position: relative;
		widows: 100%;
		height: 100%;
		display: flex;
		justify-content: center;
		align-items: center;
		flex-direction: column;
		// background: white;
		z-index: 1;
		p {
			background-image: url('@/assets/preview.webp');
			background-clip: text;
			-webkit-background-clip: text;
			color: transparent;
			font-size: 6em;
			font-weight: 700;
		}
	}
}
</style>
