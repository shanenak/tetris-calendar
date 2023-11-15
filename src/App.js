import { Provider, createStoreHook } from "react-redux";
import Calendar from "./components/Calendar";
import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const preloadedState = {};
const store = configureStore({
    reducer: reducers, 
    preloadedState: preloadedState
});

function App() {
  return (
    <Provider store={store}>
      <>
        <Calendar/>
      </>
    </Provider>
  );
}

export default App;
