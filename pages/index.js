import Head from "next/head";
import { use, useState } from "react";
import { CONTRACT_ADDRESS, CONTRACT_ABI } from "@/utils/contract";
import { useAccount, useConnect, useContract, useSigner, chain } from "wagmi";
import { InjectedConnector } from "@wagmi/core/connectors/injected";
import { sepolia } from "wagmi/chains";

export default function Home() {
  const [hydrated, setHydrated] = useState(false);

  const { address } = useAccount();
  const { connect } = useConnect({
    connector: new InjectedConnector({
      chains: [sepolia],
    }),
  });

  const { data: signer } = useSigner({
    chainId: sepolia.id,
  });

  console.log("Signer ", signer);
  const contract = useContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    signerOrProvider: signer,
  });

  use(() => {
    setHydrated(true);
  }, []);

  console.log("Address ", address);
  console.log("CONTRACT ", contract);

  const mintNFT = async () => {
    try {
      const mint = await contract.safeMint();
      await mint.wait();
      console.log("Minted NFT : ", mint);
    } catch (error) {
      console.log("Error minting NFT: ", error);
    }
  };

  return (
    <div>
      <Head>
        <title>Interact with Smart Contract</title>
        <meta name="description" content="Interact with Smart Contract" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main className="flex items-center justify-center min-h-screen">
        <h1 className="text-4xl font-extrabold">Interact with Contract</h1>
        {
         hydrated ? (
          address ? (
            <button onClick={mintNFT} className='py-2 px-4 rounded-xl bg-black text-white transform hover:scale-105'>Mint NFT</button>
            ) : (
            <button onClick={() => connect()} className='py-2 px-4 rounded-xl bg-black text-white transform hover:scale-105'>{address ? 'Mint' : 'Connect Wallet'}</button>
          )
        ) : (
          null
        )
        }
      </main>
    </div>
  );
}
