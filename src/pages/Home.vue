<template>
	<div class="wrapper">
		<div ref="containerRef" class="container" />
	</div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';

const containerRef = ref();
let camera;
let raf;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({
	antialias: true,
	alpha: true,
});
renderer.setClearColor(0x000000);

// 바닥
const floorGeometry = new THREE.PlaneGeometry(1000, 1000, 100, 100);
const floorMaterial = new THREE.MeshPhongMaterial({
	color: 0xffffff,
	side: THREE.DoubleSide,
});
const floor = new THREE.Mesh(floorGeometry, floorMaterial);
floor.receiveShadow = true;
floor.rotation.y = Math.PI / 1.9;
floor.position.set(0, -1, 0);
scene.add(floor);

const light1 = new THREE.AmbientLight(0xffffff, 0.7);
light1.castShadow = true;
scene.add(light1);

function init() {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
	const controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
}

function animate() {
	camera.updateMatrixWorld();
	renderer.render(scene, camera);
	raf = requestAnimationFrame(animate);
}

const onResize = () => {
	camera.aspect =
		containerRef.value.offsetWidth / containerRef.value.offsetHeight;
	camera.updateProjectionMatrix();
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
};

onMounted(() => {
	camera = new THREE.PerspectiveCamera(
		75,
		containerRef.value.offsetWidth / containerRef.value.offsetHeight,
		0.1,
		1000,
	);
	camera.position.set(0, 0.5, 3);

	init();
	animate();

	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	cancelAnimationFrame(raf);
	renderer.dispose();
	renderer.shadowMap.enabled = false;
	light1.castShadow = false;

	scene.remove(floor);
	floor.geometry.dispose();
	floor.material.dispose();

	window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	height: calc(var(--vh) * 100);
	background: black;
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
}
</style>
