<template>
  <div class="container"><br/><br/><br/>
    <div class="col-12">
      
      <h1>LOGIN</h1><br/>
      <div class="col-19">
        <b-form-input @click="alert_=false" v-model="usuario"  minlength="4" maxlength="60" placeholder="Usuário" ></b-form-input>
      </div><br/>

      <div class="col-12">
        <b-form-input @click="alert_=false" v-model="senha"  minlength="4" maxlength="40" Type="password" placeholder="Senha" ></b-form-input>
      </div>
      <br/>
      <div class="col-12 alert alert-danger" role="alert" v-if="alert_">
        <span >Usuario não encontrado ou senha inválida</span>
      </div>
      <br/>


      <div class="col-12">
        <b-button variant="outline-primary" @click.prevent="submit_" >ENTER</b-button>
      </div><br/><br/> 

    </div>
  </div>
</template>


<script>
  import Vue from 'vue'
  import { FormGroupPlugin } from 'bootstrap-vue'
  import { InputGroupPlugin } from 'bootstrap-vue'
  import { BFormInput } from 'bootstrap-vue'
  import { BFormGroup } from 'bootstrap-vue'
  import { SpinnerPlugin } from 'bootstrap-vue'
  import { AlertPlugin } from 'bootstrap-vue'
  import axios from 'axios'
  
  Vue.component('b-form-input', BFormInput);
  Vue.component('b-input-group', BFormGroup);
  Vue.use(AlertPlugin)
  Vue.use(SpinnerPlugin);
  Vue.use(InputGroupPlugin);
  Vue.use(FormGroupPlugin);
  
  export default {
    name:'loginComponent',
    
    data(){
      return {
        senha: "",
        usuario: "",
        alert_: false,
        progresso_: false,
        usuarioLogado: null
      }
    },

    components:{
     //  Home - telas
    },
    mounted() {
      if (sessionStorage.userId) {
        this.usuarioLogado = localStorage.userId;
        this.progresso_ = true
        this.$router.push({name: 'home'});
      }
    },
    methods:{
      submit_(){
          this.buscaUsuario()
          .then(data => {
            if(data.data) {
              this.usuarioLogado = data.data._id
              sessionStorage.userId = data.data._id
              sessionStorage.userAdm = data.data.adm
            }
            this.alert_ = false
            if(this.senha == "")
              this.alert_ = true
            else if(this.usuario == "") 
              this.alert_ = true
            else if(this.usuarioLogado == null) {
              this.alert_ = true
            }
            else {
              this.progresso_ = true
              this.$router.push({name: 'home'});
            }
          })
      },
      buscaUsuario() {
        return axios.post('http://localhost:9090/login', {
          login: this.usuario,
          senha: this.senha
        })
      }
    }
  }

</script>

<style>
   body {
      background:#7146b5 !important;
    }

    h1{
        color: #fff ;
        border-color:red ;
    }

    #container_ {
        width: 100px;
        height: 100px;
    }

    .container{
      background:#2C292D;
      margin-top: 110px;
    }
   
</style>