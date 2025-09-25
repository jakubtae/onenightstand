"use client";
import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { Response } from "@/lib/response";
import { NavigationHeader } from "./NavigationHeader";
import { Step1Name } from "./steps/Step1Name";
import { Step2Problem } from "./steps/Step2Problem";
import { Step3Response } from "./steps/Step3Response";
import { Step4Fixes } from "./steps/Step4Fixes";
import { Step5Plan } from "./steps/Step5Plan";

type Step = 1 | 2 | 3 | 4 | 5;

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState<string>("");
  const [answer, setAnswer] = useState<string>("");
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(
    null
  );

  const handleNameNext = (): void => {
    if (name.trim()) {
      setStep(2);
    }
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
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto p-6 relative">
      <NavigationHeader step={step} goBack={goBack} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1Name name={name} setName={setName} onNext={handleNameNext} />
        )}

        {step === 2 && (
          <Step2Problem onResponseSelect={handleResponseSelect} name={name} />
        )}

        {step === 3 && selectedResponse && (
          <Step3Response
            name={name}
            answer={answer}
            setAnswer={setAnswer}
            selectedResponse={selectedResponse}
            onNext={handleViewFixes}
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
