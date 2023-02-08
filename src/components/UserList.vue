<template>
    <div class="list row">
        <div class="col-md-8">
            <div class="input-group mb-3">
                <input type="text" class="form-control" placeholder="Search by name" v-model="name" />
                <div class="input-group-append">
                    <button class="btn btn-outline-secondary" type="button" @click="searchTitle">
                        Search
                    </button>
                </div>
            </div>
        </div>
        <div class="col-md-6">
            <h4>Users List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(user, index) in users" :key="index" @click="setActiveUsers(user, index)">
                    {{ user.name }}
                </li>
            </ul>
        </div>
        <div class="col-md-6">
            <div v-if="currentUser">
                <h4>User</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currentUser.name }}
                </div>
                <div>
                    <label><strong>Gender:</strong></label> {{ currentUser.gender }}
                </div>
                <div>
                    <button @click="deleteUser">Delete</button>
                </div>

                <router-link :to="'/users/' + currentUser.id" class="badge badge-warning">Edit</router-link>
            </div>
            <div v-else>
                <br />
                <p>Please click on a User...</p>
            </div>
        </div>
    </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
    name: "users-list",
    data() {
        return {
            users: [],
            currentUser: null,
            currentIndex: -1,
            name: ""
        };
    },
    methods: {
        retrieveUser() {
            UsersDataService.getAll()
                .then(response => {
                    this.users = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteUser(){
            UsersDataService.delete(this.users[1]._id)
            // console.log(this.users[1]._id)
        },

        refreshList() {
            this.retrieveUser();
            this.currentUser = null;
            this.currentIndex = -1;
        },

        setActiveUsers(user, index) {
            this.currentUser = user;
            this.currentIndex = user ? index : -1;
        },

        searchTitle() {
            UsersDataService.findByTitle(this.name)
                .then(response => {
                    this.users = response.data;
                    this.setActiveUsers(null);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveUser();
    }
};
</script>

<style>
.list {
    text-align: left;
    max-width: 750px;
    margin: auto;
}
</style>