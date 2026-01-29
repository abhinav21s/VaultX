import React from "react"
import ReactDOM from "react-dom/client"
import { WagmiProvider } from "wagmi"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"

// IMPORTANT: import AppKit once (side effect)
import "./components/appkit"

// Import adapter (for wagmi config)
import { wagmiAdapter } from "./components/appkit"

const queryClient = new QueryClient()

ReactDOM.createRoot(document.getElementById("root")).render(
  <WagmiProvider config={wagmiAdapter.wagmiConfig}>
    <QueryClientProvider client={queryClient}>
      <App />
    </QueryClientProvider>
  </WagmiProvider>
)
