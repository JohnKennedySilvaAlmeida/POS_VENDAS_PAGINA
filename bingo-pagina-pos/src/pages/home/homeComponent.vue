<template>       
      <div>

        <b-navbar type="dark" variant="dark">
          <b-navbar-nav>
            <b-nav-item href="#"><b-icon icon="house-door" scale="1.23"></b-icon> </b-nav-item>

            <b-nav-item-dropdown text="Menu" right>
              <!-- <b-dropdown-item href="/#/venda">Venda</b-dropdown-item>
              <b-dropdown-item href="#">Atualizar</b-dropdown-item>
              <b-dropdown-item href="/#/cadastro">Usuários</b-dropdown-item> -->
              <b-dropdown-item @click="removeStorage" href="/">Sair</b-dropdown-item>
            </b-nav-item-dropdown>
          </b-navbar-nav>
        </b-navbar><br>

        <div class="">

          <div class="mt-3">
            <b-card-group deck>
              <b-card bg-variant="dark" header="Venda" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/venda" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="file-earmark" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>
              </b-card>

              <b-card v-if="validaPersmissao" bg-variant="dark" header="Cadastro de Usuário" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/cadastro" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="file-person-fill" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>  
              </b-card>

              <b-card bg-variant="dark" header="Atualizar" text-variant="white" class="cardMenu text-center">
                <b-button href="#" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="caret-right-square" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>  
              </b-card>

              <b-card bg-variant="dark" header="Histórico" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/relatorio" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="card-checklist" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>  
              </b-card>

              <b-card v-if="validaPersmissao" bg-variant="dark" header="Usuários" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/usuario" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="card-list" variant="info" scale="0.75"></b-icon>         
                  </b-iconstack>
                </b-button>  
              </b-card>
              
              <b-card bg-variant="dark" header="Sair" text-variant="white" class="cardMenu text-center">
                <b-button @click="removeStorage" href="/ " variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="exclamation-circle-fill" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>     
              </b-card>

              <!-- <b-card v-if="validaPersmissao" bg-variant="dark" header="Cadastro de Evento" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/cadastro_event" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="calendar" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>  
              </b-card>

              <b-card v-if="validaPersmissao" bg-variant="dark" header="Usuários" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/usuario" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="card-list" variant="info" scale="0.75"></b-icon>
                 
                  </b-iconstack>
                </b-button>  
              </b-card> -->
              
              <!-- 
               <b-card bg-variant="dark" header="Eventos" text-variant="white" class="text-center">
                <b-button href="/#/eventos" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="card-heading" variant="info" scale="0.75"></b-icon>
                     <b-icon stacked icon="slash-circle" variant="danger"></b-icon> 
                  </b-iconstack>
                </b-button>  
              </b-card><br> 
               -->

              <!-- <b-card bg-variant="dark" header="Relatório" text-variant="white" class="cardMenu text-center">
                <b-button href="/#/relatorio" variant="dark">
                  <b-iconstack font-scale="5">
                    <b-icon stacked icon="card-checklist" variant="info" scale="0.75"></b-icon>
                  </b-iconstack>
                </b-button>  
              </b-card> -->

            </b-card-group>
          </div>
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
      }
    },
    components:{
     //  Home - telas
    },
    
    mounted: function(){
      // //  montar
    },
    computed: {
      validaPersmissao() {
        return sessionStorage.userAdm == 'false' ? false : true
      }
    },
    methods:{
      submit_(){
        this.alert_ = false
        if(this.senha == "")
          this.alert_ = true
        else if(this.usuario == "") 
          this.alert_ = true 
        else{
          this.progresso_ = true
          this.$router.push({name: 'home'});
        }     
      },
      removeStorage() {
        if(sessionStorage.userId)
          sessionStorage.clear()
      }
    }
  }
</script>

<style>
  .cardMenu {
    margin-bottom: 20px;
  }
 
  .card-header{
      color:rgba(255,255,255,.55);
  }
   
</style>
