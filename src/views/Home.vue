<template>
  <div>
    <Appbar />
    <div class="mx-4">
      <div
        class="
          d-flex
          flex-row
          justify-space-between
          header
          my-6
          pa-3
          rounded-lg
        "
      >
        <div style="width: 288px">
          <v-text-field
            v-model="search"
            prepend-inner-icon="mdi-magnify"
            placeholder="Search Tags"
            hide-details
            solo
            dense
            class="rounded-lg"
          ></v-text-field>
        </div>
        <div style="width: 150px">
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
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const Appbar = () => import("@/components/Appbar");

export default {
  name: "Home",

  components: {
    Appbar,
  },
};
</script>
