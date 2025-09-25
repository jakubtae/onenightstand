import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Response } from "@/lib/response";

interface Step3ResponseProps {
  name: string;
  selectedResponse: Response;
  onNext: () => void;
}

export const Step3Response = ({
  name,
  selectedResponse,
  onNext,
}: Step3ResponseProps) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
        <h3 className="text-xl font-semibold text-gray-800">First of all:</h3>
        <h4 className="text-lg font-medium text-gray-700 italic">
          &quot;{selectedResponse.question}&quot; - {name}
        </h4>
        <p className="text-gray-600 leading-relaxed first-letter:uppercase">
          {selectedResponse.text.replace("[Name]", name || "User")}
        </p>
        <div className="mt-4">
          <Button
            onClick={onNext}
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
          >
            Go next
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
