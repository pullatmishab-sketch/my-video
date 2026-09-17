import express from "express";
import fs from "fs";
import { bundle } from "@remotion/bundler";
import { renderMedia, selectComposition } from "@remotion/renderer";

const app = express();

app.use(express.json());

// Make sure output folder exists
fs.mkdirSync("./out", { recursive: true });

// Serve rendered videos publicly
app.use("/out", express.static("out"));

app.post("/render", async (req, res) => {
  try {
    const { text } = req.body;

    if (!text) {
      return res.status(400).json({
        success: false,
        error: "Text is required",
      });
    }

    console.log("Rendering Reel...");

    const bundleLocation = await bundle({
      entryPoint: "./src/index.ts",
    });

    const composition = await selectComposition({
      serveUrl: bundleLocation,
      id: "MyComp",
      inputProps: {
        text,
      },
    });

    const filename = `reel-${Date.now()}.mp4`;
    const outputLocation = `./out/${filename}`;

    await renderMedia({
      composition,
      serveUrl: bundleLocation,
      codec: "h264",
      outputLocation,
      inputProps: {
        text,
      },
    });

    // Build public Cloud Run URL
    const host = req.get("host");
    const protocol = req.get("x-forwarded-proto") || req.protocol;

    const videoUrl = `${protocol}://${host}/out/${filename}`;

    console.log("Reel finished:");
    console.log(videoUrl);

    res.json({
      success: true,
      video: videoUrl,
    });
  } catch (error) {
    console.error("Render error:", error);

    res.status(500).json({
      success: false,
      error: error.message,
    });
  }
});

// Cloud Run provides PORT automatically
const PORT = process.env.PORT || 3001;

app.listen(PORT, "0.0.0.0", () => {
  console.log(`Render server running on port ${PORT}`);
});