import MainInstance from "../main.instance";
import { FEEDS } from "../constants";

const MainService = {
  getList(params, token) {
    return MainInstance.query(FEEDS, { params, ...token });
  },
  cancelReq() {
    return MainInstance.cancelRequest();
  },
};

export default MainService;
