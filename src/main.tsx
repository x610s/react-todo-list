import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.tsx";
import { Provider } from "react-redux";
import { store } from "./redux/store.ts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      retry: false,
      refetchOnWindowFocus: false, 
    },
  },
});

ReactDOM.createRoot(document.getElementById("root") as HTMLElement).render(
     <QueryClientProvider client={queryClient}>
    <Provider store={store}>
     <App />
    </Provider>
    </QueryClientProvider>
);
