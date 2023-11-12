import NFTPreviewPriceView from "./NFTPreviewPriceView";

interface Props {
  title: string;
  description: string;
  price: string;
  imgUrl: string;
  isSold?: boolean;
  isLiked?: boolean;
}

export default function NFTPreview(props: Props) {
  return (
    <div className="w-full flex rounded-2xl border border-slate-800 p-4">
      <div className="h-[650px] flex-1">
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
            <div className="flex items-center gap-3">
              <div className="w-10 h-10">
                <img
                  className="rounded-full"
                  src="https://via.placeholder.com/40x40"
                />
              </div>
              <div className="h-12 flex-col justify-center items-start inline-flex">
                <div className="text-slate-500 text-sm font-normal leading-tight tracking-tight">
                  Creator
                </div>
                <div className="w-28 h-5 text-white text-xs font-semibold tracking-tight">
                  @brook_sim
                </div>
              </div>
            </div>
          </div>

          <div className="mt-11">
            <NFTPreviewPriceView price={props.price} />
          </div>
        </div>
      </div>
    </div>
  );
}
