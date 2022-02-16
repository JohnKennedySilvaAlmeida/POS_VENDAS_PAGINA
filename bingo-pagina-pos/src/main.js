import Vue from 'vue'
import App from './App.vue'
import VueRouter from 'vue-router'
import axios from "axios";

import 'bootstrap/dist/css/bootstrap.min.css'
import {BootstrapVue, IconsPlugin} from  'bootstrap-vue'

import loginComponent from './pages/login/loginComponent'
import homeComponent from './pages/home/homeComponent'
import cadastro from './pages/cadastro/cadastro'
import relatorio from './pages/relatorio/relatorio'
import venda from './pages/venda/venda'
import usuario from './pages/usuario/usuario'
import cadastro_event from './pages/cadastro_event/cadastro_event'
import imprimirCartela from './pages/imprimirCartela/imprimirCartela'
// import eventos from './pages/eventos/eventos'

Vue.config.productionTip = false
Vue.use(VueRouter)
Vue.use(BootstrapVue)
Vue.use (IconsPlugin)

// Paginas - rotas
const routes = [
  {path: '/', name:'login', component: loginComponent},
  {path: '/home', name:'home', component: homeComponent},
  {path: '/cadastro', name:'cadastro', component: cadastro},
  {path: '/relatorio', name:'relatorio', component: relatorio},
  {path: '/venda', name:'venda', component: venda},
  {path: '/usuario', name:'usuario', component: usuario},
  {path: '/cadastro_event', name:'cadastro_event', component: cadastro_event},
  {path: '/imprimir_cartela', name:'imprimir_cartela', component: imprimirCartela},
  // {path: '/eventos', name:'eventos', component: eventos}
]

const rotasAutorizadas = ['login','home','venda','relatorio']

const router = new VueRouter({
  routes
})
 
new Vue({
  BootstrapVue,
  IconsPlugin,
  router,
  render: h => h(App),
  watch: {
    '$route': function(to, from) {
      axios.get(`http://localhost:9090/login/${sessionStorage.userId}`)
      .then((res) => {
        if(res.data) {
          sessionStorage.userId = res.data._id
          sessionStorage.userAdm = res.data.adm
          if(sessionStorage.userAdm == 'false' && rotasAutorizadas.includes(to.name) == false) {
            this.$router.push({name:'home'})
          }
        }
      })
      .catch(() => {
        if(!sessionStorage.userId)
          this.$router.push({name:'login'})
      })
    }
  }
}).$mount('#app')
