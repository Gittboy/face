import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: "/",
        name: "login",
        redirect: "/index"
    },
    {
        path: "/index",
        component: () =>
            import ('../views/index.vue'),
        children: [{
                path: 'registry',
                components: {
                    jump: () =>
                        import ('../views/registry.vue')
                }
            },
            {
                path: 'setting',
                components: {
                    setting: () =>
                        import ('../views/setting.vue')
                }
            }
        ]
    },
    {
        path: '/system',
        components: {
            jump: () =>
                import ('../views/system.vue')
        },
        children: [{
            path: 'setting',
            components: {
                setting: () =>
                    import ('../views/setting.vue')
            }
        }]
    },
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})

export default router