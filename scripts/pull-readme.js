const { execSync } = require("child_process");
const fs = require("fs");
const path = require("path");

function pullReadme() {
  const ngantryDir = "/home/ubuntu/.openclaw/workspace/Ngantry-app-frontend";
  const targetDir = path.join(__dirname, "../public/readmes");
  const targetFile = path.join(targetDir, "ngantry-app-frontend.md");
  const assetsTargetDir = path.join(targetDir, "src/assets");
  const imageTargetFile = path.join(assetsTargetDir, "landing-page.png");

  console.log("Creating target directories if not exists...");
  if (!fs.existsSync(targetDir)) {
    fs.mkdirSync(targetDir, { recursive: true });
  }
  if (!fs.existsSync(assetsTargetDir)) {
    fs.mkdirSync(assetsTargetDir, { recursive: true });
  }

  try {
    console.log("Pulling latest changes in Ngantry repository...");
    execSync("git pull origin main", { cwd: ngantryDir, stdio: "inherit" });
  } catch (error) {
    console.warn("Failed to pull from remote git repository, will use local files: ", error.message);
  }

  const sourceFile = path.join(ngantryDir, "README.md");
  if (fs.existsSync(sourceFile)) {
    console.log("Copying README.md to public/readmes/ngantry-app-frontend.md...");
    fs.copyFileSync(sourceFile, targetFile);
  } else {
    console.error("Source README.md not found in", sourceFile);
    process.exit(1);
  }

  const sourceImage = path.join(ngantryDir, "src/assets/landing-page.png");
  if (fs.existsSync(sourceImage)) {
    console.log("Copying landing-page.png to public/readmes/src/assets/landing-page.png...");
    fs.copyFileSync(sourceImage, imageTargetFile);
  } else {
    console.warn("Source landing-page.png not found in", sourceImage);
  }

  console.log("Successfully pulled and copied README and assets!");
}

pullReadme();
