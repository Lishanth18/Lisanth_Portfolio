import fs from 'fs';
import path from 'path';

const filesToDelete = [
  "src/components/sections/AthleticsUniverseSection.jsx",
  "src/components/sections/DecisionSection.jsx",
  "src/components/athletics/AchievementCard.jsx",
  "src/components/3d/StadiumEnvironment.jsx",
  "src/data/achievements.js",
  "src/sections/AthleticsSection.jsx",
  "src/sections/DecisionSection.jsx"
];

filesToDelete.forEach(file => {
  const fullPath = path.join(process.cwd(), file);
  if (fs.existsSync(fullPath)) {
    fs.unlinkSync(fullPath);
    console.log(`Deleted ${file}`);
  } else {
    console.log(`File not found: ${file}`);
  }
});
