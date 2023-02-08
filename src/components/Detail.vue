<template>
    <div v-if="currentData" class="edit-form">
        <h4>User Data</h4>
        <form>
            <div class="form-group">
                <label for="name">Name</label>
                <input type="text" class="form-control" id="name" v-model="currentData.name" />
            </div>
            <div class="form-group">
                <label for="gender">gender</label>
                <input type="text" class="form-control" id="gender" v-model="currentData.gender" />
            </div>
        </form>

        <button class="badge badge-danger mr-2" @click="deleteUser">
            Delete
        </button>

        <button type="submit" class="badge badge-success" @click="updateUser">
            Update
        </button>
        <p>{{ message }}</p>
    </div>

    <div v-else>
        <br />
        <p>Please click on a User...</p>
    </div>
</template>

<script>
import UsersDataService from "../services/UsersDataService";

export default {
    name: "user-detail",
    data() {
        return {
            currentData: null,
            message: ''
        };
    },
    methods: {
        getUser(id) {
            UsersDataService.get(id)
                .then(response => {
                    this.currentData = response.data;
                    console.log(response.data);
                })
                .catch(e => {
                    console.log(e);
                });
        },

        updateUser() {
            UsersDataService.update(this.currentData._id, this.currentData)
                .then(response => {
                    console.log(response.data);
                    this.message = 'The user was updated successfully!';
                })
                .catch(e => {
                    console.log(e);
                });
        },

        deleteUser() {
            UsersDataService.delete(this.currentData._id)
                .then(response => {
                    console.log(response.data);
                    this.$router.push({ name: "users" });
                })
                .catch(e => {
                    console.log(e);
                });
        }
    },
    mounted() {
        this.message = '';
        this.getUser(this.$route.params.id);
    }
};
</script>

<style>
.edit-form {
    max-width: 300px;
    margin: auto;
}
</style>