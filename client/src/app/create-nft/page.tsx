"use client";

import { useState } from "react";
import CreateForm from "@/components/create-nft/CreateForm";
import Uploader from "@/components/partials/Uploader";
import Link from "next/link";
import { ComponentProps } from "react";
import Button from "@/components/partials/Button";
import { useIPFSStorage } from "@/hooks/useIPFSStorage";
import { toast } from "react-toastify";
import { useEthers } from "@/hooks/useEthers";
import { parseEther } from "ethers";
import { useRouter } from "next/navigation";

export default function CreateNFT() {
  const router = useRouter();
  const { storeData } = useIPFSStorage();
  const { generateContract } = useEthers();

  const [uploadedImage, setUploadedImage] = useState<File | null>(null);

  const handleUpload = (files: File[]) => {
    setUploadedImage(files[0]);
  };

  const handleSubmit: ComponentProps<typeof CreateForm>["onSubmit"] = async (
    data,
    setSubmitting
  ) => {
    try {
      if (!uploadedImage) throw new Error("IMAGE_MISSING");
      const { price } = data;

      setSubmitting(true);

      const { cid } = await storeData(data, uploadedImage);
      const contract = await generateContract("signer");

      if (!contract) throw new Error();

      const transaction = await contract?.listAsset(parseEther(price), cid);
      const tx = await transaction.wait();

      console.log("tx", tx);

      toast.success("NFT successfully listed.");

      router.replace("/");
    } catch (err) {
      if ((err as Error).message === "IMAGE_MISSING") {
        toast.error("No image uploaded!");
      } else {
        toast.error("Something went wrong!");
      }
      throw err;
    } finally {
      setSubmitting(false);
    }
  };

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
          <div className="relative w-full ">
            {uploadedImage ? (
              <div className="group h-full w-full flex justify-center items-center">
                <div className="absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                  <Button
                    variant="secondary"
                    fill
                    onClick={() => setUploadedImage(null)}
                  >
                    Remove
                  </Button>
                </div>
                <img
                  src={URL.createObjectURL(uploadedImage)}
                  alt="Uploaded NFT"
                />
              </div>
            ) : (
              <>
                <div className="text-md mb-3">Upload your NFT</div>
                <Uploader onUpload={handleUpload} />
              </>
            )}
          </div>
        </div>
        <div className="flex-1">
          <div className="mt-4">
            <CreateForm onSubmit={handleSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
