<template>
    <div class="min-h-screen bg-gray-100">
        <!-- Navbar -->
        <div class="bg-white py-4 px-8 flex justify-between items-center">
            <div class="text-xl font-semibold ml-8">My Linktree</div>
            <div class="flex items-center">
                <div class="mr-8">
                    <button class="bg-gray-200 rounded-full w-12 h-12 flex items-center justify-center">
                        <img :src="imageProfileUrl"
                            alt="avatar" class="h-full w-full object-cover rounded-full">
                    </button>
                </div>
                <button @click="openPopup" class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Profil</button>
            </div>
        </div>

        <!-- Header -->
        <div class="bg-gray-800 py-20 text-white">
            <div class=" ml-16">
                <div class="text-4xl font-semibold mb-4">Merhaba, {{ user["namesurname"] }}</div>
                <div class="text-6xl font-bold mb-12">@{{ user["username"] }}</div>
                <button @click="showColorPicker = true" class="bg-blue-500 text-white px-4 py-2 rounded-lg">Arka Plan
                    Seç</button>
                <button @click="addLinkPopup = true" class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-6">Link
                    Ekle</button>
                <button @click="openMyLinktree = true" class="bg-blue-500 text-white px-4 py-2 rounded-lg ml-6">Benim
                    linktree</button>
            </div>
        </div>

        <!-- Links -->
        <div class="container mx-auto py-12">
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-8">
    <div v-for="(item, index) in user.links" :key="index">
      <div class="bg-white p-8 shadow rounded-lg">
        <div class="text-lg font-semibold mb-4">{{ item.name }}</div>
        <a href="#" class="text-blue-500">{{ item.link }}</a>
      </div>
    </div>
  </div>
</div>

    </div>

    <!-- add profile image -->
    <div v-if="isPopupOpen" class="popup-background">
        <div class="flex items-center justify-center">
            <!-- Kullanıcının resmi -->
            <img v-if="imageUrl" :src="imageUrl" class="w-32 h-32 rounded-full object-cover">

            <!-- Resim yükleme popup'ı -->
            <div v-if="isPopupOpen" class="fixed z-10 inset-0 overflow-y-auto">
                <div class="flex items-center justify-center min-h-screen">
                    <div class="bg-white rounded-lg shadow-lg relative">
                        <div class="p-8">
                            <!-- Resim yükleme alanı -->
                            <input type="file" @change="onImageSelected" ref="fileInput" accept="image/*">

                            <!-- Resim önizleme alanı -->
                            <img v-if="selectedImage" :src="selectedImage" class="w-full h-60 my-4">

                            <!-- Popup kapatma butonu -->
                            <button class="absolute top-0 right-0 m-4" @click="closePopup">
                                <svg class="w-6 h-6" fill="none" stroke="#000" viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12"></path>
                                </svg>
                            </button>
                            <button v-if="selectedImage" @click="uploadFile()"
                                class="bg-blue-500 text-white px-4 py-2 rounded-lg mr-4">Yükle</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>


    <!-- add link popup -->
    <div v-if="addLinkPopup" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white rounded-lg shadow-xl p-6 mx-4">
            <label for="name" class="block text-gray-700 font-bold mb-2">Ad:</label>
            <input type="text" id="name" v-model="name"
                class="border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline">
            <label for="link" class="block text-gray-700 font-bold mb-2">Link:</label>
            <input type="text" id="link" v-model="link"
                class="border rounded py-2 px-3 mb-3 leading-tight focus:outline-none focus:shadow-outline">
            <div class="flex justify-end">
                <button @click="addLinkPopup = false"
                    class=" bg-red-700 mr-5 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Kapat</button>
                <button v-if="name && link" @click="addLink()"
                    class="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline">Kaydet</button>
            </div>
        </div>
    </div>


    <!-- kopy my linktree -->
    <div v-if="openMyLinktree" class="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
        <div class="bg-white rounded-lg shadow-xl p-6 mx-4">
            <div class="flex items-center mb-4">
                <input type="text" :value="url"
                    class="border rounded py-2 px-3 leading-tight focus:outline-none focus:shadow-outline flex-grow">
                <button @click="copyToClipboard" class="ml-4 text-gray-500 hover:text-gray-700 focus:outline-none">
                    <svg class="w-6 h-6 fill-current" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
                        <path d="M14 1h-12c-1.1 0-2 .9-2 2v12c0 1.1.9 2 2 2h6v-2h-6v-12h12v6h2v-6c0-1.1-.9-2-2-2z" />
                        <path d="M18 7h-10c-.6 0-1 .4-1 1s.4 1 1 1h10c.6 0 1-.4 1-1s-.4-1-1-1z" />
                        <path d="M16 9h-8c-.6 0-1 .4-1 1s.4 1 1 1h8c.6 0 1-.4 1-1s-.4-1-1-1z" />
                        <path d="M14 11h-6c-.6 0-1 .4-1 1s.4 1 1 1h6c.6 0 1-.4 1-1s-.4-1-1-1z" />
                        <path d="M18 15h-14c-.6 0-1 .4-1 1s.4 1 1 1h14c.6 0 1-.4 1-1s-.4-1-1-1z" />
                    </svg>
                </button>
            </div>
            <button @click="openMyLinktree = false"
                class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full absolute top-0 right-0 m-4 focus:outline-none focus:shadow-outline">X</button>
        </div>
    </div>



    <!-- select background -->
    <div v-if="showColorPicker" class="popupcolor-background">
        <div class="popup-container">
            <div class="flex justify-center">
                <div v-for="(color, index) in colors" :key="index" @click="selectedColorIndex = index"
                    :class="{ 'border-2 border-blue-500': selectedColorIndex === index }"
                    class="w-12 h-12 rounded-full m-4 cursor-pointer" :style="{ backgroundColor: color }"></div>
            </div>
            <button @click="applySelectedColor" class="bg-blue-500 text-white py-2 px-4 rounded mt-8 mr-4">
                Uygula
            </button>
            <button @click="showColorPicker = false" class="bg-gray-500 text-white py-2 px-4 rounded mt-4">
                Kapat
            </button>
        </div>
    </div>
</template>
  
  
  
<script>
import axios from "axios"
export default {
    data() {
        return {
            user: {
                username: null,
                password: null,
                namesurname: null,
                id: null,
                backgroundcolor: null,
                links: [],
                email:null
            },
            isPopupOpen: false,
            selectedImage: null,
            imageUrl: null,
            imageProfileUrl:null,
            name: '',
            link: '',
            addLinkPopup: false,
            openMyLinktree: false,
            url: 'http://localhost:8080/mylinktree/' + this.$route.params.id,
            showColorPicker: false,
            colors: ["#ff0000", "#00ff00", "#0000ff", "#ffff00", "#00ffff"],
            selectedColorIndex: null,
            file: null
        }
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

        console.log(this.user);// id'si 1 olan kullanıcı objesi

        try {
      const response = await axios.get('http://localhost:8000/api/image/'+this.user.email+".png", {
        responseType: 'arraybuffer', // binary response type
      });
      const base64String = btoa(
        new Uint8Array(response.data)
          .reduce((data, byte) => data + String.fromCharCode(byte), '')
      );
      this.imageProfileUrl = `data:image/png;base64,${base64String}`;
    } catch (error) {
      console.log(error);
    }
    },
    methods: {
        openPopup() {
            this.isPopupOpen = true
        },
        closePopup() {
            this.isPopupOpen = false
        },

        //upload image
        onImageSelected(event) {
            this.file = event.target.files[0];
            this.selectedImage = URL.createObjectURL(this.file);
        },

        uploadFile() {
            this.isPopupOpen=false
            const formData = new FormData();
            formData.append('image', this.file);
            formData.append('description',this.user.email)
            axios.post('http://localhost:8000/api/images', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                }
            })
                .then(response => {
                    console.log(response.data);
                })
                .catch(error => {
                    console.log(error);
                });
            window.location.reload()
        },
        copyToClipboard() {
            navigator.clipboard.writeText(this.url);
        },

        async applySelectedColor() {
            const selectedColor = this.colors[this.selectedColorIndex];
            this.user.backgroundcolor = selectedColor;
            console.log("user bilgisi: ", this.user);
            // Seçili rengi kullan
            this.showColorPicker = false;

            await axios.put('http://localhost:8000/api/user/' + this.$route.params.id, this.user)
                .then({
                })
                .catch(error => {
                    console.log(error);
                });
            window.location.reload();
        },
        async addLink() {
            this.addLinkPopup = false
            var link = {
                name: this.name,
                link: this.link
            }
            this.user.links.push(link);
            await axios.put('http://localhost:8000/api/user/' + this.$route.params.id, this.user)
                .then({
                })
                .catch(error => {
                    console.log(error);
                });
            window.location.reload();
        },
    }
}
</script>
<style scoped>
.popup-background {
    position: fixed;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;
    background-color: rgba(0, 0, 0, 0.5);
    z-index: 999;
}

.popup-content {
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    background-color: #000000;
    padding: 1rem;
}

.popupcolor-background {
    background-color: rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
}

.popup-container {
    background-color: white;
    padding: 20px;
    border-radius: 5px;
}
</style>