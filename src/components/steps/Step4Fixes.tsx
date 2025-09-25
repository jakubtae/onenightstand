import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { Response } from "@/lib/response";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

interface Step4FixesProps {
  name: string;
  selectedResponse: Response;
  headline: string;
  tone: string;
  onNext: () => void;
  onBack: () => void;
}

export const Step4Fixes = ({
  name,
  selectedResponse,
  headline,
  tone,
  onNext,
  onBack,
}: Step4FixesProps) => {
  return (
    <motion.div
      key="step4"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <Card className="w-full">
        <CardHeader>
          <CardTitle className="text-xl font-semibold text-gray-800">
            Your Comeback Plan Preview
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Preview of entered data */}
          <div className="space-y-3 p-4 bg-gray-50 rounded-lg">
            <h4 className="font-semibold text-gray-700">Your Details:</h4>
            <p>
              <strong>Name:</strong> {name}
            </p>
            <p>
              <strong>Challenge:</strong> {selectedResponse.question}
            </p>
            <p>
              <strong>Headline:</strong> &quot;{headline}&quot;
            </p>
            <p>
              <strong>Tone:</strong> {tone}
            </p>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-800 mb-3">
              Quick Fixes:
            </h3>
            <ul className="list-disc list-inside space-y-2 text-gray-600 ml-2">
              {selectedResponse.fixes.map((fix: string, index: number) => (
                <li key={index} className="pl-2">
                  {fix}
                </li>
              ))}
            </ul>
          </div>

          <div className="flex gap-3 pt-4">
            <Button variant="outline" onClick={onBack} className="flex-1 py-3">
              Back
            </Button>
            <Button
              onClick={onNext}
              className="flex-1 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium"
            >
              Generate Comeback Plan
            </Button>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
};
