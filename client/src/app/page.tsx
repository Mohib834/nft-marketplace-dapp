import NFTPreview from "@/components/home/NFTPreview/NFTPreview";
import NFTCard from "@/components/partials/NFTCard";
import Image from "next/image";

export default function Home() {
  return (
    <div>
      <div className="mt-6 mb-28">
        <NFTPreview />
      </div>

      <div className="flex justify-center mb-20">
        <div className="px-16 pb-0.5 flex-col justify-center items-center gap-4 inline-flex">
          <div className="text-center text-sm text-slate-500 font-medium uppercase tracking-widest">
            Overline
          </div>
          <div className="text-center text-white text-3xl font-semibold tracking-tight">
            More from the marketplace
          </div>
        </div>
        N
      </div>
      <div className="flex gap-5 flex-wrap justify-center mb-16">
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
        <NFTCard cost="2.5" likeCount={10} title="Vulputate felis test" />
      </div>
    </div>
  );
}
