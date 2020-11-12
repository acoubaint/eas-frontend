<template>
  <div class="event">
    <div class="event-content">
      <p class="event-title">{{title}}</p>
      <small class="event-info">
        &#10026; {{users_count}} members attend to this event.
      </small>
      <p class="event-description">
        {{description}}
      </p>
    </div>
    <div class="event-action">
      <button class="btn" v-if="user.role == 0 && !attended" @click="attendEvent(id)">Attend</button>
      <button class="btn white disabled" v-if="user.role == 0 && attended">Attended</button>
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex'
export default {
  props: ['title', 'description', 'id', 'attended', 'users_count'],
  computed: {
    user: function(){return this.$store.state.auth.user},
  },
  mounted() {
    
  },
  methods: {
    ...mapActions(['attendEvent']),
  }
}
</script>

<style>

</style>