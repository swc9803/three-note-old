<template>
	<div id="tunnel" ref="containerRef" class="container">
		<button @click="process">button</button>
	</div>
</template>

<script setup>
import gsap from 'gsap';
import * as THREE from 'three';

const containerRef = ref();
let camera;
let renderer;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 100, 200);

// <polygon points="68.5,185.5 1,262.5 270.9,281.9 345.5,212.8 178,155.7 240.3,72.3 153.4,0.6 52.6,53.3 "/>
const points = [
	[191, 0],
	[238, 135],
	[381, 138],
	[267, 224],
	[308, 361],
	[191, 280],
	[73, 361],
	[114, 224],
	[0, 138],
	[143, 135],
	[191, 0],
];

const yValues = [-125, 125];
for (let i = 0; i < points.length; i++) {
	const x = points[i][0];
	const y = yValues[i % yValues.length];
	const z = points[i][1];
	points[i] = new THREE.Vector3(x, y, z);
}
const path = new THREE.CatmullRomCurve3(points);

const colors = [0xff6138, 0xffff9d, 0xbeeb9f, 0x79bd8f, 0x00a388];
for (let i = 0; i < colors.length; i++) {
	const geometry = new THREE.TubeGeometry(path, 100, i * 2 + 4, 10, true);
	const material = new THREE.MeshBasicMaterial({
		color: colors[i],
		transparent: true,
		wireframe: true,
		opacity: (1 - i / 5) * 0.5 + 0.1,
	});
	const tube = new THREE.Mesh(geometry, material);
	scene.add(tube);
}

const moveAni = gsap.timeline({ paused: true });

let startProgress = 0;
let endProgress = 1 / 3;
let isAnimationPlaying = false;

const customEasing = progress => {
	if (progress < 0.5) {
		return 2 * Math.pow(progress, 2);
	} else {
		return 1 - 2 * Math.pow(1 - progress, 2);
	}
};

const process = () => {
	if (!isAnimationPlaying) {
		moveAni.clear();
		moveAni.to(
			{},
			{
				duration: 10 * (endProgress - startProgress),
				onUpdate: () => {
					const easedProgress = customEasing(moveAni.progress());
					const currentProgress =
						easedProgress * (endProgress - startProgress) +
						startProgress;
					if (currentProgress < 0.998) {
						const p1 = path.getPointAt(currentProgress);
						camera.position.set(p1.x, p1.y, p1.z);
						const p2 = path.getPointAt(currentProgress + 0.001);
						camera.lookAt(p2);
					}
				},
				onComplete: () => {
					isAnimationPlaying = false;
					if (endProgress >= 1) {
						startProgress = 0;
						endProgress = 1 / 3;
					} else {
						startProgress = endProgress;
						endProgress += 1 / 3;
					}
				},
			},
		);

		isAnimationPlaying = true;
		moveAni.play();
	}
};

function animate() {
	renderer.render(scene, camera);

	requestAnimationFrame(animate);
}

function init() {
	renderer = new THREE.WebGLRenderer({
		antialias: true,
		// alpha: true
	});
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
}

onMounted(() => {
	camera = new THREE.PerspectiveCamera(
		75,
		containerRef.value.offsetWidth / containerRef.value.offsetHeight,
		0.1,
		1000,
	);

	const p1 = path.getPointAt(0);
	camera.position.set(p1.x, p1.y, p1.z);
	const p2 = path.getPointAt(0.001);
	camera.lookAt(p2);

	init();
	animate();
});
</script>

<style lang="scss" scoped>
.container {
	position: absolute;
	width: 100%;
	height: 100%;
	button {
		position: absolute;
		bottom: 0;
	}
}
</style>
