<template>
  <v-card class="my-4" max-width="340" style="width: 100%">
    <v-card-text v-if="postedByAvailable">
      <div v-html="data.description[0]"></div>
    </v-card-text>
    <div class="container-image">
      <v-img height="250" :src="data.media.m" :alt="data.title" />
      <p class="date-text date pa-2 ma-2 rounded-lg primary white--text">
        {{ data.published }}
      </p>
    </div>
    <v-card-title>{{ data.title || "-" }}</v-card-title>
    <v-card-text v-if="descriptionAvailable">
      <div v-html="data.description[2]"></div>
    </v-card-text>
    <template v-if="tagsAvailable">
      <v-divider class="mx-4"></v-divider>
      <v-card-text>
        <div>Tag's</div>
        <v-chip-group active-class="primary white--text" column>
          <v-chip small v-for="(tag, i) in data.tags" :key="i">{{
            tag | toTitle
          }}</v-chip>
        </v-chip-group>
      </v-card-text>
    </template>
  </v-card>
</template>

<script>
const DataDetail = {
  author: null,
  author_id: null,
  date_taken: null,
  description: [],
  link: null,
  media: {
    m: null,
  },
  published: null,
  tags: [],
  title: null,
};

export default {
  props: {
    data: {
      type: Object,
      required: true,
      default: () => DataDetail,
    },
  },
  computed: {
    tagsAvailable() {
      return this.data?.tags?.length > 0;
    },
    descriptionAvailable() {
      return this.data?.description.length > 2 && this.data?.description[2];
    },
    postedByAvailable() {
      return this.data?.description[0];
    },
  },
};
</script>

<style scoped>
.date {
  position: absolute;
  top: 0;
  right: 0;
  z-index: 1;
}

.container-image {
  position: relative;
}
</style>
