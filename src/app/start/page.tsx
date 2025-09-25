import { QuestionnaireFlow } from "@/components/QuestionareFlow";

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center min-h-screen p-8 pb-20 gap-2 sm:p-20">
      <h1 className="text-6xl font-bold text-wrap">Let&apos;s fix your life</h1>
      <QuestionnaireFlow />
    </div>
  );
}
