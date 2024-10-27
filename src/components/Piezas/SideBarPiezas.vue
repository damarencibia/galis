<template>
  <!-- <div class="d-flex align-center">
    <v-img alt="Vuetify Logo" class="shrink mr-2 ms-5" contain src="@/assets/galisAppBar2.jpeg" transition="scale-transition" width="100"  />
  </div> -->
  <v-navigation-drawer floating v-model="drawer" width="250"  permanent  color="#ECEFF1"
    theme="light">
    <v-list class="text-center mt-5" density="compact" nav>


      <v-list-item class="text-green-darken-3 font-weight-bold">
        <v-btn class="text-none flex-grow-1" height="38" variant="flat" color="#1E88E5"
          style="border-radius:8px; font-size:0.8rem;" width="220" prepend-icon="mdi-plus">Nuevo Componente</v-btn>
      </v-list-item>

      <v-list-item prepend-icon="mdi-keyboard-outline" title="Piezas" value="piezas" :to="'/piezas'"></v-list-item>
      <v-list-item prepend-icon="mdi-cpu-64-bit" title="Componentes" value="componentes"
        :to="'/componentes'"></v-list-item>
      <v-list-item prepend-icon="mdi-monitor" title="Ordenadores" value="ordenadores"
        :to="'/computadoras'"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item>
    </v-list>



  </v-navigation-drawer>



</template>

<script>
import api from '@/axiosconfig'

export default {
  props: [],

  data: () => ({
    drawer: true,
    rail: true,
  }),

  mounted() {


  },



  methods: {

  }
};
</script>
