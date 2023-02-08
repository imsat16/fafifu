<template>
    <div class="submit-form">
        <div v-if="!submitted">
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" required v-model="user.name" name="name" />
            </div>

            <div class="form-group">
                <label for="gender">gender</label>
                <input class="form-control" id="gender" required v-model="user.gender"
                    name="gender" />
            </div>

            <button @click="saveUser" class="btn btn-success">Submit</button>
        </div>

        <div v-else>
            <h4>You submitted successfully!</h4>
            <button class="btn btn-success" @click="newUser">Add</button>
        </div>
    </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
    name: "add-user",
    data() {
        return {
            user: {
                id: null,
                name: "",
                gender: "",
                published: false
            },
            submitted: false
        };
    },
    methods: {
        saveUser() {
            var data = {
                name: this.user.name,
                gender: this.user.gender
            };

            UsersDataService.create(data)
                .then(response => {
                    this.user.id = response.data.id;
                    console.log(response.data);
                    this.submitted = true;
                })
                .catch(e => {
                    console.log(e);
                });
        },

        newUser() {
            this.submitted = false;
            this.user = {};
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