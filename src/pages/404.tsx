import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Custom404 = () => {
  const router = useRouter();

  return (
    <main className="max-w-screen-sm px-4 mx-auto py-10">
      <section className="flex flex-col gap-10 items-center">
        <Image
          alt="image not found"
          src="/404-image.svg"
          width={500}
          height={500}
          priority
          className="w-[400px]"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-950 mb-3">
            {'Page Not Found - Let`s Get You Back on Track.'}
          </h1>
          <p className="text-neutral-600 mb-6">
            {`It seems the page youre looking for has gone off the map. But don't worry—we'll guide you back to where you need to be.`}
          </p>
          <Button onClick={() => router.push("/")} variant="primary">
            Return to Homepage
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Custom404;