<template>
	<div>
		<div ref="containerRef" class="container" />
		<div ref="scrollRef" class="scroll" />
	</div>
</template>

<script setup>
import * as THREE from 'three';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const containerRef = ref();
const scrollRef = ref();
let camera;
let renderer;

const scene = new THREE.Scene();

const points = [
	[240, 90],
	[340, 130],
	[320, 150],
	[230, 190],
	[250, 250],
	[50, 300],
];

for (let i = 0; i < points.length; i++) {
	const x = points[i][0];
	const y = (Math.random() - 0.5) * 250;
	const z = points[i][1];
	points[i] = new THREE.Vector3(x, y, z);
}
const path = new THREE.CatmullRomCurve3(points);

const colors = [0xff6138, 0xffff9d, 0xbeeb9f, 0x79bd8f, 0x00a388];
for (let i = 0; i < colors.length; i++) {
	const geometry = new THREE.TubeGeometry(path, 100, i * 2 + 4, 10, false);
	const material = new THREE.MeshBasicMaterial({
		color: colors[i],
		transparent: true,
		wireframe: true,
		opacity: (1 - i / 5) * 0.5 + 0.1,
	});
	const tube = new THREE.Mesh(geometry, material);
	scene.add(tube);
}

function animate() {
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true,
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
}

let scrollTrigger;
onMounted(() => {
	window.scrollTo(0, 0);
	camera = new THREE.PerspectiveCamera(
		75,
		containerRef.value.offsetWidth / containerRef.value.offsetHeight,
		0.1,
		1000,
	);
	const p3 = path.getPointAt(0);
	camera.position.set(p3.x, p3.y, p3.z);
	const p2 = path.getPointAt(0.001);
	camera.lookAt(p2);

	const moveCamera = gsap.timeline();
	let p1 = path.getPointAt(1);
	scrollTrigger = ScrollTrigger.create({
		animation: moveCamera,
		trigger: scrollRef.value,
		start: 'top top',
		end: 'bottom bottom',
		markers: true,
		scrub: 4,
	});
	moveCamera.to(
		{},
		{
			onUpdate: () => {
				const p1 = path.getPointAt(moveCamera.progress());
				gsap.to(camera.position, {
					x: p1.x,
					y: p1.y,
					z: p1.z,
					duration: 0.1,
				});
				if (moveCamera.progress() < 0.98) {
					const p2 = path.getPointAt(moveCamera.progress() + 0.02);
					camera.lookAt(p2);
				}
			},
		},
	);
	init();
	animate();
});
onBeforeUnmount(() => {
	scrollTrigger.kill();
});
</script>

<style lang="scss" scoped>
.container {
	position: fixed;
	top: 0;
	left: 0;
	width: 100%;
	height: 100vh;
}
.scroll {
	position: absolute;
	height: 1000vh;
}
</style>
