<template>
  <header id="header" class="box-shadow-2">
    <router-link to="/" class="title">
      <h4>Event Attendance System</h4>
    </router-link>
    <ul class="menus">
      <router-link v-if="!isLoggedIn" to="/signup" v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'menu-item']">
          <a :href="href" @click="navigate">Sign Up</a>
        </li>
      </router-link>
      <router-link v-if="!isLoggedIn" to="/signin" v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'menu-item']">
          <a :href="href" @click="navigate">Sign In</a>
        </li>
      </router-link>
      <router-link v-if="isLoggedIn" to="/events" v-slot="{ href, navigate, isActive, isExactActive }">
        <li :class="[isActive && 'router-link-active', isExactActive && 'router-link-exact-active', 'menu-item']">
          <a :href="href" @click="navigate">Events</a>
        </li>
      </router-link>
      <li v-if="isLoggedIn">
        <span id="user-name">Hi, {{user.name}}</span>
      </li>
      <li v-if="isLoggedIn" class="menu-item" @click="signOut">
        <a href="javascript:void(0)">Sign Out</a>
      </li>
    </ul>
  </header>
</template>

<script>
import {mapActions} from 'vuex';
export default {
  data(){
    return {

    }
  },
  computed: {
    isLoggedIn: function() { 
      return this.$store.state.auth.isAuthenticated;
    },
    user: function() {
      return this.$store.state.auth.user;
    },
  },
  mounted() {

  },
  methods:{
    ...mapActions(['logOut']),
    signOut() {
      this.logOut().then(response => {
        window.location.href =  '/signin';
      });
    },
  }
}
</script>

<style>

</style>