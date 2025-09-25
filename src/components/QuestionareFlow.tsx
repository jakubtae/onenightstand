"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { Response } from "@/lib/response";
import { Step1Name } from "./steps/Step1Name";
import { Step2Problem } from "./steps/Step2Problem";
import { Step3Response } from "./steps/Step3Response";
import { Step4Fixes } from "./steps/Step4Fixes";
import { Step5Plan } from "./steps/Step5Plan";
import { NavigationHeader } from "./NavigationHeader";

type Step = 1 | 2 | 3 | 4 | 5;

// Form validation schema
const nameSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

export type NameFormData = z.infer<typeof nameSchema>;

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState<Step>(1);
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(
    null
  );

  // React Hook Form setup
  const form = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  const name = form.watch("name");
  const [answer, setAnswer] = useState<string>("");
  const handleNameSubmit = (data: NameFormData): void => {
    setStep(2);
  };

  const handleResponseSelect = (response: Response): void => {
    setSelectedResponse(response);
    setStep(3);
  };

  const handleViewFixes = (): void => {
    setStep(4);
  };

  const handlePlanNext = (): void => {
    setStep(5);
  };

  const goBack = (): void => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  const restart = (): void => {
    setStep(2);
    setSelectedResponse(null);
    form.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto p-6 relative">
      <NavigationHeader step={step} goBack={goBack} />

      <AnimatePresence mode="wait">
        {step === 1 && <Step1Name form={form} onSubmit={handleNameSubmit} />}

        {step === 2 && (
          <Step2Problem onResponseSelect={handleResponseSelect} name={name} />
        )}

        {step === 3 && selectedResponse && (
          <Step3Response
            name={name}
            selectedResponse={selectedResponse}
            onNext={handleViewFixes}
            answer={answer}
            setAnswer={setAnswer}
          />
        )}

        {step === 4 && selectedResponse && (
          <Step4Fixes
            name={name}
            selectedResponse={selectedResponse}
            onNext={handlePlanNext}
          />
        )}

        {step === 5 && selectedResponse && (
          <Step5Plan
            name={name}
            selectedResponse={selectedResponse}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
