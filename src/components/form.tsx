"use client";
import { useState } from "react";
import { Button } from "./ui/button";

const responses = [
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
    text: "[Name], distractions are the silent productivity killers. Benjamin Franklin, known for his incredible output, famously structured his day hour by hour to stay focused. You don’t need to overhaul your life to see change — start by turning off your phone for 30 minutes or blocking one distracting site. Focus is a muscle; train it bit by bit.",
    fixes: [
      "Turn off phone notifications / block distracting sites",
      "Use timed work sessions (Pomodoro / 25–50 min focus)",
      "Declutter workspace and create a dedicated 'focus zone'",
    ],
  },
  {
    option: 3,
    question: "I don’t feel like doing anything",
    text: "[Name], apathy happens even to the most accomplished. Winston Churchill faced periods of deep lethargy but discovered that taking action first, even if small, lifts momentum. Today, pick one tiny task — even just making your bed — and do it. Action triggers motivation, not the other way around.",
    fixes: [
      "Start with one tiny task (make bed, wash dishes, open a notebook)",
      "Schedule short bursts of activity — movement first, thinking later",
      "Use micro-goals — break bigger tasks into extremely small steps",
    ],
  },
  {
    option: 4,
    question: "I can’t get out of my head",
    text: "[Name], overthinking can feel like a trap. Isaac Newton famously described his intense bouts of rumination, yet breakthroughs often came when he shifted focus to small experiments or observations. Try this: write down everything on your mind for 5 minutes, then pick one action to actually do. Clarity grows from movement, not rumination.",
    fixes: [
      "Write down your thoughts (brain dump / journal for 5–10 min)",
      "Go for a short walk or physical activity to shift focus",
      "Pick one small actionable step — do it immediately",
    ],
  },
  {
    option: 5,
    question: "I don’t know what to do next",
    text: "[Name], uncertainty is normal when life feels directionless. Even explorers like Magellan faced the unknown daily. The trick is to choose one small step forward, no matter how minor — a short walk, a call, or a tiny goal for the day. Momentum comes from starting, not from knowing the whole path.",
    fixes: [
      "Identify one small priority for today — take that first step",
      "List 3 possible options for progress, pick one randomly",
      "Reflect on past wins — even tiny successes give direction",
    ],
  },
];

export const QuestionnaireFlow = () => {
  const [step, setStep] = useState(1); // 1: name, 2: problem, 3: response details, 4: fixes
  const [name, setName] = useState("");
  const [selectedResponse, setSelectedResponse] = useState(null);

  const handleNameNext = () => {
    if (name.trim()) {
      setStep(2);
    }
  };

  const handleResponseSelect = (response) => {
    setSelectedResponse(response);
    setStep(3); // show response details
  };

  const handleViewFixes = () => {
    setStep(4); // show fixes
  };

  const handleRestart = () => {
    setStep(2);
    setSelectedResponse(null);
  };

  return (
    <div className="flex flex-col items-center gap-8 max-w-2xl mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Questionnaire</h2>

      {/* Step 1: Name input */}
      {step === 1 && (
        <div className="w-full">
          <label className="block mb-2 font-semibold">
            1. What's your name?
          </label>
          <input
            className="border p-2 rounded w-full"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Enter your name"
          />
          <button
            className="mt-4 bg-blue-600 text-white px-4 py-2 rounded"
            onClick={handleNameNext}
            disabled={!name.trim()}
          >
            Next
          </button>
        </div>
      )}

      {/* Step 2: Problem selection */}
      {step === 2 && (
        <div>
          <span>2. What is your biggest problem while being in a rut?</span>
          <div className="flex flex-row flex-wrap gap-4 mt-2">
            {responses.map((response) => (
              <Button
                key={response.option}
                variant="outline"
                onClick={() => {
                  handleResponseSelect(response);
                }}
              >
                {response.question}
              </Button>
            ))}
          </div>
        </div>
      )}

      {/* Step 3: Show response details */}
      {step === 3 && selectedResponse && (
        <div className="mt-4 p-4 border rounded bg-gray-50 max-w-2xl">
          <h3 className="text-xl font-semibold mb-2">
            {selectedResponse.question}
          </h3>
          <p>{selectedResponse.text.replace("[Name]", name || "User")}</p>
          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={handleViewFixes}>Go next</Button>
            {/* <Button
              onClick={() => {
                setStep(2); // go back to problem selection
                setSelectedResponse(null);
              }}
            >
              Change Problem
            </Button> */}
          </div>
        </div>
      )}

      {/* Step 4: Show fixes */}
      {step === 4 && selectedResponse && (
        <div className="mt-4 p-4 border rounded bg-gray-50 max-w-2xl">
          <h3 className="text-xl font-semibold mb-2">
            {selectedResponse.question}
          </h3>
          <h3 className="text-xl font-semibold mb-2">Fixes:</h3>
          <ul className="list-disc list-inside">
            {selectedResponse.fixes.map((fix, index) => (
              <li key={index}>{fix}</li>
            ))}
          </ul>
          <div className="mt-4 flex flex-col gap-2">
            <Button onClick={handleRestart}>Back to Problem</Button>
            <Button
              onClick={() => {
                setStep(2);
                setSelectedResponse(null);
              }}
            >
              Change Problem
            </Button>
            <Button
              onClick={() => {
                setStep(2);
                setSelectedResponse(null);
              }}
            >
              Restart
            </Button>
          </div>
        </div>
      )}
    </div>
  );
};
