import { createRouter, createWebHistory } from 'vue-router';
import LoginForm from '../components/LoginForm.vue';
import HomePage from '../components/HomePage.vue';
import UsersPage from '@/components/UsersPage.vue';
import PostsPage from '@/components/PostsPage.vue';

const routes = [
  {
    path: '/login',
    name: 'Login',
    component: LoginForm,
  }, {
    path: '/', 
    name: 'HomePage',
    component: HomePage, 
    beforeEnter: (to, from, next) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); 
        if (isLoggedIn === 'true') {
          next(); 
        } else {
          next('/login');
        }
    }
  },{
    path: '/users', 
    name: 'UsersPage',
    component: UsersPage, 
    beforeEnter: (to, from, next) => {
        const isLoggedIn = localStorage.getItem('isLoggedIn'); 
        if (isLoggedIn === 'true') {
          next(); 
        } else {
          next('/login');
        }
    }
  },{
    path: '/posts/:userId',
    name: 'UserPosts',
    component: PostsPage,
    props: true, // userId parametresi props olarak geçiyor
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
