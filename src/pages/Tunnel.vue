<template>
	<div id="tunnel" ref="containerRef" class="container">
		<div
			:style="isAnimationPlaying ? { opacity: 0.5 } : ''"
			@click="process"
		>
			Explore
		</div>
	</div>
</template>

<script setup>
import gsap from 'gsap';
import * as THREE from 'three';

const containerRef = ref();
let camera;
let renderer;

const scene = new THREE.Scene();
scene.fog = new THREE.Fog(0x000000, 20, 100);

const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const geometry = new THREE.TorusGeometry(0.7, 0.3, 12, 80);
const material = new THREE.MeshStandardMaterial({ color: 0xffffff });
const torus = new THREE.Mesh(geometry, material);
torus.position.set(268.32, 53.9, 274.28);
scene.add(torus);

const points = [
	[240, 90],
	[340, 130],
	[320, 150],
	[230, 190],
	[250, 250],
	[50, 300],
];

const yValues = [-25, 25];
for (let i = 0; i < points.length; i++) {
	const x = points[i][0];
	const y = yValues[i % yValues.length];
	const z = points[i][1];
	points[i] = new THREE.Vector3(x, y, z);
}
const path = new THREE.CatmullRomCurve3(points);

const colors = [0xff6138, 0xffff9d, 0xbeeb9f, 0x79bd8f, 0x00a388];
for (let i = 0; i < colors.length; i++) {
	const geometry = new THREE.TubeGeometry(path, 200, i * 2 + 4, 10);
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
const isAnimationPlaying = ref(false);

const customEasing = progress => {
	if (progress < 0.5) {
		return 2 * Math.pow(progress, 2);
	} else {
		return 1 - 2 * Math.pow(1 - progress, 2);
	}
};

const process = () => {
	if (!isAnimationPlaying.value && endProgress <= 1) {
		moveAni.clear();
		moveAni.to(
			{},
			{
				duration: 12 * (endProgress - startProgress),
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
					isAnimationPlaying.value = false;
					startProgress = endProgress;
					// endProgress를 1을 초과하지 않게 계산
					endProgress = Math.min(endProgress + 1 / 3, 1);
					console.log(camera.position);
				},
			},
		);

		isAnimationPlaying.value = true;
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
	div {
		position: absolute;
		bottom: 2.5%;
		left: 2.5%;
		background: white;
		padding: 6px 12px;
		border-radius: 10em;
		cursor: pointer;
	}
}
</style>
