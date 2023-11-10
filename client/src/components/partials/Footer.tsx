import Image from "next/image";

export default function Footer() {
  return (
    <footer className="mt-auto py-4 text-white border-t border-t-gray-800 w-full">
      <div className="flex justify-between items-center max-w-6xl mx-auto">
        <div className="flex items-center gap-2">
          <Image src="/logo.png" alt="logo" width={32} height={32} />
          NFT MarketPlace
        </div>

        <a
          href="https://www.linkedin.com/in/mohib-arshi-8791a6191/"
          target="_blank"
          className="text-slate-500 text-sm"
        >
          Mohib Arshi
        </a>
      </div>
    </footer>
  );
}
