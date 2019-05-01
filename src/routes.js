import home from './components/home.vue'
import query1 from './components/query1.vue'
import query2 from './components/query2.vue'
import query3 from './components/query3.vue'
import query4 from './components/query4.vue'
import layout from './components/layout.vue'
import layout2 from './components/layout2.vue'
import transfer from './components/transfer.vue'
import deposit from './components/deposit.vue'
import consume from './components/consume.vue'
import refund from './components/refund.vue'
import changeinfo from './components/changeinfo.vue'
import changeperiod from './components/changeperiod.vue'
import recnew from './components/recnew.vue'
import recrenew from './components/recrenew.vue'
import rectransfer from './components/rectransfer.vue'
import recdeposit from './components/recdeposit.vue'
import recconsume from './components/recconsume.vue'
import recrefund from './components/recrefund.vue'
import recextend from './components/recextend.vue'

export default [
    { path: '/', component:home },
    { path:'/2', component:query1 },
    { path:'/3', component:layout },
    { path:'/4', component:layout2 },
    { path:'/5', component:transfer },
    { path:'/6', component:deposit },
    { path:'/9', component:consume },
    { path:'/7', component:refund },
    { path:'/b', component:changeinfo },
    { path:'/8', component:changeperiod },
    { path:'/c', component:query3 },
    { path:'/a', component:query2 },
    { path:'/d', component:query4 },
    { path:'/13', component:recnew },
    { path:'/14', component:recrenew },
    { path:'/15', component:rectransfer },
    { path:'/16', component:recdeposit },
    { path:'/17', component:recrefund },
    { path:'/18', component:recextend },
    { path:'/19', component:recconsume }
]