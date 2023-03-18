<template>
	<div class="wrapper">
		<div ref="containerRef" class="container" />
	</div>
</template>

<script setup>
import * as THREE from 'three';
import gsap from 'gsap';

const containerRef = ref();
let camera;
let raf;

const mouse = new THREE.Vector2();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
scene.background = new THREE.Color(0x555555);

// light
const light = new THREE.DirectionalLight(0xffffff, 1);
light.position.set(1, 1, 1);
scene.add(light);

// model
function splitImage(image, rows, cols) {
	const canvas = document.createElement('canvas');
	const context = canvas.getContext('2d');
	const width = image.width / cols;
	const height = image.height / rows;
	const parts = [];

	canvas.width = width;
	canvas.height = height;

	for (let row = 0; row < rows; row++) {
		for (let col = 0; col < cols; col++) {
			context.drawImage(
				image,
				col * width,
				row * height,
				width,
				height,
				0,
				0,
				width,
				height,
			);
			const part = new Image();
			part.src = canvas.toDataURL();
			parts.push(part);
		}
	}
	return parts;
}

const cubes = new THREE.Group();
scene.add(cubes);
const loader = new THREE.TextureLoader();
const image = new Image();
image.src = '/origin.png';
image.onload = () => {
	const parts = splitImage(image, 3, 3);
	const boxSize = new THREE.Vector2(350, 466.67);
	const geometry = new THREE.BoxGeometry(
		boxSize.x / 100,
		boxSize.y / 100,
		0.1,
	);

	for (let i = 0; i < parts.length; i++) {
		const material = new THREE.MeshBasicMaterial({
			map: loader.load(parts[i].src),
		});
		const cube = new THREE.Mesh(geometry, material);
		const x = (i % 3) - 1;
		const y = Math.floor((parts.length - 1 - i) / 3) - 1;
		cube.position.set((x * boxSize.x) / 100, (y * boxSize.y) / 100, 0);
		scene.add(cube);
		cubes.add(cube);
		const delay = i * 0.3;
		gsap.from(cube.position, {
			x: 50,
			delay,
			duration: 1,
			ease: 'power2.out',
		});
		gsap.from(cube.scale, {
			x: 6,
			y: 6,
			delay,
			duration: 1,
			ease: 'power2.out',
		});
		gsap.to(cube.rotation, {
			y: -Math.PI * 2,
			delay,
			duration: 1,
			ease: 'none',
		});
	}
};

function init() {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
}

function animate() {
	camera.updateMatrixWorld();
	renderer.render(scene, camera);
	raf = requestAnimationFrame(animate);
}

const onMouseMove = e => {
	mouse.x = (e.clientX / containerRef.value.offsetWidth) * 2 - 1;
	mouse.y = -(e.clientY / containerRef.value.offsetHeight) * 2 + 1;
	cubes.rotation.x = -mouse.y * 0.1;
	cubes.rotation.y = mouse.x * 0.1;
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
	camera.position.set(0, 0, 10);
	init();
	animate();

	setTimeout(() => {
		cubes.children.forEach(cube => {
			gsap.to(cube.scale, {
				x: 0.75,
				y: 0.75,
				onComplete: () => {
					gsap.to(cube.scale, {
						x: 0.2,
						y: 0.2,
					});
					gsap.to(cube.position, {
						x: 0,
						y: 0,
					});
				},
			});
		});
	}, 4000);

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
