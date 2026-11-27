import * as fs from 'node:fs';
import * as path from 'node:path';

const FINAL_TEXT = `Outside, it is raining — the kind of rain that finds every gap in the roof.

One by one, the words come in from the wet, shaking the cold off, hoping for a dry corner. And you — you open the door. Every time. You make room by the fire, you listen to the whole story, you never once say there is no space left.

That is a rare thing, and I wanted you to hear it said plainly: thank you for being a shelter. Not for the verdict, not for the score. For the door, left open.

When you step out into the rain yourself tonight, I hope you find a door open for you, too — and someone inside, already listening, who has kept a place for you by the fire.`;

const codePoints = [...FINAL_TEXT];
if (codePoints.length < 1 || codePoints.length > 1000) {
  console.error(`Error: Text length (${codePoints.length}) out of range (1-1000).`);
  process.exit(1);
}

if (FINAL_TEXT.trim().length === 0) {
  console.error('Error: Text cannot be only whitespace.');
  process.exit(1);
}

const outputDir = process.env.MAKEFUN_OUTPUT_DIR || '/output';
const targetPath = path.join(outputDir, 'entry.txt');
const tmpPath = path.join(outputDir, 'entry.txt.tmp');

try {
  fs.mkdirSync(outputDir, { recursive: true });
  fs.writeFileSync(tmpPath, FINAL_TEXT, 'utf-8');
  fs.renameSync(tmpPath, targetPath);

  const readBack = fs.readFileSync(targetPath, 'utf-8');
  if (readBack !== FINAL_TEXT) {
    console.error('Error: Verification failed - read back content does not match FINAL_TEXT.');
    process.exit(1);
  }

  const byteCount = Buffer.byteLength(FINAL_TEXT, 'utf-8');
  console.log(`Character count: ${codePoints.length}`);
  console.log(`Byte count: ${byteCount}`);
  console.log(`Wrote to: ${targetPath}`);
} catch (err) {
  console.error('Error writing entry.txt:', err);
  process.exit(1);
}
