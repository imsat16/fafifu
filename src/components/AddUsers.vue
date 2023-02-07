<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" required v-model="tutorial.name" name="name" />
            </div>

            <div class="form-group">
                <label for="gender">gender</label>
                <input class="form-control" id="gender" required v-model="tutorial.gender"
                    name="gender" />
            </div>

            <button @click="saveTutorial" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newTutorial">Add</button>
        </div>
    </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
    name: "add-tutorial",
    data() {
        return {
            tutorial: {
                id: null,
                name: "",
                gender: "",
                published: false
            },
            submitted: false
        };
    },
    methods: {
        saveTutorial() {
            var data = {
                name: this.tutorial.name,
                gender: this.tutorial.gender
            };

            UsersDataService.create(data)
                .then(response => {
                    this.tutorial.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newTutorial() {
            this.submitted = false;
            this.tutorial = {};
        }
    }
};
</script>

<style>
.submit-form {
    max-width: 300px;
    margin: auto;
}
</style>