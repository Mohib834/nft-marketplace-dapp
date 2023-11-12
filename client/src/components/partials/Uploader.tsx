"use client";

import Image from "next/image";
import React, { useCallback } from "react";
import { useDropzone } from "react-dropzone";

interface Props {
  onUpload?: (acceptedFiles: File[]) => void;
}

export default function Uploader(props: Props) {
  const onDrop = useCallback((acceptedFiles: File[]) => {
    if (props.onUpload) {
      props.onUpload(acceptedFiles);
    }
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
