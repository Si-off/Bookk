import { ThemeProvider } from "styled-components";
import "./App.css";
import { QueryClientProvider } from "@tanstack/react-query";
import theme from "./styles/theme";
import getQueryClient from "./queries/queryClient";

function App() {
  const queryClient = getQueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <ThemeProvider theme={theme}>
        <div className="App">hello</div>;<p>buzz branch test</p>
      </ThemeProvider>
    </QueryClientProvider>
  );
}

export default App;
