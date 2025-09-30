"use client";
import { QuestionnaireData } from "@/components/QuestionnaireFlow";
import { ComebackPDF } from "@/lib/newpdf";
import { colorThemes } from "@/lib/pdfThemes";
const colorScheme = colorThemes[0].colorScheme;
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
      {
        text: "Write down one priority you can do today and do it first",
        relatedMaterials: ["68db31b38d97dc8bd2068093"], // Goal Setting Framework (Guide)
      },
      {
        text: "List 3 options for progress and pick one randomly",
        relatedMaterials: ["68db31b38d97dc8bd2068097"], // Daring Greatly (Book)
      },
      {
        text: "Write down 2 past wins to remind yourself you’ve done hard things before",
        relatedMaterials: ["68db31b38d97dc8bd2068087"], // Atomic Habits (Book)
      },
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
