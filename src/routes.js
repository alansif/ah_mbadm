import layout from './components/layout.vue'
import layout2 from './components/layout2.vue'

export default [
    { path:'/3', component:layout },
    { path: '/', redirect: '/3' },
    { path:'/4', component:layout2 }
]