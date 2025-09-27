"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";

import dynamic from "next/dynamic";

const PDFViewer = dynamic(
  () => import("@react-pdf/renderer").then((mod) => mod.PDFViewer),
  {
    ssr: false,
    loading: () => <p>Loading...</p>,
  }
);
import { QuestionnaireData } from "@/components/QuestionnaireFlow";

interface colorSchemeType {
  background: string;
  backgroundSecondary: string;
  secondary: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
}

const colorScheme: colorSchemeType = {
  background: "#F6E8EA",
  backgroundSecondary: "#C1A5A9",
  secondary: "#F59E42",
  accent: "#F45B69",
  textPrimary: "#22181C",
  textSecondary: "#6B7280",
};

const exampleQuestionareData: QuestionnaireData = {
  name: "John Doe",
  headline: "Get Back on Track with Your Goals",
  tone: "strict",
  reason: "I want to improve my productivity and focus.",
  rules: "Wake up at 5am and avoid sugars",
  selectedResponse: {
    option: 5,
    // question: "I don't know what to do next",
    question: "Lost in the sauce",
    text: "[Name], uncertainty is normal when life feels directionless. Even explorers like Magellan faced the unknown daily. The trick is to choose one small step forward, no matter how minor — a short walk, a call, or a tiny goal for the day. Momentum comes from starting, not from knowing the whole path.",
    fixes: [
      "Identify one small priority for today — take that first step",
      "List 3 possible options for progress, pick one randomly",
      "Reflect on past wins — even tiny successes give direction",
    ],
  },
};

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: colorScheme.background,
    padding: 30,
    fontFamily: "Helvetica",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    width: "100%",
    padding: 5,
  },
  box: {
    padding: 5,
    border: "1 solid #D1D5DB",
  },
  tableColumn: {
    width: 300,
  },
  header: {
    marginBottom: 20,
    textAlign: "left",
    borderBottom: "2 solid #3B82F6",
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
    textTransform: "capitalize",
  },
  subtitle: {
    fontSize: 16,
    color: "#6B7280",
    fontWeight: "bold",
    textDecoration: "none",
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 10,
    backgroundColor: "#F3F4F6",
    padding: 8,
    borderRadius: 4,
  },
  problemStatement: {
    fontSize: 14,
    color: "#374151",
    lineHeight: 1.6,
    marginBottom: 15,
    fontStyle: "italic",
    backgroundColor: "#F9FAFB",
    padding: 12,
    borderRadius: 4,
  },
  fixItem: {
    fontSize: 12,
    color: "#4B5563",
    marginBottom: 8,
    lineHeight: 1.4,
  },
  notFixItem: {
    fontSize: 12,
    color: "#4B5563",
    lineHeight: 1.4,
  },
  timeline: {
    marginTop: 25,
  },
  timelineItem: {
    marginBottom: 15,
    flexDirection: "row",
  },
  timelineDay: {
    width: 60,
    fontSize: 12,
    fontWeight: "bold",
    color: "#3B82F6",
  },
  timelineContent: {
    flex: 1,
    fontSize: 11,
    color: "#6B7280",
  },
  quote: {
    fontSize: 11,
    color: "#9CA3AF",
    fontStyle: "italic",
    textAlign: "center",
    marginTop: 30,
    marginBottom: 10,
  },
  footer: {
    position: "absolute",
    bottom: 30,
    left: 30,
    right: 30,
    textAlign: "center",
    fontSize: 10,
    color: "#9CA3AF",
  },
});

// PDF Document Component
export const ComebackPlanPDF = ({
  QuestionnaireData: { name, selectedResponse, headline, tone, reason, rules },
}: {
  QuestionnaireData: QuestionnaireData;
}) => (
  <Document>
    <Page size="A4" style={styles.page}>
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.title}>{name}&apos;s Comeback Plan</Text>
        <Text style={styles.subtitle}>
          Powered by{" "}
          <Link
            href="https://onenightstand-peach.vercel.app/"
            style={styles.subtitle}
          >
            lockin.digital
          </Link>
        </Text>
      </View>

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleString()} • This plan is personalized
        for {name} • Remember: Progress, not perfection •{"\n"}
        <Link href="https://onenightstand-peach.vercel.app/">
          Visit my website
        </Link>
      </Text>
    </Page>
  </Document>
);

export default function Home() {
  return (
    <div className="font-sans flex flex-col items-center flex-1 pb-20 gap-2 bg-gray-50 border border-gray-300 rounded-2xl">
      <div className="flex flex-row">
        {
          // for each color scheme return a box with it's color as a background
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
      <PDFViewer className="aspect-[210/297] w-[50%]" showToolbar={false}>
        <ComebackPlanPDF QuestionnaireData={exampleQuestionareData} />
      </PDFViewer>
    </div>
  );
}
