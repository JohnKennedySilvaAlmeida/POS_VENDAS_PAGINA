<template>
  <div class="evento">
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="/#/home">Voltar</b-nav-item>
        </b-navbar-nav>
    </b-navbar><br><br>
    
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="py-4">
      <b-form-group
        label="Nome do Evento"
        id="input-1"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="form.nome"
          placeholder="Digite o nome ... "
          required
          minlength="4" maxlength="70"
        ></b-form-input>
      </b-form-group><br>

      <b-form-group id="input-group-2" label="Data" label-for="input-2">
        <b-form-datepicker 
          id="example-datepicker" 
          v-model="form.data" 
          class="datetest mb-2"
          placeholder="Digite a data..."
          :date-format-options="{day: '2-digit', month: '2-digit', year: 'numeric'}"
          locale="pt-BR"
          required
        >
        </b-form-datepicker>

      </b-form-group><br>

      <b-form-group id="input-group-3" label="Valor" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.valor"
          placeholder="Digite o valor do cupom ..."
          required
          type="number"
          max=100
          min=1
        ></b-form-input>
      </b-form-group><br>

      <div>
        <b-form-group id="input-group-3" label="Mutiplicador" label-for="input-3">
          <b-form-select v-model="selected" :options="options"></b-form-select>
        </b-form-group><br>

        <b-form-group id="input-group-3" label="Serie" label-for="input-3">
          <b-form-select v-model="selected_" :options="options_"></b-form-select>
        </b-form-group><br>
      </div>      
      
      <b-form-group id="input-group-3" label="Cupom Inicial" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.cupom_inical"
          placeholder="Digite o cupom inicial..."
          required
          minlength="1" maxlength="10"
          type="number"
        ></b-form-input>
      </b-form-group><br>

      <b-form-group id="input-group-3" label="Cupom Final" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.cupom_final"
          placeholder="Digite o cupom final..."
          required
          minlength="1" maxlength="10"
          type="number"
        ></b-form-input>
      </b-form-group><br>

      <b-button type="submit" variant="primary">Salvar</b-button>
      <b-button style="margin-left:5px" type="reset" variant="danger">Limpar</b-button>
    </b-form>

  </div>
</template>

<script>
  import Vue from 'vue'
  import axios from "axios";
  import { BFormDatepicker } from 'bootstrap-vue'
  Vue.component('b-form-datepicker', BFormDatepicker)
  export default {
    name:'cadastro_event',
    data() {
      return {
        form: {
          nome: '',
          data: '',
          valor: null,
          // serie:'',
          mutiplicador: null,
          cupom_inical:'',
          cupom_final: '',
          cartelasVendidas: 0,
          limiteCartelas: 0  // 12 mil, 24 mil, 70 mil .. etc
          // tipo: null,
        },
        tipos: [{ text: 'Selecione', value: null }, 'User', 'Admim'],
        show: true,
        selected: null,
        options: [
          { value: null, text: 'Selecione...' },
          { value: 1, text: '1 x' },
          { value: 2, text: '3 x' },
          { value: 3, text: '6 x' },  // Mutiplo 6 + 1 
        ],
        options_: [
          { value: null, text: 'Selecione...' },
          { value: 12, text: '12 mil' },
          { value: 24, text: '24 mil' },
          { value: 72, text: '72 mil' },  // Dados do banco - cartoes 
          { value: 96, text: '96 mil' },  
        ],
        selected_: null
      }
    },
    
    components:{
     //  Home - telas
    },
    
    methods: {
      priceToNumber(v) {
        if(!v){return 0;}
        v=v.split('.').join('')
        v=v.split(',').join('.')
        return Number(v.replace(/[^0-9.]/g, ""))
      },
      onSubmit(event) {
        event.preventDefault()
        const dataForm = this.form.data.split('-')
        const valorForm = this.priceToNumber(this.form.valor);

        const eventoFormFormat = {
          nome: this.form.nome,
          data: new Date(dataForm[0], dataForm[1] - 1, dataForm[2]),
          valor: valorForm,
          serie: this.selected_,
          mutiplicador: this.selected,
          cupom_inical: this.form.cupom_final,
          cupom_final: this.form.cupom_inical,
          cartelasVendidas: this.form.cartelasVendidas,
          limiteCartelas: this.form.limiteCartelas,
        }
        axios
          .post('http://localhost:9090/evento', eventoFormFormat)
          .then((res) => {
            alert(res.data.message)
            this.onReset(event)  
          })
          .catch((err) => {
            alert("Erro ao cadastrar o evento")
          });
      },
      onReset(event) {
        event.preventDefault()
        this.form = {
          nome: '',
          data: '',
          valor: '',
          serie:'',
          mutiplicador:'',
          cupom_inical:'',
          cupom_final: '',
          cartelasVendidas: 0,
          limiteCartelas: 0  // 12 mil, 24 mil, 70 mil .. etc
          // tipo: null,
        }
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>
<style lang="scss">
  .evento{
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
