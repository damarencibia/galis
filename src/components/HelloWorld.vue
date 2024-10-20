<template>
  <v-app>
    <v-main>
      <v-container>
        <v-row>
          <v-col cols="12" sm="6" md="4">
            <v-img
              alt="GALIS Logo"
              class="shrink mr-2 ms-5 mt-5"
              contain
              max-height="200"
              src="@/assets/galisAppBar2.jpeg"
              transition="scale-transition"
            ></v-img>
          </v-col>
          <v-col cols="12" sm="6" md="8">
            <h1 class="display-2 font-weight-bold mb-4">Gestión de Activos y Licencias de Software</h1>
            <p class="text-body-1 mb-4">Soluciones avanzadas para la administración y protección de infraestructura IT y licencias de software</p>
            <v-card flat class="mt-6">
              <v-card-text>
                <v-row>
                  <v-col cols="12" sm="6" md="4">
                    <v-btn
                      color="green"
                      variant="tonal"
                      size="large"
                      block
                      :to="'/homeprovider'"
                    >
                      EMPEZAR
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-btn
                      color="green"
                      variant="outlined"
                      size="large"
                      block
                    >
                      POR QUE NOSOTROS?
                    </v-btn>
                  </v-col>
                  <v-col cols="12" sm="6" md="4">
                    <v-btn
                      color="grey-darken-3"
                      variant="tonal"
                      size="large"
                      block
                    >
                      CONTACTENOS
                    </v-btn>
                  </v-col>
                </v-row>
              </v-card-text>
            </v-card>
          </v-col>
        </v-row>
      </v-container>
    </v-main>

    <v-footer class="text-center d-flex flex-column">
      <div>
        <v-btn class="mx-4" variant="text"></v-btn>
      </div>

      <v-divider></v-divider>

      <div>
        &copy;{{ new Date().getFullYear() }} — update_26
      </div>
      <div class="d-flex justify-space-between mb-6 mt-5">
        <a href="" class="text-decoration-none text-black mx-5" @click="$router.push('/')">Términos y condiciones</a>
        <a href="" class="text-decoration-none text-black me-5" @click="$router.push('/')">Política de Privacidad</a>
      </div>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data: () => ({
    icons: [
      'mdi-facebook',
      'mdi-cart-minus',
    ],
  }),
}
</script>

<style scoped>
.grid-center {
  display: grid;
  place-items: center;
}
</style>
