"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { Response } from "@/lib/response";
import { NavigationHeader } from "./NavigationHeader";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
// import { Step4 } from "./steps/Preview_not_used";
import { Step5 } from "./steps/Step5";
import { Step6 } from "./steps/Step6";

type Step = 1 | 2 | 3 | 4 | 5 | 6;

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

const reasonandrulesSchema = z.object({
  reason: z
    .string()
    .min(1, "A reason is required")
    .max(100, "Too much for a reason"),
  rules: z
    .string()
    .min(1, "A reason is required")
    .max(100, "Too much for a reason"),
});

export type NameFormData = z.infer<typeof nameSchema>;
export type HeadlineFormData = z.infer<typeof headlineSchema>;
export type ReasonAndRulesFormData = z.infer<typeof reasonandrulesSchema>;

// Main questionnaire data type
export interface QuestionnaireData {
  name: string;
  selectedResponse: Response | null;
  headline: string;
  tone: "strict" | "motivational" | "supportive";
  reason: string;
  rules: string;
}

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState<Step>(1);
  const [questionnaireData, setQuestionnaireData] = useState<QuestionnaireData>(
    {
      name: "",
      selectedResponse: null,
      headline: "",
      tone: "strict",
      reason: "",
      rules: "",
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

  const ReasonAndRulesForm = useForm<ReasonAndRulesFormData>({
    resolver: zodResolver(reasonandrulesSchema),
    defaultValues: {
      reason: "",
      rules: "",
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
    setStep(5);
  };

  // const handlePlanNext = (): void => {
  //   setStep(5);
  // };

  const handleFinishNext = (data: ReasonAndRulesFormData): void => {
    setQuestionnaireData((prev) => ({
      ...prev,
      rules: data.rules,
      reason: data.reason,
    }));
    setStep(6);
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
        {step === 1 && <Step1 form={nameForm} onSubmit={handleNameSubmit} />}

        {step === 2 && (
          <Step2
            onResponseSelect={handleResponseSelect}
            name={questionnaireData.name}
          />
        )}

        {step === 3 && questionnaireData.selectedResponse && (
          <Step3
            form={headlineForm}
            name={questionnaireData.name}
            selectedResponse={questionnaireData.selectedResponse}
            onSubmit={handleHeadlineSubmit}
            onBack={goBack}
          />
        )}

        {/* {step === 4 && questionnaireData.selectedResponse && (
          <Step4
            name={questionnaireData.name}
            selectedResponse={questionnaireData.selectedResponse}
            headline={questionnaireData.headline}
            tone={questionnaireData.tone}
            onNext={handlePlanNext}
            onBack={goBack}
          />
        )} */}

        {step === 5 && questionnaireData.selectedResponse && (
          <Step5
            form={ReasonAndRulesForm}
            name={questionnaireData.name}
            selectedResponse={questionnaireData.selectedResponse}
            rules={questionnaireData.rules}
            reason={questionnaireData.reason}
            onSubmit={handleFinishNext}
            onBack={goBack}
          />
        )}

        {step === 6 && questionnaireData.selectedResponse && (
          <Step6 questionnaireData={questionnaireData} onRestart={restart} />
        )}
      </AnimatePresence>
    </div>
  );
};
