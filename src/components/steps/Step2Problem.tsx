import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { responses, Response } from "@/lib/response";

interface Step2ProblemProps {
  onResponseSelect: (response: Response) => void;
}

export const Step2Problem = ({ onResponseSelect }: Step2ProblemProps) => {
  return (
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
              onClick={() => onResponseSelect(response)}
            >
              {response.question}
            </Button>
          ))}
        </div>
      </div>
    </motion.div>
  );
};
