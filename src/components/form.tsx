"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "framer-motion";
import {
  Page,
  Text,
  View,
  Document,
  StyleSheet,
  PDFDownloadLink,
} from "@react-pdf/renderer";

interface Response {
  option: number;
  question: string;
  text: string;
  fixes: string[];
}

const responses: Response[] = [
  {
    option: 1,
    question: "I am always tired",
    text: "[Name], feeling constantly drained is more common than you think. Even Leonardo da Vinci, who created masterpieces and inventions, struggled with energy and sleep cycles, often working in bursts. The key is small wins: today, start with one 10-minute walk or a short morning stretch. Small boosts compound — energy is built in tiny steps, not giant leaps.",
    fixes: [
      "Fix diet & sleep",
      "Create an energy-boosting morning routine",
      "Exercise",
    ],
  },
  {
    option: 2,
    question: "I am constantly distracted",
    text: "[Name], distractions are the silent productivity killers. Benjamin Franklin, known for his incredible output, famously structured his day hour by hour to stay focused. You don&apos;t need to overhaul your life to see change — start by turning off your phone for 30 minutes or blocking one distracting site. Focus is a muscle; train it bit by bit.",
    fixes: [
      "Turn off phone notifications / block distracting sites",
      "Use timed work sessions (Pomodoro / 25–50 min focus)",
      "Declutter workspace and create a dedicated &apos;focus zone&apos;",
    ],
  },
  {
    option: 3,
    question: "I don't feel like doing anything",
    text: "[Name], apathy happens even to the most accomplished. Winston Churchill faced periods of deep lethargy but discovered that taking action first, even if small, lifts momentum. Today, pick one tiny task — even just making your bed — and do it. Action triggers motivation, not the other way around.",
    fixes: [
      "Start with one tiny task (make bed, wash dishes, open a notebook)",
      "Schedule short bursts of activity — movement first, thinking later",
      "Use micro-goals — break bigger tasks into extremely small steps",
    ],
  },
  {
    option: 4,
    question: "I can't get out of my head",
    text: "[Name], overthinking can feel like a trap. Isaac Newton famously described his intense bouts of rumination, yet breakthroughs often came when he shifted focus to small experiments or observations. Try this: write down everything on your mind for 5 minutes, then pick one action to actually do. Clarity grows from movement, not rumination.",
    fixes: [
      "Write down your thoughts (brain dump / journal for 5–10 min)",
      "Go for a short walk or physical activity to shift focus",
      "Pick one small actionable step — do it immediately",
    ],
  },
  {
    option: 5,
    question: "I don't know what to do next",
    text: "[Name], uncertainty is normal when life feels directionless. Even explorers like Magellan faced the unknown daily. The trick is to choose one small step forward, no matter how minor — a short walk, a call, or a tiny goal for the day. Momentum comes from starting, not from knowing the whole path.",
    fixes: [
      "Identify one small priority for today — take that first step",
      "List 3 possible options for progress, pick one randomly",
      "Reflect on past wins — even tiny successes give direction",
    ],
  },
];

type Step = 1 | 2 | 3 | 4 | 5;

// Create PDF styles
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#FFFFFF",
    padding: 30,
    fontFamily: "Helvetica",
  },
  header: {
    marginBottom: 20,
    textAlign: "center",
    borderBottom: "2 solid #3B82F6",
    paddingBottom: 15,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#1F2937",
    marginBottom: 5,
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
const ComebackPlanPDF = ({
  name,
  selectedResponse,
}: {
  name: string;
  selectedResponse: Response;
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
          &quot;{selectedResponse.question}&quot;
        </Text>
        <Text style={{ fontSize: 12, color: "#6B7280", lineHeight: 1.5 }}>
          {selectedResponse.text.replace("[Name]", name)}
        </Text>
      </View>

      {/* Quick Fixes */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Immediate Action Steps</Text>
        {selectedResponse.fixes.map((fix, index) => (
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
        personalized for {name} • Remember: Progress, not perfection
      </Text>
    </Page>
  </Document>
);

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState<Step>(1);
  const [name, setName] = useState<string>("");
  const [selectedResponse, setSelectedResponse] = useState<Response | null>(
    null
  );
  const handleNameNext = (): void => {
    if (name.trim()) {
      setStep(2);
    }
  };
  // ... your existing handler functions
  const handleResponseSelect = (response: Response): void => {
    setSelectedResponse(response);
    setStep(3);
  };

  const handleViewFixes = (): void => {
    setStep(4);
  };

  const handlePlanNext = (): void => {
    setStep(5);
  };

  //   const handleRestart = (): void => {
  //     setStep(2);
  //     setSelectedResponse(null);
  //   };
  const goBack = () => {
    if (step > 1) {
      setStep((step - 1) as Step);
    }
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto p-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Questionnaire</h2>

      {step >= 2 && (
        <div className="flex justify-between absolute top-6 left-6 right-6">
          <Button
            onClick={goBack}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}

      <AnimatePresence mode="wait">
        {/* ... your existing steps 1-4 */}
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full space-y-4">
              <label className="block text-lg font-semibold text-gray-700">
                1. What&apos;s your name?
              </label>
              <div className="flex flex-row gap-3">
                <input
                  className="border border-gray-300 p-3 rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  value={name}
                  onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                    setName(e.target.value)
                  }
                  placeholder="Enter your name"
                />
                <Button
                  className="flex px-6 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium disabled:bg-gray-400 disabled:cursor-not-allowed"
                  onClick={handleNameNext}
                  disabled={!name.trim()}
                >
                  Next
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {/* Step 2: Problem selection */}
        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full space-y-6">
              <span className="font-semibold text-gray-700 text-lg">
                2. What is your current{" "}
                <span className="text-4xl font-bold text-gray-800">
                  biggest problem?
                </span>
              </span>
              <div className="flex flex-row flex-wrap gap-4 mt-6">
                {responses.map((response: Response) => (
                  <Button
                    key={response.option}
                    variant="outline"
                    className="border border-gray-300 px-6 py-4 rounded-lg text-gray-700 hover:bg-gray-50 hover:border-gray-400 transition-colors duration-200 text-base font-medium"
                    onClick={() => handleResponseSelect(response)}
                  >
                    {response.question}
                  </Button>
                ))}
              </div>
            </div>
          </motion.div>
        )}
        {step === 3 && selectedResponse && (
          <motion.div
            key="step3"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">
                First of all:
              </h3>
              <h4 className="text-lg font-medium text-gray-700 italic">
                &quot;{selectedResponse.question}&quot; - {name}
              </h4>
              <p className="text-gray-600 leading-relaxed first-letter:uppercase">
                {selectedResponse.text.replace("[Name]", name || "User")}
              </p>
              <div className="mt-4">
                <Button
                  onClick={handleViewFixes}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Go next
                </Button>
              </div>
            </div>
          </motion.div>
        )}

        {/* Step 4: Show fixes */}
        {step === 4 && selectedResponse && (
          <motion.div
            key="step4"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h3 className="text-lg font-medium text-gray-700 italic">
                &quot;{selectedResponse.question}&quot; - {name}
              </h3>
              <h3 className="text-xl font-semibold text-gray-800">
                Quick Fixes:
              </h3>
              <ul className="list-disc list-inside space-y-2 text-gray-600">
                {selectedResponse.fixes.map((fix: string, index: number) => (
                  <li key={index} className="pl-2">
                    {fix}
                  </li>
                ))}
              </ul>
              <div className="mt-4">
                <Button
                  onClick={handlePlanNext}
                  className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium"
                >
                  Make a comeback plan
                </Button>
              </div>
            </div>
          </motion.div>
        )}
        {/* Step 5: Comeback plan with PDF download */}
        {step === 5 && selectedResponse && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
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
                    loading
                      ? "Generating PDF..."
                      : "Download Your Comeback Plan"
                  }
                </PDFDownloadLink>
              </Button>

              <Button
                variant="outline"
                onClick={() => setStep(2)}
                className="w-full py-3 rounded-lg border-gray-300 text-gray-700 mt-2"
              >
                Create Another Plan
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
