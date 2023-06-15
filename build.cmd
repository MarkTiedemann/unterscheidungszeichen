@echo off
if not exist kennzeichen-von-wikipedia.html (
	curl -o kennzeichen-von-wikipedia.html https://de.wikipedia.org/wiki/Liste_der_Kfz-Kennzeichen_in_Deutschland
)
deno run --allow-read=kennzeichen-von-wikipedia.html --allow-write=unterscheidungszeichen.json build.ts
