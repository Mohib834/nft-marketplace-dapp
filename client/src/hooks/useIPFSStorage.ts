// @ts-ignore
import { Web3Storage } from "web3.storage";

export const useIPFSStorage = () => {
  const makeStorageClient = () => {
    return new Web3Storage({
      token: process.env.NEXT_PUBLIC_WEB3STORAGE_API_KEY,
    });
  };

  const storeData = async (
    data: Record<string, any>,
    img: File
  ): Promise<{ cid: string }> => {
    const client = makeStorageClient();

    const metadataFile = new File([JSON.stringify(data)], "metadata.json", {
      type: "application/json",
    });

    console.log(metadataFile, img);

    const cid = await client.put([metadataFile, img]);

    return { cid };
  };

  const fetchStoreData = async (cid: string): Promise<File[]> => {
    const client = makeStorageClient();

    const res = await client.get(cid);

    if (!res.ok) {
      throw new Error(`failed to get ${cid}`);
    }

    return res.files();
  };

  return { storeData, fetchStoreData };
};
