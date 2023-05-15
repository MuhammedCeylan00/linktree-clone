<template>
  <div class="flex items-center justify-center h-screen">
    <div class="w-full max-w-md">
      <form v-if="!signUpStatu && !forgotPasswordStatu" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <p v-if="loginStatu" class="text-center text-red-700">Kullanıcı adı veya şifre yanlış!</p>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="username">
            Kullanıcı Adı
          </label>
          <input v-model="user.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Kullanıcı Adı" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Şifre
          </label>
          <input v-model="user.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="**********" />
        </div>
        <div class="flex items-center justify-between">
          <button @click="loginFunction()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Giriş Yap
          </button>
          <p @click="signUpStatu = true"
            class=" cursor-pointer inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#">
            Kayıt ol
          </p>
          <p @click="forgotPasswordStatu = true"
            class="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#">
            Şifremi Unuttum
          </p>
        </div>
      </form>
      <form v-if="signUpStatu" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            İsim ve soyisim
          </label>
          <input v-model="createUser.namesurname"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="name" type="text" placeholder="İsim ve soyisim" />
          <!-- <p class=" text-xs mt-3 text-red-700">Şifreler uyuşmamaktadır.</p> -->
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="username">
            Kullanıcı Adı
          </label>
          <input v-model="createUser.username"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="username" type="text" placeholder="Kullanıcı Adı" />
        </div>
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            E-posta Adresi
          </label>
          <input v-model="createUser.email"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="text" placeholder="E-posta Adresi" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Şifre
          </label>
          <input v-model="createUser.password"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="**********" />
        </div>
        <div class="mb-6">
          <label class="block text-gray-700 font-bold mb-2" for="password">
            Şifre tekrar
          </label>
          <input v-model="createUser.confirmPassword"
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="password" type="password" placeholder="**********" />
          <!-- <p class=" text-xs mt-3 text-red-700">Şifreler uyuşmamaktadır.</p> -->
        </div>
        <div class="mb-6">
        </div>
        <div class="flex items-center justify-between">
          <button @click="createUserMethod()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Kayıt ol
          </button>
          <p @click="signUpStatu = false"
            class="inline-block cursor-pointer align-baseline font-bold text-sm text-blue-500 hover:text-blue-800"
            href="#">
            Giriş yap
          </p>
        </div>
      </form>
      <form v-if="forgotPasswordStatu" class="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
        <div class="mb-4">
          <label class="block text-gray-700 font-bold mb-2" for="email">
            E-posta Adresi
          </label>
          <input
            class="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
            id="email" type="text" placeholder="E-posta Adresi" v-model="forgotPasswordEmail" />
        </div>
        <div class="mb-6">
        </div>
        <div class="flex items-center justify-between">
          <button @click="sendEmail()"
            class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
            type="button">
            Şifre sıfırla
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import axios from "axios"
export default {
  data() {
    return {
      createUser: {
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
        namesurname: "",
      },
      user: {
        username: "",
        email: "",
        password: "",
        namesurname: "",
        backgroundcolor: "",
        links: [],
        forgotPasswordEmail:null,
      },
      email: "",
      signUpStatu: false,
      forgotPasswordStatu: false,
      users: [],
      loginStatu: false
    }
  },
  methods: {
    async sendEmail() {
      this.forgotPasswordStatu = false
      axios.post('http://localhost:8000/api/email', {
        email: this.user.email,
        message: "http://localhost:8080/forgotpassword/"+this.forgotPasswordEmail,
        name:this.user.namesurname
      })
        .then((response) => {
          console.log(response.data);
        })
        .catch((error) => {
          console.log(error);
        });
    },
    async createUserMethod() {
      this.signUpStatu = false
      var userId = 0;
      await axios.get('http://localhost:8000/api/users')
        .then(response => {
          // İsteğin başarılı olduğu durumda çalışacak kodlar burada yer alır
          userId = response.data.data.length;
          console.log("user id: ", userId);
        })
        .catch(error => {
          // İsteğin hata verdiği durumda çalışacak kodlar burada yer alır
          console.log(error);
        });

      const userData = {
        id: userId,
        username: this.createUser.username,
        email: this.createUser.email,
        password: this.createUser.password,
        namesurname: this.createUser.namesurname,
        links: [],
        backgroundcolor: ""
      }
      console.log("user data: ", userData);
      await axios.post('http://localhost:8000/api/user', userData)
        .then({
          // İsteğin başarılı olduğu durumda çalışacak kodlar burada yer alır
        })
        .catch(error => {
          // İsteğin hata verdiği durumda çalışacak kodlar burada yer alır
          console.log(error);
        });
    },
    async loginFunction() {
      var users = [];
      await axios.get('http://localhost:8000/api/users')
        .then(response => {
          // İsteğin başarılı olduğu durumda çalışacak kodlar burada yer alır
          users = response.data.data;
        })
        .catch(error => {
          // İsteğin hata verdiği durumda çalışacak kodlar burada yer alır
          console.log(error);
        });
      console.log("my login infos: ", this.user.username)
      console.log("db  infos: ", users)
      for (let index = 0; index < users.length; index++) {
        if (this.user.username == users[index].username && this.user.password == users[index].password) {
          //routering
          this.$router.push({
            name: 'home',
            params: { id: users[index].id }
          })
          var login = true
        }
      }
      if (login != true) {
        this.loginStatu = true
      }
    }
  },
}
</script>
