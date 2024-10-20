<template>
  <div class="d-flex justify-center mb-6">
    <v-card class="mx-auto mt-5 elevation-5" rounded width="400">
      <div>
        <v-toolbar color="blue-grey-lighten-2">
          <v-btn class="hidden-xs-only" icon :to="'/componentes'">
            <v-icon>mdi-arrow-left</v-icon>
            <v-tooltip activator="parent" location="bottom">Volver</v-tooltip>
          </v-btn>
          <v-btn class="hidden-xs-only" icon :to="'/homeprovider'">
            <v-icon>mdi-home-variant-outline</v-icon>
            <v-tooltip activator="parent" location="bottom">Inicio</v-tooltip>
          </v-btn>

          <v-toolbar-title>Crear Componente</v-toolbar-title>

        </v-toolbar>
      </div>

      <v-form ref="form" class="pa-4 pt-6" v-on:submit.prevent="guardarArticulo()">
        <v-text-field class="mb-4" v-model="articulo.nro_serie" label="Numero de serie" variant="underlined" outlined
          required :counter="50" :rules="numeroSerieRules">
        </v-text-field>

        <v-text-field class="mb-4" v-model="articulo.marca" label="Marca" variant="underlined" outlined required
          :counter="50" :rules="marcaRules"></v-text-field>

        <v-select variant="underlined" class="mb-4" v-model="articulo.tipo_componente" :items="items"
          :rules="[v => !!v || 'Componente es requerido']" label="Tipo de componente" required></v-select>

        <v-checkbox v-model="checkbox" :rules="[v => !!v || ' Debe confirmar para continuar!']"
          label="Confirmar formulario" required></v-checkbox>

        <div class="d-flex justify-center mb-6 mt-2">
          <v-btn prepend-icon="mdi-restore" class="text-none mx-4" color="error" min-width="92" variant="outlined"
            @click="reset" size="small">
            Reiniciar
          </v-btn>
          <v-btn prepend-icon="mdi-check" class="text-none" color="success" min-width="92" variant="outlined"
            @click="validate" size="small">
            Validar
          </v-btn>
        </div>
      </v-form>
    </v-card>
  </div>

  <v-snackbar v-model="snackbar" color="white" :timeout="4000" top right>
    <v-container>
      <v-div class="d-flex justify-space-between">
        <v-div class="d-flex flex-column me-6">
          <v-row>
            {{ snackbarMessage }}
          </v-row>
          <v-row>
            {{ snackbarDetails }}
          </v-row>
        </v-div>
        <v-btn class="elevation-0" dark text color="blue" variant="text" @click="snackbar = false">
          Cerrar
        </v-btn>
      </v-div>
    </v-container>
  </v-snackbar>

</template>


<script>
import api from '@/axiosconfig';

export default {
  data() {
    return {
      // inicio componentes del snackbar
      snackbar: false,
      snackbarMessage: null,
      snackbarDetails: null,
      // fin componentes del snackbar
      id: null,
      articulo: {
        nro_serie: '',
        marca: '',
        tipo_componente: '',
      },
      name: '',
      numeroSerieRules: [
        v => !!v || 'Número de serie es requerido',
        v => (v && v.length <= 50) || 'Número de serie no debe exceder 50 characteres',
      ],
      marcaRules: [
        v => !!v || 'marca es requerida',
        v => (v && v.length <= 50) || 'Marca no bebe exceder 50 characteres',
      ],

      items: [
        'disco_duro',
        'placa_base',
        'lector_cd',
        'memoria_ram',
      ],
      checkbox: false,
    }
  },

  methods: {
    async guardarArticulo() {
      try {
        const response = await api.post('/componentes', this.articulo);
        // console.log(response);

      } catch (error) {
        // console.error(error.response);
        // Actualiza el mensaje del Snackbar basado en la respuesta del error
        this.snackbarMessage = `${error.response.data.message}`;;
        this.snackbarDetails = `${error.response.data.details}`;;
        this.snackbar = true; // Activa el Snackbar
      }
    },

    async validate() {
      const { valid } = await this.$refs.form.validate();

      if (valid) {
        // Guarda el objeto articulo
        this.guardarArticulo();

        this.$router.push('/componentes');
      }
    },
    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>
