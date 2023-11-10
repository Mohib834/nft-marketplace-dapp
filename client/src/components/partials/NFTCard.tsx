import Image from "next/image";
import { useState } from "react";

interface Props {
  title: string;
  cost: string;
  likeCount: number;
}

export default function NFTCard(props: Props) {
  return (
    <div className="w-72 p-3 rounded-2xl border border-slate-800  duration-200 transition-transform transform active:scale-95 cursor-pointer">
      <div className="h-[280px] w-full">
        <img
          fill
          alt="nft"
          className="rounded-2xl object-cover w-full h-full"
          src="/nft.png"
        />
      </div>

      <div className="flex justify-between items-center mt-3">
        <div className="text-white text-sm font-semibold tracking-tight">
          {props.title}
        </div>

        <div className="w-auto h-7 px-2.5 py-1.5 bg-indigo-600 bg-opacity-20 rounded">
          <div className=" text-center text-indigo-600 text-xs font-semibold">
            {props.cost} ETH
          </div>
        </div>
      </div>

      <div className="w-full h-px border border-slate-800 my-3"></div>

      <div className="flex items-center">
        <div className="mr-2">
          <Image
            className="cursor-pointer"
            src="/heartIconFill.svg"
            width={18}
            height={18}
            alt=""
          />
        </div>
        <div className="text-slate-500 text-sm font-normal leading-tight tracking-tight">
          {props.likeCount} people liked this NFT
        </div>
      </div>
    </div>
  );
}
