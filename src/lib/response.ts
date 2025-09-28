export interface Response {
  option: number;
  question: string;
  text: string;
  fixes: string[];
}

const responses: Response[] = [
  {
    option: 1,
    question: "Running on fumes",
    text: "[Name], feeling constantly drained is more common than you think. Even Leonardo da Vinci, who created masterpieces and inventions, struggled with energy and sleep cycles, often working in bursts. The key is small wins: today, start with one 10-minute walk or a short morning stretch. Small boosts compound — energy is built in tiny steps, not giant leaps.",
    fixes: [
      "Go to bed 30 minutes earlier tonight and cut sugar after 6pm",
      // Improves sleep quality and stabilizes energy by reducing late sugar crashes.
      "Drink a glass of water and do a 5-minute stretch immediately after waking up",
      // Kickstarts hydration and circulation, giving a quick morning energy boost.
      "Do 20 minutes of light exercise (walk, jog, bodyweight workout) before lunch",
      // Physical activity raises energy levels naturally and breaks the fatigue cycle.
    ],
  },
  {
    option: 2,
    question: "Can’t focus for sh*t",
    text: "[Name], distractions are the silent productivity killers. Benjamin Franklin, known for his incredible output, famously structured his day hour by hour to stay focused. You don't need to overhaul your life to see change — start by turning off your phone for 30 minutes or blocking one distracting site. Focus is a muscle; train it bit by bit.",
    fixes: [
      "Turn off phone notifications for the next 30 minutes",
      // Eliminates the most common source of distraction quickly.
      "Set a timer for 25 minutes and work on one task until it rings",
      // Builds focus endurance with the Pomodoro technique.
      "Clear your desk, leaving only what you need for the current task",
      // Reduces visual clutter, which subconsciously drains attention.
    ],
  },
  {
    option: 3,
    question: "Motivation = missing",
    text: "[Name], apathy happens even to the most accomplished. Winston Churchill faced periods of deep lethargy but discovered that taking action first, even if small, lifts momentum. Today, pick one tiny task — even just making your bed — and do it. Action triggers motivation, not the other way around.",
    fixes: [
      "Make your bed right now",
      // Simple physical action creates a sense of achievement and momentum.
      "Do a 5-minute chore (wash dishes, take out trash, wipe desk)",
      // Small visible progress signals to the brain that movement = reward.
      "Write down one micro-goal for today and cross it off once done",
      // Builds motivation by showing a direct link between action and completion.
    ],
  },
  {
    option: 4,
    question: "Stuck in brain jail",
    text: "[Name], overthinking can feel like a trap. Isaac Newton famously described his intense bouts of rumination, yet breakthroughs often came when he shifted focus to small experiments or observations. Try this: write down everything on your mind for 5 minutes, then pick one action to actually do. Clarity grows from movement, not rumination.",
    fixes: [
      "Write down every thought in your head for 5 minutes without filtering",
      // Brain dump clears mental clutter and makes worries tangible.
      "Take a 10-minute walk without headphones",
      // Physical movement reduces rumination and resets mental focus.
      "Pick one item from your brain dump and do it immediately",
      // Turns reflection into direct action, breaking overthinking paralysis.
    ],
  },
  {
    option: 5,
    question: "Lost in the sauce",
    text: "[Name], uncertainty is normal when life feels directionless. Even explorers like Magellan faced the unknown daily. The trick is to choose one small step forward, no matter how minor — a short walk, a call, or a tiny goal for the day. Momentum comes from starting, not from knowing the whole path.",
    fixes: [
      "Write down one priority you can do today and do it first",
      // Establishes momentum through clarity and action on a single focus.
      "List 3 options for progress and pick one randomly",
      // Reduces decision paralysis by avoiding endless weighing of options.
      "Write down 2 past wins to remind yourself you’ve done hard things before",
      // Builds confidence by anchoring in previous successes.
    ],
  },
];

export { responses };
