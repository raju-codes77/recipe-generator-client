export type Exercise = {
  name: string;
  audience: "Everyone" | "Men" | "Women" | "Teenagers";
  level: "Beginner" | "Intermediate";
  focus: "Weight loss" | "Strength" | "Full body";
  duration: 10 | 20 | 30;
  sets: string;
  reps: string;
  rest: string;
  instructions: string;
};

export const exercises: Exercise[] = [
  { name: "Bodyweight squats", audience: "Everyone", level: "Beginner", focus: "Strength", duration: 10, sets: "3 sets", reps: "12 reps", rest: "45 sec", instructions: "Keep your chest lifted and drive through your heels." },
  { name: "Marching high knees", audience: "Everyone", level: "Beginner", focus: "Weight loss", duration: 10, sets: "3 rounds", reps: "40 sec", rest: "20 sec", instructions: "Move briskly while keeping your core gently engaged." },
  { name: "Incline push-ups", audience: "Everyone", level: "Beginner", focus: "Strength", duration: 20, sets: "3 sets", reps: "8-12 reps", rest: "60 sec", instructions: "Use a stable surface and keep your body in one long line." },
  { name: "Reverse lunges", audience: "Everyone", level: "Intermediate", focus: "Full body", duration: 20, sets: "3 sets", reps: "10 each side", rest: "45 sec", instructions: "Step back softly and keep the front knee aligned with your toes." },
  { name: "Plank shoulder taps", audience: "Everyone", level: "Intermediate", focus: "Full body", duration: 30, sets: "4 sets", reps: "20 taps", rest: "45 sec", instructions: "Widen your feet slightly to keep your hips steady." },
  { name: "Tempo mountain climbers", audience: "Everyone", level: "Intermediate", focus: "Weight loss", duration: 30, sets: "4 rounds", reps: "45 sec", rest: "30 sec", instructions: "Find a repeatable pace and land each foot underneath your hips." },
  { name: "Dumbbell floor press", audience: "Men", level: "Intermediate", focus: "Strength", duration: 30, sets: "4 sets", reps: "8-10 reps", rest: "75 sec", instructions: "Lower with control and keep your elbows slightly below your shoulders." },
  { name: "Glute bridge", audience: "Women", level: "Beginner", focus: "Strength", duration: 10, sets: "3 sets", reps: "15 reps", rest: "45 sec", instructions: "Squeeze your glutes at the top without arching your lower back." },
  { name: "Low-impact dance circuit", audience: "Women", level: "Beginner", focus: "Weight loss", duration: 20, sets: "4 rounds", reps: "2 min", rest: "30 sec", instructions: "Stay light on your feet and choose a pace you can repeat." },
  { name: "Teen bodyweight circuit", audience: "Teenagers", level: "Beginner", focus: "Full body", duration: 20, sets: "3 rounds", reps: "8-10 each", rest: "60 sec", instructions: "Use controlled movement and stop if you feel pain or dizziness." },
  { name: "Teen agility steps", audience: "Teenagers", level: "Intermediate", focus: "Weight loss", duration: 10, sets: "5 rounds", reps: "30 sec", rest: "30 sec", instructions: "Keep the steps quick and quiet, with soft knees." },
];

export type NutritionGroup = {
  title: string;
  items: string[];
};

export const nutritionGroups: NutritionGroup[] = [
  { title: "Healthy food suggestions", items: ["Avocado, berries and leafy greens", "Oats, quinoa and sweet potatoes", "Greek yogurt and fermented foods"] },
  { title: "Protein-rich food", items: ["Eggs, Greek yogurt and cottage cheese", "Lentils, chickpeas and edamame", "Chicken, salmon and tofu"] },
  { title: "Muscle-building choices", items: ["Chicken, fish, eggs and lean beef", "Tofu, tempeh, lentils and beans", "Milk, yogurt, oats and peanut butter"] },
  { title: "Healthy fats", items: ["Olive oil, avocado and nuts", "Chia, flax and pumpkin seeds", "Salmon and other oily fish"] },
  { title: "Breakfast ideas", items: ["Berry overnight oats with yogurt", "Egg and spinach whole-grain toast", "Banana, nut butter and seed smoothie"] },
  { title: "Lunch ideas", items: ["Rainbow quinoa and chickpea bowl", "Chicken, avocado and greens wrap", "Lentil soup with a crunchy side salad"] },
  { title: "Dinner ideas", items: ["Sheet-pan salmon with vegetables", "Tofu stir-fry with brown rice", "Turkey and bean stuffed peppers"] },
  { title: "Snack ideas", items: ["Apple slices with almond butter", "Hummus with carrots and cucumber", "Roasted chickpeas with herbs"] },
  { title: "Foods to limit", items: ["Sugary drinks and frequent energy drinks", "Highly processed snacks high in salt", "Deep-fried foods and excess alcohol"] },
];

export const nutritionTips = [
  "Build most meals around protein, colorful plants and a filling carbohydrate.",
  "Drink water regularly and add extra fluids around exercise.",
  "For muscle gain, pair strength training with enough total food and protein.",
  "Teenagers should prioritize regular meals, sleep and growth over restrictive dieting.",
];

export const routines = [
  { title: "Beginner reset", detail: "Build consistency with gentle, repeatable movement.", items: ["10 min brisk walk", "2 sets of bodyweight squats", "5 min stretch"] },
  { title: "Strength at home", detail: "A simple full-body routine with no equipment.", items: ["3 sets squats", "3 sets incline push-ups", "3 x 30 sec plank"] },
  { title: "Weekly basic rhythm", detail: "A calm structure that leaves room for real life.", items: ["Mon: Full body", "Wed: Walk and mobility", "Fri: Strength", "Weekend: Active recovery"] },
  { title: "Home workout ideas", detail: "Keep your energy moving in a small space.", items: ["Stair intervals", "Dance break", "Yoga flow", "Core circuit"] },
];

export const quickPlans: Record<string, string[]> = {
  "10-Beginner-Lose Weight": ["2 min - March in place", "3 min - Bodyweight squats", "3 min - High knees", "2 min - Cool-down breathing"],
  "20-Beginner-Stay Fit": ["3 min - Warm-up", "5 min - Squats", "5 min - Incline push-ups", "4 min - Plank intervals", "3 min - Cool-down"],
  "30-Intermediate-Build Strength": ["5 min - Dynamic warm-up", "8 min - Reverse lunges", "7 min - Push-ups", "6 min - Plank shoulder taps", "4 min - Cool-down"],
};

const planTemplates: Record<string, string[]> = {
  "Lose Weight": ["Warm-up with easy marching", "Alternate a strength move with a cardio move", "Keep the pace comfortable and repeatable", "Cool down with slow breathing"],
  "Stay Fit": ["Warm up your whole body", "Move through squats, pushes and core work", "Take short rests and focus on consistency", "Finish with mobility work"],
  "Build Strength": ["Warm up joints and practice form", "Use slow, controlled strength repetitions", "Rest fully between challenging sets", "Finish with a gentle stretch"],
};

export function getQuickPlan(time: string, goal: string, level: string) {
  const exactPlan = quickPlans[`${time}-${level}-${goal}`];
  if (exactPlan) return exactPlan;
  const warmup = time === "10" ? "2 min - Dynamic warm-up" : time === "20" ? "3 min - Dynamic warm-up" : "5 min - Dynamic warm-up";
  const cooldown = time === "10" ? "2 min - Cool-down" : time === "20" ? "3 min - Cool-down" : "5 min - Cool-down";
  const middle = planTemplates[goal] || planTemplates["Stay Fit"];
  return [warmup, `${Math.max(3, Number(time) - 7)} min - ${middle[1]}`, `${Math.min(5, Number(time) - 5)} min - ${middle[2]}`, cooldown];
}

export const defaultPlan = quickPlans["20-Beginner-Stay Fit"];
