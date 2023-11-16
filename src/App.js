import { Provider } from "react-redux";
import Calendar from "./components/Calendar";
import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";

const store = configureStore({
    reducer: reducers, 
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
