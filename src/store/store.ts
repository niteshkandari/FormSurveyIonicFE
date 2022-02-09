import { createStore } from "redux";

const reducer = (
  state: { loadApi: boolean } = { loadApi: false },
  action: { type: string }
) => {
  switch (action.type) {
    case "Call-Api":
      return { loadApi: (state.loadApi = true) };
    case "Reset":
      return { loadApi: (state.loadApi = false) };
    default:
      return state;
  }
};

const store = createStore(reducer);

export default store;