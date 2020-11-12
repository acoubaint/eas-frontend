<template>
  <div id="events" class="content">
    <div class="card" v-if="user.role == 1">
      <div class="card-content">
        <h4 class="card-title">Create New Event</h4>
        <form @submit.prevent="submitNewEvent">
          <div class="input-field">
            <label for="name">Event Name</label>
            <input type="text" name="name" v-model="new_event.name" placeholder="Zephyrus G14 Celebration!">
            <p class="input-error" v-for="(msg, key) in errors.name" :key="key">{{msg}}</p>
          </div>
          <div class="input-field">
            <label for="name">Description</label>
            <textarea name="description" maxlength="250" v-model="new_event.description" placeholder="Lorem ipsum dolor sit amet consectetur adipisicing elit. Laborum vitae ipsam quia omnis blanditiis eveniet incidunt non nihil. At dolore nobis necessitatibus ipsa magni asperiores dolorum inventore natus ipsam doloribus."></textarea>
            <p class="input-error" v-for="(msg, key) in errors.description" :key="key">{{msg}}</p>
          </div>
          <button class="btn right">New Event</button>
          <div class="clearfix"></div>
        </form>
      </div>
    </div>

    <div class="card" v-if="user">
      <div class="card-content">
        <h4 class="card-title">
          <span v-if="user.role == 1">Your </span>
          Events
        </h4>
        <div class="events">
          <EventItem v-for="event in events" 
            :key="event.id" :title="event.name" 
            :attended="event.attended" :users_count="event.users_count"
            :id="event.id" :description="event.description"
          ></EventItem>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import EventItem from "./Event/Item";
import { mapActions, mapMutations } from "vuex";
import axios from 'axios';

export default {
  components: {
    EventItem
  },
  data() {
    return {
      new_event: null,
      errors: {},
    }
  },
  created() {
    this.resetNewEvent();
  },
  computed: {
    user: function() {
      return this.$store.state.auth.user;
    },
    events: function() {
      return this.$store.state.event.datas
    }
  },
  mounted() {
    this.getEvents();
  },
  methods: {
    ...mapActions(['getEvents']),
    resetNewEvent() {
      this.new_event = {
        name: '',
        description: '',
      };
    },
    async submitNewEvent() {
      await axios.post('/api/events', this.new_event)
      .then(response => {
        this.resetNewEvent();
        this.getEvents();
      }).catch(error => {
        if (typeof error.response != undefined) {
          this.errors = error.response.data.data.messages;
        }
      });
    }
  }
}
</script>

<style>

</style>