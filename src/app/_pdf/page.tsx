import { QuestionnaireData } from "@/components/QuestionnaireFlow";
import { colorScheme, ComebackPDF } from "@/lib/newpdf";
import dynamic from "next/dynamic";
const exampleQuestionareData: QuestionnaireData = {
  name: "Jacob",
  headline: "Get Back on Track with Your Goals",
  tone: "strict",
  reason: "I want to improve my productivity and focus.",
  rules: "Wake up at 5am and avoid sugars",
  selectedResponse: {
    option: 5,
    // question: "I don&apos;t know what to do next",
    question: "Lost in the sauce",
    text: "[Name], uncertainty is normal when life feels directionless. Even explorers like Magellan faced the unknown daily. The trick is to choose one small step forward, no matter how minor — a short walk, a call, or a tiny goal for the day. Momentum comes from starting, not from knowing the whole path.",
    fixes: [
      "Identify one small priority for today — take that first step",
      "List 3 possible options for progress, pick one randomly",
      "Reflect on past wins — even tiny successes give direction",
    ],
  },
};
const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

const PDFDownloadLink = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFDownloadLink),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center flex-1 pb-20 gap-2 bg-gray-50 border border-gray-300 rounded-2xl">
      <div className="flex flex-row">
        {
          // for each color scheme return a box with it&apos;s color as a background
          Object.entries(colorScheme).map(([key, value]) => (
            <div
              key={key}
              style={{
                backgroundColor: value,
                height: 50,
                marginBottom: 10,
                boxSizing: "border-box",
                width: 50,
              }}
            ></div>
          ))
        }
      </div>
      <PDFViewer className="aspect-[210/297] w-[30%]" showToolbar={false}>
        <ComebackPDF QuestionnaireData={exampleQuestionareData} />
      </PDFViewer>
      <PDFDownloadLink
        document={<ComebackPDF QuestionnaireData={exampleQuestionareData} />}
        fileName={`${exampleQuestionareData.name}-comeback-plan.pdf`}
        className="w-full flex justify-center items-center"
      >
        {({ loading }) =>
          loading ? "Generating PDF..." : "Download Your Comeback Plan"
        }
      </PDFDownloadLink>
    </div>
  );
}
