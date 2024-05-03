import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [{
      path: '/home',
      name: 'home',
      component: ()=> import('../views/Home.vue')
    },{
      path: '/signin',
      name: 'signin',
      component: ()=> import('../views/Signin.vue')
    },{
      path: '/signup',
      name: 'signup',
      component: ()=> import('../views/Signup.vue')
    },{
      path: '/member',
      name: 'member',
      component: ()=> import('../views/Member.vue')
    },{
      path: '/employee',
      name: 'employee',
      component: ()=> import('../views/Employee.vue')
    },{
      path: '/manager',
      name: 'manager',
      component: ()=> import('../views/Manager.vue')
    },{
        path: '/:pathMatch(.*)*',
        name: 'error',
        redirect:'signin'
      }
  ]
})

export default router