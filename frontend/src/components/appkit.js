import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import {
  mainnet,
  sepolia,
  holesky,
  polygon,
  arbitrum,
  optimism,
  base
} from "@reown/appkit/networks"

const projectId = import.meta.env.VITE_PROJECT_ID

const networks = [
  mainnet,
  polygon,
  arbitrum,
  optimism,
  base,
  sepolia,
  holesky
]

const metadata = {
  name: "VaultX",
  description: "VaultX wallet app",
  url: "http://localhost:5173",
  icons: ["https://yourdomain.com/logo.png"]
}

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks
})

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks,
  allowUnsupportedChain: false,
  enableWalletConnect: true,  // ✅ Ensures wallet communication
  enableInjected: true,        // ✅ Enables MetaMask/injected wallets
  enableCoinbase: true         // ✅ Optional: Coinbase wallet
})




// import { createAppKit } from "@reown/appkit/react"
// import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
// import {
//   mainnet,
//   sepolia,
//   holesky,
//   polygon,
//   arbitrum,
//   optimism,
//   base
// } from "@reown/appkit/networks"

// const projectId = import.meta.env.VITE_PROJECT_ID
// const  networks= [
//     mainnet,
//     sepolia,
//     holesky,
//     polygon,
//     arbitrum,
//     optimism,
//     base
//   ]
// const metadata = {
//   name: "VaultX",
//   description: "VaultX wallet app",
//   url: "http://localhost:5173",
//   icons: ["https://yourdomain.com/logo.png"]
// }

// export const wagmiAdapter = new WagmiAdapter({
//   projectId,
//   networks
// })

// createAppKit({
//   adapters: [wagmiAdapter],
//   projectId,
//   metadata,
//   networks
// })

