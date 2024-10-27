<template>
  <v-navigation-drawer floating v-model="drawer" width="230" permanent color="#ECEFF1" theme="light">
    <v-list class="text-center mt-5" density="compact" nav>
      <v-list-item>
        <v-btn class="text-none flex-grow-1" height="38" variant="flat" color="#1E88E5"
          style="border-radius:8px; font-size:0.8rem;" width="220" prepend-icon="mdi-plus">Nuevo Componente</v-btn>
      </v-list-item>
      <v-list-item>
        <v-btn class="text-none flex-grow-1" height="38" variant="flat" color="#1E88E5"
          style="border-radius:8px; font-size:0.8rem;" width="220" prepend-icon="mdi-history">Historial</v-btn>
      </v-list-item>

      <v-card class="mt-3" theme="light" variant="flat" style="border-radius:8px;">
        <!-- TOTAL DE COMPONENTES -->
        <v-list>

          <v-list-item>
            <v-list-item-title>Estadísticas</v-list-item-title>
          </v-list-item>

          <v-list-item>
            <div style="font-size:0.8rem;">Total</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="totalRegistros" inline></v-badge>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <!-- COMPONENTES DISPONIBLES -->
          <v-list-item>
            <div style="font-size:0.8rem;">Disponibles</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="disponiblesCount" inline> </v-badge>
            </template>
          </v-list-item>

          <!-- COMPONENTES NO DISPONIBLES -->
          <v-list-item>
            <div style="font-size:0.8rem;">Vinculados</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="noDisponiblesCount" inline> </v-badge>
            </template>
          </v-list-item>

          <v-divider></v-divider>

          <!-- CONTADOR DE  PLACA BASE-->
          <v-list-item>
            <div style="font-size:0.8rem;">PLaca base</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="placaBaseCount" inline> </v-badge>
            </template>
          </v-list-item>

          <!-- CONTADOR DE LECTOR CD-->
          <v-list-item>
            <div style="font-size:0.8rem;">Lector CD</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="lectorCdCount" inline> </v-badge>
            </template>
          </v-list-item>

          <!-- CONTADOR DE MEMORIA RAM -->
          <v-list-item>
            <div style="font-size:0.8rem;">RAM</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="memoriaRamCount" inline> </v-badge>
            </template>
          </v-list-item>

          <!-- CONTADOR DE DISCO DURO  -->
          <v-list-item>
            <div style="font-size:0.8rem;">Disco duro</div>
            <template v-slot:append>
              <v-badge color="#CFD8DC" :content="discoDuroCount" inline> </v-badge>
            </template>
          </v-list-item>
        </v-list>
      </v-card>

    </v-list>



  </v-navigation-drawer>
  <v-app theme="backgroundTheme">

    <v-row class="mt-2 mb-2" no-gutters>
      <v-card theme="light" class="elevation-4 me-2 ms-5" style="border-radius: 15px;
         overflow-y: auto;
         scrollbar-width: none;" height="97vh" width="100%">

        <v-app-bar class="elevation-2 position-sticky" density="comfortable">

          <v-spacer></v-spacer>
          <!-- BUSCADOR DE TABLA -->
          <v-btn class="text-none" variant="outlined" :ripple="false" color="#CFD8DC" height="40"
            style="border-radius: 8px;">
            <v-icon color="#263238" size="large">mdi-magnify</v-icon>
            <v-text-field class="text-grey-darken-4" density v-model="search" label="Buscar un componente"
              variant="text" hide-details single-line clearable width="300px" :bordered="false">
              <v-tooltip activator="parent" location="bottom">Evitar espacios en blanco
                ej: placa_base
              </v-tooltip>
            </v-text-field>
          </v-btn>
          <v-spacer></v-spacer>

          <template v-slot:append>
            <v-btn icon size="small" rounded color="" style="border-radius: 8px;">
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
            <LoginButton />

          </template>
        </v-app-bar>


        <v-card-text>
          <!-- Data table card -->
          <v-card variant="text">
            <v-data-table loading-text="Cargando..." :loading="isLoading" class="elevation-0  table-hover-effect"
              fixed-header v-model:page="page" :headers="headers" :items="articulos" :search="search" density="compact"
              :items-per-page="itemsPerPage" style="font-size:0.9rem;">

              <template v-slot:loading>
                <v-skeleton-loader type="table-row@10" color="green-lighten-5"></v-skeleton-loader>
              </template>

              <!-- <template v-slot:top></template> -->

              <!-- Filas del data table -->
              <template v-slot:item="{ item, index }">
                <tr>
                  <td>
                    <v-text-field class="mt-5  font-weight-bold" variant="text" color="green-lighten-1"
                      v-model="item.nro_serie" :readonly="isReadOnly" required width="200"
                      density="compact"></v-text-field>
                  </td>

                  <td>
                    <v-text-field class="mt-5" variant="text" color="green-lighten-1" v-model="item.marca"
                      :readonly="isReadOnly" required width="200" density="compact"></v-text-field>
                  </td>

                  <td>
                    <v-select variant="text" density="compact" class="mt-5" v-model="item.tipo_componente"
                      :items="tipos_de_componentes" :rules="[v => !!v || 'Componente es requerido']" width="150"
                      required :readonly="isReadOnly"></v-select>

                  </td>
                  <td>
                    <v-chip variant="flat" size="small" :color="item.disponible ? 'rgb(0,120,84)' : 'rgb(158,38,41)'"
                      style="font-size: 0.7rem;">
                      {{ item.disponible ? 'Si' : 'No' }}
                    </v-chip>
                  </td>
                  <td>{{ new Date(item.created_at).toLocaleString() }}</td>
                  <td>{{ new Date(item.updated_at).toLocaleString() }}</td>
                  <td>

                    <!-- BOTON EDITAR -->
                    <v-btn variant="tonal" class="mx-1" density="comfortable"
                      @click="updateArticulo(item.id, item.nro_serie, item.marca, item.tipo_componente)" icon
                      size="small">
                      <v-icon>mdi-cog</v-icon>
                      <v-tooltip activator="parent" location="bottom">Editar {{ item.nro_serie }}</v-tooltip>
                    </v-btn>



                    <!-- BOTON ELIMINAR -->
                    <v-btn variant="tonal" density="comfortable" @click.stop="dialog = true; id = item.id" icon
                      size="small">
                      <v-icon>mdi-trash-can</v-icon>
                      <v-tooltip activator="parent" location="bottom">Eliminar {{ item.nro_serie }}</v-tooltip>
                    </v-btn>
                  </td>
                </tr>

              </template>


              <template v-slot:bottom></template>

            </v-data-table>


            <!-- ventana de dialogo para eliminar registros -->
            <v-dialog v-model="dialog" max-width="300">
              <v-card>
                <v-card-title class="headline text-center">
                  <div>
                    <v-icon color="red">mdi-delete-forever-outline</v-icon>
                  </div>
                  <div>
                    ¿Borrar?
                  </div>
                  <div style="font-size: 0.8rem;">
                    Esta acción es irreversible
                  </div>
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn @click="dialog = false" variant="outlined" class="elevation-0"
                    size="small"><v-icon>mdi-close</v-icon>
                    Cancelar</v-btn>
                  <v-btn @click="confirmarBorrado(id)" class="elevation-0" variant="elevated" color="red" size="small">
                    <v-icon>mdi-delete-forever-outline</v-icon>
                    Aceptar</v-btn>
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-snackbar v-model="snackbar" color="white" multi-line>
              {{ textsnack }}
              <template v-slot:actions>
                <v-btn color="blue" variant="text" @click="snackbar = false">
                  Cerrar
                </v-btn>
              </template>
            </v-snackbar>

          </v-card>
        </v-card-text>

        <v-card-actions>
          <v-btn color="orange" text="Share"></v-btn>

          <v-btn color="orange" text="Explore"></v-btn>
        </v-card-actions>
      </v-card>

    </v-row>






  </v-app>


</template>

<style scoped>
.even-row {
  background-color: #DEF9C4;
  /* Color de fondo para filas pares */
}

.odd-row {
  background-color: #9CDBA6;
  /* Color de fondo para filas impares */
}

.custom-progress-circular {
  margin: 1rem;
}
</style>

<script>
import api from '@/axiosconfig'
import LoadingCircular from './LoadingCircular.vue';

export default {
  name: 'ListarArticulosPage',
  data() {
    return {
      drawer: true,
      games: [
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/4.png',
          title: 'The Sci-Fi Shooter Experience',
          subtitle: 'Dive into a futuristic world of intense battles and alien encounters.',
          advanced: false,
          duration: '8 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/2.png',
          title: 'Epic Adventures in Open Worlds',
          subtitle: 'Embark on a journey through vast, immersive landscapes and quests.',
          advanced: true,
          duration: '10 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/3.png',
          title: 'Surviving the Space Station Horror',
          subtitle: 'Navigate a haunted space station in this chilling survival horror game.',
          advanced: false,
          duration: '9 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/5.png',
          title: 'Neon-Lit High-Speed Racing Thrills',
          subtitle: 'Experience adrenaline-pumping races in a futuristic, neon-soaked city.',
          advanced: true,
          duration: '12 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/6.png',
          title: 'Retro-Style Platformer Adventures',
          subtitle: 'Jump and dash through pixelated worlds in this classic-style platformer.',
          advanced: false,
          duration: '11 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/7.png',
          title: 'Medieval Strategic War Campaigns',
          subtitle: 'Lead armies into epic battles and conquer kingdoms in this strategic game.',
          advanced: true,
          duration: '10 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/1.png',
          title: 'Underwater VR Exploration Adventure',
          subtitle: 'Dive deep into the ocean and discover the mysteries of the underwater world.',
          advanced: true,
          duration: '11 minutes',
        },
        {
          img: 'https://cdn.vuetifyjs.com/docs/images/graphics/games/8.png',
          title: '1920s Mystery Detective Chronicles',
          subtitle: 'Solve crimes and uncover secrets in the glamourous 1920s era.',
          advanced: false,
          duration: '9 minutes',
        },
      ],



      dialog: false,
      dialog_nuevo_registro: false,
      articulos: [],
      id: null,
      search: '',
      snackbar: false,
      headers: [
        { title: 'Serial', value: 'nro_serie', key: 'nro_serie' },
        { title: 'Marca', value: 'marca', key: 'marca' },
        { title: 'Tipo de Componente', value: 'tipo_componente', key: 'tipo_componente' },
        { title: 'Disponible', value: 'disponible', key: 'disponible' },
        { title: 'Creado', value: 'created_at', key: 'created_at' },
        { title: 'Modificado', value: 'updated_at', key: 'updated_at' },
        { title: 'Operaciones', value: 'operaciones' },
      ],
      page: 1,
      itemsPerPage: 10,
      show: false,
      isLoading: false,
      isReadOnly: true,
      tab: null,

      tipos_de_componentes: [
        'disco_duro',
        'placa_base',
        'lector_cd',
        'memoria_ram',
      ],
    };
  },

  mounted() {
    this.obtenerArticulos();
  },

  computed: {
    percentageAvailable() {
      const totalArticles = this.totalRegistros;
      const availableArticles = this.disponiblesCount;

      if (totalArticles > 0) {
        return ((availableArticles / totalArticles) * 100).toFixed(0);
      }

      return 0;
    },
    percentageVinculated() {
      const totalArticles = this.totalRegistros;
      const vinculated = this.noDisponiblesCount;

      if (totalArticles > 0) {
        return ((vinculated / totalArticles) * 100).toFixed(0);
      }

      return 0;
    },

    pageCount() {
      return Math.ceil(this.articulos.length / this.itemsPerPage)
    },

    totalRegistros() {
      return this.articulos.length;
    },

    disponiblesCount() {
      return this.articulos.filter(articulo => articulo.disponible === 1).length;
    },
    noDisponiblesCount() {
      return this.articulos.filter(articulo => articulo.disponible === 0).length;
    },
    placaBaseCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'placa_base').length;
    },
    lectorCdCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'lector_cd').length;
    },
    memoriaRamCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'memoria_ram').length;
    },
    discoDuroCount() {
      return this.articulos.filter(articulo => articulo.tipo_componente === 'disco_duro').length;
    },
  },
  methods: {
    toggleAllFields() {
      this.isReadOnly = !this.isReadOnly;
      // console.log('Toggling all fields:', this.isReadOnly);
    },

    obtenerNombreTipoComponente(tipoComponente) {
      const mapeo = {
        placa_base: 'Placa Base',
        memoria_ram: 'Memoria RAM',
        lector_cd: 'Lector CD',
        disco_duro: 'Disco Duro'
      };
      return mapeo[tipoComponente] || tipoComponente;
    },

    obtenerArticulos() {
      this.isLoading = true;
      api.get('/componentes')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
        })
        .catch(error => console.error(error));
    },

    async updateArticulo(id, nro_serie, marca, tipo_componente) {
      id: id;
      const articulo = {
        nro_serie: nro_serie,
        marca: marca,
        tipo_componente: tipo_componente
      };
      // console.log(id, articulo);

      try {
        const response = await api.put(`/componentes/${id}`, articulo)
        // console.log(response);
        window.location.reload();
      } catch (error) {
        console.error(error.response);
      }
    },

    confirmarBorrado(id) {
      api.delete(`/componentes/${id}`)
        .then(() => {
          this.obtenerArticulos();
          this.dialog = false;
          this.snackbar = true;
          this.textsnack = 'Registro eliminado exitosamente';
        })
        .catch((error) => {
          this.dialog = false;
          this.snackbar = true;
          this.textsnack = `${error.response.data.message}\n${error.response.data.details}`;

        });
    },
  },
};
</script>
