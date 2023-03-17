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

// light
// const light = new THREE.DirectionalLight(0xffffff, 1);
// light.position.set(1, 1, 1);
// scene.add(light);

const lights = [];
for (let i = 0; i < 4; i++) {
	const spotLight = new THREE.SpotLight(0xffffff, 0.5);
	lights.push(spotLight);
	scene.add(spotLight);
}

// model
let cylinder;
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
	const cylinderMaterial = new THREE.MeshBasicMaterial({
		color: color,
		side: THREE.DoubleSide,
	});
	cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.rotation.x = Math.PI / 2;
	cylinder.rotation.z = rotation;
	cylinder.position.copy(position);

	cylinder.add(textMesh);
	scene.add(cylinder);
};

const loader = new FontLoader();
loader.load(
	'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	font => {
		createCoin('Vue', font, 0x000055, new THREE.Vector3(-15, -1, 0), 0.7);
		createCoin('Three', font, 0xff0000, new THREE.Vector3(-10, 1, 0), -0.7);
		createCoin('GSAP', font, 0x00ff00, new THREE.Vector3(-5, 0, 0), 0);
		createCoin('Canvas', font, 0x0000ff, new THREE.Vector3(0, -1, 0), 0.7);
		createCoin('Pixi', font, 0x550000, new THREE.Vector3(5, -1, 0), 0.7);
		createCoin('Figma', font, 0x005500, new THREE.Vector3(10, -1, 0), 0.7);
		createCoin('Svg', font, 0x000055, new THREE.Vector3(15, -1, 0), 0.7);
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

	raycaster.setFromCamera(mouse, camera);
	// calculate objects intersecting the picking ray
	const intersects = raycaster.intersectObjects(scene.children, true);

	// loop through each cylinder and check if the mouse is close enough
	for (const object of scene.children) {
		if (object instanceof THREE.Mesh) {
			const distance =
				intersects.length > 0
					? intersects[0].point.distanceTo(object.position)
					: 100;
			if (distance < 5) {
				const direction = new THREE.Vector3()
					.subVectors(object.position, intersects[0].point)
					.normalize();
				object.position.addScaledVector(direction, 0.01);
			}
		}
	}

	raf = requestAnimationFrame(animate);
}

const onmouseMove = e => {
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

	renderer.domElement.addEventListener('mousemove', onmouseMove);
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
