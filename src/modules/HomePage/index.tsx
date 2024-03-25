import NFTCard from "components/NFTCard";
import useNFTMarket from "state/nft-market";
import useSigner from "state/signers";

const HomePage = () => {
  const { listedNFTs } = useNFTMarket();

  const { noMetaMask } = useSigner();

  if (noMetaMask)
    return (
      <div className="flex w-full items-center justify-center ">
        <div className="ml-3 flex flex-col justify-start">
          <p className="mb-4 text-3xl font-bold">MetaMask is not installed.</p>
          <p>
            You need a web3 wallet in order to connect to the NFT Marketplace.
          </p>
          <p>Kindly install metamask extension for your browser.</p>

          <a href="https://metamask.io/" target="_blank">
            <button className="mt-3 flex items-center justify-center gap-2 rounded bg-black px-5 py-2 text-xl text-white">
              <p>To Install MetaMask </p>
              <span className="inline">
                <img
                  className="inline h-7"
                  src="/metamask-icon.svg"
                  alt="metamask"
                />
              </span>
            </button>
          </a>
        </div>
      </div>
    );

  return (
    <div className="flex w-full flex-col">
      {/* TODO: display listed NFTs */}
      <div className="flex flex-wrap">
        {listedNFTs?.map((nft) => (
          <NFTCard className="mb-1 mr-1" nft={nft} key={nft.id} />
        ))}
      </div>
    </div>
  );
};

export default HomePage;
