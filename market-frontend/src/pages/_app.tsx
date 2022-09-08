import "../styles/globals.css";
import { NavBar } from "../components/NavBar";
import type { AppProps } from "next/app";
import { useMemo, useState } from "react";
import {
  AptosWalletAdapter,
  MartianWalletAdapter,
  WalletProvider,
} from "@manahippo/aptos-wallet-adapter";
import { ModalContext, ModalState } from "../components/ModalContext";
function MyApp({ Component, pageProps }: AppProps) {
  const [modalState, setModalState] = useState<ModalState>({
    walletModal: false,
  });
  const wallets = useMemo(
    () => [new MartianWalletAdapter(), new AptosWalletAdapter()],
    []
  );
  const modals = useMemo(
    () => ({
      modalState,
      setModalState: (modalState: ModalState) => {
        setModalState(modalState);
      },
    }),
    [modalState]
  );

  return (
    <WalletProvider wallets={wallets}>
      <ModalContext.Provider value={modals}>
        <div className="px-8">
          <NavBar />
          <Component {...pageProps} className="bg-base-300" />
        </div>
      </ModalContext.Provider>
    </WalletProvider>
  );
}

export default MyApp;
