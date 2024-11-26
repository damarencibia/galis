<template>
  <div>
    <v-dialog v-model="dialog" transition="dialog-bottom-transition" max-width="60vh">
      <template v-slot:activator="{ props: activatorProps }">
        <v-btn class="text-none flex-grow-1" height="38" variant="flat" color="#3498db "
          style="border-radius:8px; font-size:0.8rem;" width="220" prepend-icon="mdi-plus" v-bind="activatorProps">Nuevo
          Componente</v-btn>

      </template>

      <v-card>
        <v-toolbar color="#ffffff">
          <v-btn icon="mdi-close" @click="dialog = false" :ripple="false" color="#34495e"></v-btn>

          <v-toolbar-title style="font-size: 0.9rem;">Nuevo Componente</v-toolbar-title>


        </v-toolbar>
        <!-- <div class="d-flex justify-center">
          <v-btn icon="mdi-restore" variant="text" @click="reset" :ripple="false" color="#34495e" density="compact">
          </v-btn>
        </div> -->

        <v-form ref="form" class="pa-2" v-on:submit.prevent="guardarArticulo()">

          <v-text-field clearable density="compact" class="mb-4" v-model="articulo.nro_serie" label="Numero de serie" single-line
            variant="outlined" outlined required color="#3498db" maxlength="30" :counter="30" :rules="numeroSerieRules">
          </v-text-field>


          <v-text-field clearable density="compact" class="mb-4" v-model="articulo.marca" label="Marca" single-line
            variant="outlined" outlined required color="#3498db" maxlength="30" :counter="30"
            :rules="marcaRules"></v-text-field>

          <v-select  color="#3498db" density="compact" variant="outlined" class="mb-4" v-model="articulo.tipo_componente" :items="items"
            :rules="[v => !!v || 'Componente es requerido']"  required></v-select>

          <v-checkbox v-model="checkbox" :rules="[v => !!v || ' Debe confirmar para continuar!']"
            label="Confirmar formulario" required color="#34495e"></v-checkbox>

          <div class="d-flex justify-center mb-6 mt-2">


            <v-btn prepend-icon="mdi-check" class="text-none" color="#3498db" block variant="flat" @click="validate">
              Guardar
            </v-btn>





          </div>
        </v-form>

      </v-card>
    </v-dialog>
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
      dialog: false,

      // inicio componentes del snackbar
      snackbar: false,
      snackbarMessage: null,
      snackbarDetails: null,
      // fin componentes del snackbar
      id: null,
      articulo: {
        nro_serie: '',
        marca: '',
        tipo_componente: 'Disco duro',
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
        'Disco duro',
        'Placa madre',
        'Memoria RAM',
        'Lector CD',
      ],
      checkbox: false,
    }
  },

  methods: {
    async guardarArticulo() {
      if (this.articulo.tipo_componente === 'Disco duro') {
        this.articulo.tipo_componente = 'disco_duro'
      } else if (this.articulo.tipo_componente === 'Placa madre') {
        this.articulo.tipo_componente = 'placa_base'
      } else if (this.articulo.tipo_componente === 'Lector CD') {
        this.articulo.tipo_componente = 'lector_cd'
      } else if (this.articulo.tipo_componente === 'Memoria RAM') {
        this.articulo.tipo_componente = 'memoria_ram'
      }


      try {
        const response = await api.post('/componentes', this.articulo);
        api.get('/componentes');

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
        this.$emit('component-created', this.articulo);
        // this.$refs.form.reset()
        this.dialog = false;
      }
    },

    reset() {
      this.$refs.form.reset()
    },
  }
}
</script>
