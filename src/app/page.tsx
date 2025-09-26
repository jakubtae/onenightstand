import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-2 sm:p-20 bg-gray-100 border border-gray-300 w-full rounded-2xl">
      <h1 className="text-6xl lg:text-9xl font-bold uppercase text-center tracking-widest xl:tracking-[5rem] lg:tracking-[3rem] md:tracking-[1.5rem] ">
        Lock in
      </h1>
      <h2 className="text-2xl lg:text-4xl font-medium  text-gray-900">
        In a rut? A depressive episode?
      </h2>
      <Button variant="default" asChild>
        <Link href="/start" className="font-semibold">
          Just lock in
        </Link>
      </Button>
    </div>
  );
}
