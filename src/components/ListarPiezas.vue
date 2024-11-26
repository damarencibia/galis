<template>
  <v-navigation-drawer class="hidden-xs" loating v-model="drawer" width="230" permanent color="#ECEFF1" theme="light">
    <v-list class="text-center mt-5" density="compact" nav>
      <v-list-item>

        <CrearComponente @component-created="onComponentCreated" />


      </v-list-item>
      <v-list-item>
        <v-btn class="text-none flex-grow-1" height="38" variant="flat" color="#3498db "
          style="border-radius:8px; font-size:0.8rem;" width="220" prepend-icon="mdi-history">Historial</v-btn>
      </v-list-item>

      <!--🛸 Estadisticas -->
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



        </v-list>
      </v-card>

    </v-list>

  </v-navigation-drawer>

  <v-navigation-drawer floating width="50" permanent color="#ECEFF1" theme="light">

    <v-btn class="ms-3" density="compact" icon variant="text" @click="closeDrawer" v-if="drawer === true"
      style="margin-top: 50vh"><v-icon color="#2980b9 " size="large">mdi-chevron-left</v-icon></v-btn>
    <v-btn class="ms-3" density="compact" icon variant="text" @click="openDrawer" v-if="drawer === false"
      style="margin-top: 50vh"><v-icon color="#2980b9 " size="large">mdi-chevron-right</v-icon></v-btn>

  </v-navigation-drawer>



  <v-app theme="backgroundTheme">


    <v-row class="mt-2" no-gutters>
      <v-card theme="light" class="elevation-4 me-2 ms-2" style="border-radius: 15px;
         overflow-y: auto;
         scrollbar-width: none;" height="97vh" width="100%">

        <!-- 🛸 BUSCADOR DE TABLA -->
        <v-app-bar class="elevation-2 position-sticky" density="comfortable">

          <v-btn class="text-none ms-5" variant="outlined" :ripple="false" color="#CFD8DC" height="40"
            style="border-radius: 8px;">
            <v-icon color="#2980b9 " size="large">mdi-magnify</v-icon>
            <v-text-field class="text-grey-darken-4" density v-model="search" label="Buscar un componente"
              variant="text" hide-details single-line clearable width="300px" :bordered="false">
              <v-tooltip activator="parent" location="bottom">Evitar espacios en blanco
                ej: placa_base
              </v-tooltip>
            </v-text-field>
          </v-btn>
          <v-spacer></v-spacer>

          <template v-slot:append>
            <v-btn icon size="small" rounded style="border-radius: 8px;">
              <v-icon>mdi-bell-outline</v-icon>
            </v-btn>
            <LoginButton />

          </template>
        </v-app-bar>

        <v-sheet class="px-1">
          <v-chip-group v-model="defaultSelection" mandatory filter class="custom-chip-group" :show-arrows="false">
            <v-chip class="custom-chip" variant="outlined" @click="obtenerArticulos" value="Todo">Todos</v-chip>
            <v-chip class="custom-chip" variant="outlined" @click="obtenerAvalilable"
              value="Disponible">Disponible</v-chip>
            <v-chip class="custom-chip" variant="outlined" @click="obtenerUnavalilable"
              value="Vinculados">Vinculados</v-chip>
            <v-chip class="custom-chip" variant="outlined" @click="obtenerAllPlacaBase" value="Placa Madre">Placa
              Madre</v-chip>
            <v-chip class="custom-chip" variant="outlined" @click="obtenerAllRam" value="RAM">RAM</v-chip>
            <v-chip class="custom-chip" variant="outlined" @click="obtenerAllDiscoDuro" value="Disco duro">Disco
              duro</v-chip>
            <v-chip class="custom-chip" variant="outlined" @click="obtenerAllLectorCd" value="Lector CD">Lector
              CD</v-chip>
          </v-chip-group>
        </v-sheet>

        <v-data-table loading-text="Cargando..." :loading="isLoading" class="elevation-0  table-hover-effect"
          fixed-header v-model:page="page" :headers="headers" :items="articulos" :search="search"
          :items-per-page="itemsPerPage" style="font-size:0.9rem;">

          <template v-slot:loading>
            <v-skeleton-loader type="table-row@10"></v-skeleton-loader>
          </template>

          <!-- <template v-slot:top></template> -->

          <!-- Filas del data table -->
          <template v-slot:item="{ item, index }">
            <tr>


              <td>
                {{ item.tipo_componente }}
              </td>

              <td>
                {{ item.nro_serie }}
              </td>

              <td>
                {{ item.marca }}
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
                  @click="updateArticulo(item.id, item.nro_serie, item.marca, item.tipo_componente)" icon size="small">
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


      </v-card>

    </v-row>

    <!--🛸 ventana de dialogo para eliminar registros -->
    <v-dialog v-model="dialog" max-width="300" theme="light">
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

      overlay: false,

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

        { title: 'Componente', value: 'tipo_componente', key: 'tipo_componente' },
        { title: 'Serial', value: 'nro_serie', key: 'nro_serie' },
        { title: 'Marca', value: 'marca', key: 'marca' },
        { title: 'Disponible', value: 'disponible', key: 'disponible' },
        { title: 'Creado', value: 'created_at', key: 'created_at' },
        { title: 'Modificado', value: 'updated_at', key: 'updated_at' },
        { title: 'Operaciones', value: 'operaciones' },
      ],
      tipos_de_componentes: [
        'disco_duro',
        'placa_base',
        'lector_cd',
        'memoria_ram',
      ],

      page: 1,
      itemsPerPage: 10,
      show: false,
      isLoading: false,
      isReadOnly: true,
      tab: null,
      loading: false,
      loadingItemIterator: true,
      itemsPerPage: 4,
      defaultSelection: 'Todo',

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
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
        })
        .catch(error => console.error(error));
    },

    obtenerAvalilable() {
      this.isLoading = true;
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes-disponibles')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
        })
        .catch(error => console.error(error));
    },
    obtenerUnavalilable() {
      this.isLoading = true;
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes-no_disponibles')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
        })
        .catch(error => console.error(error));
    },

    obtenerAllPlacaBase() {
      this.isLoading = true;
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes-filterAllByPlacaBase')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
        })
        .catch(error => console.error(error));
    },
    obtenerAllRam() {
      this.isLoading = true;
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes-filterAllByRam')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
        })
        .catch(error => console.error(error));
    },
    obtenerAllDiscoDuro() {
      this.isLoading = true;
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes-filterAllByDiscoDuro')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
        })
        .catch(error => console.error(error));
    },
    obtenerAllLectorCd() {
      this.isLoading = true;
      this.loading = true;
      this.loadingItemIterator = true;
      api.get('/componentes-filterAllByLectorCd')
        .then(response => {
          // console.log(response.data);
          this.articulos = response.data;
          this.isLoading = false;
          this.loading = false;
          this.loadingItemIterator = false;
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

    closeDrawer() {
      this.drawer = false;
    },
    openDrawer() {
      this.drawer = true;
    },

    onClickSeeAll() {
      this.itemsPerPage = this.itemsPerPage === 4 ? this.articulos.length : 4
    },

    toggleAllFields() {
      this.isReadOnly = !this.isReadOnly;
      // console.log('Toggling all fields:', this.isReadOnly);
    },
  },
};
</script>

<style scoped>
.custom-chip {
  &.v-chip {
    /* Estilos personalizados para el chip */
    background-color: #ffffff !important;
    color: #333333c5 !important;
    font-size: 0.7rem;
    border-radius: 20px !important;
    padding: 8px 16px !important;
  }

  &.v-chip:not(.v-chip--selected) {
    /* Estilos para chips no seleccionados */
    opacity: 0.7;
  }

  &.v-chip--selected {
    /* Estilos para chips seleccionadas */
    background-color: #3498db !important;
    color: white !important;
  }

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

}
</style>`
