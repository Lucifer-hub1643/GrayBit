#!/usr/bin/env node
/**
 * One-shot processor: takes the original GrayBit PNG (RGB, with dark
 * background and lots of empty canvas) and produces a clean, transparent,
 * tightly-cropped PNG that drops in cleanly on any background.
 *
 * Run with: node scripts/process-logo.mjs
 */
import sharp from "sharp";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import { renameSync } from "node:fs";

const __dirname = dirname(fileURLToPath(import.meta.url));
const SRC = join(__dirname, "..", "public", "graybit-logo.png");
const TMP = SRC + ".tmp";

// Luminance thresholds. Pixels darker than CUTOFF are fully transparent;
// pixels brighter than EDGE are fully opaque; in-between is feathered so
// anti-aliased edges blend cleanly.
const CUTOFF = 28; // ~ pure black background
const EDGE = 70;   // brighter pixels are part of the logo

async function main() {
  const img = sharp(SRC).ensureAlpha();
  const { data, info } = await img.raw().toBuffer({ resolveWithObject: true });
  const { width, height, channels } = info;

  let minX = width, minY = height, maxX = 0, maxY = 0;

  for (let y = 0; y < height; y++) {
    for (let x = 0; x < width; x++) {
      const i = (y * width + x) * channels;
      const r = data[i];
      const g = data[i + 1];
      const b = data[i + 2];
      // Rec. 601 luminance
      const lum = 0.299 * r + 0.587 * g + 0.114 * b;

      let alpha;
      if (lum <= CUTOFF) {
        alpha = 0;
      } else if (lum >= EDGE) {
        alpha = 255;
      } else {
        alpha = Math.round(((lum - CUTOFF) / (EDGE - CUTOFF)) * 255);
      }

      data[i + 3] = alpha;

      if (alpha > 30) {
        if (x < minX) minX = x;
        if (x > maxX) maxX = x;
        if (y < minY) minY = y;
        if (y > maxY) maxY = y;
      }
    }
  }

  // Add 3% padding on each side for visual breathing room.
  const w = maxX - minX;
  const h = maxY - minY;
  const padX = Math.round(w * 0.03);
  const padY = Math.round(h * 0.03);
  const left = Math.max(0, minX - padX);
  const top = Math.max(0, minY - padY);
  const cropW = Math.min(width - left, w + 2 * padX);
  const cropH = Math.min(height - top, h + 2 * padY);

  await sharp(data, { raw: { width, height, channels } })
    .extract({ left, top, width: cropW, height: cropH })
    .png({ compressionLevel: 9, palette: false })
    .toFile(TMP);

  renameSync(TMP, SRC);

  console.log(
    `✓ Logo processed: ${width}x${height} → ${cropW}x${cropH}, background transparent.`,
  );
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
