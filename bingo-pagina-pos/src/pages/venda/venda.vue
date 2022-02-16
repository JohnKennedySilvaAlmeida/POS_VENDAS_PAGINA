<template>
  <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="/#/home">Voltar</b-nav-item>
        </b-navbar-nav>
    </b-navbar><br><br>
  
    <b-form v-on:submit.prevent="exibeConfirmacao" @reset="onReset" v-if="show" class="py-4">

      <div>
        <b-form-group id="input-group-2" label="Eventos" ></b-form-group>
        <b-form-select
          v-model="form.selected"
          :options="eventos"
          text-field="nome"
          value-field="_id"
          @change="buscaNome"
          required
        >
          <template >
            <b-form-select-option :value="null" disabled>Selecione um evento cadastrado</b-form-select-option>
          </template>
        </b-form-select>
        <div class="mt-3">Evento selecionado: <strong>{{ nomeSelecionado }}</strong></div>
        <div v-if="dataSelecionada != ''" class="mt-3">Data do evento: <strong>{{ dataSelecionada }}</strong></div>
      </div><br><br>

      <div class="">
        <div class="col-12">
          <label for="">Numero da Rodada</label>
          <input class="form-control" id="" >
        </div>
        <div class="col-12">
          <label for="">Valor de venda</label>
          <input class="form-control" id="" >
        </div>
        <div class="col-12">
          <label for="">Unidade de venda</label>
          <input class="form-control" id="" >
        </div>
      </div>


      <b-form-group id="input-group-2" label="Quantidade de Cupom" label-for="input-2">
        <b-form-input
          type="number"
          id="input-2"
          v-model="form.quantidade"
          placeholder="Digite a quantidade ..."
          required
          minlength="1"
          maxlength="5"
        ></b-form-input>
      </b-form-group><br><br>

      <b-button 
        class="button"
        type="submit"
        variant="danger">
        Cancelar
      </b-button>
      
      <b-button 
        class="button"
        type="submit"
        variant="primary">
        Enviar
      </b-button>
    </b-form>


    <b-modal ref="vendaModal" hide-header ok-only>
      <div class="d-block text-center">
        <p>Confirmar a venda de {{form.quantidade}} cartelas para o evento {{nomeSelecionado}}?</p>
        <p><b>Atenção!</b> Após confirmar a venda, esta será salva e não poderá ser alterada.</p>
      </div>
      <div slot="modal-footer">
        <b-button @click="concluirVenda" class="button" variant="primary">Concluir</b-button>
        <b-button @click="cancelar" class="button" variant="danger">Cancelar</b-button>
      </div>
    </b-modal>

    <b-modal ref="impressaoModal" hide-header ok-only no-close-on-backdrop>
      <div class="d-block text-center">
        <p>Venda realizada com sucesso! Deseja imprimir as cartelas?</p>
        <p><b>Atenção!</b> Esta impressão não poderá ser acessada novamente.</p>
      </div>
      <div slot="modal-footer">
        <b-button @click="imprimirPeriodos" class="button " type="submit" variant="primary">Imprimir Periodos</b-button>
        <b-button @click="imprimirCartelas" class="button" type="submit" variant="primary">Imprimir Cartelas</b-button>
      </div>
    </b-modal>

  </div>
</template>

<script>
  import { BFormSelect } from 'bootstrap-vue'
  import axios from "axios";

  import print from 'print-js'
  import pdfMake from 'pdfmake/build/pdfmake'
  import vfs from "pdfmake/build/vfs_fonts";
  import { geraCartelas, gerarPeriodos } from '../../utils/cartelaPdf'

  window.pdfMake.vfs = vfs.pdfMake.vfs;

  export default {
    components:{
      BFormSelect
    },
    name:'venda',
    data() {
      return {
        selected: null,
        show: true,
        nomeSelecionado: '',
        dataSelecionada: '',
        serieSelecionada: '',
        eventos: [],
        quantidad: [
          { value: null, text: 'Selecione...' },
          { value: '10/05, 8 horas', text: 'Rodada de 5 mil' },
          { value: '10/06, 9 horas', text: 'Rodada de 5 mil', disabled: true },
          { value: '10/06, 18 horas', text: 'Rodada de 5 mil' },
        ],

        form: {
          quantidade: '',
          selected: null,
        },

        rangeSelecionado: {
          inicial: '',
          final: '',
        },
        cartelas: []
      }
    },
    mounted() {
      this.buscaEventos()
    },
    methods: {
      onSubmit(event) {
        event.preventDefault()
        alert(JSON.stringify(this.form))
      },
      onReset(event) {
        event.preventDefault()
        this.form.quantidade = ''
        this.form.periodo = ''
        this.show = false
        this.$nextTick(() => {
          this.show = true
        })
      },
      exibeConfirmacao(item, index, button) {
        this.$refs['vendaModal'].show()
      },
      concluirVenda: async function() {
        axios.put(`http://localhost:9090/evento/${this.form.selected}`, {
          quantidade: this.form.quantidade
        })
          .then((response) => {
            this.eventos = this.eventos.map(evento => {
              this.rangeSelecionado = {...response.data.cartelas}
              if(evento._id == response.data.evento._id)
                return response.data.evento
            })
            this.$refs['impressaoModal'].show()
          }).catch(function (error) {
            console.log(error);
            alert("Falha ao realizar a venda")
          }).finally(() => {
            this.$refs['vendaModal'].hide()
          });
      },
      cancelar() {
        this.$refs['vendaModal'].hide()
      },
      buscaEventos() {
        axios.get('http://localhost:9090/eventos')
          .then(
            response => this.eventos = response.data
          ).catch(function (error) {
            console.log(error);
          });
      },
      buscaNome(e) {
        function isId(value) {
          return value._id == e;
        }
        var filtered = this.eventos.filter(isId)[0];
        this.nomeSelecionado = filtered.nome
        this.dataSelecionada = this.dataFormatada(new Date(filtered.data))
        this.serieSelecionada = filtered.serie
      },
      dataFormatada(data){
              let dia  = data.getDate().toString()
              let diaF = (dia.length == 1) ? '0'+dia : dia
              let mes  = (data.getMonth()+1).toString() //+1 pois no getMonth Janeiro começa com zero.
              let mesF = (mes.length == 1) ? '0'+mes : mes
              let anoF = data.getFullYear();
          return diaF+"/"+mesF+"/"+anoF;
      },
      returnField(e){
        console.log(e)
      },
      async imprimirCartelas() {
        let numerosDaBusca = []
        for(var i = this.rangeSelecionado.inicial; i <= this.rangeSelecionado.final; i++){
          var str = "" + i
          var pad = "00000"
          var ans = pad.substring(0, pad.length - str.length) + str
          numerosDaBusca.push(ans)
        }
        axios.get(`http://localhost:9090/cartelas/${this.serieSelecionada}000`,{
          params: {
            numeros: numerosDaBusca.join()
          }
        }).then((res) => {
          this.imprimir(res.data)
        }).catch(function (error) {
          console.log(error)
          alert(error)
        }).finally(() => {
          this.$refs['impressaoModal'].hide()
        })
      },
      async imprimir(cartelas, periodos) {
        const pdf = await this.pdfgen(cartelas, periodos)
        if(! /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ) {
          return new Promise((resolve, reject) => {
            print({
              printable: pdf,
              type: 'pdf',
              base64: true,
              onError: reject,
              onLoadingEnd: resolve,
            })
          })
        }
        else {
          let pdfWindow = window.open("")
          pdfWindow.document.write(
              "<iframe width='100%' height='100%' src='data:application/pdf;base64, " +
              encodeURI(pdf) + "'></iframe>"
          )
        }
      },
      async pdfgen(cartelas, periodos) {


        console.log('cartelas: ',cartelas)
        console.log(!periodos)

        const fonts = {
          Helvetica: {
            normal: 'Helvetica',
            bold: 'Helvetica-Bold',
            italics: 'Helvetica-Oblique',
            bolditalics: 'Helvetica-BoldOblique'
          },
        }
        const docDefinition = !periodos ? geraCartelas(cartelas) : gerarPeriodos(cartelas)
        return new Promise(resolve => pdfMake.createPdf(docDefinition).getBase64((result) => resolve(result)))
      },
      imprimirPeriodos() {
        let numerosDaBusca = []
        for(var i = this.rangeSelecionado.inicial; i <= this.rangeSelecionado.final; i++){
          var str = "" + i
          var pad = "00000"
          var ans = pad.substring(0, pad.length - str.length) + str
          numerosDaBusca.push(ans)
        }
        axios.get('http://localhost:9090/cartelas',{
          params: {
            numeros: numerosDaBusca.join()
          }
        }).then((res) => {
          this.imprimir(res.data, true)
        }).catch(function (error) {
          console.log(error)
          alert(error)
        }).finally(() => {
          this.$refs['impressaoModal'].hide()
        })
      },
    },
  }
</script>


<style>
  label{
    font-weight: bold;
  }
  button{
    margin-left:5px
  }
   
</style>
