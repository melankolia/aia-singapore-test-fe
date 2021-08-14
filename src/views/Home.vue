<template>
  <div>
    <Appbar />
    <div class="d-flex flex-row justify-space-between header pa-6 rounded-lg">
      <v-row no-gutters>
        <v-col class="mb-6" cols="12" xs="12" sm="10">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search Tags"
            hide-details
            solo
            dense
            class="rounded-lg"
          ></v-text-field>
        </v-col>
        <v-col cols="12" xs="12" sm="2">
          <v-select
            v-model="sortBy"
            :items="itemSortBy"
            placeholder="Sort By"
            solo
            hide-details
            dense
            class="rounded-lg"
            color="primary"
            item-text="text"
            item-value="value"
          >
            <template #item="{ item }">
              <p class="selection-item ma-0">
                <v-icon small class="mr-3">
                  {{ item.icon }}
                </v-icon>
                <span>
                  {{ item.text }}
                </span>
              </p>
            </template>
          </v-select>
        </v-col>
      </v-row>
    </div>
    <div class="px-4 pt-4">
      <p class="mb-0 text-subtitle-2">Everyone's photos</p>
      <p class="mb-0 font-weight-bold">Saturday, August 14, 2021</p>
      <v-divider class="mt-2" />
      <Cards />
    </div>
  </div>
</template>

<script>
const Appbar = () => import("@/components/Appbar");
const Cards = () => import("@/components/Cards");

export default {
  components: {
    Appbar,
    Cards,
  },
};
</script>
