import { createStore } from "vuex";
import * as mutations from "./mutations";
import * as getters from "./getters";
import * as actions from "./actions";

const state = {
  loggedUser: { email: "" },
};

export default createStore({
  mutations,
  actions,
  getters,
  state,
});
