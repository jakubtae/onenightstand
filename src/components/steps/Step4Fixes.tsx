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
      <div className="w-full p-6 space-y-4">
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
