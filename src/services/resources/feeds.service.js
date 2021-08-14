import MainInstance from "../main.instance";
import { FEEDS } from "../constants";

const MainService = {
  getList(params) {
    return MainInstance.query(FEEDS, { params });
  },
};

export default MainService;
