import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import Error from "./components/Error.vue";
import Home from "./pages/Home.vue";
import About from "./pages/About.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: Home
    },
    {
        path: '/about',
        component: About
    },
    {
        path: '/:pathMatch(.*)*',
        component: Error
    }
];

const router = createRouter({
    history: createWebHistory(),
    routes
})

export default router;