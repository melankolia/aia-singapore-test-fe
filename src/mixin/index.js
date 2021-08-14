import Vue from "vue";
Vue.mixin({
  data() {
    return {
      cancelRequest: null,
    };
  },
  methods: {
    fetchListDebounce(callback) {
      clearTimeout(this._timerId);
      this._timerId = setTimeout(() => {
        callback();
      }, 100);
      this.cancelRequest && this.cancelReq();
    },
    cancelReq() {
      this.cancelRequest && this.cancelRequest.cancel("Cancel");
    },
    createToken(callback) {
      callback && (this.cancelRequest = callback);
    },
  },
});
