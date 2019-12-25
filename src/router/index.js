import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "login",
        redirect: "/login"
    },
    {
        path: "/login",
        component: () =>
            import ('../views/login.vue'),
        children: [{
                path: 'system',
                components: {
                    jump: () =>
                        import ('../views/system.vue')
                }
            },
            {
                path: 'registry',
                components: {
                    jump: () =>
                        import ('../views/registry.vue')
                }
            }
        ]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router