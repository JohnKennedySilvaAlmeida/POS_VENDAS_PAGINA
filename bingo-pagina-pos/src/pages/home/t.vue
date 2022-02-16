<template>
    <div>
        <h2>Login</h2>
        <form >
            <div class="form-group">
                <label for="username">Username</label>
                <input type="text" v-model="username" name="username" class="form-control" :class="{ 'is-invalid': submitted && !username }" />
                <div v-show="submitted && !username" class="invalid-feedback">Username is required</div>
            </div>
            <div class="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" v-model="password" name="password" class="form-control" :class="{ 'is-invalid': submitted && !password }" />
                <div v-show="submitted && !password" class="invalid-feedback">Password is required</div>
            </div>
            <div class="col-12">
                <b-button variant="outline-primary" @click.prevent="submit_" >ENTER</b-button>
            </div><br/><br/> 
        </form>
    </div>
</template>

<script>
// import { mapState, mapActions } from 'vuex'

export default {
    data () {
        return {
            username: '',
            password: '',
            submitted: false
        }
    },

    methods:{
      submit_(){
       if(this.password == "")
          alert("teste")
        else{
          this.$router.push({name: 'home'});
        }     
      },
    }
   
};
</script>