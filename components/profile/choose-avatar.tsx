import { getFolderFileNames } from "@/lib/posts-util";
import Image from "next/image";

export default function ChooseAvatar() {
  const images = getFolderFileNames("public/images/account/remix-rumble-avatars");
  const prePath = "/images/account/remix-rumble-avatars/";

  return (
    <section>
      <h1>Choose Avatar</h1>

      <div className="grid grid-cols-6 gap-2 m-4 border-4 p-2 max-h-[20rem] overflow-y-scroll">
        {images?.map((img, i) => (
          <div key={i} className="border-2 border-gray-600 hover:border-gray-400 cursor-pointer">
            <Image src={prePath + img} alt={img} width={70} height={70} className="w-20 h-20" />
          </div>
        ))}
      </div>
    </section>
  );
}
