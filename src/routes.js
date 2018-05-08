import layout from './components/layout.vue'
import layout2 from './components/layout2.vue'
import transfer from './components/transfer.vue'
import deposit from './components/deposit.vue'

export default [
    { path:'/3', component:layout },
    { path: '/', redirect: '/3' },
    { path:'/4', component:layout2 },
    { path:'/5', component:transfer },
    { path:'/6', component:deposit }
]