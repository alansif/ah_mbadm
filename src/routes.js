import home from './components/home.vue'
import query1 from './components/query1.vue'
import layout from './components/layout.vue'
import layout2 from './components/layout2.vue'
import transfer from './components/transfer.vue'
import deposit from './components/deposit.vue'
import consume from './components/consume.vue'
import refund from './components/refund.vue'
import changeperiod from './components/changeperiod.vue'

export default [
    { path: '/', component:home },
    { path:'/2', component:query1 },
    { path:'/3', component:layout },
    { path:'/4', component:layout2 },
    { path:'/5', component:transfer },
    { path:'/6', component:deposit },
    { path:'/9', component:consume },
    { path:'/7', component:refund },
    { path:'/8', component:changeperiod }
]