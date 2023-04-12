<template>
	<div ref="containerRef" class="container" />
</template>

<script setup>
import * as THREE from 'three';
import gsap from 'gsap';

const containerRef = ref();
let camera;
let renderer;

const scene = new THREE.Scene();

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const setupModel = () => {
	const geometry = new THREE.SphereGeometry();
	const material1 = new THREE.MeshStandardMaterial({
		color: '#2ecc71',
		roughness: 0,
		metalness: 1,
	});
	const material2 = new THREE.MeshStandardMaterial({
		color: '#e74c3c',
		roughness: 0,
		metalness: 1,
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

const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80);
const material = new THREE.MeshBasicMaterial({ color: 0x555555 });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(0, 0, 0);
scene.add(torus);

const cameraDistance = 5;
function animate() {
	camera.position.x = torus.position.x;
	camera.position.y = torus.position.y;
	camera.position.z = torus.position.z + cameraDistance;
	camera.lookAt(torus.position);
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		alpha: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
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

	setupModel();

	gsap.to(torus.position, {
		x: 2 * Math.PI,
		y: 2 * Math.PI,
		z: -20 * Math.PI,
		repeat: -1,
		duration: 4,
		ease: 'none',
	});
	gsap.to(torus.rotation, {
		x: 2 * Math.PI,
		y: 2 * Math.PI,
		z: 2 * Math.PI,
		repeat: -1,
		duration: 4,
		ease: 'none',
	});

	camera.position.set(0, 0, cameraDistance);
	camera.lookAt(torus.position);

	init();
	animate();

	window.addEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	width: 100%;
	height: 100%;
}
</style>
