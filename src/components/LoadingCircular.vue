<template>
  <v-dialog v-model="loading" max-width="400" persistent>
      <v-container class="d-flex justify-center align-center py-0">
        <v-progress-circular
          color="#ECEFF1"
          indeterminate
          :size="80"
          :width="8"
        ></v-progress-circular>
      </v-container>
  </v-dialog>
</template>

<script>
  export default {
    data() {
      return {
        loading:true
      }
    }
  }
</script>
