<template>
  <div id="signin" class="content">
    <div class="card">
      <div class="card-content">
        <h4 class="card-title">Sign In</h4>
        <p v-if="errorMsg" class="input-error text-center">{{errorMsg}}</p>
        <form @submit.prevent="submit">
          <div class="input-field">
            <label for="email">Email</label>
            <input type="email" name="email" v-model="user.email">
          </div>
          <div class="input-field">
            <label for="email">Password</label>
            <input type="password" name="password" v-model="user.password">
          </div>
          <button class="btn right">Login</button>
        </form>
        <div class="clearfix"></div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  data() {
    return {
      user: null,
      errorMsg: null,
    }
  },
  created() {
    this.resetUser();
  },
  methods: {
    ...mapActions(['logIn']),
    async submit() {
      await this.logIn(this.user).then(response => {
        this.resetUser();
        if (this.$store.state.auth.isAuthenticated) {
          this.$router.push('/events');
        }
      }).catch(error => {
        if (typeof error.response == 'undefined') {
          this.errorMsg = 'Network Error!';
        }else if(error.response.status == 401){
          this.errorMsg = error.response.statusText;
        }
      });
    },
    resetUser() {
      this.user = {
        email: '',
        password: ''
      };
    }
  }
}
</script>

<style>

</style>