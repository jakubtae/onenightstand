export interface Fix {
  text: string; // What the user should do
  relatedMaterials?: string[]; // Array of Knowledge Hub IDs (Books, Videos, Guides)
}

export interface Response {
  option: number;
  question: string;
  text: string;
  fixes: Fix[];
}

const responses: Response[] = [
  {
    option: 1,
    question: "Running on fumes",
    text: "[Name], feeling constantly drained is more common than you think. Even Leonardo da Vinci, who created masterpieces and inventions, struggled with energy and sleep cycles, often working in bursts. The key is small wins: today, start with one 10-minute walk or a short morning stretch. Small boosts compound — energy is built in tiny steps, not giant leaps.",
    fixes: [
      {
        text: "Go to bed 30 minutes earlier tonight and cut sugar after 6pm",
        relatedMaterials: [
          "68db31b38d97dc8bd2068096",
          "68db31b38d97dc8bd2068087",
        ], // Digital Detox Challenge (Guide), Atomic Habits (Book)
      },
      {
        text: "Drink a glass of water and do a 5-minute stretch immediately after waking up",
        relatedMaterials: ["68db31b38d97dc8bd2068090"], // Morning Routine Mastery (Guide)
      },
      {
        text: "Do 20 minutes of light exercise (walk, jog, bodyweight workout) before lunch",
        relatedMaterials: ["68db31b38d97dc8bd2068101"], // Healthy Habit Formation (Video)
      },
    ],
  },
  {
    option: 2,
    question: "Can’t focus for sh*t",
    text: "[Name], distractions are the silent productivity killers. Benjamin Franklin, known for his incredible output, famously structured his day hour by hour to stay focused. You don't need to overhaul your life to see change — start by turning off your phone for 30 minutes or blocking one distracting site. Focus is a muscle; train it bit by bit.",
    fixes: [
      {
        text: "Turn off phone notifications for the next 30 minutes",
        relatedMaterials: ["68db31b38d97dc8bd2068092"], // Mindfulness Meditation Guide (Video)
      },
      {
        text: "Set a timer for 25 minutes and work on one task until it rings",
        relatedMaterials: ["68db31b38d97dc8bd2068098"], // Time Management Secrets (Video)
      },
      {
        text: "Clear your desk, leaving only what you need for the current task",
        relatedMaterials: ["68db31b38d97dc8bd2068099"], // Emotional Intelligence Workbook (Guide)
      },
    ],
  },
  {
    option: 3,
    question: "Motivation = missing",
    text: "[Name], apathy happens even to the most accomplished. Winston Churchill faced periods of deep lethargy but discovered that taking action first, even if small, lifts momentum. Today, pick one tiny task — even just making your bed — and do it. Action triggers motivation, not the other way around.",
    fixes: [
      {
        text: "Make your bed right now",
        relatedMaterials: ["68db31b38d97dc8bd2068095"], // Building Self-Confidence (Video)
      },
      {
        text: "Do a 5-minute chore (wash dishes, take out trash, wipe desk)",
        relatedMaterials: ["68db31b38d97dc8bd2068093"], // Goal Setting Framework (Guide)
      },
      {
        text: "Write down one micro-goal for today and cross it off once done",
        relatedMaterials: ["68db31b38d97dc8bd2068091"], // 7 Habits of Highly Effective People (Book)
      },
    ],
  },
  {
    option: 4,
    question: "Stuck in brain jail",
    text: "[Name], overthinking can feel like a trap. Isaac Newton famously described his intense bouts of rumination, yet breakthroughs often came when he shifted focus to small experiments or observations. Try this: write down everything on your mind for 5 minutes, then pick one action to actually do. Clarity grows from movement, not rumination.",
    fixes: [
      {
        text: "Write down every thought in your head for 5 minutes without filtering",
        relatedMaterials: ["68db31b38d97dc8bd2068088"], // The Power of Now (Book)
      },
      {
        text: "Take a 10-minute walk without headphones",
        relatedMaterials: ["68db31b38d97dc8bd2068090"], // Morning Routine Mastery (Guide)
      },
      {
        text: "Pick one item from your brain dump and do it immediately",
        relatedMaterials: ["68db31b38d97dc8bd2068089"], // How to Stop Procrastinating (Video)
      },
    ],
  },
  {
    option: 5,
    question: "Lost in the sauce",
    text: "[Name], uncertainty is normal when life feels directionless. Even explorers like Magellan faced the unknown daily. The trick is to choose one small step forward, no matter how minor — a short walk, a call, or a tiny goal for the day. Momentum comes from starting, not from knowing the whole path.",
    fixes: [
      {
        text: "Write down one priority you can do today and do it first",
        relatedMaterials: ["68db31b38d97dc8bd2068093"], // Goal Setting Framework (Guide)
      },
      {
        text: "List 3 options for progress and pick one randomly",
        relatedMaterials: ["68db31b38d97dc8bd2068097"], // Daring Greatly (Book)
      },
      {
        text: "Write down 2 past wins to remind yourself you’ve done hard things before",
        relatedMaterials: ["68db31b38d97dc8bd2068087"], // Atomic Habits (Book)
      },
    ],
  },
];

export { responses };
