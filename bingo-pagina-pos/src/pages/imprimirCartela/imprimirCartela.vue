<template>
  <b-container>
    <b-card>
      <b-button @click="imprimir">Teste</b-button>
    </b-card>
  </b-container>
</template>

<script>
import print from 'print-js'
import pdfMake from 'pdfmake/build/pdfmake'
import vfs from "pdfmake/build/vfs_fonts";
import { geraCartelas } from '../../utils/cartelaPdf'
import axios from 'axios';

window.pdfMake.vfs = vfs.pdfMake.vfs;

export default {
  name: 'imprimirCartela',
  props: {
    msg: String
  },
  data() {
    return {
      cartelas: []
    }
  },
  //funcao temporaria para desenvolvimento do modelo da cartela
  mounted() {
    // this.imprimir()
  },
  methods: {
    async imprimir() {
      const pdf = await this.pdfgen()
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
    async pdfgen() {
      const fonts = {
        Helvetica: {
          normal: 'Helvetica',
          bold: 'Helvetica-Bold',
          italics: 'Helvetica-Oblique',
          bolditalics: 'Helvetica-BoldOblique'
        },
      }

      //request para buscar cartela do bd
      this.compraCartelas(['00001','00002'])

      // chama função para conteudo da cartela
      const docDefinition = geraCartelas()
      return new Promise(resolve => pdfMake.createPdf(docDefinition).getBase64((result) => resolve(result)))
    },

    compraCartelas(cartelas) {
      const params = {
        cartelas: cartelas
      }
      axios
      .post('http://localhost:9090/cartelas', {cartelas: cartelas})
        .then((res) => {
          this.cartelas = res.data
        }).catch(function (error) {
          console.log(error);
        });
    }

  }
}
</script>

<style>

</style>