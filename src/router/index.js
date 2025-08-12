import {createRouter, createWebHistory} from 'vue-router'

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes: [
        {
            path: '/',
            component: () => import('../views/HomePageView.vue'),
            children: [
                {
                    path: '',
                    component: () => import('../views/AllImageView.vue'),
                },
                {
                    path: '/:folder',
                    component: () => import('../views/FolderImageView.vue'),
                    name: 'FolderImageView',
                }
            ]
        },
    ],
})

export default router
