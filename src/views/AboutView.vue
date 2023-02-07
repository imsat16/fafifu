<template>
  <div class="about">
    <h1>This is an about page</h1>
    <AddUsers/>
    <UserList/>
  </div>
</template>

<script>
import UserList from '../components/UserList.vue';
import AddUsers from '../components/AddUsers.vue';

export default {
  name: 'AboutView',
  components: {
    UserList,
    AddUsers
  },
  watch:{
    
  }
}
</script>
