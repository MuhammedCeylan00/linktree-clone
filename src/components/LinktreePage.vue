<template>
    <div class="p-4 h-screen" :style="{backgroundColor:user.backgroundcolor}">
        <div class="max-w-lg mx-auto mt-20">
            <h2 class="mb-5 flex text-center justify-center items-center text-5xl bg-white rounded-xl p-5">@{{ user.username }} LinkTree</h2>
            <div class=" gap-4 grid-cols-2">
                <div v-for="(item, index) in user.links" :key="index"
                    class="bg-white rounded-md shadow-md overflow-hidden mb-10">
                    <div class="px-4 py-3 bg-gray-200 font-medium text-gray-800">
                        {{ item.name }}
                    </div>
                    <div class="px-4 py-2">
                        <!-- <input type="text" :value="link.url" class="w-full mb-2 py-2 px-3 rounded-md border border-gray-400 focus:outline-none focus:border-indigo-500" readonly> -->
                        <div class="flex justify-between">
                            <button @click="copyToClipboard(item.link)"
                                class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md">
                                Kopyala
                            </button>
                            <a :href="item.link" target="_blank"
                                class="bg-indigo-500 hover:bg-indigo-600 text-white py-2 px-4 rounded-md">
                                Git
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>
  
<script>
import axios from 'axios';
export default {
    data() {
        return {
            user: {
                username: null,
                password: null,
                namesurname: null,
                id: null,
                backgroundcolor: null,
                links: []
            },
        };
    },
    async mounted() {
        let id = this.$route.params.id
        await axios.get('http://localhost:8000/api/users')
            .then(response => {
                // İsteğin başarılı olduğu durumda çalışacak kodlar burada yer alır
                console.log(response.data.data);
                for (let index = 0; index < response.data.data.length; index++) {
                    if (response.data.data[index].id == id) {
                        this.user = response.data.data[index]
                    }
                }
            })
            .catch(error => {
                // İsteğin hata verdiği durumda çalışacak kodlar burada yer alır
                console.log(error);
            });

    },
    methods: {
        copyToClipboard: function (text) {
            var dummy = document.createElement("textarea");
            document.body.appendChild(dummy);
            dummy.value = text;
            dummy.select();
            document.execCommand("copy");
            document.body.removeChild(dummy);
        }
    }
};
</script>
  