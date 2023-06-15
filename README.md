# Unterscheidungszeichen

Eine aufbereitete Liste der [Unterscheidungszeichen](https://de.wikipedia.org/wiki/Kfz-Kennzeichen_(Deutschland)#Unterscheidungszeichen) deutscher Kfz-Kennzeichen als JSON-Datei: [`unterscheidungszeichen.json`](./unterscheidungszeichen.json).

## Herkunft

Die Liste wird erstellt, indem der Wikipedia-Artikel <a href="https://de.wikipedia.org/wiki/Liste_der_Kfz-Kennzeichen_in_Deutschland"><q>Liste der Kfz-Kennzeichen in Deutschland</q></a> heruntergeladen und ausgewertet wird und die Daten anschließend aufbereitet werden.

Zusätzlich wird die Liste um 3 weitere Unterscheidungszeichen ergänzt (`OVP`, `UER` und `WBG`), die aus den [Kennzeichen-Daten](https://gdz.bkg.bund.de/index.php/default/wms-kfz-kennzeichen-1-250-000-wms-kfz250.html) des Bundesamtes für Kartographie und Geodäsie stammen.

<!--
TODO: Gegen Liste von Kraftfahrt-Bundesamt prüfen
https://www.kba.de/DE/Service/Kennzeichen/Functions/kennzeichen.html
-->

## Struktur

Die JSON-Datei enthält eine Liste von Unterscheidungszeichen, die jeweils die folgende Attribute haben:

- **`Zeichen`** (`string`)
    - Das Unterscheidungszeichen, z. B. `"B"` für Berlin
    - Ist 1, 2 oder 3 Buchstaben lang
- **`Stadt_Landkreis_oder_Erklärung`** (`string[]`)
    - Eine Liste von Städten und Kreisen, die das Zeichen verwenden, z. B. `"Kreis Herzogtum Lauenburg"` für das Zeichen `"RZ"`
    - Oder eine Erklärung für die Verwendung des Zeichens, z. B. die Erklärung `"Brandenburg, Landesregierung, Landtag und Polizei"` für das Zeichen `"BBL"`
    - Enthält 1-4 Elemente
- **`abgeleitet_von`** (`string[]`)
    - Eine Liste von Begriffen, von denen das Zeichen abgeleitet wurde, wobei die Buchstaben, die im Zeichen verwendet werden, groß geschrieben werden. Die Liste enthält i. d. R. einen Begriff, z. B. `"ParCHim"` für das Kürzel `"PCH"`. Es gibt drei Ausnahmen:
        - Die Liste ist leer für die Zeichen `"X"` (NATO-Fahrzeuge) und `"Y"` (Fahrzeuge der Bundeswehr), welche nicht abgeleitet sind, sondern willkürlich ausgewählt wurden
        - Die Liste enthält 2 Elemente für das Zeichen `"BK"`. Dieses lässt sich sowohl von `"BacKnang"` als auch von `"Börde (Kreis)"` ableiten
- **`Bundesland`** (`string`)
    - Entweder das Bundesland:
        - `"Baden-Württemberg"`
        - `"Bayern"`
        - `"Berlin"`
        - `"Brandenburg"`
        - `"Bremen"`
        - `"Hamburg"`
        - `"Hessen"`
        - `"Mecklenburg-Vorpommern"`
        - `"Niedersachsen"`
        - `"Nordrhein-Westfalen"`
        - `"Rheinland-Pfalz"`
        - `"Saarland"`
        - `"Sachsen"`
        - `"Sachsen-Anhalt"`
        - `"Schleswig-Holstein"`
        - `"Thüringen"`
    - Oder der String `"bundesweit"` für die folgenden 6 Zeichen:
        - `"BD"` für Fahrzeuge des Deutschen Bundestags, des Bundesrats und weiterer Bundesdienste
        - `"BP"` für Fahrzeuge der Bundespolizei
        - `"BW"` für Fahrzeuge der Bundes-Wasserstraßen und Schifffahrtsverwaltung
        - `"THW"` für Fahrzeuge des Technischen Hilfswerks
        - `"X"` für NATO-Fahrzeuge
        - `"Y"` für Bundeswehrfahrzeuge

## Lizenz

Die Daten können frei verwendet werden. Sollte für die Nutzung der Daten eine Lizenz benötigt werden, kann die [CC0-1.0](https://creativecommons.org/publicdomain/zero/1.0/deed.de) (<q>Kein Urheberrechtsschutz</q>) verwendet werden.
