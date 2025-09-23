"use client";
import { useState } from "react";
import { Button } from "./ui/button";
import { FaArrowLeft } from "react-icons/fa";
import { AnimatePresence, motion } from "motion/react";
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
    text: "[Name], distractions are the silent productivity killers. Benjamin Franklin, known for his incredible output, famously structured his day hour by hour to stay focused. You don't need to overhaul your life to see change — start by turning off your phone for 30 minutes or blocking one distracting site. Focus is a muscle; train it bit by bit.",
    fixes: [
      "Turn off phone notifications / block distracting sites",
      "Use timed work sessions (Pomodoro / 25–50 min focus)",
      "Declutter workspace and create a dedicated 'focus zone'",
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

  const handleRestart = (): void => {
    setStep(2);
    setSelectedResponse(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto p-6 relative">
      <h2 className="text-3xl font-bold text-gray-800 mb-2">Questionnaire</h2>

      {step >= 2 && (
        <div className="flex justify-between absolute top-6 left-6 right-6">
          <Button
            onClick={() => setStep(step.valueOf() - 1)}
            variant="ghost"
            className="text-gray-600 hover:text-gray-800 p-2"
          >
            <FaArrowLeft className="w-5 h-5" />
          </Button>
        </div>
      )}

      {/* Step 1: Name input */}
      <AnimatePresence mode="wait">
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

        {/* Step 5: Comeback plan */}
        {step === 5 && selectedResponse && (
          <motion.div
            key="step5"
            initial={{ opacity: 0, x: 100 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -100 }}
            transition={{ duration: 0.3 }}
          >
            <div className="w-full p-6 border border-gray-200 rounded-lg bg-gray-50 space-y-4">
              <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
              <p className="text-gray-600 font-semibold leading-relaxed first-letter:uppercase">
                I want you to get back up.
                <br /> Take this comeback plan. <br /> Print it. And stick to
                it.
              </p>
              <Button className="w-full py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white font-medium mt-4">
                Open
              </Button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Step 3: Show response details */}
    </div>
  );
};
