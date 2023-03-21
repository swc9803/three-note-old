<template>
	<div class="wrapper">
		<div ref="containerRef" class="container" />
	</div>
</template>

<script setup>
import { watch } from 'vue';
import * as THREE from 'three';
// import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import gsap from 'gsap';

const containerRef = ref();
let camera;

let startY = null;
let currentY = null;
let delta = null;
let progress = 0;
let time = 0;

let isAnimated = true;

let section1 = true; // 사진
let section2 = false; // 스킬
let section3 = false; // 보석
// let section4 = false;   // 꿈

// watch(sizeValue, () => {
//   input.value.style.fontSize = `${sizeValue.value / 5}em`;
// });

const sectionAni1 = gsap.timeline({
	paused: true,
	onComplete: () => (isAnimated = false),
	onReverseComplete: () => (isAnimated = false),
});
const sectionAni2 = gsap.timeline({ paused: true });

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true });
scene.background = new THREE.Color(0x555555);

// light
const light = new THREE.DirectionalLight(0xffffff, 0.6);
scene.add(light);
const lights = [];
for (let i = 0; i < 4; i++) {
	const spotLight = new THREE.SpotLight(0xffffff, 0.5);
	lights.push(spotLight);
	scene.add(spotLight);
}

// section1 model
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

const cubesTweens = [];
const cubes = new THREE.Group();
scene.add(cubes);
const textureLoader = new THREE.TextureLoader();
const image = new Image();
image.src = '/origin.png';
image.onload = () => {
	const parts = splitImage(image, 3, 3);
	const boxSize = new THREE.Vector2(350, 466.67);
	const geometry = new THREE.BoxGeometry(boxSize.x / 100, boxSize.y / 100, 1);

	for (let i = 0; i < parts.length; i++) {
		const material = new THREE.MeshBasicMaterial({
			map: textureLoader.load(parts[i].src),
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
	gsap.delayedCall((parts.length - 1) * 0.3 + 1, () => {
		isAnimated = false;
	});

	cubes.children.forEach(cube => {
		const cubeTween1 = gsap.to(cube.scale, {
			x: 0.75,
			y: 0.75,
		});
		const cubeTween2 = gsap.to(cube.scale, {
			x: 0,
			y: 0,
			delay: 0.5,
		});
		const cubeTween3 = gsap.to(cube.position, {
			x: 0,
			y: 0,
			delay: 0.5,
		});
		cubesTweens.push(cubeTween1);
		cubesTweens.push(cubeTween2);
		cubesTweens.push(cubeTween3);
	});
	// 조건문으로 로드 되면 수정
	setTimeout(() => {
		cylinders.children.forEach(cylinder => {
			const cylinderTween1 = gsap.from(cylinder.rotation, {
				z: -1,
			});
			const cylinderTween2 = gsap.to(cylinder.scale, {
				x: 1,
				y: 1,
				z: 1,
			});
			const cylinderTween3 = gsap.from(cylinder.position, {
				x: 0,
				y: 0,
			});
			cylindersTweens.push(cylinderTween1);
			cylindersTweens.push(cylinderTween2);
			cylindersTweens.push(cylinderTween3);
		});
		sectionAni1.add(cylindersTweens);
	}, 2000);
	sectionAni1.add(cubesTweens);
};

// section2 model
let cylindersTweens = [];
let cylinders = new THREE.Group();
scene.add(cylinders);
let cylinder;
const createCoin = (text, font, color, position, rotation) => {
	const textGeometry = new TextGeometry(text, {
		font: font,
		size: 1,
		height: 0.5,
		curveSegments: 12,
		bevelEnabled: true,
		bevelThickness: 0.03,
		bevelSize: 0.02,
		bevelOffset: 0.005,
		bevelSegments: 24,
	});
	textGeometry.center();

	const textMaterial = new THREE.MeshStandardMaterial({
		color: 0xfcff6d,
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
		reflectivity: 0.3,
	});
	cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.rotation.x = Math.PI / 2;
	cylinder.rotation.z = rotation;
	cylinder.position.copy(position);
	cylinder.userData.initialPosition = position.clone();
	cylinder.scale.set(0, 0, 0);
	cylinder.add(textMesh);
	scene.add(cylinder);
	cylinders.add(cylinder);
};

const fontLoader = new FontLoader();
const coins = [
	{ text: 'Figma', color: 0x005500, rotationZ: -0.3 },
	{ text: 'GSAP', color: 0x00ff00, rotationZ: 0 },
	{ text: 'Pixi', color: 0x550000, rotationZ: 0.4 },
	{ text: 'Three', color: 0x000000, rotationZ: -0.4 },
	{ text: 'Scss', color: 0xc66394, rotationZ: 0 },
	{ text: 'Svg', color: 0xde7a24, rotationZ: 0.4 },
	{ text: 'Vue', color: 0x33475b, rotationZ: -0.4 },
	{ text: 'Nuxt', color: 0x108371, rotationZ: 0 },
	{ text: 'Canvas', color: 0xf0d91d, rotationZ: 0.3 },
];
const rows = 3;
const cols = 3;
const gap = 6.5;

fontLoader.load(
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
				new THREE.Vector3(x, y, -7),
				coins[i].rotationZ,
			);
		}

		cylinders.children.forEach(cylinder => {
			gsap.fromTo(
				cylinder.rotation,
				{
					z: '+=0.5',
				},
				{
					z: '-=1',
					duration: 4,
					delay: Math.random() * 0.5,
					ease: 'none',
					yoyo: true,
					repeat: -1,
				},
			);
		});
	},
);

function init() {
	renderer.setPixelRatio(window.devicePixelRatio);
	renderer.setSize(
		containerRef.value.offsetWidth,
		containerRef.value.offsetHeight,
	);
	containerRef.value.appendChild(renderer.domElement);
}

function animate() {
	time += 0.005;
	camera.updateMatrixWorld();
	renderer.render(scene, camera);
	raycaster.setFromCamera(mouse, camera);

	if (lights) {
		const r = 25;
		const gap = THREE.MathUtils.degToRad(360 / lights.length);
		lights.forEach((light, i) => {
			light.position.set(
				gap * i,
				Math.cos(time + gap * i) * r,
				Math.sin(time + gap * i) * r,
			);
		});
	}

	requestAnimationFrame(animate);
}

const onMouseDown = e => {
	if (!isAnimated) {
		startY = e.clientY;
		currentY = startY;
	}
};
const onMouseMove = e => {
	if (!isAnimated) {
		mouse.x = (e.clientX / containerRef.value.offsetWidth) * 2 - 1;
		mouse.y = -(e.clientY / containerRef.value.offsetHeight) * 2 + 1;
		cubes.rotation.x = -mouse.y * 0.3;
		cubes.rotation.y = mouse.x * 0.9;
		if (startY !== null) {
			currentY = e.clientY;
			delta = currentY - startY;
			progress = Math.min(
				Math.abs((delta / containerRef.value.offsetHeight) * 0.5),
				1,
			);
			if (section1) {
				if (delta > 0) {
					sectionAni1.pause();
					sectionAni1.progress(progress);
				}
			} else if (section2) {
				if (delta > 0) {
					sectionAni2.pause();
					sectionAni2.progress(progress);
				} else if (delta <= 0) {
					sectionAni1.pause();
					sectionAni1.progress(1 - progress);
				}
			} else if (section3 && delta <= 0) {
				sectionAni2.pause();
				sectionAni2.progress(1 - progress);
			}
		}
	}
};
const onMouseUp = () => {
	if (!isAnimated) {
		if (section1) {
			if (delta > 75) {
				isAnimated = true;
				sectionAni1.play();
				section1 = false;
				section2 = true;
				console.log('move to 2');
			} else {
				sectionAni1.progress(0);
			}
		} else if (section2) {
			if (delta > 75) {
				isAnimated = true;
				sectionAni2.play();
				section2 = false;
				section3 = true;
				console.log('move to 3');
			} else if (delta < -75) {
				isAnimated = true;
				sectionAni1.reverse();
				section1 = true;
				section2 = false;
				console.log('move to 1');
			} else {
				if (delta < 0) {
					isAnimated = true;
					sectionAni1.play();
				} else if (delta > 0) {
					sectionAni2.reverse();
				}
			}
		} else if (section3) {
			if (delta < -75) {
				isAnimated = true;
				sectionAni2.reverse();
				section2 = true;
				section3 = false;
				console.log('move to 2');
			} else {
				sectionAni2.progress(1);
			}
		}
		progress = 0;
		startY = null;
		currentY = null;
		delta = null;
	}
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

	renderer.domElement.addEventListener('mousemove', onMouseMove);
	renderer.domElement.addEventListener('mouseup', onMouseUp);
	renderer.domElement.addEventListener('mousedown', onMouseDown);
	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	renderer.dispose();

	renderer.domElement.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.wrapper {
	position: relative;
	width: 100%;
	height: calc(var(--vh) * 100);
	overflow: hidden;
	.container {
		position: relative;
		width: 100%;
		height: 100%;
	}
}
</style>
