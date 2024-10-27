<template>
  <!-- <div class="d-flex align-center">
    <v-img alt="Vuetify Logo" class="shrink mr-2 ms-5" contain src="@/assets/galisAppBar2.jpeg" transition="scale-transition" width="100"  />
  </div> -->
  <v-navigation-drawer v-model="drawer" width="70" permanent color="#ECEFF1" theme="light">
    <v-list class="text-center" density="compact" nav style="font-size: 0.6rem;">

      <v-list-item color="blue-darken-1" value="piezas" :to="'/homeprovider'" style="border-radius: 8px;">
        <v-icon color="#1E88E5" size="x-large">mdi-home-variant-outline</v-icon>
      </v-list-item>
      <div class="text-blue-darken-1  mb-5">Inicio</div>


      <v-list-item color="blue-darken-1" value="piezas" :to="'/piezas'" style="border-radius: 8px;">
        <v-icon color="#1E88E5" size="x-large">mdi-keyboard-outline</v-icon>
      </v-list-item>
      <div class="text-blue-darken-1  mb-5">Piezas</div>

      <v-list-item color="blue-darken-1" value="piezas" :to="'/componentes'" style="border-radius: 8px;">
        <v-icon color="#1E88E5" size="x-large">mdi-cpu-64-bit</v-icon>
      </v-list-item>
      <div class="text-blue-darken-1 d-flex  mb-5">Componentes</div>

      <v-list-item color="blue-darken-1" value="piezas" :to="'/ordenadores'" style="border-radius: 8px;">
        <v-icon color="#1E88E5" size="x-large">mdi-monitor</v-icon>
      </v-list-item>
      <div class="text-blue-darken-1  mb-5">Ordenadores</div>

      <!-- <v-list-item prepend-icon="mdi-cpu-64-bit" title="Componentes" value="componentes"
        :to="'/componentes'"></v-list-item>
      <v-list-item prepend-icon="mdi-monitor" title="Ordenadores" value="ordenadores"
        :to="'/computadoras'"></v-list-item>
      <v-list-item prepend-icon="mdi-account-group-outline" title="Users" value="users"></v-list-item> -->

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
