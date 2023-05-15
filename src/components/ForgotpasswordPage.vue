<template>
    <div class="max-w-md mx-auto">
        <h1 class="text-2xl font-bold mb-4 mt-16">Şifre Değiştirme</h1>
        <div class="mb-4">
            <label for="current-password" class="block mb-2 font-bold">Yeni şifre</label>
            <input type="password" id="current-password" v-model="currentPassword"
                class="w-full border border-gray-400 p-2 rounded-lg">
        </div>
        <div class="mb-4">
            <label for="new-password" class="block mb-2 font-bold">Yeni Şifre tekrar</label>
            <input type="password" id="new-password" v-model="newPassword"
                class="w-full border border-gray-400 p-2 rounded-lg">
        </div>
        <button @click="changePassword()" type="submit"
            class="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600">Şifreyi
            Değiştir</button>
    </div>
</template>
<script>
import axios from 'axios';
export default {
    data() {
        return {
            currentPassword: '',
            newPassword: '',
            user: {
                username: null,
                password: null,
                namesurname: null,
                id: null,
                backgroundcolor: null,
                links: [],
                email: null
            },
            paramsId: null
        }
    },
    async mounted() {
        let mail = this.$route.params.id
        await axios.get('http://localhost:8000/api/users')
            .then(response => {
                // İsteğin başarılı olduğu durumda çalışacak kodlar burada yer alır
                console.log(response.data.data);
                for (let index = 0; index < response.data.data.length; index++) {
                    if (response.data.data[index].email == mail) {
                        this.paramsId=response.data.data[index].id
                        this.user = response.data.data[index]
                    }
                }
            })
            .catch(error => {
                // İsteğin hata verdiği durumda çalışacak kodlar burada yer alır
                console.log(error);
            });
            console.log("params id: ",this.paramsId)
            console.log("mail: ",mail)

    },
    methods: {
        async changePassword() {
            if (this.currentPassword != this.newPassword) {
                alert("Şifreler uyuşmamaktadır.");
            } else {
                this.user.password = this.newPassword
                console.log("params id: ", this.paramsId)
                await axios.put('http://localhost:8000/api/user/' + this.paramsId, this.user)
                    .then({
                    })
                    .catch(error => {
                        console.log(error);
                    });
                this.$router.push('/')
            }
        }
    },
}
</script>
<style scoped></style>