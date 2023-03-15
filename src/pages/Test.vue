<template>
	<div class="wrapper">
		<div ref="containerRef" class="container" @mousemove="onMouseMove" />
	</div>
</template>

<script setup>
import * as THREE from 'three';
// import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';

const containerRef = ref();
let camera;
let raf;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.outputEncoding = THREE.sRGBEncoding;
renderer.toneMappingExposure = 2.5;

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// background
new RGBELoader().load('/satara_night_4k.hdr', texture => {
	texture.mapping = THREE.EquirectangularReflectionMapping;
	texture.premultiplyAlpha = false;
	scene.background = texture; // 배경
	scene.environment = texture; // 광원
});

// model
let diamond;
const gltfLoader = new GLTFLoader();
gltfLoader.load('/diamond.glb', model => {
	diamond = model.scene;
	diamond.traverse(function (node) {
		if (node.isMesh) {
			node.name = 'diamond';
		}
	});
	diamond.position.set(0, -1.5, 0);
	scene.add(diamond);
});

let mouse = new THREE.Vector2();
const onMouseMove = e => {
	mouse.x = (containerRef.value.offsetWidth / 2 - e.clientX) * 0.0005;
	mouse.y = -(containerRef.value.offsetHeight / 2 - e.clientY) * 0.0005;
};

// let controls;
function init() {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
}

let time = 0;
function animate() {
	time += 0.001;
	camera.updateMatrixWorld();
	camera.position.x += (mouse.x - camera.position.x) * 0.01;
	camera.position.y += (mouse.y - camera.position.y) * 0.01;
	camera.lookAt(0, -1.2, 0);

	if (diamond) {
		diamond.rotation.y = time;
	}

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
		80,
		containerRef.value.offsetWidth / containerRef.value.offsetHeight,
		0.1,
		1000,
	);
	camera.position.set(0, 0, 4);

	mouse.x = 0;
	mouse.y = 0;

	init();
	animate();

	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	cancelAnimationFrame(raf);
	renderer.dispose();

	window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.wrapper {
	width: 100%;
	height: calc(var(--vh) * 100);
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
}
</style>
