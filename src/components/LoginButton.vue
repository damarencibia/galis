<template>

  <!-- <v-app-bar-nav-icon @click.stop="drawer = !drawer"></v-app-bar-nav-icon> -->
  <!-- <div class="d-flex align-center">
      <v-img alt="Vuetify Logo" class="shrink mr-2 ms-5" contain src="@/assets/galisAppBar2.jpeg" transition="scale-transition" width="100"  />
    </div> -->

  <v-toolbar-title>{{ title }}</v-toolbar-title>

  <v-spacer></v-spacer>

  <v-btn class="me-5 text-caption text-none" :to="'/login'" v-if="userName === 'Acceder'" color="#388E3C" rounded variant="flat">
    {{ userName }}
  </v-btn>
  <v-btn class="me-5 text-caption text-none" :to="'/register'" v-if="userName === 'Acceder'" color="#388E3C" rounded variant="outlined">
    Registarse
  </v-btn>

  <v-btn class="me-5 text-none" color="#37474F" prepend-icon="mdi-account-circle-outline" v-else density="compact" rounded>
    {{ userName  }}

    <!-- <v-menu activator="parent">
      <v-theme-provider class="pa-10" theme="light">
        <v-list class="elevation-1 ">
          <div class="d-flex justify-center">
            <span class="mr-2 text-none">{{ userName }}</span>
          </div>
          <v-list-item>
            <v-btn class="text-caption text-none" variant="plain" @click="">Planes</v-btn>
          </v-list-item>
          <v-list-item>
            <v-btn class="text-caption text-none" variant="plain" @click="logout">Cerrar Sesión</v-btn>
          </v-list-item>
        </v-list>
      </v-theme-provider>
    </v-menu> -->

    <v-menu activator="parent">
      <v-list class="elevation-1">
        <v-list-item>
          <v-btn class="text-caption text-none" variant="plain" @click="">Planes</v-btn>
        </v-list-item>
        <v-list-item>
          <v-btn class="text-caption text-none" variant="plain" @click="logout">Cerrar Sesión</v-btn>
        </v-list-item>
      </v-list>
    </v-menu>

  </v-btn>




</template>

<script>
import api from '@/axiosconfig'

export default {
  props: ['title'],

  data: () => ({
    userName: "Acceder",
    keyes: [],
    keys2: [],
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
