import '@/styles/globals.css'
import Script from 'next/script'
import '@rainbow-me/rainbowkit/styles.css';

import {
  getDefaultWallets,
  RainbowKitProvider,
} from '@rainbow-me/rainbowkit';
import { configureChains, createClient, WagmiConfig, useSigner } from 'wagmi';
import { mainnet, polygon, optimism, arbitrum, polygonMumbai } from 'wagmi/chains';
import { alchemyProvider } from 'wagmi/providers/alchemy';
import { publicProvider } from 'wagmi/providers/public';
import { jsonRpcProvider } from 'wagmi/providers/jsonRpc';

//change polygonMumbai to polygon and Rpc to polygon mainnet
const { chains, provider } = configureChains(
  [polygonMumbai],
  [
    jsonRpcProvider({
      rpc: () => {
        return {
          http: 'https://rpc.ankr.com/polygon_mumbai', // go to https://www.ankr.com/protocol/ to get a free RPC for your network
        };
      },
    }),
    publicProvider()
  ]
);
const { connectors } = getDefaultWallets({
  appName: 'My RainbowKit App',
  chains
});
const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider
})


export default function App({ Component, pageProps }) {
  return (
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains}>
        <><Component {...pageProps} />
        </>)
      </RainbowKitProvider>
    </WagmiConfig>)
}
