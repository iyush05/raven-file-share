"use client"
import randomString from "@/components/randomString";
import { Cover } from "@/components/ui/cover";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();
  return (
   <div className="h-[50rem] w-full bg-black bg-grid-white/[0.2] relative flex flex-col items-center justify-center">
      {/* Radial gradient for the container to give a faded look */}
      <div className="absolute pointer-events-none inset-0 flex items-center justify-center bg-black [mask-image:radial-gradient(ellipse_at_center,transparent_20%,black)]"></div>
      <div className="text-4xl sm:text-7xl font-bold relative z-20 bg-clip-text text-transparent bg-gradient-to-b from-neutral-200 to-neutral-500 py-8">
      <h1 className="text-4xl md:text-4xl lg:text-6xl font-semibold max-w-7xl mx-auto text-center mt-6 relative z-20 py-6 bg-clip-text text-transparent bg-gradient-to-b from-neutral-800 via-neutral-700 to-neutral-700 dark:from-neutral-800 dark:via-white dark:to-white">
        Send files between devices <br /> at <Cover>warp speed</Cover>
      </h1>
      </div>
      <div className="flex items-center justify-center gap-24">
        <button className="bg-cyan-700 hover:bg-cyan-900 transition-all duration-200 text-white px-12 py-3.5 rounded-md font-mono" onClick={() => {
          router.push(`/room/${randomString(5)}`);
        }}>
          Send
        </button>
        <button className="bg-cyan-700 hover:bg-cyan-900 transition-all duration-200 text-white px-12 py-3.5 rounded-md font-mono" onClick={() => {
          router.push('/joinRoom');
        }}>
          Receive
        </button>
      </div>
    </div>
  );
}
