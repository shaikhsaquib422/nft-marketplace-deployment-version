import { JsonRpcSigner, Web3Provider } from "@ethersproject/providers";
import {
  ReactNode,
  createContext,
  useContext,
  useEffect,
  useState,
} from "react";

import Web3Modal from "web3modal";

type SignerContextType = {
  signer?: JsonRpcSigner;
  address?: string;
  loading: boolean;
  noMetaMask: boolean;
  connectWallet: () => Promise<void>;
};

const SignerContext = createContext<SignerContextType>({} as any);

const useSigner = () => useContext(SignerContext);

export const SignerProvider = ({ children }: { children: ReactNode }) => {
  const [signer, setSigner] = useState<JsonRpcSigner>();
  const [address, setAddress] = useState<string>();
  const [loading, setLoading] = useState(false);

  const [noMetaMask, setNoMetaMask] = useState(false);

  useEffect(() => {
    try {
      const web3modal = new Web3Modal();
      if (web3modal.cachedProvider) connectWallet();
      window.ethereum.on("accountsChanged", connectWallet);
    } catch (error) {
      console.log(error);
      setNoMetaMask(true);
    }
  }, []);

  const connectWallet = async () => {
    setLoading(true);
    try {
      const web3modal = new Web3Modal({ cacheProvider: true });
      const instance = await web3modal.connect();
      const provider = new Web3Provider(instance);
      const signer = provider.getSigner();
      const address = await signer.getAddress();
      console.log(address);

      setSigner(signer);
      setAddress(address);
      setLoading(false);
    } catch (error) {
      console.log(error);
    }
    setLoading(false);
  };

  const contextValue = { signer, address, loading, noMetaMask, connectWallet };

  return (
    <SignerContext.Provider value={contextValue}>
      {children}
    </SignerContext.Provider>
  );
};

export default useSigner;
