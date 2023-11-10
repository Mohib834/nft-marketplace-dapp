"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

export default function Uploader() {
  const onDrop = useCallback((acceptedFiles) => {
    console.log(acceptedFiles);
    // Do something with the files
  }, []);

  const { getRootProps, getInputProps } = useDropzone({ onDrop });

  return (
    <div
      className="bg-gray-900 w-[400px] h-[400px] border-2 border-dashed border-gray-800 rounded-lg space-x-5"
      {...getRootProps()}
    >
      <div className="flex text-slate-500  items-center justify-center h-full">
        <input {...getInputProps()} className="hidden" />
        <div className="flex flex-col items-center text-white">
          <Image
            src="/uploadIcon.svg"
            width={34}
            height={34}
            alt=""
            className="mb-2"
          />
          <p>Drop your NFT here</p>
        </div>
      </div>
    </div>
  );
}
