<template>
	<transition name="init">
		<div v-show="loading" class="loadingContainer">
			<div ref="loadingRef" />
		</div>
	</transition>
	<div ref="containerRef" class="container">
		<svg
			ref="svgRef"
			xmlns="http://www.w3.org/2000/svg"
			viewBox="0 0 400 400"
		>
			<circle
				cx="200"
				cy="200"
				r="200"
				fill="url(#paint0_radial_104_6)"
				fill-opacity=".9"
			/>
			<path
				fill="#fff"
				d="M146.242 144.818c-.266-3.165-1.558-5.725-3.878-7.681-2.304-1.955-5.287-2.933-8.949-2.933-2.469 0-4.665.456-6.587 1.367-1.923.911-3.431 2.154-4.525 3.729-1.093 1.574-1.64 3.38-1.64 5.419 0 1.309.248 2.494.745 3.554.514 1.044 1.235 1.981 2.163 2.809.928.812 2.03 1.525 3.306 2.138 1.276.613 2.685 1.152 4.226 1.616l5.568 1.641c1.906.58 3.663 1.251 5.27 2.013 1.624.762 3.033 1.674 4.226 2.734 1.21 1.044 2.146 2.271 2.809 3.679.679 1.409 1.019 3.033 1.019 4.873 0 2.684-.696 5.087-2.088 7.208-1.375 2.122-3.339 3.795-5.891 5.022-2.536 1.209-5.527 1.814-8.974 1.814-3.281 0-6.14-.555-8.576-1.665-2.42-1.11-4.334-2.652-5.742-4.624-1.409-1.988-2.204-4.275-2.387-6.861h3.182c.166 2.105.837 3.928 2.014 5.469 1.193 1.525 2.776 2.701 4.748 3.53 1.972.829 4.225 1.243 6.761 1.243 2.734 0 5.146-.464 7.234-1.392 2.088-.945 3.72-2.254 4.897-3.928 1.176-1.673 1.765-3.621 1.765-5.841 0-1.79-.423-3.323-1.268-4.599-.845-1.276-2.097-2.378-3.754-3.306-1.64-.928-3.679-1.757-6.115-2.486l-5.941-1.79c-3.977-1.209-7.018-2.858-9.123-4.946-2.088-2.088-3.132-4.69-3.132-7.806 0-2.618.696-4.938 2.088-6.96 1.392-2.038 3.282-3.638 5.668-4.798 2.403-1.16 5.112-1.74 8.128-1.74 3.033 0 5.709.589 8.03 1.765 2.32 1.16 4.159 2.759 5.518 4.798 1.359 2.022 2.113 4.333 2.262 6.935h-3.057Zm29.282 38.977c-3.248 0-6.107-.853-8.576-2.56-2.469-1.723-4.4-4.077-5.792-7.06-1.375-2.983-2.063-6.363-2.063-10.142 0-3.778.696-7.159 2.088-10.142 1.392-2.983 3.323-5.336 5.792-7.059 2.469-1.724 5.311-2.586 8.526-2.586 2.42 0 4.624.498 6.613 1.492 2.005.994 3.662 2.378 4.971 4.151 1.326 1.773 2.171 3.828 2.536 6.165h-3.083c-.497-2.585-1.74-4.723-3.728-6.413-1.972-1.707-4.4-2.561-7.284-2.561-2.585 0-4.888.729-6.91 2.188-2.022 1.442-3.613 3.438-4.773 5.991-1.16 2.535-1.74 5.443-1.74 8.725 0 3.231.563 6.131 1.69 8.7 1.127 2.552 2.702 4.574 4.723 6.065 2.022 1.492 4.359 2.238 7.01 2.238 1.873 0 3.58-.373 5.121-1.119 1.558-.746 2.859-1.806 3.903-3.182 1.044-1.375 1.731-2.983 2.063-4.822h3.082c-.364 2.353-1.193 4.424-2.486 6.214-1.292 1.79-2.941 3.19-4.946 4.201-2.005 1.011-4.251 1.516-6.737 1.516Zm24.51-.795v-38.182h2.958v5.966h.274c.828-1.955 2.229-3.521 4.201-4.698 1.972-1.193 4.217-1.79 6.736-1.79h.796c.265 0 .513.008.745.025v3.058c-.198-.017-.439-.042-.72-.075-.266-.05-.597-.075-.995-.075-2.121 0-4.01.456-5.667 1.368-1.641.911-2.934 2.171-3.878 3.778-.945 1.591-1.417 3.414-1.417 5.469V183h-3.033Zm36.889.795c-3.148 0-5.949-.845-8.402-2.535-2.452-1.707-4.383-4.052-5.792-7.035-1.408-2.983-2.112-6.38-2.112-10.192 0-3.828.704-7.225 2.112-10.191 1.409-2.983 3.34-5.328 5.792-7.035 2.453-1.707 5.254-2.561 8.402-2.561 3.149 0 5.95.854 8.402 2.561 2.453 1.707 4.384 4.052 5.792 7.035 1.409 2.983 2.113 6.38 2.113 10.191 0 3.812-.704 7.209-2.113 10.192-1.408 2.983-3.339 5.328-5.792 7.035-2.452 1.69-5.253 2.535-8.402 2.535Zm0-2.808c2.668 0 4.997-.755 6.985-2.263 2.006-1.508 3.555-3.546 4.649-6.115 1.11-2.568 1.665-5.427 1.665-8.576 0-3.148-.555-5.999-1.665-8.551-1.11-2.568-2.66-4.607-4.649-6.115-1.988-1.524-4.317-2.287-6.985-2.287s-4.996.763-6.985 2.287c-1.988 1.508-3.538 3.547-4.648 6.115-1.11 2.552-1.666 5.403-1.666 8.551 0 3.149.547 6.008 1.641 8.576 1.11 2.569 2.66 4.607 4.648 6.115 2.006 1.508 4.342 2.263 7.01 2.263Zm29.786-48.896V183h-3.032v-50.909h3.032Zm15.586 0V183h-3.032v-50.909h3.032Z"
			/>
			<path
				ref="arrowRef"
				fill="#fff"
				d="M200 221c-4.418 0-8 3.582-8 8s3.582 8 8 8 8-3.582 8-8-3.582-8-8-8Zm0 88 8.66-15h-17.32l8.66 15Zm-1.5-80v66.5h3V229h-3Z"
			/>
			<defs>
				<radialGradient
					id="paint0_radial_104_6"
					cx="0"
					cy="0"
					r="1"
					gradientTransform="rotate(90 0 200) scale(200)"
					gradientUnits="userSpaceOnUse"
				>
					<stop offset=".786458" stop-color="#121212" />
					<stop offset="1" stop-opacity="0" />
				</radialGradient>
			</defs>
		</svg>
		<Transition name="slide" mode="out-in">
			<p v-if="textRef === 'text1'">{{ displayText }}</p>
			<p v-else-if="textRef === 'text2'">{{ displayText }}</p>
			<p v-else-if="textRef === 'text3'">{{ displayText }}</p>
			<p v-else-if="textRef === 'text4'">{{ displayText }}</p>
		</Transition>
	</div>
</template>

<script setup>
import { reactive, computed } from 'vue';
import * as THREE from 'three';
import { RGBELoader } from 'three/examples/jsm/loaders/RGBELoader.js';
import { FontLoader } from 'three/examples/jsm/loaders/FontLoader.js';
import { TextGeometry } from 'three/examples/jsm/geometries/TextGeometry';
import { GLTFLoader } from 'three/examples/jsm/loaders/GLTFLoader.js';
import gsap from 'gsap';

const containerRef = ref();
const loading = ref(true);
const loadingRef = ref();
let loadingValue = 0;
let progress1 = 0,
	progress2 = 0,
	progress3 = 0;

const svgRef = ref();
const arrowRef = ref();
const textRef = ref();

const text1 = 'Hello to all the people who love interactive web experiences!';
const text2 = 'I have some skills to create interactions';
const text3 = 'I think of myself as an uncut gem';
const text4 =
	'I am seeking a company that can help me refine myself to perfection';

const state = reactive({
	text: text1,
	index: 0,
});

const displayText = computed(() => {
	return state.text.slice(0, state.index);
});

let interval1;

let camera;

let startY = null;
let currentY = null;
let delta = null;
let progress = 0;
let time = 0;

let isAnimated = true;

let section1 = true;
let section2 = false;
let section3 = false;
let section4 = false;

let activeRaycaster = false;
const sectionAni1 = gsap.timeline({
	paused: true,
	onComplete: () => {
		isAnimated = false;
		activeRaycaster = true;
	},
	onReverseComplete: () => {
		isAnimated = false;
		activeRaycaster = false;
	},
});
const sectionAni2 = gsap.timeline({
	paused: true,
	onComplete: () => {
		isAnimated = false;
		activeRaycaster = false;
	},
	onReverseComplete: () => {
		isAnimated = false;
		activeRaycaster = true;
	},
});
const sectionAni3 = gsap.timeline({
	paused: true,
	onComplete: () => {
		isAnimated = false;
		activeRaycaster = false;
	},
	onReverseComplete: () => {
		isAnimated = false;
		activeRaycaster = true;
	},
});

function stopInterval(intervalId) {
	clearInterval(intervalId);
}

const mouse = new THREE.Vector2();
const raycaster = new THREE.Raycaster();
const scene = new THREE.Scene();
const renderer = new THREE.WebGLRenderer({ antialias: true });
renderer.toneMapping = THREE.ACESFilmicToneMapping;
renderer.toneMappingExposure = 2;

// light
const light = new THREE.DirectionalLight(0xffffff, 0.6);
scene.add(light);
const lights = [];
for (let i = 0; i < 4; i++) {
	const spotLight = new THREE.SpotLight(0xffffff, 0.5);
	lights.push(spotLight);
	scene.add(spotLight);
}

// loading
const loadingManager = new THREE.LoadingManager();
const loadingRGBE = new RGBELoader(loadingManager);
const loadingGLTF = new GLTFLoader(loadingManager);

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

const initCubes = [];
let initCube1, initCube2, initCube3;
const cubesTweens = [];
const cubes = new THREE.Group();
scene.add(cubes);

const textureLoader = new THREE.TextureLoader();
const image = new Image();
image.src = '/origin.png';
image.onload = () => {
	const parts = splitImage(image, 3, 3);
	let cubeSize;
	matchMedia('(max-width: 480px)').matches
		? (cubeSize = new THREE.Vector2(180, 240))
		: (cubeSize = new THREE.Vector2(360, 480));

	const geometry = new THREE.BoxGeometry(
		cubeSize.x / 100,
		cubeSize.y / 100,
		1,
	);
	for (let i = 0; i < parts.length; i++) {
		const material = new THREE.MeshBasicMaterial({
			map: textureLoader.load(parts[i].src),
			toneMapped: false,
		});
		const cube = new THREE.Mesh(geometry, material);
		const x = (i % 3) - 1;
		const y = Math.floor((parts.length - 1 - i) / 3) - 1;
		cube.position.set((x * cubeSize.x) / 100, (y * cubeSize.y) / 100, 0);
		scene.add(cube);
		cubes.add(cube);
		const delay = i * 0.3;
		initCube1 = gsap.from(cube.position, {
			x: 50,
			delay,
			duration: 1,
			ease: 'power2.out',
			paused: true,
		});
		initCube2 = gsap.from(cube.scale, {
			x: 6,
			y: 6,
			delay,
			duration: 1,
			ease: 'power2.out',
			paused: true,
		});
		initCube3 = gsap.to(cube.rotation, {
			y: -Math.PI * 2,
			delay,
			duration: 1,
			ease: 'none',
			paused: true,
		});
		initCubes.push(initCube1, initCube2, initCube3);
	}

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
	sectionAni1.add(cubesTweens);
};

// section2 model
let cylindersTweens = [];
let cylinders = new THREE.Group();
scene.add(cylinders);
let cylinder;
const createCoin = (i, text, font, color, position, rotation) => {
	let textSize;
	matchMedia('(max-width: 480px)').matches
		? (textSize = 0.5)
		: (textSize = 1);
	const textGeometry = new TextGeometry(text, {
		font: font,
		size: textSize,
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
		toneMapped: false,
	});
	const textMesh = new THREE.Mesh(textGeometry, textMaterial);
	textMesh.position.set(0, 0.25, 0);
	textMesh.rotation.x = -Math.PI / 2;

	let coinSize;
	matchMedia('(max-width: 480px)').matches
		? (coinSize = 1.5)
		: (coinSize = 3);
	const cylinderGeometry = new THREE.CylinderGeometry(
		coinSize,
		coinSize,
		0.5,
	);
	const cylinderMaterial = new THREE.MeshPhysicalMaterial({
		color: color,
		roughness: 0.6,
		metalness: 0.3,
		reflectivity: 0.6,
		toneMapped: false,
	});
	cylinder = new THREE.Mesh(cylinderGeometry, cylinderMaterial);
	cylinder.name = `coin${i}`;
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
let gap;
matchMedia('(max-width: 480px)').matches ? (gap = 3.25) : (gap = 6.5);
fontLoader.load(
	'https://threejs.org/examples/fonts/helvetiker_regular.typeface.json',
	font => {
		for (let i = 0; i < coins.length; i++) {
			const row = Math.floor(i / rows);
			const col = i % cols;
			const x = col * gap - (gap * (cols - 1)) / 2;
			const y = row * gap - (gap * (rows - 1)) / 2;
			createCoin(
				i,
				coins[i].text,
				font,
				coins[i].color,
				new THREE.Vector3(x, y, -7),
				coins[i].rotationZ,
			);
		}
	},
);

// section3 model
let diamond;
loadingGLTF.load(
	'/diamond.glb',
	model => {
		let diamondSize;
		matchMedia('(max-width: 480px)').matches
			? (diamondSize = 1.25)
			: (diamondSize = 2.5);
		diamond = model.scene;
		diamond.scale.set(0, 0, 0);
		diamond.rotation.set(0.25, 0, 0);
		diamond.traverse(child => {
			if (child instanceof THREE.Mesh) {
				const material = child.material;
				if (material instanceof THREE.MeshStandardMaterial) {
					material.toneMapped = false;
				}
			}
		});
		scene.add(diamond);

		sectionAni2.to(cylinders.scale, {
			x: 0,
			y: 0,
			z: 0,
		});
		sectionAni2.to(diamond.scale, {
			x: diamondSize,
			y: diamondSize,
			z: diamondSize,
		});
	},
	xhr => {
		progress3 = (xhr.loaded / xhr.total) * 100;
		updateProgress();
	},
);

// section4
let circleSize = 2.5;
if (matchMedia('(max-width: 480px)').matches) {
	circleSize = 1.3;
}
const circleGeometry = new THREE.CircleGeometry(circleSize, 32);
const circleMaterial = new THREE.MeshBasicMaterial({
	color: 0xffffff,
	toneMapped: false,
});
const circles = new THREE.Group();
scene.add(circles);

let circlePositionFrom = { x: -3, y: 0 };
let circlePositionTo = { x: 4.5, y: 3.3 };
if (matchMedia('(max-width: 480px)').matches) {
	circlePositionFrom.x = -1.5;
	circlePositionFrom.y = -0.7;
	circlePositionTo.x = 2.2;
	circlePositionTo.y = 2.3;
}

for (let i = 0; i < 4; i++) {
	const circle = new THREE.Mesh(circleGeometry, circleMaterial);
	circle.position.set(circlePositionFrom.x, circlePositionFrom.y, 1);
	circle.scale.set(0, 0, 0);
	scene.add(circle);
	circles.add(circle);
	circles.scale.set(0, 0, 0);
	gsap.to(circle.position, {
		x: circlePositionTo.x,
		y: circlePositionTo.y,
		z: -1.8,
		delay: (i + 1) * 1.5,
		repeatDelay: 1.5,
		duration: 3,
		repeat: -1,
		ease: 'power2.in',
	});
	gsap.to(circle.scale, {
		x: 1,
		y: 1,
		z: 1,
		delay: (i + 1) * 1.5,
		repeatDelay: 1.5,
		duration: 3,
		repeat: -1,
		ease: 'power2.in',
	});
}

let ringModel;
const setupModel = () => {
	loadingRGBE.load(
		'/kloofendal_48d_partly_cloudy_puresky_4k.hdr',
		texture => {
			texture.mapping = THREE.EquirectangularReflectionMapping;
			scene.background = texture;
			scene.environment = texture;

			loading.value = false;

			cylinders.children.forEach(cylinder => {
				const cylinderTween1 = gsap.to(cylinder.scale, {
					x: 1,
					y: 1,
					z: 1,
				});
				const cylinderTween2 = gsap.from(cylinder.position, {
					x: 0,
					y: 0,
					onStart: () => {
						gsap.to(cylinders.scale, {
							x: 1,
							y: 1,
							z: 1,
						});
					},
					onReverseComplete: () => {
						gsap.set(cylinders.scale, {
							x: 0,
							y: 0,
							z: 0,
						});
					},
				});
				cylindersTweens.push(cylinderTween1);
				cylindersTweens.push(cylinderTween2);
			});
			sectionAni1.add(cylindersTweens);

			const goldMaterial = new THREE.MeshStandardMaterial({
				color: new THREE.Color('#D4AF37'),
				envMap: texture,
				envMapIntensity: 1,
				metalness: 1,
				roughness: 0.15,
				toneMapped: false,
			});
			const gemMaterial = new THREE.MeshPhysicalMaterial({
				color: new THREE.Color('#263391'),
				metalness: 0.5,
				roughness: 0,
				opacity: 0.8,
				side: THREE.DoubleSide,
				transparent: true,
				transmission: 0.5,
				ior: 2.4,
				thickness: 0.3,
				toneMapped: false,
			});

			loadingGLTF.load(
				'/ring.glb',
				gltf => {
					ringModel = gltf.scene;

					let ringSize = 1.2;
					let ringPosition = { x: 4, y: 3 };
					let diamondPosition = { x: -3, y: -1.5 };
					if (matchMedia('(max-width: 480px)').matches) {
						ringSize = 0.6;
						ringPosition.x = 2;
						ringPosition.y = 2;
						diamondPosition.x = -1.5;
						diamondPosition.y = -1.5;
					}

					ringModel.scale.set(0, 0, 0);
					ringModel.traverse(child => {
						if (child instanceof THREE.Mesh) {
							if (child.name.startsWith('GEM')) {
								child.material = gemMaterial;
							} else {
								child.material = goldMaterial;
							}
						}
					});
					ringModel.rotation.set(6, 2.6, 2);
					scene.add(ringModel);

					sectionAni3.to(ringModel.scale, {
						x: ringSize,
						y: ringSize,
						z: ringSize,
					});
					sectionAni3.to(
						ringModel.position,
						{
							x: ringPosition.x,
							y: ringPosition.y,
						},
						'<',
					);
					sectionAni3.to(
						diamond.position,
						{
							x: diamondPosition.x,
							y: diamondPosition.y,
						},
						'<',
					);
					sectionAni3.to(
						circles.scale,
						{
							x: 1,
							y: 1,
							z: 1,
						},
						'<',
					);
					sectionAni3.to(
						renderer,
						{
							toneMappingExposure: 0.2,
						},
						'<',
					);
					initCubes.forEach(tween => {
						tween.play();
						gsap.delayedCall(8 * 0.3 + 1, () => {
							isAnimated = false;
							textRef.value = 'text1';
							svgRef.value.style.opacity = 1;
							gsap.to(arrowRef.value, {
								yPercent: 30,
								duration: 0.7,
								ease: 'power3',
								yoyo: true,
								repeat: -1,
								repeatDelay: 1,
							});
						});
					});
					setTimeout(() => {
						interval1 = setInterval(() => {
							state.index++;
						}, 50);
					}, 4300);
				},
				xhr => {
					progress2 = (xhr.loaded / xhr.total) * 100;
					updateProgress();
				},
			);
		},
		xhr => {
			progress1 = (xhr.loaded / xhr.total) * 100;
			updateProgress();
		},
	);
};
function updateProgress() {
	loadingValue = (progress1 + progress2 + progress3) / 3;
	gsap.to(loadingRef.value, {
		height: `${loadingValue}%`,
	});
}

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
	camera.position.x += (-mouse.x - camera.position.x) * 0.01;
	camera.position.y += (-mouse.y - camera.position.y) * 0.01;
	camera.lookAt(0, 0, 0);

	if (activeRaycaster && !isAnimated) {
		const intersects = raycaster.intersectObjects(scene.children, true);
		if (intersects.length > 0) {
			const object = intersects.find(intersect =>
				intersect.object.name.startsWith('coin'),
			)?.object;
			if (object) {
				gsap.to(object.rotation, {
					z: '+=2',
					duration: 2,
					ease: 'back',
				});
			}
		}
	}

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

	if (section3 || section4) {
		diamond.rotation.y = time * 0.4;
	}
	if (section4) {
		const angle = 15 * Math.sin(time);
		ringModel.rotation.y = angle * (Math.PI / 180) + 2.5;
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
	mouse.x = (e.clientX / containerRef.value.offsetWidth) * 2 - 1;
	mouse.y = -(e.clientY / containerRef.value.offsetHeight) * 2 + 1;
	if (!isAnimated) {
		if (startY !== null) {
			currentY = e.clientY;
			delta = currentY - startY;
			progress = Math.min(
				Math.abs((delta / containerRef.value.offsetHeight) * 0.5),
				1,
			);
			if (section1 && delta > 0) {
				sectionAni1.pause();
				sectionAni1.progress(progress);
			} else if (section2) {
				if (delta > 0) {
					sectionAni2.pause();
					sectionAni2.progress(progress);
				} else {
					sectionAni1.pause();
					sectionAni1.progress(1 - progress);
				}
			} else if (section3) {
				if (delta > 0) {
					sectionAni3.pause();
					sectionAni3.progress(progress);
				} else {
					sectionAni2.pause();
					sectionAni2.progress(1 - progress);
				}
			} else if (section4 && delta <= 0) {
				sectionAni3.pause();
				sectionAni3.progress(1 - progress);
			}
		}
	}
};
const onMouseUp = () => {
	if (!isAnimated) {
		if (section1) {
			if (delta > 75) {
				svgRef.value.style.opacity = 0;
				isAnimated = true;
				sectionAni1.play();
				section1 = false;
				section2 = true;
				textRef.value = 'text2';
				stopInterval(interval1);
				state.index = 0;
				state.text = text2;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				sectionAni1.progress(0);
			}
		} else if (section2) {
			if (delta > 75) {
				isAnimated = true;
				sectionAni2.play();
				section2 = false;
				section3 = true;
				textRef.value = 'text3';
				stopInterval(interval1);
				state.index = 0;
				state.text = text3;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else if (delta < -75) {
				isAnimated = true;
				sectionAni1.reverse();
				section1 = true;
				section2 = false;
				textRef.value = 'text1';
				stopInterval(interval1);
				state.index = 0;
				state.text = text1;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 400);
			} else {
				if (delta < 0) {
					isAnimated = true;
					sectionAni1.play();
				} else if (delta > 0) {
					sectionAni2.reverse();
				}
			}
		} else if (section3) {
			if (delta > 75) {
				isAnimated = true;
				sectionAni3.play();
				section3 = false;
				section4 = true;
				textRef.value = 'text4';
				stopInterval(interval1);
				state.index = 0;
				state.text = text4;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else if (delta < -75) {
				isAnimated = true;
				sectionAni2.reverse();
				section2 = true;
				section3 = false;
				textRef.value = 'text2';
				stopInterval(interval1);
				state.index = 0;
				state.text = text2;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				if (delta < 0) {
					isAnimated = true;
					sectionAni2.play();
				} else if (delta > 0) {
					sectionAni3.reverse();
				}
			}
		} else if (section4) {
			if (delta < -75) {
				isAnimated = true;
				sectionAni3.reverse();
				section3 = true;
				section4 = false;
				textRef.value = 'text3';
				stopInterval(interval1);
				state.index = 0;
				state.text = text3;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				sectionAni3.progress(1);
			}
		}
		progress = 0;
		startY = null;
		currentY = null;
		delta = null;
	}
};
const onTouchStart = e => {
	if (!isAnimated) {
		startY = e.touches[0].clientY;
		currentY = startY;
	}
};
const onTouchMove = e => {
	mouse.x = (e.touches[0].clientX / containerRef.value.offsetWidth) * 2 - 1;
	mouse.y = -(e.touches[0].clientY / containerRef.value.offsetHeight) * 2 + 1;
	if (!isAnimated) {
		if (startY !== null) {
			currentY = e.touches[0].clientY;
			delta = currentY - startY;
			progress = Math.min(
				Math.abs((delta / containerRef.value.offsetHeight) * 0.5),
				1,
			);
			if (section1 && delta > 0) {
				sectionAni1.pause();
				sectionAni1.progress(progress);
			} else if (section2) {
				if (delta > 0) {
					sectionAni2.pause();
					sectionAni2.progress(progress);
				} else {
					sectionAni1.pause();
					sectionAni1.progress(1 - progress);
				}
			} else if (section3) {
				if (delta > 0) {
					sectionAni3.pause();
					sectionAni3.progress(progress);
				} else {
					sectionAni2.pause();
					sectionAni2.progress(1 - progress);
				}
			} else if (section4 && delta <= 0) {
				sectionAni3.pause();
				sectionAni3.progress(1 - progress);
			}
		}
	}
};
const onTouchEnd = () => {
	if (!isAnimated) {
		if (section1) {
			if (delta > 75) {
				svgRef.value.style.opacity = 0;
				isAnimated = true;
				sectionAni1.play();
				section1 = false;
				section2 = true;
				textRef.value = 'text2';
				stopInterval(interval1);
				state.index = 0;
				state.text = text2;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				sectionAni1.progress(0);
			}
		} else if (section2) {
			if (delta > 75) {
				isAnimated = true;
				sectionAni2.play();
				section2 = false;
				section3 = true;
				textRef.value = 'text3';
				stopInterval(interval1);
				state.index = 0;
				state.text = text3;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else if (delta < -75) {
				isAnimated = true;
				sectionAni1.reverse();
				section1 = true;
				section2 = false;
				textRef.value = 'text1';
				stopInterval(interval1);
				state.index = 0;
				state.text = text1;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 400);
			} else {
				if (delta < 0) {
					isAnimated = true;
					sectionAni1.play();
				} else if (delta > 0) {
					sectionAni2.reverse();
				}
			}
		} else if (section3) {
			if (delta > 75) {
				isAnimated = true;
				sectionAni3.play();
				section3 = false;
				section4 = true;
				textRef.value = 'text4';
				stopInterval(interval1);
				state.index = 0;
				state.text = text4;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else if (delta < -75) {
				isAnimated = true;
				sectionAni2.reverse();
				section2 = true;
				section3 = false;
				textRef.value = 'text2';
				stopInterval(interval1);
				state.index = 0;
				state.text = text2;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				if (delta < 0) {
					isAnimated = true;
					sectionAni2.play();
				} else if (delta > 0) {
					sectionAni3.reverse();
				}
			}
		} else if (section4) {
			if (delta < -75) {
				isAnimated = true;
				sectionAni3.reverse();
				section3 = true;
				section4 = false;
				textRef.value = 'text3';
				stopInterval(interval1);
				state.index = 0;
				state.text = text3;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				sectionAni3.progress(1);
			}
		}
		progress = 0;
		startY = null;
		currentY = null;
		delta = null;
	}
};
const slideAni = e => {
	if (!isAnimated) {
		if (section1) {
			if (e.deltaY > 75) {
				svgRef.value.style.opacity = 0;
				isAnimated = true;
				sectionAni1.play();
				section1 = false;
				section2 = true;
				textRef.value = 'text2';
				stopInterval(interval1);
				state.index = 0;
				state.text = text2;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				sectionAni1.progress(0);
			}
		} else if (section2) {
			if (e.deltaY > 75) {
				isAnimated = true;
				sectionAni2.play();
				section2 = false;
				section3 = true;
				textRef.value = 'text3';
				stopInterval(interval1);
				state.index = 0;
				state.text = text3;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else if (e.deltaY < -75) {
				isAnimated = true;
				sectionAni1.reverse();
				section1 = true;
				section2 = false;
				textRef.value = 'text1';
				stopInterval(interval1);
				state.index = 0;
				state.text = text1;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 400);
			} else {
				if (e.deltaY < 0) {
					isAnimated = true;
					sectionAni1.play();
				} else if (e.deltaY > 0) {
					sectionAni2.reverse();
				}
			}
		} else if (section3) {
			if (e.deltaY > 75) {
				isAnimated = true;
				sectionAni3.play();
				section3 = false;
				section4 = true;
				textRef.value = 'text4';
				stopInterval(interval1);
				state.index = 0;
				state.text = text4;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else if (e.deltaY < -75) {
				isAnimated = true;
				sectionAni2.reverse();
				section2 = true;
				section3 = false;
				textRef.value = 'text2';
				stopInterval(interval1);
				state.index = 0;
				state.text = text2;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				if (e.deltaY < 0) {
					isAnimated = true;
					sectionAni2.play();
				} else if (e.deltaY > 0) {
					sectionAni3.reverse();
				}
			}
		} else if (section4) {
			if (e.deltaY < -75) {
				isAnimated = true;
				sectionAni3.reverse();
				section3 = true;
				section4 = false;
				textRef.value = 'text3';
				stopInterval(interval1);
				state.index = 0;
				state.text = text3;
				setTimeout(() => {
					interval1 = setInterval(() => {
						state.index++;
					}, 50);
				}, 200);
			} else {
				sectionAni3.progress(1);
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

	setupModel();

	init();
	animate();

	renderer.domElement.addEventListener('mousemove', onMouseMove);
	renderer.domElement.addEventListener('mouseup', onMouseUp);
	renderer.domElement.addEventListener('mousedown', onMouseDown);
	document.addEventListener('touchstart', onTouchStart);
	document.addEventListener('touchmove', onTouchMove);
	document.addEventListener('touchend', onTouchEnd);
	document.addEventListener('wheel', slideAni);
	window.addEventListener('resize', onResize);
});

onBeforeUnmount(() => {
	renderer.dispose();

	renderer.domElement.removeEventListener('mousemove', onMouseMove);
	window.removeEventListener('resize', onResize);
});
</script>

<style lang="scss" scoped>
.loadingContainer {
	position: absolute;
	width: 100%;
	height: 100vh;
	background: white;
	overflow: hidden;
	z-index: 1;
	div {
		position: relative;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
		width: 101%;
		height: 0;
		background: linear-gradient(rgba(0, 0, 0, 0.4), rgba(0, 0, 0, 0.4)),
			url('@/assets/preview.webp');
		background-size: cover;
		background-position: center;
	}
}
.container {
	position: absolute;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	svg {
		position: absolute;
		bottom: 4vw;
		right: 4vw;
		width: 150px;
		opacity: 0;
		transition: 1s;
		@media (max-width: 1440px) {
			& {
				width: 100px;
			}
		}
		@media (max-width: 768px) {
			& {
				width: 70px;
			}
		}
		@media (max-width: 480px) {
			& {
				width: 70px;
			}
		}
	}
	p {
		position: absolute;
		left: 50%;
		transform: translate(-50%, 0);
		bottom: 7%;
		padding: 5px 10px;
		text-align: center;
		font-size: 2em;
		line-height: 1.4;
		color: white;
		background: rgba(0, 0, 0, 0.75);
		pointer-events: none;
		@media (max-width: 1440px) {
			& {
				font-size: 1.4em;
			}
		}
		@media (max-width: 768px) {
			& {
				font-size: 1em;
			}
		}
	}
}

.init-leave-active {
	transition: 0.5s;
}
.init-leave-to {
	opacity: 0;
}

.slide-enter-active,
.slide-leave-active {
	transition: 0.5s;
}
.slide-enter-from {
	opacity: 0;
}
.slide-leave-to {
	opacity: 0;
}
</style>
