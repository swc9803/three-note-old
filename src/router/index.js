import { createRouter, createWebHistory } from 'vue-router';
import Home from '../pages/Home.vue';
import Fog from '../pages/Fog.vue';

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
	],
});

export default router;
