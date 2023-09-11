import Link from "next/link";

export default function NotFound() {
  return (
    <main className="bg-[#CCD3DB] min-h-screen p-10 font-serif font-semibold">
      <h1 className="text-4xl text-center text-[#4D4D4D] mb-3">Oops!</h1>
      <div className="flex flex-col items-center">
        <img
          className="lg:w-[50%] lg:h-[50%]"
          src="/404.png"
          alt="404"
        />
        <h1 className="text-[#4D4D4D] text-3xl font-serif font-bold mt-3 mb-3">
          PAGE NOT FOUND
        </h1>
      </div>
      <p className="text-center text-[#4D4D4D] text-xl font-serif">
        Sorry, the page you're looking for doesn't exist. If you think somethin
        is broken, report a problem.
      </p>

      <div className="flex flex-col gap-5 mt-5 lg:flex-row lg:justify-center">
        <button className="px-4 py-5 text-xl text-white bg-black border-2 rounded-full lg:px-14 lg:py-5">
          <Link href="/"> GO HOME</Link>
        </button>
        <button className="px-4 py-5 text-xl border-2 rounded-full text-[#4D4D4D] lg:px-12 lg:py-5">
          <Link href="/contact-us">CONTACT US</Link>
        </button>
      </div>
    </main>
  );
}
