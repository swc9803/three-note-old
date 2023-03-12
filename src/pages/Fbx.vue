<template>
	<div class="wrapper">
		<div ref="containerRef" class="container" />
	</div>
</template>

<script setup>
import * as THREE from 'three';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import { FBXLoader } from 'three/examples/jsm/loaders/FBXLoader.js';

const containerRef = ref();
let camera;
let controls;
let raf;
let mixer;

const clock = new THREE.Clock();

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
scene.background = new THREE.Color(0x555555);

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

const zoomFit = (object3D, camera, viewMode, bFront) => {
	const box = new THREE.Box3().setFromObject(object3D);
	const sizeBox = box.getSize(new THREE.Vector3()).length();
	const centerBox = box.getCenter(new THREE.Vector3());

	let offsetX = 0,
		offsetY = 0,
		offsetZ = 0;
	viewMode === 'X'
		? (offsetX = 1)
		: viewMode === 'Y'
		? (offsetY = 1)
		: (offsetZ = 1);

	if (!bFront) {
		offsetX *= -1;
		offsetY *= -1;
		offsetZ *= -1;
	}
	camera.position.set(
		centerBox.x + offsetX,
		centerBox.y + offsetY,
		centerBox.z + offsetZ,
	);

	const halfSizeModel = sizeBox * 0.5;
	const halfFov = THREE.MathUtils.degToRad(camera.fov * 0.5);
	const distance = halfSizeModel / Math.tan(halfFov);
	const direction = new THREE.Vector3()
		.subVectors(camera.position, centerBox)
		.normalize();
	const position = direction.multiplyScalar(distance).add(centerBox);

	camera.position.copy(position);
	camera.near = sizeBox / 100;
	camera.far = sizeBox * 100;

	camera.updateProjectionMatrix();

	camera.lookAt(centerBox.x, centerBox.y, centerBox.z);
	controls.target.set(centerBox.x, centerBox.y, centerBox.z);
};

const loader = new FBXLoader();
loader.load('/dancing.fbx', model => {
	mixer = new THREE.AnimationMixer(model);
	const action = mixer.clipAction(model.animations[0]);
	action.play();
	scene.add(model);
	zoomFit(model, camera, 'Z', true);
});

function init() {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
	controls = new OrbitControls(camera, renderer.domElement);
	controls.update();
}

function animate() {
	camera.updateMatrixWorld();

	const delta = clock.getDelta();
	if (mixer) mixer.update(delta);

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
