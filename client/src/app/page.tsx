"use client";

import NFTPreview from "@/components/home/NFTPreview/NFTPreview";
import NFTCard from "@/components/partials/NFTCard/NFTCard";
import { ComponentProps, useEffect, useState } from "react";
import { useEthers } from "@/hooks/useEthers";
import { useIPFSStorage } from "@/hooks/useIPFSStorage";
import { Contract } from "ethers";
import NFTCardPlaceholder from "@/components/partials/NFTCard/NFTCardPlaceholder";
import { useTransition, animated } from "react-spring";

interface NFTAsset {
  name: string;
  description: string;
  price: string;
  imgUrl: string;
}

export default function Home() {
  const [nftAssets, setNftAssets] = useState<NFTAsset[]>([]);
  const { generateContract } = useEthers();
  const { fetchStoreData } = useIPFSStorage();

  const [isLoading, setIsLoading] = useState(false);
  const [showPreview, setShowPreview] = useState<ComponentProps<
    typeof NFTPreview
  > | null>(null);

  const transitions = useTransition(showPreview, {
    from: { opacity: 0, transform: "translateY(-20px)" },
    enter: { opacity: 1, transform: "translateY(0)" },
  });

  useEffect(() => {
    (async () => {
      const contract = await generateContract("provider");

      if (contract) {
        // Add the contract listener
        contract.on(contract.filters.NewAssetAdded, (tokenId, price) => {
          console.log("tokenId", tokenId, "price", price);
        });

        fetchAndSetAssets(contract);
      }
    })();
  }, []);

  const fetchAndSetAssets = async (contract: Contract) => {
    const nfts: NFTAsset[] = [];

    if (!contract) return;

    try {
      setIsLoading(true);
      setNftAssets([]);

      const assetsCount = await contract.tokenCount();

      for (let i = 0; i < Number(assetsCount); i++) {
        const asset = await contract.assetsList(i);
        const cid = await contract.tokenURI(asset.tokenId);

        const files = await fetchStoreData(cid);

        const jsonFileIdx = files.findIndex((f) => f.name.includes(".json"));

        const data: Omit<NFTAsset, "imgUrl"> = JSON.parse(
          await files[jsonFileIdx].text()
        );

        const imageUrl = URL.createObjectURL(files[jsonFileIdx ? 0 : 1]);

        nfts.push({
          ...data,
          imgUrl: imageUrl,
        });
      }
      setNftAssets(nfts);
    } finally {
      setIsLoading(false);
    }
  };

  const handleNFTClick = (asset: NFTAsset) => {
    window.scrollTo(0, 0);
    setShowPreview({
      title: asset.name,
      description: asset.description,
      isLiked: false,
      isSold: false,
      price: asset.price,
      imgUrl: asset.imgUrl,
    });
  };

  return (
    <div>
      {transitions((style, item) =>
        item && showPreview ? (
          <animated.div style={style} className="mt-6 mb-28">
            <NFTPreview {...showPreview} />
          </animated.div>
        ) : null
      )}

      <div className="flex justify-center mb-20">
        <div className="px-16 pb-0.5 flex-col justify-center items-center gap-4 inline-flex">
          <div className="text-center text-sm text-slate-500 font-medium uppercase tracking-widest">
            {showPreview ? "Overline" : "Marketplace"}
          </div>
          <div className="text-center text-white text-3xl font-semibold tracking-tight">
            {showPreview ? "More from NFT marketplace" : "Browse NFTs"}
          </div>
        </div>
      </div>
      <div className="flex gap-5 flex-wrap justify-center mb-16">
        {isLoading
          ? Array(8)
              .fill("")
              .map((_, i) => <NFTCardPlaceholder key={i} />)
          : nftAssets.map((a, idx) => (
              <NFTCard
                imgUrl={a.imgUrl}
                key={idx}
                cost={a.price}
                likeCount={10}
                title={a.name}
                onClick={() => handleNFTClick(a)}
              />
            ))}
      </div>
    </div>
  );
}
