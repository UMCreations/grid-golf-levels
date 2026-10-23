import { readdirSync, readFileSync, writeFileSync } from "node:fs";
import { join } from "node:path";

const catalogLevels = [];
const ids = new Set();
const validDifficulties = new Set(["Easy", "Medium", "Hard"]);

for (const [folder, mode] of [["classic", "Classic"], ["adventure", "Adventure"]]) {
  const directory = join("levels", "published", folder);
  for (const file of readdirSync(directory).filter((name) => name.endsWith(".json")).sort()) {
    const level = JSON.parse(readFileSync(join(directory, file), "utf8"));
    if (!level || !/^[a-z0-9][a-z0-9-]*$/.test(level.id) || file !== `${level.id}.json` ||
        ids.has(level.id) || typeof level.name !== "string" || !level.name.trim() ||
        level.mode !== mode || !validDifficulties.has(level.difficulty) ||
        !Number.isInteger(level.levelPar) || level.levelPar < 1) {
      throw new Error(`Invalid published level: ${directory}/${file}`);
    }

    ids.add(level.id);
    catalogLevels.push({
      id: level.id,
      name: level.name,
      mode: level.mode,
      difficulty: level.difficulty,
      levelPar: level.levelPar,
      path: `levels/published/${folder}/${file}`,
    });
  }
}

catalogLevels.sort((a, b) => a.id < b.id ? -1 : a.id > b.id ? 1 : 0);
writeFileSync("catalog.json", `${JSON.stringify({ catalogVersion: 1, levels: catalogLevels }, null, 2)}\n`);
console.log(`Built catalog with ${catalogLevels.length} published level(s).`);
