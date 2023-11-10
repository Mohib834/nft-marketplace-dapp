import Button from "@/components/partials/Button";

interface Props {
  price: string;
}

export default function NFTPreviewPriceView(props: Props) {
  return (
    <div className="w-full py-8 px-10 relative bg-gradient-to-b from-[#060714] to-gray-950 rounded-2xl border border-slate-800">
      <div className="mb-3 text-slate-500 text-sm font-normal leading-tight tracking-tight">
        Current price
      </div>
      <div className="relative -left-1 mb-8">
        <span className="text-white text-6xl font-semibold leading-10 tracking-tight">
          5.25
        </span>
        <span className="ml-3 text-white text-2xl font-semibold leading-normal tracking-tight">
          ETH
        </span>
      </div>

      <div className="w-full">
        <Button variant="primary" style={{ width: "100%" }}>
          Buy
        </Button>
      </div>
    </div>
  );
}
