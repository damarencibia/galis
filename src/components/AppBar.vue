<template>

  <v-app-bar class="elevation-1" color="white">
    <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
    <div class="d-flex align-center">
      <v-img alt="Vuetify Logo" class="shrink mr-2 ms-5" contain src="@/assets/logo_black.jpeg" transition="scale-transition" width="40"  />
    </div>

    <div>
      <p>v1.0</p>
    </div>

    <LoginButton />
  </v-app-bar>



  </template>

  <script>
  import api from '@/axiosconfig'

  export default {
  props: ['title'],

  data: () => ({
    userName: "Iniciar Sesión",
    keyes:[],
    keys2:[],
  }),

  mounted() {
    this.getAuthenticated();
    this.getkeyes();

  },



  methods: {
    navigateTo(route) {
      this.$router.push(route);
    },

    getAuthenticated() {

      api.post('/getAuthenticatedUserName')

        .then(response => {
          this.userName = response.data;

        })
        .catch(error => console.error(error));
    },

    logout() {
      // Elimina el token de autenticación del localStorage
      localStorage.removeItem('authToken');
      // Muestra un mensaje de alerta al usuario indicando que se cerró la sesión correctamente
      alert('Sesión cerrada con éxito');
      // Redirige al usuario a la página de inicio de sesión o a otra página adecuada
      this.$router.push('/');
    },

    getkeyes() {
      api.get('/keyes')
        .then(response => {
          this.keyes = response.data;
          console.log(response.data);
        })
        .catch(error => console.error(error));
      api.get('/licencias')
        .then(response => {
          this.keyes2 = response.data;
          console.log(response.data);
        })
        .catch(error => console.error(error));
    },
  }
  };
  </script>
