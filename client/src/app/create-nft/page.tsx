import CreateForm from "@/components/create-nft/CreateForm";
import Uploader from "@/components/partials/Uploader";
import Link from "next/link";

export default function CreateNFT() {
  return (
    <div className="text-white">
      <Link
        href="/"
        className="inline-flex items-center mb-8 hover:underline underline-offset-4 cursor-pointer"
      >
        <img src="backIcon.svg" alt="Back" className="mr-2" />
        <h2 className="text-lg">Listings</h2>
      </Link>

      <div className="flex">
        <div className="w-[40%] flex justify-center">
          <div>
            <div className="text-md mb-3">Upload your NFT</div>
            <Uploader />
          </div>
        </div>
        <div className="flex-1">
          <div className="mt-4">
            <CreateForm />
          </div>
        </div>
      </div>
    </div>
  );
}
