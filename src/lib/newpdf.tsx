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

import { QuestionnaireData } from "@/components/QuestionnaireFlow";
import { colorThemes } from "./pdfThemes";

interface colorSchemeType {
  background: string;
  accent: string;
  textPrimary: string;
  textSecondary: string;
}

interface ComebackPDFProps {
  data: QuestionnaireData;
}

const CheekyComments = [
  "Seriously, do this one tiny thing. Don’t argue with me.",
  "You got this, even if your brain is screaming ‘nah’.",
  "Yes, you can. No excuses.",
  "Tiny wins, huge comeback. Let's go.",
];

const guideLink = "https://onenightstand-peach.vercel.app/guides";

export const ComebackPDF = ({
  QuestionnaireData: { name, selectedResponse, headline, tone, reason, rules },
}: {
  QuestionnaireData: QuestionnaireData;
}) => {
  const rulesArray = rules.split("\n").filter((r) => r.trim() !== "");
  const taskTitles = ["Fast Win", "Next Push", "Stretch Yourself"];
  const colorScheme = colorThemes.find((theme) => theme.name === tone)
    ?.colorScheme as colorSchemeType;
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
    },
    p2title2: {
      fontSize: 48,
      fontWeight: "bold",
      position: "absolute",
      top: 64,
      borderBottom: "4px solid blue",
      borderBottomColor: colorScheme.accent,
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
    link: {
      color: colorScheme.textPrimary,
    },
    linkInverted: {
      color: colorScheme.background,
    },
  });

  return (
    <Document>
      {/* Page 1: Header / Identity */}
      <Page size="A4" style={styles.page1}>
        <View style={styles.header}>
          <Text style={styles.title}>{name}&apos;s</Text>
          <Text style={styles.title2}>Comeback Plan</Text>
          <Text style={styles.subtitle}>
            Powered by{" "}
            <Link
              href="https://onenightstand-peach.vercel.app/"
              style={styles.linkInverted}
            >{`lockin.digital`}</Link>
            {"\n"}
            {headline}
          </Text>
        </View>
      </Page>

      {/* Pages 2–4: Tasks */}
      {selectedResponse?.fixes.map((fix, i) => (
        <Page key={i} size="A4" style={styles.page2}>
          <Text style={styles.p2title2}>{taskTitles[i]}</Text>
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
                stroke={colorScheme.accent}
                strokeWidth={4}
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
              wrap
            >
              {fix}
            </Text>
          </View>
          <Text
            style={{
              fontSize: 18,
              fontStyle: "italic",
              marginTop: 10,
              paddingBottom: 10,
              borderBottom: "1px solid blue",
              borderBottomColor: colorScheme.accent,
            }}
          >
            {CheekyComments[i % CheekyComments.length]}
          </Text>
          <Text
            style={{
              fontSize: 14,
              marginTop: 15,
              textAlign: "center",
              color: colorScheme.textSecondary,
              fontWeight: "light",
            }}
          >
            Need ideas? Check out some tips in our{" "}
            <Link href={guideLink} style={styles.link}>
              guides & materials
            </Link>
            .
          </Text>
        </Page>
      ))}

      {/* Page 5: Reflection / Consolidation */}
      <Page size="A4" style={styles.page}>
        <Text
          style={{
            fontSize: 28,
            fontWeight: "bold",
            textAlign: "center",
            marginBottom: 30,
            borderBottom: "4px solid blue",
            borderBottomColor: colorScheme.accent,
          }}
        >
          Step 4: Lock It In
        </Text>

        {/* Comeback Line */}
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 10,
            paddingLeft: 4,
            borderLeft: "2px solid blue",
            borderLeftColor: colorScheme.accent,
          }}
        >
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
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 10,
            paddingLeft: 4,
            borderLeft: "2px solid blue",
            borderLeftColor: colorScheme.accent,
          }}
        >
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
        <Text
          style={{
            fontSize: 16,
            fontWeight: "bold",
            marginBottom: 10,
            paddingLeft: 4,
            borderLeft: "2px solid blue",
            borderLeftColor: colorScheme.accent,
          }}
        >
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

        {/* Reflection prompts */}
        <Text style={{ fontSize: 16, fontWeight: "bold", marginBottom: 10 }}>
          Reflection:
        </Text>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 15,
            minHeight: 60,
            marginBottom: 10,
          }}
        >
          <Text>What one small win am I proud of today?</Text>
        </View>
        <View
          style={{
            borderWidth: 1,
            borderColor: "#000",
            padding: 15,
            minHeight: 60,
            marginBottom: 20,
          }}
        >
          <Text>What’s the next tiny action I’ll take to keep momentum?</Text>
        </View>

        {/* Final Commitment */}
        <Text
          style={{
            fontSize: 22,
            fontWeight: "bold",
            textAlign: "center",
            marginTop: 20,
            paddingBottom: 4,
            borderBottom: "2px solid blue",
            borderBottomColor: colorScheme.accent,
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
          Tiny wins, huge comeback. Go get it!
        </Text>
        <Text style={{ fontSize: 14, textAlign: "center", marginTop: 15 }}>
          Need extra guidance? Browse more tips in our{" "}
          <Link href={guideLink} style={styles.link}>
            guides & materials
          </Link>
          .
        </Text>
      </Page>
    </Document>
  );
};
