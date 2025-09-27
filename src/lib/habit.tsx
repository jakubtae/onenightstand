import { Page, Text, View, StyleSheet } from "@react-pdf/renderer";

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
export const HabitTrackerPage = () => (
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
);
