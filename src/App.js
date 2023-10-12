import { RouterProvider } from "react-router-dom";
import "./App.css";
import { router } from "./Routes/mainRoute";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { Provider, useSelector } from "react-redux";
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
