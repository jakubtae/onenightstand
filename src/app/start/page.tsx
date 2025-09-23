import { QuestionnaireFlow } from "@/components/form";

export default function Home() {
  return (
    <div className="font-sans grid grid-rows-[20px_1fr_20px] items-start justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20">
      <h1 className="text-6xl font-bold">Let&apos;s fix your life</h1>
      <QuestionnaireFlow />
    </div>
  );
}
