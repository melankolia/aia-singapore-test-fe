<template>
  <v-card class="my-4" max-width="340" style="width: 100%">
    <v-img
      height="250"
      src="https://cdn.vuetifyjs.com/images/cards/cooking.png"
    ></v-img>
    <v-card-title>Cafe Badilico</v-card-title>
    <v-card-text>
      <div>
        Small plates, salads & sandwiches - an intimate setting with 12 indoor
        seats plus patio seating.
      </div>
    </v-card-text>
    <v-divider class="mx-4"></v-divider>
    <v-card-text>
      <div>Tag's</div>
      <v-chip-group active-class="primary white--text" column>
        <v-chip small>5:30PM</v-chip>

        <v-chip small>7:30PM</v-chip>

        <v-chip small>8:00PM</v-chip>

        <v-chip small>9:00PM</v-chip>
      </v-chip-group>
    </v-card-text>
  </v-card>
</template>

<script>
export default {};
</script>

<style></style>
