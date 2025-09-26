import { motion } from "framer-motion";
import { Button } from "../ui/button";
import { PDFDownloadLink, PDFViewer } from "@react-pdf/renderer";
import { ComebackPlanPDF } from "@/lib/pdf";
import { QuestionnaireData } from "../QuestionnaireFlow";

interface Step5PlanProps {
  questionnaireData: QuestionnaireData;
  onRestart: () => void;
}

export const Step5 = ({ questionnaireData, onRestart }: Step5PlanProps) => {
  const { name, selectedResponse, headline, tone, reason, rules } =
    questionnaireData;

  if (!selectedResponse) return null;

  return (
    <motion.div
      key="step5"
      initial={{ opacity: 0, x: 100 }}
      animate={{ opacity: 1, x: 0 }}
      exit={{ opacity: 0, x: -100 }}
      transition={{ duration: 0.3 }}
    >
      <div className="flex flex-col md:flex-row gap-2 max-w-lg">
        <div className="w-full p-6 border border-gray-200 rounded-lg bg-white space-y-4">
          <h3 className="text-xl font-semibold text-gray-800">
            Boom. Here&apos;s your comeback plan{" "}
            <span className="font-bold text-gray-950">{name}</span>
          </h3>
          <p className="text-gray-600 font-medium leading-relaxed italic">
            It&apos;s not fancy. It&apos;s not fluffy. It&apos;s yours. Print
            it, screenshot it, tattoo it on your arm — whatever works.
          </p>

          {/* <div className="mt-6 p-4 bg-white rounded-lg border">
            <h4 className="font-semibold text-gray-800 mb-2">
              Your Plan Includes:
            </h4>
            <ul className="text-sm text-gray-600 space-y-1">
              <li>• Personalized headline: &quot;{headline}&quot;</li>
              <li>• {tone} coaching approach</li>
              <li>• Action steps for: {selectedResponse.question}</li>
              <li>• Personalized reasons : {reason}</li>
              <li>• Personalized rules : {rules}</li>
              <li>• 7-day implementation timeline</li>
              <li>• Daily reflection questions</li>
            </ul>
          </div> */}

          <Button
            className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4"
            asChild
          >
            <PDFDownloadLink
              document={
                <ComebackPlanPDF QuestionnaireData={questionnaireData} />
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

        {/* <div>
          <PDFViewer className="aspect-[210/297] w-full" showToolbar={false}>
            <ComebackPlanPDF QuestionnaireData={questionnaireData} />
          </PDFViewer>
        </div> */}
      </div>
    </motion.div>
  );
};
