import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Response } from "@/lib/response";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

interface Step3ResponseProps {
  name: string;
  answer: string;
  setAnswer: (name: string) => void;
  selectedResponse: Response;
  onNext: () => void;
}

export const Step3Response = ({
  name,
  selectedResponse,
  onNext,
  answer,
  setAnswer,
}: Step3ResponseProps) => {
  return (
    <motion.div
      key="step3"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="w-full p-6 space-y-4">
        <h3 className="font-semibold text-gray-700 text-lg">
          3. What&apos;s the big comeback headline you&apos;re chasing?
          <br /> (Don&apos;t overthink it, just type it. I&apos;ll clean it up
          for you.)
        </h3>
        <div className="flex flex-row gap-3 justify-between items-center">
          <input
            className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            value={answer}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
              setAnswer(e.target.value)
            }
            placeholder="Type your headline here..."
          />
        </div>
        <div className="flex flex-col gap-1 ">
          <h3 className="font-semibold text-gray-700 text-lg">
            3b. And how do you want me to talk to you?
          </h3>

          <Select defaultValue="strict">
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Theme" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="strict">Strict</SelectItem>
              <SelectItem value="motivational">Motivational</SelectItem>
              <SelectItem value="supportive">Supportive</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <Button
          className="flex h-full w-full px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
          onClick={onNext}
          disabled={!answer.trim()}
        >
          Next
        </Button>
      </div>
    </motion.div>
  );
};
