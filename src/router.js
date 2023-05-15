import {createRouter, createWebHistory} from "vue-router"
import LoginPage from "./components/LoginPage"
import HomePage from "./components/HomePage"
import LinktreePage from "./components/LinktreePage"
import ForgotPassword from "./components/ForgotpasswordPage"

const routes = [
    {
        name: 'login',
        path:"/",
        component: LoginPage
    },
    {
        name: 'home',
        path:"/home/:id",
        component: HomePage
    },
    {
        name: 'linktree',
        path:"/mylinktree/:id",
        component: LinktreePage
    },
    {
        name: 'forgotPassword',
        path:"/forgotpassword/:id",
        component: ForgotPassword
    },
]

const router = createRouter({
    routes,
    history: createWebHistory()
})

export default router;