<template>
	<div class="wrapper">
		<div ref="containerRef" class="container" />
	</div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import gsap from 'gsap';

const containerRef = ref();
let camera;
let raf;

const raycaster = new THREE.Raycaster();
const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
scene.background = new THREE.Color(0x555555);

const lights = [];
for (let i = 0; i < 4; i++) {
	const spotLight = new THREE.SpotLight(0xffffff, 0.5);
	lights.push(spotLight);
	scene.add(spotLight);
}

// model
const createCoin = (text, font, color, position, rotation) => {
	const textGeometry = new TextGeometry(text, {
		font: font,
		size: 1,
		height: 0.1,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0.005,
		bevelSegments: 24,
	});
	textGeometry.center();

	const textMaterial = new THREE.MeshStandardMaterial({
		color: 0xffffff,
		roughness: 0.3,
		metalness: 0.7,
	});
	const textMesh = new THREE.Mesh(textGeometry, textMaterial);
	textMesh.position.set(0, 0.25, 0);
	textMesh.rotation.x = -Math.PI / 2;

	const cylinderGeometry = new THREE.CylinderGeometry(3, 3, 0.5, 50);
	const cylinderMaterial = new THREE.MeshPhysicalMaterial({
		color: color,
		roughness: 0.7,
		metalness: 0.1,
		reflectivity: 0.6,
	});
	const cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.rotation.x = Math.PI / 2;
	cylinder.rotation.z = rotation;
	cylinder.position.copy(position);
	cylinder.userData.initialPosition = position.clone();
	cylinder.add(textMesh);
	scene.add(cylinder);
};

const loader = new FontLoader();
const coins = [
	{ text: 'Figma', color: 0x005500, rotationZ: -0.4 },
	{ text: 'GSAP', color: 0x00ff00, rotationZ: 0 },
	{ text: 'Pixi', color: 0x550000, rotationZ: 0.4 },
	{ text: 'Three', color: 0xff0000, rotationZ: -0.4 },
	{ text: 'Scss', color: 0x000022, rotationZ: 0 },
	{ text: 'Svg', color: 0x000055, rotationZ: 0.4 },
	{ text: 'Vue', color: 0x000055, rotationZ: -0.4 },
	{ text: 'Nuxt', color: 0x002200, rotationZ: 0 },
	{ text: 'Canvas', color: 0x0000ff, rotationZ: 0.4 },
];
const rows = 3;
const cols = 3;
const gap = 7;

loader.load(
	'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	font => {
		for (let i = 0; i < coins.length; i++) {
			const row = Math.floor(i / rows);
			const col = i % cols;
			const x = col * gap - (gap * (cols - 1)) / 2;
			const y = row * gap - (gap * (rows - 1)) / 2;
			createCoin(
				coins[i].text,
				font,
				coins[i].color,
				new THREE.Vector3(x, y, 0),
				coins[i].rotationZ,
			);
		}
	},
);

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

let time = 0;
function animate() {
	time += 0.005;
	camera.updateMatrixWorld();
	renderer.render(scene, camera);

	// lights 회전
	if (lights) {
		const r = 15;
		const gap = THREE.MathUtils.degToRad(360 / lights.length);
		lights.forEach((light, i) => {
			light.position.set(
				gap * i,
				Math.cos(time + gap * i) * r,
				Math.sin(time + gap * i) * r,
			);
		});
	}

	// coins move 이벤트
	raycaster.setFromCamera(mouse, camera);

	const intersects = raycaster.intersectObjects(scene.children);
	for (const object of scene.children) {
		const initialPosition = object.userData.initialPosition;
		const intersected = intersects.some(i => i.object === object);
		const targetPosition = intersected
			? initialPosition
					.clone()
					.add(
						intersects[0].point
							.clone()
							.sub(initialPosition)
							.normalize()
							.multiplyScalar(-0.5),
					)
			: initialPosition;

		gsap.to(object.position, { duration: 0.5, ...targetPosition });
	}

	raf = requestAnimationFrame(animate);
}

const onMouseMove = e => {
	mouse.x = (e.clientX / containerRef.value.offsetWidth) * 2 - 1;
	mouse.y = -(e.clientY / containerRef.value.offsetHeight) * 2 + 1;
};

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
	camera.position.set(0, 0, 20);

	init();
	animate();

	renderer.domElement.addEventListener('mousemove', onMouseMove);
	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	cancelAnimationFrame(raf);
	renderer.dispose();

	renderer.domElement.removeEventListener('mousemove', onMouseMove);
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
