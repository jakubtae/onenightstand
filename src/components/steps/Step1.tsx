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
import { useState } from "react";

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
  const [tutorialStep, setStep] = useState<TutorialStep>(1);
  const goToNextStep = (currentStep: TutorialStep) => {
    if (currentStep === 4) {
      onSkipTutorial(); // Notify parent instead of modifying prop
    } else {
      setStep((currentStep + 1) as TutorialStep);
    }
  };
  return (
    <>
      {!skipTutorial && (
        <>
          {tutorialStep === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              Step 1
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => goToNextStep(tutorialStep)}
              >
                Next
              </Button>
            </motion.div>
          )}
          {tutorialStep === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              Step 2
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => goToNextStep(tutorialStep)}
              >
                Next
              </Button>
            </motion.div>
          )}
          {tutorialStep === 3 && (
            <motion.div
              key="step3"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              Step 3
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => goToNextStep(tutorialStep)}
              >
                Next
              </Button>
            </motion.div>
          )}
          {tutorialStep === 4 && (
            <motion.div
              key="step4"
              initial={{ opacity: 0, x: 100 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -100 }}
              transition={{ duration: 0.3 }}
            >
              Step 4
              <Button
                className="mt-4 bg-blue-600 hover:bg-blue-700 text-white"
                onClick={() => goToNextStep(tutorialStep)}
              >
                Next
              </Button>
            </motion.div>
          )}
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
                      1. What&apos;s your name?
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
