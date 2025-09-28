"use client";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
  Svg,
  Rect,
} from "@react-pdf/renderer";

import { Font } from "@react-pdf/renderer";

interface HyphenationCallback {
  (word: string): string[];
}

const hyphenationCallback: HyphenationCallback = (word: string): string[] => {
  return [word];
};

Font.registerHyphenationCallback(hyphenationCallback);

import dynamic from "next/dynamic";

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

import { QuestionnaireData } from "@/components/QuestionnaireFlow";
import { title } from "process";

interface colorSchemeType {
  background: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
}

const colorScheme: colorSchemeType = {
  background: "#ffffff",
  accent: "#F45B69",
  textPrimary: "#22181C",
  textSecondary: "#6B7280",
};

const exampleQuestionareData: QuestionnaireData = {
  name: "Jacob",
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
  page1: {
    flexDirection: "column",
    backgroundColor: colorScheme.accent,
    alignItems: "center",
    justifyContent: "center",
    padding: 30,
    fontFamily: "Helvetica",
  },
  page2: {
    flexDirection: "column",
    backgroundColor: colorScheme.background,
    alignItems: "center",
    justifyContent: "center",
    fontFamily: "Helvetica",
    // transform: "rotate(90)",
  },
  p2title2: {
    fontSize: 48,
    fontWeight: "bold",
    position: "absolute",
    top: 64,
  },
  page: {
    flexDirection: "column",
    backgroundColor: colorScheme.background,
    padding: 30,
    fontFamily: "Helvetica",
  },
  row: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "center",
    gap: 32,
    alignItems: "center",
    maxWidth: "75%",
    width: "75%",
    paddingHorizontal: 20,
  },
  header: {
    marginBottom: 20,
    textAlign: "left",
    // borderBottom: "2 solid #3B82F6",
    paddingBottom: 15,
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
  },
  title: {
    fontSize: 96,
    fontWeight: "bold",
    color: colorScheme.background,
    textTransform: "uppercase",
  },
  title2: {
    fontSize: 48,
    fontWeight: "bold",
    color: colorScheme.background,
    textTransform: "uppercase",
    textAlign: "center",
  },
  subtitle: {
    fontSize: 16,
    color: colorScheme.background,
    fontWeight: "bold",
    textDecoration: "none",
    textAlign: "center",
  },
  rotatedText: {
    fontSize: 32,
    fontWeight: "semibold",
    marginLeft: 32,
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
}) => {
  const rulesArray = rules.split("\n").filter((r) => r.trim() !== "");

  return (
    <Document>
      <Page size="A4" style={styles.page1}>
        {/* Header */}
        <View style={styles.header}>
          <Text style={styles.title}>{name}&apos;s</Text>
          <Text style={styles.title2}>Comeback Plan</Text>
          <Text style={styles.subtitle}>
            Powered by{" "}
            <Link
              href="https://onenightstand-peach.vercel.app/"
              style={styles.subtitle}
            >
              &quot;lockin.digital&quot;
            </Link>
            {" \n"}
            {headline}
          </Text>
        </View>
      </Page>
      {selectedResponse?.fixes.map((fix, i) => (
        <Page key={i} size="A4" style={styles.page2} orientation="landscape">
          <Text style={styles.p2title2}>Step {i + 1}</Text>
          <View style={styles.row}>
            <Svg
              width={52}
              height={52}
              viewBox="0 0 52 52"
              preserveAspectRatio="xMidYMid meet"
            >
              <Rect
                x="0"
                y="0"
                width="52"
                height="52"
                fill="#fff"
                stroke="#000"
                strokeWidth={2}
              />
            </Svg>
            <Text
              style={{
                fontSize: 32,
                fontWeight: "semibold",
                flex: 1,
                textAlign: "left",
                lineHeight: 1.3,
              }}
              wrap={true}
            >
              {fix}
            </Text>
          </View>
        </Page>
      ))}
      {/* Page dedicated to showing a user's reason and rules */}
      <Page
        size="A4"
        style={{
          padding: 40,
          fontFamily: "Helvetica",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {/* Header */}
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
          }}
        >
          Lock It In ✅
        </Text>

        {/* Comeback Line */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          My Comeback Line:
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            alignItems: "center",
            marginBottom: 20,
          }}
        >
          <Text style={{ fontSize: 24, marginRight: 10 }}>☐</Text>
          <Text style={{ fontSize: 20 }}>{headline}</Text>
        </View>

        {/* Rules */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Rules I’m sticking to:
        </Text>
        {rulesArray.map((rule, idx) => (
          <View
            key={idx}
            style={{
              display: "flex",
              flexDirection: "row",
              alignItems: "center",
              marginBottom: 15,
            }}
          >
            <Text style={{ fontSize: 24, marginRight: 10 }}>☐</Text>
            <Text style={{ fontSize: 18 }}>{rule}</Text>
          </View>
        ))}

        {/* Motivation */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Why I’m doing this:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 15,
            minHeight: 80,
            marginBottom: 20,
          }}
        >
          <Text>{reason}</Text>
        </View>

        {/* Final Commitment */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 30,
          }}
        >
          ☐ I’m in. No excuses.
        </Text>
        <Text
          style={{
            fontSize: 16,
            fontStyle: "italic",
            textAlign: "center",
            marginTop: 10,
          }}
        >
          Your comeback starts now. Let’s see you do it.
        </Text>
      </Page>
    </Document>
  );
};

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
      <PDFViewer className="aspect-[210/297] w-[30%]" showToolbar={false}>
        <ComebackPlanPDF QuestionnaireData={exampleQuestionareData} />
      </PDFViewer>
      <PDFDownloadLink
        document={
          <ComebackPlanPDF QuestionnaireData={exampleQuestionareData} />
        }
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
