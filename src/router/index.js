import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Fog from '../pages/Fog.vue';
import Fit from '../pages/ZoomFitModel.vue';

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
	],
});

export default router;
