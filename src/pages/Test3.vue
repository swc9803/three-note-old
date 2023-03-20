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

let startY = null;
let currentY = null;
let delta = null;
let progress = 0;

let isAnimated = true;

let section1 = true;
let section2 = false;
let section3 = false;

const sectionAni1 = gsap.timeline({
	paused: true,
	onComplete: () => (isAnimated = false),
	onReverseComplete: () => (isAnimated = false),
});
const sectionAni2 = gsap.timeline({ paused: true });

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

const cubesTweens = [];
const cubes = new THREE.Group();
scene.add(cubes);
const loader = new THREE.TextureLoader();
const image = new Image();
image.src = '/origin.png';
image.onload = () => {
	const parts = splitImage(image, 3, 3);
	const boxSize = new THREE.Vector2(350, 466.67);
	const geometry = new THREE.BoxGeometry(boxSize.x / 100, boxSize.y / 100, 1);

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
	gsap.delayedCall((parts.length - 1) * 0.3 + 1, () => {
		isAnimated = false;
	});

	// cubes.children.forEach(cube => {
	// 	const cubeTween = gsap.to(cube.scale, {
	// 		x: 0.75,
	// 		y: 0.75,
	// 		onComplete: () => {
	// 			gsap.to(cube.scale, {
	// 				x: 0.2,
	// 				y: 0.2,
	// 			});
	// 			gsap.to(cube.position, {
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 		},
	// 	});
	// 	cubesTweens.push(cubeTween);
	// });
	// sectionAni1.add(cubesTweens);

	cubes.children.forEach(cube => {
		const cubeTween1 = gsap.to(cube.scale, {
			x: 0.75,
			y: 0.75,
		});
		const cubeTween2 = gsap.to(cube.scale, {
			x: 0.2,
			y: 0.2,
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
		cubes.rotation.x = -mouse.y * 0.1;
		cubes.rotation.y = mouse.x * 0.1;
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
	// cubes.children.forEach(cube => {
	// 	sectionAni1.to(cube.scale, {
	// 		x: 0.75,
	// 		y: 0.75,
	// 		onComplete: () => {
	// 			sectionAni1.to(cube.scale, {
	// 				x: 0.2,
	// 				y: 0.2,
	// 			});
	// 			sectionAni1.to(cube.position, {
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 		},
	// 	});
	// });
	// cubes.children.forEach(cube => {
	// 	sectionAni2.to(cube.scale, {
	// 		x: 0.75,
	// 		y: 0.75,
	// 		onComplete: () => {
	// 			sectionAni2.to(cube.scale, {
	// 				x: 0.2,
	// 				y: 0.2,
	// 			});
	// 			sectionAni2.to(cube.position, {
	// 				x: 0,
	// 				y: 0,
	// 			});
	// 		},
	// 	});
	// });

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
	cancelAnimationFrame(raf);
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
