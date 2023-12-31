import NFTPreviewPriceView from "./NFTPreviewPriceView";

interface Props {
  id: string;
  title: string;
  description: string;
  price: string;
  imgUrl: string;
  isSold?: boolean;
  isLiked?: boolean;
  isLoading?: boolean;
  onBuyClick?: (tokenId: string) => void;
}

export default function NFTPreview(props: Props) {
  return (
    <div className="w-full flex rounded-2xl border border-slate-800 p-4">
      <div className="min-h-[60vh] max-h-[60vh] flex-1">
        <img
          alt="nft"
          className="rounded-2xl object-cover w-full h-full"
          src={props.imgUrl}
        />
      </div>

      <div className="flex-1">
        <div className="max-w-[400px] h-full mx-auto">
          <div className="mt-10 flex-col justify-start items-start gap-7 inline-flex">
            <div className="self-stretch flex-col justify-start items-start gap-2 inline-flex">
              <div className="text-white text-4xl font-semibold leading-10 tracking-tight">
                {props.title}
              </div>
              <div className="text-slate-500 text-base font-normal leading-normal tracking-tight">
                {props.description}
              </div>
            </div>
          </div>

          <div className="mt-11">
            <NFTPreviewPriceView
              price={props.price}
              isLoading={props.isLoading}
              onBuyClick={() => props.onBuyClick && props.onBuyClick(props.id)}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
