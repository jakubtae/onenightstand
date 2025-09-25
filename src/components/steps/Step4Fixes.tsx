import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Response } from "@/lib/response";

interface Step4FixesProps {
  name: string;
  selectedResponse: Response;
  onNext: () => void;
}

export const Step4Fixes = ({
  name,
  selectedResponse,
  onNext,
}: Step4FixesProps) => {
  return (
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
        <h3 className="text-xl font-semibold text-gray-800">Quick Fixes:</h3>
        <ul className="list-disc list-inside space-y-2 text-gray-600">
          {selectedResponse.fixes.map((fix: string, index: number) => (
            <li key={index} className="pl-2">
              {fix}
            </li>
          ))}
        </ul>
        <div className="mt-4">
          <Button
            onClick={onNext}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Make a comeback plan
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
