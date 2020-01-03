import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [{
        path: "/",
        redirect: "/index"
    },
    {
        path: "/index",
        component: () =>
            import ('../views/index.vue'),
        meta: {
            title: "主页"
        },
        children: [{
            path: 'registry',
            components: {
                registry: () =>
                    import ('../views/registry.vue')
            },
            meta: {
                title: "用户注册"
            },
            children: [{
                path: 'uploadInfo',
                meta: {
                    title: "完善个人信息"
                },
                components: {
                    uploadInfo: () =>
                        import ('../views/setting.vue')
                }
            }]
        }]
    },
    {
        path: '/system',
        component: () =>
            import ('../views/system.vue'),
        redirect: "/system/tempUnlock",
        children: [{
            path: "remoteUnlock",
            components: {
                tab: () =>
                    import ('../components/remoteUnlock.vue')
            }
        }, {
            path: "tempUnlock",
            components: {
                tab: () =>
                    import ('../components/tempUnlock.vue')
            }
        }, {
            path: "selfInfo",
            components: {
                tab: () =>
                    import ('../components/selfInfo.vue')
            },
            children: [{
                path: 'setting',
                components: {
                    setting: () =>
                        import ('../views/setting.vue')
                }
            }]
        }]
    },
    {
        path: "/submit",
        component: () =>
            import ("../views/submit.vue")
    }
]

const router = new VueRouter({
    mode: 'history',
    base: process.env.BASE_URL,
    routes
})
router.beforeEach((to, from, next) => {
    /* 路由发生变化修改页面title */
    if (to.meta.title) {
        document.title = to.meta.title;
    }
    next();
})

export default router