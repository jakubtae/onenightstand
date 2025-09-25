"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";

import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { responses, Response } from "@/lib/response";
import { ComebackPlanPDF } from "@/lib/pdf";

type Step = 1 | 2 | 3 | 4 | 5;

// Create PDF styles

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState<string>("");
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(
    null
  );
  const handleNameNext = (): void => {
    if (name.trim()) {
      setStep(2);
    }
  };
  // ... your existing handler functions
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

  //   const handleRestart = (): void => {
  //     setStep(2);
  //     setSelectedResponse(null);
  //   };
  const goBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };
  return (
    <div className="flex flex-col items-center justify-center gap-2 max-w-2xl mx-auto p-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Questionnaire</h2>

      {step >= 2 && (
        <div className="flex justify-between absolute top-6 left-[-6px]">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ... your existing steps 1-4 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full space-y-4">
              <label className="block text-lg font-semibold text-gray-700">
                1. What&apos;s your name?
              </label>
              <div className="flex flex-row gap-3 justify-between items-center">
                <input
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                />
                <Button
                  className="flex h-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleNameNext}
                  disabled={!name.trim()}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {/* Step 2: Problem selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full space-y-6">
              <span className="font-semibold text-gray-700 text-lg">
                2. What is your current{" "}
                <span className="text-4xl font-bold text-gray-800">
                  biggest problem?
                </span>
              </span>
              <div className="flex flex-row flex-wrap gap-4 mt-6">
                {responses.map((response: Response) => (
                  <Button
                    key={response.option}
                    variant="outline"
                    className="border border-gray-300 px-6 py-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-base font-medium"
                    onClick={() => handleResponseSelect(response)}
                  >
                    {response.question}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && selectedResponse && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                First of all:
              </h3>
              <h4 className="text-lg font-medium text-gray-700 italic">
                &quot;{selectedResponse.question}&quot; - {name}
              </h4>
              <p className="text-gray-600 leading-relaxed first-letter:uppercase">
                {selectedResponse.text.replace("[Name]", name || "User")}
              </p>
              <div className="mt-4">
                <Button
                  onClick={handleViewFixes}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Go next
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Show fixes */}
        {step === 4 && selectedResponse && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h3 className="text-lg font-medium text-gray-700 italic">
                &quot;{selectedResponse.question}&quot; - {name}
              </h3>
              <h3 className="text-xl font-semibold text-gray-800">
                Quick Fixes:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {selectedResponse.fixes.map((fix: string, index: number) => (
                  <li key={index} className="pl-2">
                    {fix}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Button
                  onClick={handlePlanNext}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Make a comeback plan
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {/* Step 5: Comeback plan with PDF download */}
        {step === 5 && selectedResponse && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="flex flex-col md:flex-row gap-2">
              <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
                <h3 className="text-xl font-semibold text-gray-800">
                  {name}&apos;s Comeback Plan
                </h3>
                <p className="text-gray-600 font-semibold leading-relaxed">
                  Your personalized roadmap is ready!
                  <br />
                  Print it, stick to it, and start your comeback journey today.
                </p>
                <div className="mt-6 p-4 bg-white rounded-lg border">
                  <h4 className="font-semibold text-gray-800 mb-2">
                    What&apos;s included:
                  </h4>
                  <ul className="text-sm text-gray-600 space-y-1">
                    <li>• Personalized action steps based on your challenge</li>
                    <li>• 7-day implementation timeline</li>
                    <li>• Key success principles</li>
                    <li>• Daily reflection questions</li>
                  </ul>
                </div>
                <Button
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4"
                  asChild
                >
                  <PDFDownloadLink
                    document={
                      <ComebackPlanPDF
                        name={name}
                        selectedResponse={selectedResponse}
                      />
                    }
                    fileName={`${name}-comeback-plan.pdf`}
                    className="w-full flex justify-center items-center"
                  >
                    {({ loading }) =>
                      loading
                        ? "Generating PDF..."
                        : "Download Your Comeback Plan"
                    }
                  </PDFDownloadLink>
                </Button>
                <Button
                  variant="outline"
                  onClick={() => setStep(2)}
                  className="w-full py-3 rounded-lg border-gray-300 text-gray-700 mt-2"
                >
                  Create Another Plan
                </Button>
              </div>
              <div>
                <PDFViewer
                  className="aspect-[210/297] w-full"
                  showToolbar={false}
                >
                  <ComebackPlanPDF
                    name={name}
                    selectedResponse={selectedResponse}
                  />
                </PDFViewer>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
