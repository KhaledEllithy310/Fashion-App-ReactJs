import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/mainRoute";
import { Provider, } from "react-redux";
import { store } from "./store/store";

function App() {

  return (
    // <ThemeProvider theme={darkTheme}>
    //   <CssBaseline />
    <Provider store={store}>
      <div className="App">
        <RouterProvider router={router} />
      </div>
    </Provider>
    // </ThemeProvider>
  );
}

export default App;
