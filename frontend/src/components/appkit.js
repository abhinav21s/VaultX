import { createAppKit } from "@reown/appkit/react"
import { WagmiAdapter } from "@reown/appkit-adapter-wagmi"
import { mainnet } from "@reown/appkit/networks"

const projectId = import.meta.env.VITE_PROJECT_ID
const   networks= [mainnet] 
const metadata = {
  name: "VaultX",
  description: "VaultX wallet app",
  url: "http://localhost:5173",
  icons: []
}

export const wagmiAdapter = new WagmiAdapter({
  projectId,
  networks   // ✅ correct type
})

createAppKit({
  adapters: [wagmiAdapter],
  projectId,
  metadata,
  networks
})
