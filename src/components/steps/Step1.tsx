import { motion } from "framer-motion";
import { Button } from "../ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { UseFormReturn } from "react-hook-form";
import { Input } from "../ui/input";
import { NameFormData } from "../QuestionnaireFlow";
import { useEffect, useState } from "react";

interface Step1NameProps {
  form: UseFormReturn<NameFormData>;
  onSubmit: (data: NameFormData) => void;
  skipTutorial: boolean;
  onSkipTutorial: () => void; // Add this
}
type TutorialStep = 1 | 2 | 3 | 4;

export const Step1 = ({
  form,
  onSubmit,
  skipTutorial,
  onSkipTutorial,
}: Step1NameProps) => {
  // skipTutorial = false;
  const [tutorialStep, setStep] = useState<TutorialStep>(1);
  const [isAutoAdvancing, setIsAutoAdvancing] = useState(true);

  // Auto-advance after 3 seconds for each step
  useEffect(() => {
    if (!skipTutorial && isAutoAdvancing) {
      const timer = setTimeout(() => {
        if (tutorialStep === 4) {
          onSkipTutorial();
        } else {
          setStep((prevStep) => (prevStep + 1) as TutorialStep);
        }
      }, 3000); // 3 seconds per step

      return () => clearTimeout(timer);
    }
  }, [tutorialStep, skipTutorial, isAutoAdvancing, onSkipTutorial]);

  const goToNextStep = (currentStep: TutorialStep) => {
    // When user clicks manually, disable auto-advance
    setIsAutoAdvancing(false);

    if (currentStep === 4) {
      onSkipTutorial();
    } else {
      setStep((currentStep + 1) as TutorialStep);
    }
  };

  const skipToEnd = () => {
    setIsAutoAdvancing(false);
    onSkipTutorial();
  };

  const goToStep = (step: TutorialStep) => {
    setIsAutoAdvancing(false);
    setStep(step);
  };

  const tutorialContent = {
    1: {
      content:
        "We're your no-nonsense coach. Your rut ends here. Let's make a plan you can actually stick to.",
    },
    2: {
      content:
        "Step 2: Discover what really matters to you and build habits that last.",
    },
    3: {
      content:
        "Step 3: Track your progress and celebrate small wins along the way.",
    },
    4: {
      content: "Step 4: Ready to begin? Let's create your personalized plan.",
    },
  };

  return (
    <>
      {!skipTutorial && (
        <>
          {/* Tutorial Content */}
          <motion.div
            key={`step-${tutorialStep}`}
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col items-center justify-center gap-4 w-full min-h-[200px] text-center"
          >
            <p className="text-lg font-medium">
              {tutorialContent[tutorialStep].content}
            </p>
          </motion.div>
          {/* Interactive Progress Dots */}
          <div className="flex flex-col gap-0 items-center justify-center">
            <div className="flex justify-center gap-3 mt-6">
              {([1, 2, 3, 4] as TutorialStep[]).map((step) => (
                <motion.button
                  key={step}
                  onClick={() => goToStep(step)}
                  className={`rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
                    step === tutorialStep
                      ? "bg-blue-600"
                      : step < tutorialStep
                      ? "bg-blue-400"
                      : "bg-gray-300"
                  }`}
                  whileHover={{ scale: 1.3 }}
                  whileTap={{ scale: 0.9 }}
                  transition={{ type: "spring", stiffness: 400, damping: 17 }}
                >
                  <motion.div
                    className="w-3 h-3 rounded-full"
                    animate={{
                      scale: step === tutorialStep ? 1.2 : 1,
                    }}
                  />
                </motion.button>
              ))}
            </div>
            {/* Step Indicator Text */}
            <div className="mt-2 text-sm text-gray-400">{tutorialStep} / 4</div>
            <Button
              variant="link"
              className="text-gray-400"
              onClick={() => onSkipTutorial()}
            >
              Skip Tutorial
            </Button>
          </div>
        </>
      )}
      {skipTutorial && (
        <motion.div
          key="step1"
          initial={{ opacity: 0, x: 100 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: -100 }}
          transition={{ duration: 0.3 }}
        >
          <Form {...form}>
            <form
              onSubmit={form.handleSubmit(onSubmit)}
              className="w-full space-y-6"
            >
              <FormField
                control={form.control}
                name="name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel className="text-lg lg:text-xl font-semibold text-gray-700">
                      What&apos;s your name?
                    </FormLabel>
                    <FormControl>
                      <div className="flex flex-row gap-3 justify-between items-center">
                        <Input
                          placeholder="Enter your name"
                          className="border border-gray-300 p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent h-full bg-white"
                          {...field}
                        />
                        <Button
                          type="submit"
                          className="flex h-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                          disabled={
                            !form.formState.isValid ||
                            form.formState.isSubmitting
                          }
                        >
                          Next
                        </Button>
                      </div>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </form>
          </Form>
        </motion.div>
      )}
    </>
  );
};
