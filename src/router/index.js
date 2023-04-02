import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Fog from '../pages/Fog.vue';
import Fit from '../pages/ZoomFitModel.vue';
import Fbx from '../pages/Fbx.vue';
import Background from '../pages/Background.vue';
import DynamicMap from '../pages/DynamicMap.vue';
import Glass from '../pages/Glass.vue';
import Picking from '../pages/Picking.vue';
import Hdr from '../pages/Hdr.vue';
import Jewel from '../pages/Jewel.vue';
import Tunnel from '../pages/Tunnel.vue';
import Test from '../pages/Test.vue';
import Test2 from '../pages/Test2.vue';
import Test3 from '../pages/Test3.vue';
import Test4 from '../pages/Test4.vue';
import Test5 from '../pages/Test5.vue';
import Test6 from '../pages/Test6.vue';

const router = createRouter({
	history: createWebHistory(import.meta.env.BASE_URL),
	routes: [
		{
			path: '/',
			name: 'home',
			component: Home,
		},
		{
			path: '/fog',
			name: 'fog',
			component: Fog,
		},
		{
			path: '/fit',
			name: 'fit',
			component: Fit,
		},
		{
			path: '/fbx',
			name: 'fbx',
			component: Fbx,
		},
		{
			path: '/background',
			name: 'background',
			component: Background,
		},
		{
			path: '/dynamic',
			name: 'dynamic',
			component: DynamicMap,
		},
		{
			path: '/glass',
			name: 'glass',
			component: Glass,
		},
		{
			path: '/picking',
			name: 'picking',
			component: Picking,
		},
		{
			path: '/hdr',
			name: 'hdr',
			component: Hdr,
		},
		{
			path: '/jewel',
			name: 'jewel',
			component: Jewel,
		},
		{
			path: '/tunnel',
			name: 'tunnel',
			component: Tunnel,
		},
		{
			path: '/test',
			name: 'test',
			component: Test,
		},
		{
			path: '/test2',
			name: 'test2',
			component: Test2,
		},
		{
			path: '/test3',
			name: 'test3',
			component: Test3,
		},
		{
			path: '/test4',
			name: 'test4',
			component: Test4,
		},
		{
			path: '/test5',
			name: 'test5',
			component: Test5,
		},
		{
			path: '/test6',
			name: 'test6',
			component: Test6,
		},
	],
});

export default router;
