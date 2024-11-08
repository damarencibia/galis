<template>
  <v-navigation-drawer floating v-model="drawer" width="230" permanent color="#ECEFF1" theme="light">
    <v-list class="text-center mt-5" density="compact" nav>
      <v-list-item>

        <CrearComponente @component-created="onComponentCreated" />


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

        <!-- 🛸CARD DE CONTENEDOR DE ARTICULOS -->
        <v-card class="elevation-1">
          <v-data-iterator :items="articulos" :items-per-page="4" :search="search">

            <template v-slot:default="{ items }">
              <v-container class="pa-2" fluid>
                <v-row dense>
                  <v-col v-for="item in items" :key="item.raw.id" cols="auto">
                    <v-card class="pb-3" border flat width="200">

                      <div class="d-flex justify-space-between px-4 mt-4">
                        <div class="d-flex align-center text-caption text-medium-emphasis me-1">
                          <v-icon v-if="item.raw.tipo_componente === 'placa_base'" icon="mdi-clock" start></v-icon>
                          <v-icon v-if="item.raw.tipo_componente === 'memoria_ram'" icon="mdi-plus" start></v-icon>
                          <v-icon v-if="item.raw.tipo_componente === 'lector_cd'" icon="mdi-clock" start></v-icon>
                          <v-icon v-if="item.raw.tipo_componente === 'disco_duro'" icon="mdi-clock" start></v-icon>
                        </div>

                        <div class="text-center">
                          <v-menu>
                            <template v-slot:activator="{ props }">
                              <v-btn class="text-none" size="small" icon border rounded flat density="comfortable"
                                v-bind="props">
                                <v-icon>mdi-dots-horizontal</v-icon>
                              </v-btn>
                            </template>

                            <v-list>
                              <v-list-item>
                                <!-- BOTON EDITAR -->
                                <v-btn variant="tonal" class="mx-1" density="comfortable"
                                  @click="updateArticulo(item.id, item.nro_serie, item.marca, item.tipo_componente)"
                                  icon size="small">
                                  <v-icon>mdi-cog</v-icon>
                                  <v-tooltip activator="parent" location="bottom">Editar {{ item.nro_serie
                                    }}</v-tooltip>
                                </v-btn>
                              </v-list-item>

                              <v-list-item>
                                <!-- BOTON ELIMINAR -->
                                <v-btn variant="tonal" density="comfortable"
                                  @click.stop="dialog = true; id = item.raw.id" icon size="small">
                                  <v-icon>mdi-trash-can</v-icon>
                                  <v-tooltip activator="parent" location="bottom">Eliminar {{ item.nro_serie
                                    }}</v-tooltip>
                                </v-btn>
                              </v-list-item>
                            </v-list>
                          </v-menu>
                        </div>
                      </div>

                      <v-list-item>
                        {{ item.raw.nro_serie.length > 17 ? item.raw.nro_serie.slice(0, 17) + '...' : item.raw.nro_serie }}
                      </v-list-item>
                      <v-list-item>
                        {{ item.raw.marca }}
                      </v-list-item>
                      <v-list-item>
                        {{ item.raw.tipo_componente }}
                      </v-list-item>
                      <v-list-item>
                        {{ item.raw.disponible }}
                      </v-list-item>

                    </v-card>
                  </v-col>
                </v-row>
              </v-container>
            </template>

            <template v-slot:footer="{ page, pageCount, prevPage, nextPage }">
              <div class="d-flex align-center justify-center pa-4">
                <v-btn :disabled="page === 1" density="comfortable" icon="mdi-arrow-left" variant="tonal" rounded
                  @click="prevPage"></v-btn>

                <div class="mx-2 text-caption">
                  Page {{ page }} of {{ pageCount }}
                </div>

                <v-btn :disabled="page >= pageCount" density="comfortable" icon="mdi-arrow-right" variant="tonal"
                  rounded @click="nextPage"></v-btn>
              </div>
            </template>
          </v-data-iterator>
        </v-card>

      </v-card>

    </v-row>

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
          <v-btn @click="dialog = false" variant="outlined" class="elevation-0" size="small"><v-icon>mdi-close</v-icon>
            Cancelar</v-btn>
          <v-btn @click="confirmarBorrado(id)" class="elevation-0" variant="elevated" color="red" size="small">
            <v-icon>mdi-delete-forever-outline</v-icon>
            Aceptar</v-btn>
          <v-spacer></v-spacer>
        </v-card-actions>
      </v-card>
    </v-dialog>

  </v-app>


</template>

<script>
import api from '@/axiosconfig'
import LoadingCircular from './LoadingCircular.vue';
import CrearComponente from './CrearComponente.vue';

export default {
  name: 'ListarPiezas',
  data() {
    return {

      drawer: true,
      dialog: false,
      dialog_nuevo_registro: false,
      articulos: [
        {
          nro_serie: "",
          marca: "",
          tipo_componente: "",
          disponible: "",
          created_at: "",
          updated_at: ""
        }

      ],
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

    testFunction(id) {
      console.log(id);
    },


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

    onComponentCreated(newArticulo) {
      console.log('Nuevo componente creado:', newArticulo);
      // Aquí puedes agregar la lógica para actualizar los datos del componente padre
      this.obtenerArticulos();
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
