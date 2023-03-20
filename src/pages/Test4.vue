<template>
	<div class="wrapper">
		<div ref="boxRef" class="box"></div>
	</div>
</template>

<script setup>
import gsap from 'gsap';

const boxRef = ref();

const sectionAni1 = gsap.timeline({ paused: true });
const sectionAni2 = gsap.timeline({ paused: true });

let startY = null;
let currentY = null;
let delta = null;
let progress = 0;

let isAnimated = false;

let section1 = true;
let section2 = false;
let section3 = false;

const onMouseDown = e => {
	startY = e.clientY;
	currentY = startY;
};
const onMouseMove = e => {
	if (startY !== null) {
		currentY = e.clientY;
		delta = currentY - startY;
		progress = Math.min(Math.abs(delta / window.innerHeight), 1);
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
};
const onMouseUp = () => {
	if (section1) {
		if (delta > 75) {
			if (!isAnimated) {
				sectionAni1.play();
			}
			section1 = false;
			section2 = true;
			console.log('move to 2');
		} else {
			sectionAni1.progress(0);
		}
	} else if (section2) {
		if (delta > 75) {
			if (!isAnimated) {
				sectionAni2.play();
			}
			section2 = false;
			section3 = true;
			console.log('move to 3');
		} else if (delta < -75) {
			if (!isAnimated) {
				sectionAni1.reverse();
			}
			section1 = true;
			section2 = false;
			console.log('move to 1');
		} else {
			if (delta < 0) {
				if (!isAnimated) {
					sectionAni1.play();
				}
			} else if (delta > 0) {
				if (!isAnimated) {
					sectionAni2.reverse();
				}
			}
		}
	} else if (section3) {
		if (delta < -75) {
			if (!isAnimated) {
				sectionAni2.reverse();
			}
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
};

const onTouchStart = e => {
	startY = e.touches[0].clientY;
	currentY = startY;
};
const onTouchMove = e => {
	if (startY !== null) {
		currentY = e.touches[0].clientY;
		delta = currentY - startY;
		progress = Math.min(Math.abs(delta / window.innerHeight), 1);
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
};
const onTouchEnd = () => {
	if (section1) {
		if (delta > 75) {
			if (!isAnimated) {
				sectionAni1.play();
			}
			section1 = false;
			section2 = true;
			console.log('move to 2');
		} else {
			sectionAni1.progress(0);
		}
	} else if (section2) {
		if (delta > 75) {
			if (!isAnimated) {
				sectionAni2.play();
			}
			section2 = false;
			section3 = true;
			console.log('move to 3');
		} else if (delta < -75) {
			if (!isAnimated) {
				sectionAni1.reverse();
			}
			section1 = true;
			section2 = false;
			console.log('move to 1');
		} else {
			if (delta < 0) {
				if (!isAnimated) {
					sectionAni1.play();
				}
			} else if (delta > 0) {
				if (!isAnimated) {
					sectionAni2.reverse();
				}
			}
		}
	} else if (section3) {
		if (delta < -75) {
			if (!isAnimated) {
				sectionAni2.reverse();
			}
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
};

const slideAnim = e => {
	if (section1) {
		if (e.deltaY > 0) {
			if (!isAnimated) {
				sectionAni1.play();
			}
			section1 = false;
			section2 = true;
			console.log('move to 2');
		} else {
			sectionAni1.progress(0);
		}
	} else if (section2) {
		if (e.deltaY > 0) {
			if (!isAnimated) {
				sectionAni2.play();
			}
			section2 = false;
			section3 = true;
			console.log('move to 3');
		} else if (e.deltaY < 0) {
			if (!isAnimated) {
				sectionAni1.reverse();
			}
			section1 = true;
			section2 = false;
			console.log('move to 1');
		} else {
			if (e.deltaY < 0) {
				if (!isAnimated) {
					sectionAni1.play();
				}
			} else if (e.deltaY > 0) {
				if (!isAnimated) {
					sectionAni2.reverse();
				}
			}
		}
	} else if (section3) {
		if (e.deltaY < 0) {
			if (!isAnimated) {
				sectionAni2.reverse();
			}
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
};

onMounted(() => {
	sectionAni1.to(boxRef.value, {
		top: 200,
		ease: 'none',
		onStart: () => {
			isAnimated = true;
			console.log('s');
		},
	});
	sectionAni2.to(boxRef.value, {
		top: 400,
		ease: 'none',
		onStart: () => {
			isAnimated = true;
			console.log('s');
		},
	});
	document.addEventListener('mousemove', onMouseMove);
	document.addEventListener('mouseup', onMouseUp);
	document.addEventListener('mousedown', onMouseDown);
	document.addEventListener('wheel', slideAnim);
	document.addEventListener('touchstart', onTouchStart);
	document.addEventListener('touchmove', onTouchMove);
	document.addEventListener('touchend', onTouchEnd);
});
</script>

<style lang="scss" scoped>
.wrapper {
	position: absolute;
	width: 100%;
	height: 100vh;
	overflow: hidden;
	.box {
		position: absolute;
		top: 0;
		width: 100px;
		height: 100px;
		background: red;
		transition: top 0.3s ease-out;
		z-index: 99;
	}
	p {
		position: absolute;
		top: 20%;
		left: 50%;
		z-index: 99;
	}
}
</style>
