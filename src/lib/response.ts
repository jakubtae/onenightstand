export interface Response {
  option: number;
  question: string;
  text: string;
  fixes: string[];
}
const responses: Response[] = [
  {
    option: 1,
    // question: "I am always tired",
    question: "Running on fumes",
    text: "[Name], feeling constantly drained is more common than you think. Even Leonardo da Vinci, who created masterpieces and inventions, struggled with energy and sleep cycles, often working in bursts. The key is small wins: today, start with one 10-minute walk or a short morning stretch. Small boosts compound — energy is built in tiny steps, not giant leaps.",
    fixes: [
      "Fix diet & sleep",
      "Create an energy-boosting morning routine",
      "Exercise",
    ],
  },
  {
    option: 2,
    // question: "I am constantly distracted",
    question: "Can’t focus for sh*t",
    text: "[Name], distractions are the silent productivity killers. Benjamin Franklin, known for his incredible output, famously structured his day hour by hour to stay focused. You don't need to overhaul your life to see change — start by turning off your phone for 30 minutes or blocking one distracting site. Focus is a muscle; train it bit by bit.",
    fixes: [
      "Turn off phone notifications / block distracting sites",
      "Use timed work sessions (Pomodoro / 25–50 min focus)",
      "Declutter workspace and create a dedicated 'focus zone'",
    ],
  },
  {
    option: 3,
    // question: "I don't feel like doing anything",
    question: "Motivation = missing",
    text: "[Name], apathy happens even to the most accomplished. Winston Churchill faced periods of deep lethargy but discovered that taking action first, even if small, lifts momentum. Today, pick one tiny task — even just making your bed — and do it. Action triggers motivation, not the other way around.",
    fixes: [
      "Start with one tiny task (make bed, wash dishes, open a notebook)",
      "Schedule short bursts of activity — movement first, thinking later",
      "Use micro-goals — break bigger tasks into extremely small steps",
    ],
  },
  {
    option: 4,
    // question: "I can't get out of my head",
    question: "Stuck in brain jail",
    text: "[Name], overthinking can feel like a trap. Isaac Newton famously described his intense bouts of rumination, yet breakthroughs often came when he shifted focus to small experiments or observations. Try this: write down everything on your mind for 5 minutes, then pick one action to actually do. Clarity grows from movement, not rumination.",
    fixes: [
      "Write down your thoughts (brain dump / journal for 5–10 min)",
      "Go for a short walk or physical activity to shift focus",
      "Pick one small actionable step — do it immediately",
    ],
  },
  {
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
];

export { responses };
