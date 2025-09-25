import { motion } from "framer-motion";
import { Button } from "../ui/button";

interface Step1NameProps {
  name: string;
  setName: (name: string) => void;
  onNext: () => void;
}

export const Step1Name = ({ name, setName, onNext }: Step1NameProps) => {
  return (
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
            onClick={onNext}
            disabled={!name.trim()}
          >
            Next
          </Button>
        </div>
      </div>
    </motion.div>
  );
};
