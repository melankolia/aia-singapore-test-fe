<template>
  <div>
    <Appbar />
    <div class="d-flex flex-row justify-space-between header pa-6 rounded-lg">
      <v-row>
        <v-col cols="12" xs="12" sm="8" md="10">
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
        <v-col cols="12" xs="12" sm="4" md="2">
          <v-select
            v-model="sortBy"
            :items="itemsSortBy"
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
      <template v-if="loading">
        <v-skeleton-loader max-width="150" type="text" />
        <v-skeleton-loader max-width="200" type="text" />
      </template>
      <template v-else>
        <p class="mb-0 text-subtitle-2">{{ title }}</p>
        <p class="mb-0 font-weight-bold">{{ modifiedDate }}</p>
      </template>
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
      <v-expand-transition>
        <Loader v-if="loading && page > 1" :loading="loading" :size="48" />
      </v-expand-transition>
    </div>
  </div>
</template>

<script>
const Appbar = () => import("@/components/Appbar");
const Cards = () => import("@/components/Cards");
const ContentNotFound = () => import("@/components/Content/NotFound");
const Loader = () => import("@/components/Loader/Default");
import MainService from "@/services/resources/feeds.service";

export default {
  components: {
    Appbar,
    Cards,
    ContentNotFound,
    Loader,
  },
  data() {
    return {
      loading: false,
      title: "Everyone's photos",
      modifiedDate: "-",
      items: [],
      tags: null,

      // SortBy Properties
      itemsSortBy: [
        {
          text: "ASC Author",
          value: "ASC",
        },
        {
          text: "DESC Author",
          value: "DESC",
        },
      ],
      sortBy: "ASC",

      // Pagination Properties
      page: 1,
      pageStop: false,
    };
  },
  methods: {
    getList(type = "refresh") {
      this.loading = true;
      this.createToken(MainService.cancelReq().source());
      if (type == "refresh") this.items = [];

      MainService.getList(
        {
          tags: this.tags,
          page: this.page,
          limit: 4,
        },
        { cancelToken: this.cancelRequest.token }
      )
        .then(({ data: { result, message } }) => {
          if (message == "OK") {
            this.title = result.title;
            this.modifiedDate = result.modified;
            if (type == "refresh") {
              this.items = [...result.items];
            } else {
              if (result.items == 0) {
                this.pageStop = true;
              } else {
                this.items = [...this.items, ...result.items];
              }
            }
          } else {
            console.error(result);
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
    handleScrollBottom() {
      window.onscroll = () => {
        let bottomOfWindow =
          Math.round(document.documentElement.scrollTop + window.innerHeight) >=
          document.documentElement.offsetHeight;

        if (!this.pageStop && !this.loading && bottomOfWindow) {
          this.page = this.page + 1;
          this.fetchListDebounce(() => this.getList("push"));
        }
      };
    },
  },
  mounted() {
    this.getList();
    this.handleScrollBottom();
  },
  computed: {
    isAvailable() {
      return this.items.length > 0;
    },
  },
  watch: {
    tags: {
      handler(val) {
        this.page = 1;
        val && val.length > 2 && this.fetchListDebounce(this.getList);
      },
    },
    sortBy: {
      handler(val) {
        this.page = 1;
        val && this.getList();
      },
    },
  },
};
</script>
