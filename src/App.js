import { Provider } from "react-redux";
import reducers from "./reducers";
import { configureStore } from "@reduxjs/toolkit";
import Puzzle from "./components/Puzzle";

const store = configureStore({
  reducer: reducers, 
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({
    serializableCheck: false
  })
});

function App() {
  return (
    <Provider store={store}>
      <>
        <Puzzle/>
      </>
    </Provider>
  );
}

export default App;
