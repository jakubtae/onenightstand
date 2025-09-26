import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  Link,
} from "@react-pdf/renderer";
import { QuestionnaireData } from "../components/QuestionnaireFlow";

const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
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

const HabitsNumber = 3; // Change this to set number of habits
// const habitColors = ["#3B82F6", "#F59E42", "#10B981", "#EF4444", "#6366F1"]; // Example colors

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
          Personalized Roadmap to Get Back on Track
        </Text>
      </View>

      {/* Problem Statement */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Current Challenge</Text>
        <Text style={styles.problemStatement}>
          &quot;{selectedResponse ? selectedResponse.question : ""}&quot;
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
          {selectedResponse
            ? selectedResponse.text.replace("[Name]", name)
            : ""}
        </Text>
      </View>

      {/* Quick Fixes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immediate Action Steps</Text>
        {selectedResponse &&
          selectedResponse.fixes.map((fix, index) => (
            <Text key={index} style={styles.fixItem}>
              • {fix}
            </Text>
          ))}
      </View>

      {/* 7-Day Comeback Timeline */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>7-Day Comeback Timeline</Text>

        <View style={styles.timeline}>
          <View style={styles.timelineItem}>
            <Text style={styles.timelineDay}>Day 1-2:</Text>
            <Text style={styles.timelineContent}>
              Focus on implementing the first quick fix. Don&apos;t try to do
              everything at once. Small, consistent actions build momentum.
            </Text>
          </View>

          <View style={styles.timelineItem}>
            <Text style={styles.timelineDay}>Day 3-4:</Text>
            <Text style={styles.timelineContent}>
              Add the second action step. Reflect on what&apos;s working and
              adjust as needed. Celebrate small wins.
            </Text>
          </View>

          <View style={styles.timelineItem}>
            <Text style={styles.timelineDay}>Day 5-7:</Text>
            <Text style={styles.timelineContent}>
              Incorporate the third strategy. By now, you should see noticeable
              improvements. Plan how to maintain this momentum.
            </Text>
          </View>
        </View>
      </View>

      {/* Success Principles */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Key Principles for Success</Text>
        <Text style={styles.fixItem}>
          • Start small - 1% improvements compound dramatically
        </Text>
        <Text style={styles.fixItem}>
          • Consistency beats intensity - show up daily
        </Text>
        <Text style={styles.fixItem}>
          • Track progress - what gets measured gets managed
        </Text>
        <Text style={styles.fixItem}>
          • Be kind to yourself - progress isn&apos;t linear
        </Text>
      </View>

      {/* Daily Check-in Questions */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Daily Reflection Questions</Text>
        <Text style={styles.fixItem}>
          1. What&apos;s one small win I had today?
        </Text>
        <Text style={styles.fixItem}>
          2. What&apos;s one thing I can improve tomorrow?
        </Text>
        <Text style={styles.fixItem}>
          3. How did I move forward today, even slightly?
        </Text>
      </View>

      <Text style={styles.quote}>
        &quot;The journey of a thousand miles begins with a single step.&quot; -
        Lao Tzu
      </Text>

      <Text style={styles.footer}>
        Generated on {new Date().toLocaleDateString()} • This plan is
        personalized for {name} • Remember: Progress, not perfection •
        <Link href="https://onenightstand-peach.vercel.app/">
          Visit my website
        </Link>
      </Text>
    </Page>
    <Page size="A4" style={styles.page} id="HabitTrackerPage">
      <View style={styles.header}>
        <Text style={styles.title}>Habit Tracker</Text>
      </View>
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Your Daily Habit Tracker</Text>
        <Text style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
          Use this tracker to monitor your daily habits and stay accountable.
        </Text>
      </View>
      {/* Table Header */}
      <View
        style={{
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-between",
          borderBottom: "1 solid #D1D5DB",
          marginBottom: 6,
        }}
      >
        <Text
          style={[styles.fixItem, { width: 50, fontWeight: "bold" }]}
        >{`Day`}</Text>
        {Array.from({ length: HabitsNumber }).map((_, i) => (
          <Text
            key={i}
            style={[
              styles.fixItem,
              {
                width: 40,
                textAlign: "center",
                fontWeight: "bold",
              },
            ]}
          >{`Habit ${i + 1}`}</Text>
        ))}
      </View>
      {/* Table Rows */}
      {Array.from({ length: 31 }).map((_, dayIdx) => (
        <View
          key={dayIdx}
          style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 2,
          }}
        >
          <Text style={[styles.notFixItem, { width: 50 }]}>{`Day ${
            dayIdx + 1
          }`}</Text>
          {Array.from({ length: HabitsNumber }).map((_, habitIdx) => (
            <View
              key={habitIdx}
              style={{
                width: 24,
                height: 24,
                borderRadius: 4,
                border: "1 solid #000000",
                // backgroundColor: habitColors[habitIdx % habitColors.length],
                marginHorizontal: 8,
                marginVertical: 2,
              }}
            />
          ))}
        </View>
      ))}
    </Page>
  </Document>
);
