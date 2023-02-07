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
            <h4>Tutorials List</h4>
            <ul class="list-group">
                <li class="list-group-item" :class="{ active: index == currentIndex }"
                    v-for="(tutorial, index) in tutorials" :key="index" @click="setActiveTutorial(tutorial, index)">
                    {{ tutorial.name }}
                </li>
            </ul>

            <button class="m-3 btn btn-sm btn-danger" @click="removeAllTutorials">
                Remove All
            </button>
        </div>
        <div class="col-md-6">
            <div v-if="currentTutorial">
                <h4>Tutorial</h4>
                <div>
                    <label><strong>Name:</strong></label> {{ currentTutorial.name }}
                </div>
                <div>
                    <label><strong>Gender:</strong></label> {{ currentTutorial.gender }}
                </div>
                <div>
                    <label><strong>Status:</strong></label> {{ currentTutorial.published ? "Published" : "Pending" }}
                </div>
                <div>
                    <button @click="deleteUser">Delete</button>
                </div>

                <router-link :to="'/tutorials/' + currentTutorial.id" class="badge badge-warning">Edit</router-link>
            </div>
            <div v-else>
                <br />
                <p>Please click on a Tutorial...</p>
            </div>
        </div>
    </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
    name: "tutorials-list",
    data() {
        return {
            tutorials: [],
            currentTutorial: null,
            currentIndex: -1,
            name: ""
        };
    },
    methods: {
        retrieveTutorials() {
            UsersDataService.getAll()
                .then(response => {
                    this.tutorials = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteUser(){
            UsersDataService.delete(this.tutorials[1]._id)
            // console.log(this.tutorials[1]._id)
        },

        refreshList() {
            this.retrieveTutorials();
            this.currentTutorial = null;
            this.currentIndex = -1;
        },

        setActiveTutorial(tutorial, index) {
            this.currentTutorial = tutorial;
            this.currentIndex = tutorial ? index : -1;
        },

        removeAllTutorials() {
            UsersDataService.deleteAll()
                .then(response => {
                    console.log(response.data);
                    this.refreshList();
                })
                .catch(e => {
                    console.log(e);
                });
        },

        searchTitle() {
            UsersDataService.findByTitle(this.name)
                .then(response => {
                    this.tutorials = response.data;
                    this.setActiveTutorial(null);
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.retrieveTutorials();
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