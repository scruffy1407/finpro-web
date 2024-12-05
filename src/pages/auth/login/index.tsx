import Image from "next/image";
import Link from "next/link";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function index() {
  return (
    <>
      {/* NAVIGATION BAR COMPONENT */}
      <section className="h-screen flex">
        <div className="relative w-[40%] h-full p-8 flex items-end">
          <Image
            src="/loginAsset/login_hero-min.webp"
            alt="Image of building"
            width={654.72}
            height={1000}
            className="absolute top-0 left-0 h-full w-full object-cover  "
          />
          <div className="w-full rounded-2xl bg-gray-100/13 backdrop-blur-sm p-4">
            <h2 className="text-lg text-white font-bold mb-3">
              Discover 50K+ Jobs and 300+ Companies
            </h2>
            <p className="text-sm text-white font-normal text-opacity-90">
              We've helped over 150,000 candidates find their dream jobs. Start
              your career journey here.
            </p>
            <div>{/* Component image goes here */}</div>
          </div>
        </div>
        <div className="w-[60%] p-12">
          <div className="max-w-[450px] p-8 bg-white rounded-3xl">
            <div className="flex items-center justify-between w-full mb-12">
              <Image
                src={"/LogoIpsum.svg"}
                alt="main-logo"
                width={100}
                height={200}
                className="h-6"
              />
              <Link href={`#`} className="underline text-neutral-950">
                Looking for candidate?
              </Link>
            </div>
            <div className="flex flex-col gap-8">
              <h2 className="text-2xl text-neutral-950 font-bold">
                Login to your account
              </h2>
              <form className="flex flex-col gap-4">
                <div>
                  <Label className="block mb-2">Email</Label>
                  <Input type="email" placeholder="Enter your email address" />
                </div>
                <div>
                  <Label className="block mb-2">Password</Label>
                  <Input type="password" placeholder="Enter your password" />
                </div>
                <div className="ml-auto">
                  <Link
                    className="text-sm text-sky-500 hover:text-sky-700"
                    href={"#"}
                  >
                    Forgot Password?
                  </Link>

                  <button></button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default index;
