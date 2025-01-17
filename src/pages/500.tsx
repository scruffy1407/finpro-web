import React from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/router";

const Custom500 = () => {
  const router = useRouter();

  return (
    <main className="max-w-screen-sm px-4 mx-auto py-10">
      <section className="flex flex-col gap-10 items-center">
        <Image
          alt="image not found"
          src="/500-image.svg"
          width={500}
          height={500}
          priority
          className="w-[400px]"
        />
        <div className="text-center">
          <h1 className="text-2xl font-bold text-neutral-950 mb-3">
            {`500 Error - It's Not You, It's Us.`}
          </h1>
          <p className="text-neutral-600 mb-6">
            {`An unexpected error occurred on our server. Rest assured, our team is on it and will resolve the issue shortly.`}
          </p>
          <Button onClick={() => router.push("/")} variant="primary">
            Return to Homepage
          </Button>
        </div>
      </section>
    </main>
  );
};

export default Custom500;