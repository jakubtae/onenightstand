import Link from "next/link";
import { Button } from "./ui/button";

export const Navigation = () => {
  return (
    <nav>
      <div className="flex w-full px-1   lg:px-8 flex-row justify-between items-center py-4">
        <Button
          variant="link"
          className="text-xl lg:text-2xl font-bold text-gray-800"
          asChild
        >
          <Link href="/">LockIn.digital</Link>
        </Button>
        <Button variant="secondary" asChild>
          <Link href="/start">Get started</Link>
        </Button>
      </div>
    </nav>
  );
};
