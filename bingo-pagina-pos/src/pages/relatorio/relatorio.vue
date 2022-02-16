<template>
  <div class="relatorio">
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="/#/home">Voltar</b-nav-item>
        </b-navbar-nav>
    </b-navbar><br>

    <b-form v-on:submit.prevent="onSubmit">
      <b-form-group id="input-group-2" label-for="input-2">
        <label for="example-datepicker" class="text-light">Filtrar por data</label>
        <b-form-datepicker 
          id="example-datepicker" 
          v-model="form.data" 
          class="datetest mb-2"
          placeholder="Sem data selecionada"
          :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
          locale="pt-BR"
        >
        </b-form-datepicker>
        <b-button type="submit" variant="primary">Buscar</b-button>
        <b-button class="ms-2" variant="danger" @click="limpar">Limpar</b-button>
      </b-form-group><br>
    </b-form>

    <b-card>
      <b-table striped small hover :items="usuarios" :fields="fields">
        <template #cell(actions)="row">
          <b-button size="sm" @click="imprimir(row.item, row.index, $event.target)" variant="success" class="mr-1">
              <b-icon icon="file-earmark-arrow-down-fill"></b-icon>
          </b-button>
        </template>
      </b-table>
    </b-card>
  </div>
</template>

<script>
import Vue from 'vue'
import axios from "axios";
import { BFormDatepicker } from 'bootstrap-vue'
Vue.component('b-form-datepicker', BFormDatepicker)

  export default {
    name:'Relatorio',
    components: {
        // VueMask
    },
    mounted() {
      this.buscaUsuario()
    },
    data() {
      return {
        form: {
          data: ''
        },
        value: '',
        show: true,
        fields: [
          { key: 'nome', label: 'Usuario' },
          { key: 'rodada', label: 'Rodada' },
          { key: 'evento', label: 'Valor' },           //  Ajustar para trazer evento - User
          { key: 'actions', label: 'Imprimir' },      //  Ajustar para trazer quantidade - User
          // { key: 'createdAt', label: 'Data', formatter: "formateData" },
        ],
        usuarios: [],
        selecionado: {},
      }
    },
    methods: {
      async onSubmit() {
        let objectRequest = {}
        if(this.form.data != '') {
          const dataForm = this.form.data.split('-')
          objectRequest = {
            params: {
              data: new Date(dataForm[0], dataForm[1] - 1, dataForm[2])
            }
          }
        }
        axios.get('http://localhost:9090/usuarios', objectRequest)
        .then(
          response => this.usuarios = response.data
        ).catch(function (error) {
          console.log(error);
        });
      },
      limpar() {
        this.form = {
          data: ''
        }
      },
      onReset(event) {
        event.preventDefault()
        this.form.senha = ''
        this.form.ponto_venda = ''
        this.form.food = null
        this.form.usuario = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      formateData(value) {
        return value.toLocaleString('pt-BR', {
          currency: 'BRL',
          maximumFractionDigits: 2,
          minimumFractionDigits: 2,
        }).replace('Z', ' ').replace('T', ' ');
      },
      buscaUsuario() {
        axios.get('http://localhost:9090/usuario')
          .then(
            response => this.usuarios = response.data
          ).catch(function (error) {
            console.log(error);
          });
      }
    }
  }
</script>
<style lang="scss">
.relatorio {
  .datetest  {
    display: inline-flex !important;
    button {
      margin-left: auto;
    }
    label {
      margin-right: auto;
    }
  }
}
</style>