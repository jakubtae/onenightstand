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

// Form validation schemas
const nameSchema = z.object({
  name: z.string().min(1, "Name is required").max(50, "Name is too long"),
});

const headlineSchema = z.object({
  headline: z
    .string()
    .min(1, "Headline is required")
    .max(100, "Headline is too long"),
  tone: z.enum(["strict", "motivational", "supportive"]),
});

export type NameFormData = z.infer<typeof nameSchema>;
export type HeadlineFormData = z.infer<typeof headlineSchema>;

// Main questionnaire data type
export interface QuestionnaireData {
  name: string;
  selectedResponse: Response | null;
  headline: string;
  tone: "strict" | "motivational" | "supportive";
}

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState<Step>(1);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(
    {
      name: "",
      selectedResponse: null,
      headline: "",
      tone: "strict",
    }
  );

  // React Hook Form setups
  const nameForm = useForm<NameFormData>({
    resolver: zodResolver(nameSchema),
    defaultValues: {
      name: "",
    },
  });

  const headlineForm = useForm<HeadlineFormData>({
    resolver: zodResolver(headlineSchema),
    defaultValues: {
      headline: "",
      tone: "strict",
    },
  });

  const handleNameSubmit = (data: NameFormData): void => {
    setQuestionnaireData((prev) => ({ ...prev, name: data.name }));
    setStep(2);
  };

  const handleResponseSelect = (response: Response): void => {
    setQuestionnaireData((prev) => ({ ...prev, selectedResponse: response }));
    setStep(3);
  };

  const handleHeadlineSubmit = (data: HeadlineFormData): void => {
    setQuestionnaireData((prev) => ({
      ...prev,
      headline: data.headline,
      tone: data.tone,
    }));
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
    setQuestionnaireData((prev) => ({
      ...prev,
      selectedResponse: null,
      headline: "",
      tone: "strict",
    }));
    nameForm.reset();
    headlineForm.reset();
  };

  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto p-6 relative">
      <NavigationHeader step={step} goBack={goBack} />

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1Name form={nameForm} onSubmit={handleNameSubmit} />
        )}

        {step === 2 && (
          <Step2Problem
            onResponseSelect={handleResponseSelect}
            name={questionnaireData.name}
          />
        )}

        {step === 3 && questionnaireData.selectedResponse && (
          <Step3Response
            form={headlineForm}
            name={questionnaireData.name}
            selectedResponse={questionnaireData.selectedResponse}
            onSubmit={handleHeadlineSubmit}
            onBack={goBack}
          />
        )}

        {step === 4 && questionnaireData.selectedResponse && (
          <Step4Fixes
            name={questionnaireData.name}
            selectedResponse={questionnaireData.selectedResponse}
            headline={questionnaireData.headline}
            tone={questionnaireData.tone}
            onNext={handlePlanNext}
            onBack={goBack}
          />
        )}

        {step === 5 && questionnaireData.selectedResponse && (
          <Step5Plan
            questionnaireData={questionnaireData}
            onRestart={restart}
          />
        )}
      </AnimatePresence>
    </div>
  );
};
