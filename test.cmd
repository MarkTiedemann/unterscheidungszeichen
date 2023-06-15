@echo off
if not exist kennzeichen-von-bundesamt-fuer-kartographie.csv.zip (
	curl -o kennzeichen-von-bundesamt-fuer-kartographie.csv.zip https://daten.gdz.bkg.bund.de/produkte/sonstige/kfz250/aktuell/kfz250.gk3.csv.zip
)
deno run --allow-read=kennzeichen-von-bundesamt-fuer-kartographie.csv.zip,unterscheidungszeichen.json test.ts
if %errorlevel% neq 0 (
	exit /b 1
)
