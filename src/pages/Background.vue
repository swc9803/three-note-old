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
let pmremG;
let renderTarget;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });

const setupModel = () => {
	pmremG = new THREE.PMREMGenerator(renderer);
	renderTarget = pmremG.fromEquirectangular(scene.background);
	// ball
	const geometry = new THREE.SphereGeometry();
	const material1 = new THREE.MeshStandardMaterial({
		color: '#2ecc71',
		roughness: 0,
		metalness: 1,
		envMap: renderTarget.texture,
	});
	const material2 = new THREE.MeshStandardMaterial({
		color: '#e74c3c',
		roughness: 0,
		metalness: 1,
		envMap: renderTarget.texture,
	});

	const rangeMin = -20;
	const rangeMax = 20;
	const gap = 10;

	let flag = true;
	for (let x = rangeMin; x <= rangeMax; x += gap) {
		for (let y = rangeMin; y <= rangeMax; y += gap) {
			for (let z = rangeMin * 10; z <= rangeMax; z += gap) {
				flag = !flag;
				const mesh = new THREE.Mesh(
					geometry,
					flag ? material1 : material2,
				);
				mesh.position.set(x, y, z);
				scene.add(mesh);
			}
		}
	}
};

// 단방향 이미지맵
// const loader = new THREE.CubeTextureLoader();
// loader.load(
// 	[
// 		'/Maskonaive2/posx.jpg',
// 		'/Maskonaive2/negx.jpg',
// 		'/Maskonaive2/posy.jpg',
// 		'/Maskonaive2/negy.jpg',
// 		'/Maskonaive2/posz.jpg',
// 		'/Maskonaive2/negz.jpg',
// 	],
// 	cubeTexture => {
// 		scene.background = cubeTexture;
// 		setupModel();
// 	},
// );

// 정방향 이미지맵
const loader = new THREE.TextureLoader();
loader.load('/cannon.jpeg', texture => {
	const renderTarget = new THREE.WebGLCubeRenderTarget(texture.image.height);
	renderTarget.fromEquirectangularTexture(renderer, texture);
	scene.background = renderTarget.texture;
	setupModel();
});

// light
const light = new THREE.DirectionalLight(0xffffff, 1.5);
light.position.set(-1, 2, 4);
scene.add(light);

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
	camera.position.z = 80;

	init();
	animate();

	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	cancelAnimationFrame(raf);
	renderer.dispose();

	if (renderTarget) {
		renderTarget.dispose();
	}
	if (pmremG) {
		pmremG.dispose();
	}

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
