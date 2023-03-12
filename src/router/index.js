import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Fog from '../pages/Fog.vue';
import Fit from '../pages/ZoomFitModel.vue';
import Fbx from '../pages/Fbx.vue';
import Background from '../pages/Background.vue';
import DynamicMap from '../pages/DynamicMap.vue';

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
	],
});

export default router;
