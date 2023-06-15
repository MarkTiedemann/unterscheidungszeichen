import { Uint8ArrayReader, Uint8ArrayWriter, ZipReader } from "https://deno.land/x/zipjs@v2.7.16/index.js";
import { parse } from "https://deno.land/std@0.191.0/csv/mod.ts";

const zipFile = await Deno.readFile("kennzeichen-vom-bundesamt-fuer-kartographie.csv.zip");
const reader = new ZipReader(new Uint8ArrayReader(new Uint8Array(zipFile)));
const entries = await reader.getEntries();
const entry = entries.find(e => e.filename === "kfz250.gk3.csv/kfz250/KFZ250.csv")!;
const file = await entry.getData!(new Uint8ArrayWriter());
const csv = new TextDecoder().decode(file);
await reader.close();
const data = parse(csv, { separator: ";" });
console.assert(data[0][5] === "KFZ"); // Kopfzeile überspringen
const zeichenLautBundSet = new Set(data.slice(1).map(r => r[5].split(" ")).flat().sort().filter(x => x !== ""));
const zeichenLautBundArray = Array.from(zeichenLautBundSet);
const zeichenLautWikipediaArray = JSON.parse(await Deno.readTextFile("unterscheidungszeichen.json")).map((x: { Zeichen: string }) => x.Zeichen) as string[];
const zeichenLautWikipediaSet = new Set(zeichenLautWikipediaArray);
console.assert(zeichenLautBundSet.size !== zeichenLautWikipediaSet.size);
const wikipediaExtra = new Set(zeichenLautWikipediaArray.filter(x => !zeichenLautBundSet.has(x)));
const bundExtra = new Set(zeichenLautBundArray.filter(x => !zeichenLautWikipediaSet.has(x)));
console.assert(wikipediaExtra.size > 0);
console.assert(bundExtra.size === 0);
console.log("Zusätzlich bei Wikipedia:");
console.log(Array.from(wikipediaExtra).map(x => ` - ${x}`).join("\n") + "\n");
// console.log("Zusätzlich beim Bundesamt für Kartographie:");
// console.log(Array.from(bundExtra).map(x => ` - ${x}`).join("\n"));
