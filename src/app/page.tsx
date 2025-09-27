import { Button } from "@/components/ui/button";
import Link from "next/link";
export default function Home() {
  return (
    <div className="font-montserrat flex flex-col items-center flex-1 p-2 pt-8 gap-2 lg:gap-6 sm:p-20 bg-gray-100 border border-gray-300 w-full rounded-2xl">
      {/* <h1 className="text-6xl lg:text-9xl font-bold uppercase text-center tracking-widest xl:tracking-[5rem] lg:tracking-[3rem] md:tracking-[1.5rem] "> */}
      <h1 className="text-4xl lg:text-6xl font-bold  text-center mb-4 lg:mb-0">
        <span className="text-6xl lg:text-8xl uppercase">In a rut?</span>
        <br /> Time to get your act together.
        {/* Lock in */}
      </h1>
      <h2 className="text-xl lg:text-4xl font-medium  text-gray-900 text-center">
        No fluff, no excuses. Just a plan that works for you.
      </h2>
      <Button variant="cta" asChild className="lg:text-xl lg:p-8">
        <Link href="/start" className="font-semibold">
          Show me how
        </Link>
      </Button>
      <span>
        Your future self will thank you… maybe even your current self.
      </span>
    </div>
  );
}
