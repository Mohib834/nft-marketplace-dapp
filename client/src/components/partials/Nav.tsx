import Image from "next/image";
import Button from "./Button";
import Link from "next/link";

export default function Nav() {
  return (
    <nav className="max-w-6xl w-full mx-auto py-8 flex items-center">
      <Image src="/logo.png" alt="logo" width={32} height={32} />

      <div className="ml-auto items-center gap-4 inline-flex">
        <Link href="/create-nft">
          <Button variant="primary">Create NFT</Button>
        </Link>
        {/* <Button variant="primary">Connect</Button> */}
      </div>
    </nav>
  );
}
