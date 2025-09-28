"use client";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { AnimatePresence } from "framer-motion";
import { Response } from "@/lib/response";
import { NavigationHeader } from "./NavigationHeader";
import { Step1 } from "./steps/Step1";
import { Step2 } from "./steps/Step2";
import { Step3 } from "./steps/Step3";
import { Step4 } from "./steps/Step4";
import { Step5 } from "./steps/Step5";
import { Progress } from "./ui/progress";

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
  // skipTutorial state in localStorage (hydration-safe)
  const [skipTutorial, setSkipTutorial] = useState<boolean>(false);
  // Only read localStorage on client after mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const stored = localStorage.getItem("skipTutorial");
      if (stored === "true") setSkipTutorial(true);
    }
  }, []);
  const handleSkipTutorial = () => {
    setSkipTutorial(true);
    if (typeof window !== "undefined") {
      localStorage.setItem("skipTutorial", "true");
    }
  };

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
    setStep(4);
  };

  const handleFinishNext = (data: ReasonAndRulesFormData): void => {
    setQuestionnaireData((prev) => ({
      ...prev,
      rules: data.rules,
      reason: data.reason,
    }));
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
    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto p-2 lg:p-6 relative">
      <NavigationHeader step={step} goBack={goBack} />
      {step >= 1 && (
        <div className="flex flex-col items-center justify-center w-full">
          <Progress value={(step / 5) * 100} />
          <span>
            {step === 1 && "Warming up 🔥"}
            {step === 2 && "Halfway there, don’t quit now 👊"}
            {step === 3 && "Almost done, champ 🏆"}
            {step === 4 && "Finish strong 🚀"}
          </span>
        </div>
      )}

      <AnimatePresence mode="wait">
        {step === 1 && (
          <Step1
            form={nameForm}
            onSubmit={handleNameSubmit}
            skipTutorial={skipTutorial}
            onSkipTutorial={handleSkipTutorial}
          />
        )}

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

        {step === 4 && questionnaireData.selectedResponse && (
          <Step4
            form={ReasonAndRulesForm}
            name={questionnaireData.name}
            selectedResponse={questionnaireData.selectedResponse}
            rules={questionnaireData.rules}
            reason={questionnaireData.reason}
            onSubmit={handleFinishNext}
            onBack={goBack}
          />
        )}

        {step === 5 && questionnaireData.selectedResponse && (
          <Step5 questionnaireData={questionnaireData} onRestart={restart} />
        )}
      </AnimatePresence>
    </div>
  );
};
