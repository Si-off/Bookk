import { ThemeProvider } from "styled-components";
import { QueryClientProvider } from "@tanstack/react-query";
import getQueryClient from "./queries/queryClient";
import theme from "./styles/theme";
import ReactDOM from "react-dom/client";
import App from "./App";
import "./normalize.css";
import "./common.css";
import reportWebVitals from "./reportWebVitals";

const queryClient = getQueryClient();

const root = ReactDOM.createRoot(
  document.getElementById("root") as HTMLElement
);
root.render(
  <QueryClientProvider client={queryClient}>
    <ThemeProvider theme={theme}>
      <App />
    </ThemeProvider>
  </QueryClientProvider>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
