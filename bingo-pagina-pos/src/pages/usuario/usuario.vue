<template>
  <div class="relatorio">
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="/#/home">Voltar</b-nav-item>
        </b-navbar-nav>
    </b-navbar><br>

    <b-card>
          <b-table striped small hover :items="usuarios" :fields="fields">
            <template #cell(actions)="row">
              <b-button size="sm" @click="exibeEdição(row.item, row.index, $event.target)" variant="success" class="mr-1">
                <b-icon icon="pencil-square"></b-icon>
              </b-button>

              <b-button size="sm" @click="exibeConfirmacao(row.item, row.index, $event.target)" variant="danger" class="mr-1">
                <b-icon icon="trash"></b-icon>
              </b-button>
            </template>
          </b-table>
    </b-card>

    <b-modal ref="my-modal" hide-header ok-only>
      <div class="d-block text-center">
        <p>Tem certeza que deseja remover o usuário {{selecionado.nome}}?</p>
      </div>
      <div slot="modal-footer">
        <b-btn variant="success" @click="cancelarRemocao" class="me-1">Cancelar</b-btn>
        <b-btn variant="danger" @click="confirmarRemocao"><b-icon icon="trash"></b-icon>Confirmar</b-btn>
      </div>
    </b-modal>

    <b-modal ref="my-modal-edit" hide-header ok-only>
      <div class="d-block text-center">
        <b-input-group size="lg">
          Nome
          <b-form-input  required minlength="4" maxlength="30" v-model=selecionado.nome></b-form-input>
        </b-input-group>

         <b-input-group size="lg">
          Login
          <b-form-input  required minlength="4" maxlength="30" v-model=selecionado.login></b-form-input>
        </b-input-group>

        <b-input-group size="lg">
          Senha
          <b-form-input  required minlength="4" maxlength="30" type="password" v-model=selecionado.senha></b-form-input>
        </b-input-group>

        <b-input-group size="lg">
          Tipo
          <b-form-input  required minlength="3" maxlength="9" v-model= form.tipoUser></b-form-input>
        </b-input-group>
      </div>
      <div slot="modal-footer">
        <b-btn variant="danger"  @click="cancelarRemocao" class="me-1">Cancelar</b-btn>
        <b-btn variant="success"  @click="confirmarAlter"><b-icon icon="pencil-square"></b-icon>Confirmar</b-btn>
      </div>
    </b-modal>

  </div>
</template>

<script>
import Vue from 'vue'
import axios from "axios";
import { BFormDatepicker, BModal } from 'bootstrap-vue'
Vue.component('b-form-datepicker', BFormDatepicker)
Vue.component('b-modal', BModal)

  export default {
    name:'usuario',
    components: {
    },
    mounted() {
      this.buscaUsuarios() 
    },
    data() {
      return {
        form: {
          ponto_venda: 'OFF',
          usuario: '',
          senha: '',
          login:'',
          tipo: null,
          tipoUser: '',
          senha_64: ''
        },
        value: '',
        show: true,
        fields: [
          { key: 'nome', label: 'Usuario' },
          { key: 'login', label: 'Login' },
          { key: 'adm', label: 'Tipo' },
          { key: 'actions', label: 'Opções' },
        ],
        selecionado: {},
        usuarios: []
      }
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        this.form.senha = ''
        this.form.login = ''
        this.form.ponto_venda = 'OFF'
        this.form.food = null
        this.form.usuario = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      exibeConfirmacao(item, index, button) {
        this.selecionado = item
        this.$refs['my-modal'].show()
      },
      exibeEdição(item, index, button) {
        this.selecionado = item
        
        if (this.selecionado.adm == true)
          this.form.tipoUser = "Admim"
        else
          this.form.tipoUser = "User"
        
        // this.form.senha_64 = btoa(this.selecionado.senha)

        this.$refs['my-modal-edit'].show()
      },
      buscaUsuarios() {
        axios.get('http://localhost:9090/usuario')
          .then(
            response => this.usuarios = response.data
          ).catch(function (error) {
            console.log(error);
          });
      },
      confirmarRemocao() {
        axios.delete(`http://localhost:9090/usuario/${this.selecionado._id}`)
          .then(
            response => this.usuarios = response.data
          ).catch(function (error) {
            console.log(error);
          }).finally(() => {
            this.$refs['my-modal'].hide()
            this.buscaUsuarios();
          });
      },
      confirmarAlter() {
        var erro = false

        if (this.form.tipoUser.toUpperCase() == "USER"){
          this.form.tipo = false
          erro = false
        }
        if (this.form.tipoUser.toUpperCase() == "ADMIM"){
          this.form.tipo = true
          erro = false
        }
        if(this.selecionado.nome == '' || this.selecionado.senha == '' || this.selecionado.periodo == ''){
          erro = true
          alert("Inválido! Para salvar nenhum campo deve estar vaziu.")
        }
        if(this.form.tipoUser.toUpperCase() != "USER" && this.form.tipoUser.toUpperCase() != "ADMIM"){
          erro = true
          alert("Inválido! Para salvar o campo tipo deve ser (Admim ou User).")
        }

        if (erro != true){
          // var senha = atob(this.form.senha_64)

          const eventoFormFormat = {
            login: this.selecionado.login,
            nome: this.selecionado.nome, 
            senha: this.selecionado.senha,
            periodo: this.selecionado.periodo,  //Ponto de venda !
            adm: this.form.tipo,
          }
          
          axios.put(`http://localhost:9090/usuario/${this.selecionado._id}`, eventoFormFormat)
            .then((res) => {
              alert("Usúario editado com sucesso. ", res)
            })
            .catch((error) => {
              alert("Falha ao editar usúario! ", error);
            })
            .finally(() => {
              this.$refs['my-modal-edit'].hide()
          });
        }    
      },
      cancelarRemocao() {
        this.selecionado = {}
        this.$refs['my-modal'].hide()
        this.$refs['my-modal-edit'].hide()
      }
    }
  }
</script>
<style lang="scss">
.modal-backdrop {
  opacity: 0.6 !important;
}
.datetest  {
  display: inline-block;
  * {
    width: auto !important;
  }
}
</style>
