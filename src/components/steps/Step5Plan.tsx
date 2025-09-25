import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ComebackPlanPDF } from "@/lib/pdf";
import { Response } from "@/lib/response";

interface Step5PlanProps {
  name: string;
  selectedResponse: Response;
  onRestart: () => void;
}

export const Step5Plan = ({
  name,
  selectedResponse,
  onRestart,
}: Step5PlanProps) => {
  return (
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
                loading ? "Generating PDF..." : "Download Your Comeback Plan"
              }
            </PDFDownloadLink>
          </Button>
          <Button
            variant="outline"
            onClick={onRestart}
            className="w-full py-3 rounded-lg border-gray-300 text-gray-700 mt-2"
          >
            Create Another Plan
          </Button>
        </div>
        <div>
          <PDFViewer className="aspect-[210/297] w-full" showToolbar={false}>
            <ComebackPlanPDF name={name} selectedResponse={selectedResponse} />
          </PDFViewer>
        </div>
      </div>
    </motion.div>
  );
};
