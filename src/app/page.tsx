import { Button } from "@/components/ui/button";
export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-6xl font-bold">Hate your life?</h1>
      <Button variant="default">
        <a href="/start" className="font-semibold">
          Let&apos;s fix it
        </a>
      </Button>
    </div>
  );
}
