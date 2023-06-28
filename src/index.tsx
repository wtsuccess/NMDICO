import React from 'react';
import ReactDOM from 'react-dom/client';
import './assets/styles/index.scss';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "@rainbow-me/rainbowkit/styles.css";

import { WagmiConfig, configureChains, createClient } from 'wagmi';
import { RainbowKitProvider, darkTheme, connectorsForWallets, cssStringFromTheme, lightTheme } from '@rainbow-me/rainbowkit';
import {
  injectedWallet,
  walletConnectWallet,
} from '@rainbow-me/rainbowkit/wallets';
import { bsc } from "wagmi/chains";

import { publicProvider } from 'wagmi/providers/public';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import { trustWallet, metaMaskWallet } from '@rainbow-me/rainbowkit/wallets';

const { chains, provider } = configureChains(
  [bsc],
  [publicProvider()]
);

const connectors = connectorsForWallets([
  {
    groupName: 'Recommended',
    wallets: [
      injectedWallet({ chains }),
      metaMaskWallet({ chains }),
      trustWallet({ chains }),
      walletConnectWallet({ chains }),
    ],
  },
]);

// const { connectors } = getDefaultWallets({
//   appName: "NMD ICO",
//   chains,
// });

const wagmiClient = createClient({
  autoConnect: true,
  connectors,
  provider,
});


const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);

root.render(
  <React.StrictMode>
    <WagmiConfig client={wagmiClient}>
      <RainbowKitProvider chains={chains} theme={darkTheme()}>    
      <style
        dangerouslySetInnerHTML={{
          __html: `
            :root {
              ${cssStringFromTheme(lightTheme)}
            }

            html[data-dark] {
              ${cssStringFromTheme(darkTheme, {
                extends: lightTheme,
              })}
            }
          `,
        }}
      />
        <ToastContainer />
        <App />
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
