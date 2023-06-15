import { DOMParser, HTMLTableElement, HTMLTableCellElement } from "https://esm.sh/linkedom@0.14.26";

const html = await Deno.readTextFile("kennzeichen-von-wikipedia.html");
const document = new DOMParser().parseFromString(html, "text/html");
const allTables = Array.from(document.querySelectorAll("table")) as HTMLTableElement[];
const relevantTables = allTables.filter(table => table.querySelector("th").textContent === "Abk.\n");
console.assert(relevantTables.length === 26); // Für jeden Buchstaben im Alphabet eine Tabelle
interface TableData {
	rowspan: number;
	textContent: string;
}
function cleanContent(textContent: string) {
	return textContent.trim()
		.replace("[2]", "")
		.replace("[3]", "")
		.replace("\u00a0", " ")
		.replace(" (→ Zweckverband Zulassungsstelle Coburg)", "")
		.replace(" (sonst)*", "") // Landkreis Fürth
		.replace(" (X-9999)", "") // Stadt Bremerhaven
		.replace(/ \(große kreisangehörige Stadt im .+\)$/, "");
}
const tableData = relevantTables.map(table => {
	const tableCells = Array.from(table.querySelectorAll("td")) as HTMLTableCellElement[];
	return tableCells.map(td => {
		const rowspan = td.getAttribute("rowspan");
		return {
			rowspan: rowspan === null ? 1 : parseInt(rowspan),
			textContent: cleanContent(td.textContent),
		};
	}) as TableData[];
}).flat();
interface Unterscheidungszeichen {
	zeichen: string;
	stadt_landkreis_oder_erklärung: string[];
	abgeleitet_von: string[]; // Array kann leer sein, siehe X: NATO, Y: Bundeswehr (willkürlich gewählt, nicht abgeleitet)
	bundesland: string | "bundesweit";
}
const unterscheidungszeichen: Unterscheidungszeichen[] = [];
for (let i = 0; i < tableData.length; i += 4) {
	const td0 = tableData[i];
	const td1 = tableData[i + 1];
	const td2 = tableData[i + 2];
	const td3 = tableData[i + 3];
	const zeichen = td0.textContent;
	let stadt_landkreis_oder_erklärung = [td1.textContent];
	let abgeleitet_von = [td2.textContent];
	const bundesland = td3.textContent;
	if (zeichen === "X") {
		stadt_landkreis_oder_erklärung = ["NATO"];
		abgeleitet_von = [];
	} else if (zeichen === "Y") { // Bundeswehr
		abgeleitet_von = [];
	} else if (zeichen === "THW") {
		stadt_landkreis_oder_erklärung = ["Technisches Hilfswerk"];
	} else if (zeichen === "BK") {
		stadt_landkreis_oder_erklärung = ["Rems-Murr-Kreis", "Landkreis Schwäbisch Hall", "Landkreis Börde"];
		abgeleitet_von = ["BacKnang", "Börde (Kreis)"];
		i += 4;
	} else if (zeichen === "GÖ") {
		stadt_landkreis_oder_erklärung = ["Landkreis Göttingen", "Stadt Göttingen"]; // "übriger Landkreis" wurde entfernt
	} else if (zeichen === "H") {
		stadt_landkreis_oder_erklärung = ["Region Hannover", "Stadt Hannover"]; // "übriger Landkreis" wurde entfernt
	} else if (td0.rowspan > 1) {
		stadt_landkreis_oder_erklärung = [td1.textContent, ...tableData.slice(i + 4, i + 3 + td0.rowspan).map(td => td.textContent)];
		i += td0.rowspan - 1;
	}
	unterscheidungszeichen.push({ zeichen, stadt_landkreis_oder_erklärung, abgeleitet_von, bundesland });
}
await Deno.writeTextFile("unterscheidungszeichen.json", JSON.stringify(unterscheidungszeichen, null, "\t") + "\n");
