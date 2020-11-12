<template>
  <div id="signup" class="content">
    <div class="card">
      <div class="card-content">
        <h4 class="card-title">Sign Up</h4>
        <transition name="fade" mode="out-in" appear>
          <p class="server-error-msg" v-if="serverErrorMsg">{{serverErrorMsg}}</p>
        </transition>
        <form @submit.prevent="submitForm">
          <div>
            <p>
            <label>
              <input type="radio" name="role" value="0" v-model="user.role"> Member
            </label>
            <label>
              <input type="radio" name="role" value="1" v-model="user.role"> Organizer
            </label>
          </p>
          </div>
          <div class="input-field">
            <label for="name">Name</label>
            <input type="text" name="name" id="name" v-model="user.name">
            <p class="input-error" v-for="(msg, key) in errors.name" :key="key">{{msg}}</p>
          </div>
          <div class="input-field">
            <label for="email">Email</label>
            <input type="email" name="email" id="email" v-model="user.email">
            <p class="input-error" v-for="(msg, key) in errors.email" :key="key">{{msg}}</p>
          </div>
          <div class="input-field">
            <label for="password">Password</label>
            <input type="password" name="password" id="password" v-model="user.password">
            <p class="input-error" v-for="(msg, key) in errors.password" :key="key">{{msg}}</p>
          </div>
          <div class="input-field">
            <label for="password_confirmation">Password Confirm</label>
            <input type="password" name="password_confirmation" id="password_confirmation" v-model="user.password_confirmation">  
            <p class="input-error" v-for="(msg, key) in errors.password_confirmation" :key="key">{{msg}}</p>
          </div>
          <button class="btn right">Submit</button>
          <div class="clearfix"></div>
        </form>
      </div>
    </div>
  </div>
</template>

<script>

import {mapActions} from 'vuex';
export default {
  data() {
    return {
      user: null,
      errors: {},
      serverErrorMsg: null,
    }
  },
  computed: {
  },
  created(){
    this.resetUser();
  },
  methods: {
    ...mapActions(['registration', 'logIn']),
    async submitForm () {
      this.resetMessage();
      try {
        const res = await this.registration(this.user);
        if (res) {
          await this.logIn({email: this.user.email, password: this.user.password});
          this.$router.push('/');
        }
      } catch (error) {
        if (typeof error.response == 'undefined') {
          this.serverErrorMsg = 'Network Error!';
        }else{
          this.errors = error.response.data.messages;
        }
      }
    },
    resetMessage() {
      this.errors = {};
      this.successMsg = null;
      this.serverErrorMsg = null;
    },
    resetUser() {
      this.user = {
        role: 0,
        name: '',
        email: '',
        password: '',
        password_confirmation: '',
      }
    }
  }
}
</script>

<style>
  .input-error{
    color: deeppink;
    margin: 5px 0;
    font-style: italic;
  }
</style>