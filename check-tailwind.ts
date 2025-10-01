import fs from "fs";
import path from "path";
import { execSync } from "child_process";

function log(title: string, status: string, ok = true) {
  console.log(`${ok ? "✅" : "❌"} ${title}: ${status}`);
}

function checkPackage() {
  try {
    const result = execSync("npm list tailwindcss", { stdio: "pipe" }).toString();
    if (result.includes("tailwindcss")) {
      log("Tailwind installé", "OK");
    } else {
      log("Tailwind installé", "Manquant", false);
    }
  } catch {
    log("Tailwind installé", "Non trouvé", false);
  }
}

function checkConfig() {
  const configFile = ["tailwind.config.ts", "tailwind.config.js"]
    .map(f => path.join(process.cwd(), f))
    .find(f => fs.existsSync(f));

  if (!configFile) {
    log("Fichier tailwind.config", "Absent", false);
    return;
  }

  const content = fs.readFileSync(configFile, "utf-8");
  if (content.includes("content")) {
    log("tailwind.config", "Présent et contient `content`");
  } else {
    log("tailwind.config", "Manque la clé `content`", false);
  }

  if (
    content.includes("./src/app") &&
    content.includes("./src/components") &&
    content.includes("./src/pages")
  ) {
    log("Chemins content", "OK");
  } else {
    log("Chemins content", "Incomplets (ajoute app, components, pages)", false);
  }
}

function checkGlobals() {
  const globalsPath = path.join(process.cwd(), "src/app/globals.css");
  if (!fs.existsSync(globalsPath)) {
    log("globals.css", "Introuvable", false);
    return;
  }

  const css = fs.readFileSync(globalsPath, "utf-8");
  const needed = ["@tailwind base;", "@tailwind components;", "@tailwind utilities;"];
  const missing = needed.filter(dir => !css.includes(dir));

  if (missing.length === 0) {
    log("globals.css", "Directives Tailwind présentes");
  } else {
    log("globals.css", `Manque: ${missing.join(", ")}`, false);
  }
}

function runTest() {
  console.log("\n🔎 Vérification Tailwind...\n");
  checkPackage();
  checkConfig();
  checkGlobals();
  console.log("\nℹ️  Pour tester visuellement, ajoute un <div className=\"bg-red-500\">Test</div> dans page.tsx\n");
}

runTest();