import { createRouter, createWebHistory, type RouteRecordRaw } from "vue-router";
import HelloWorld from "./components/HelloWorld.vue";
import Error from "./components/Error.vue";

const routes: RouteRecordRaw[] = [
    {
        path: '/',
        component: HelloWorld
    },
    {
        path: '/about',
        component: HelloWorld
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