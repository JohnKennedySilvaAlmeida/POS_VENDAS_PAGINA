<template>
  <div>
    <b-navbar type="dark" variant="dark">
        <b-navbar-nav>
          <b-nav-item href="/#/home">Voltar</b-nav-item>
        </b-navbar-nav>
    </b-navbar><br><br>
    
    <b-form @submit="onSubmit" @reset="onReset" v-if="show" class="py-4">
      <b-form-group id="input-group-2" label="Usuário" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.usuario"
          placeholder="Digite o usuario ..."
          required
          minlength="4" maxlength="35"
        ></b-form-input>
      </b-form-group><br>
      
      <b-form-group id="input-group-2" label="Login" label-for="input-2">
        <b-form-input
          id="input-2"
          v-model="form.login"
          placeholder="Digite o login ..."
          required
          minlength="4" maxlength="35"
        ></b-form-input>
      </b-form-group><br>

      <b-form-group id="input-group-3" label="Senha" label-for="input-3">
        <b-form-input
          id="input-3"
          v-model="form.senha"
          placeholder="Digite a senha ..."
          required
          minlength="4" maxlength="35"
        ></b-form-input>
      </b-form-group><br>

      <b-form-group id="input-group-4" label="Tipo:" label-for="input-4">
        <b-form-select
          id="input-4"
          v-model="form.tipo"
          :options="tipos"
          required
          minlength="4" maxlength="35"
        ></b-form-select>
      </b-form-group><br><br>

      <b-button type="submit" variant="primary">Salvar</b-button>
      <b-button style="margin-left:5px" type="reset" variant="danger">Limpar</b-button>
    </b-form>

  </div>
</template>

<script>
  import axios from "axios";
  export default {
    name:'cadastro',
    data() {
      return {
        form: {
          periodo: 'OFF',
          usuario: '',
          senha: '',
          tipo: null,
          login: '',
          chave: 'OFF'
        },
        tipos: [{ text: 'Selecione', value: null }, 'User', 'Admim'],
        show: true,
        userMaster: null,
      }
    },
    
    mounted() {
      this.validate_master()
    },
    
    methods: {
      onSubmit(event) {
        event.preventDefault()
        var adm = false
        if(this.form.tipo == "Admim")
          adm = true
        const eventoFormFormat = {
          login: this.form.login,
          nome:  this.form.usuario,  //Verificar se e necessario Nome!
          senha: this.form.senha,
          periodo: this.form.periodo,
          adm: adm,
          chave: this.form.chave,  //chave para id do cadastro
        }
        axios
        .post("http://localhost:9090/usuario", eventoFormFormat)
        .then((res) => {
          console.log(res.data)
          alert("Usuário Cadastrado com Sucesso!")
          this.onReset(event)
        })
        .catch((error) => {
          console.log(error);
          alert("Falha ao Cadastrar Usuário!")
        });
      },
      
      validate_master(){
        axios.get(`http://localhost:9090/usuario/${sessionStorage.userId}`)
          .then((res) => {
            var validateMaster = res.data.chave
            if (validateMaster == "master") {
              this.userMaster = true
            }else{
              this.userMaster = false
              this.form.chave = validateMaster
            }
          })
          .catch((error) => {
            alert("Falha ao buscar o Master! ", error);
        });
      },
      onReset(event) {
        event.preventDefault()
        this.form.senha = ''
        this.form.periodo = ''
        this.form.food = null
        this.form.usuario = ''
        this.show = false
        this.form.login = ''
        this.$nextTick(() => {
          this.show = true
        })
      }
    }
  }
</script>