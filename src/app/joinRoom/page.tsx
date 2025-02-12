"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import React from "react";
import { AuroraBackground } from "@/components/ui/aurora-background";
import { useRouter } from "next/navigation";

export default function AuroraBackgroundDemo() {
    const router = useRouter();
    const [roomId, setRoomId] = useState("");

  return (
    <AuroraBackground>
      <motion.div
        initial={{ opacity: 0.0, y: 40 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{
          delay: 0.3,
          duration: 0.8,
          ease: "easeInOut",
        }}
        className="relative flex flex-col gap-4 items-center justify-center px-4"
      >
        <div className="text-3xl md:text-7xl font-bold dark:text-gray-300 text-center">
          Enter Room ID
        </div>
        <div className="flex gap-8 rounded-md">
            <input type="text" placeholder="Enter room ID" className="bg-gray-200 dark:bg-gray-200 rounded-full w-fit text-white dark:text-black px-4 py-2" onChange={(e) => {
                setRoomId(e.target.value);
            }}/>
            <button className="rounded-full w-20 bg-gray-400 hover:bg-gray-200" onClick={() => {
                router.push(`/room/${roomId}`);
            }}>Enter</button>
        </div>
      </motion.div>
    </AuroraBackground>
  );
}
