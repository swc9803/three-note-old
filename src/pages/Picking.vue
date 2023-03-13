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
let time = 0;

const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
scene.background = new THREE.Color(0x555555);

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

class Particle {
	constructor(scene, geometry, material, x, y) {
		const mesh = new THREE.Mesh(geometry, material);
		mesh.position.set(x, y, 0);
		scene.add(mesh);
		mesh.wrapper = this;
		this.awakenTime = undefined;
		this._mesh = mesh;
	}

	awake(time) {
		if (!this.awakenTime) {
			this.awakenTime = time;
		}
	}

	update(time) {
		if (this.awakenTime) {
			const period = 12.0;
			const t = time - this.awakenTime;
			if (t >= period) {
				this.awakenTime = undefined;
			}

			this._mesh.rotation.x = THREE.MathUtils.lerp(
				0,
				Math.PI * 2 * period,
				t / period,
			);
			let h_s, l;
			if (t < period / 2) {
				h_s = THREE.MathUtils.lerp(0.0, 1.0, t / (period / 2));
				l = THREE.MathUtils.lerp(0.1, 1.0, t / (period / 2));
			} else {
				h_s = THREE.MathUtils.lerp(1.0, 0.0, t / (period / 2.0) - 1);
				l = THREE.MathUtils.lerp(1.0, 0.1, t / (period / 2.0) - 1);
			}

			this._mesh.material.color.setHSL(h_s, h_s, l);

			this._mesh.position.z = h_s * 15.0;
		}
	}
}

// model
const geometry = new THREE.BoxGeometry();
for (let x = -20; x <= 20; x += 1.1) {
	for (let y = -20; y <= 20; y += 1.1) {
		const color = new THREE.Color();
		color.setHSL(0, 0, 0.1);
		const material = new THREE.MeshStandardMaterial({ color });

		new Particle(scene, geometry, material, x, y);
	}
}

// raycaster
const raycaster = new THREE.Raycaster();
raycaster.cursorNormalizedPosition = undefined;

const onMouseMove = e => {
	const width = containerRef.value.offsetWidth;
	const height = containerRef.value.offsetHeight;

	const x = (e.offsetX / width) * 2 - 1;
	const y = -(e.offsetY / height) * 2 + 1;

	raycaster.cursorNormalizedPosition = { x, y };
};

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
	time += 0.015;
	camera.updateMatrixWorld();
	if (raycaster && raycaster.cursorNormalizedPosition) {
		raycaster.setFromCamera(raycaster.cursorNormalizedPosition, camera);
		const targets = raycaster.intersectObjects(scene.children);
		if (targets.length > 0) {
			const mesh = targets[0].object;
			const particle = mesh.wrapper;
			particle.awake(time);
		}
	}
	scene.traverse(obj3d => {
		if (obj3d instanceof THREE.Mesh) {
			obj3d.wrapper.update(time);
		}
	});

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
	camera.position.set(0, 0, 40);

	init();
	animate();

	renderer.domElement.addEventListener('mousemove', onMouseMove);
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
