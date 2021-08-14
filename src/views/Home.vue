<template>
  <div>
    <Appbar />
    <div class="d-flex flex-row justify-space-between header pa-6 rounded-lg">
      <v-row>
        <v-col cols="12" xs="12" sm="10">
          <v-text-field
            v-model="tags"
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
    <div class="px-4 pt-6 background" style="min-height: 100vh">
      <p class="mb-0 text-subtitle-2">{{ title }}</p>
      <p class="mb-0 font-weight-bold">{{ modifiedDate }}</p>
      <v-divider class="mt-2 mb-4" />
      <div
        class="d-flex flex-xs-column flex-sm-row justify-space-around flex-wrap"
      >
        <ContentNotFound
          message="Feeds Not Found"
          :loading="loading"
          v-if="!isAvailable"
        >
          <template v-slot:action>
            <v-btn
              @click="handleReload"
              depressed
              color="header"
              class="rounded-lg outlined-custom"
            >
              <v-icon class="mr-1" small>mdi-reload</v-icon>
              <p class="header-button-back ma-0">Reload</p>
            </v-btn>
          </template>
        </ContentNotFound>
        <Cards v-else v-for="(e, i) in items" :key="i" :data="e" />
      </div>
    </div>
  </div>
</template>

<script>
const Appbar = () => import("@/components/Appbar");
const Cards = () => import("@/components/Cards");
const ContentNotFound = () => import("@/components/Content/NotFound");
import MainServer from "@/services/resources/feeds.service";

export default {
  components: {
    Appbar,
    Cards,
    ContentNotFound,
  },
  data() {
    return {
      loading: false,
      title: "Everyone's photos",
      modifiedDate: "-",
      items: [],
      tags: null,
    };
  },
  methods: {
    getList() {
      this.loading = true;
      MainServer.getList({
        tags: this.tags,
      })
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.title = result.title;
            this.modifiedDate = result.modified;
            this.items = [...result.items];
          }
        })
        .catch((err) => {
          console.error(err);
        })
        .finally(() => (this.loading = false));
    },
    handleReload() {
      this.getList();
    },
  },
  mounted() {
    this.getList();
  },
  computed: {
    isAvailable() {
      return this.items.length > 0;
    },
  },
  watch: {
    tags: {
      handler(val) {
        val && val.length > 2 && this.getList();
      },
    },
  },
};
</script>
