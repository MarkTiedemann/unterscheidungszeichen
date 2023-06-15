# Unterscheidungszeichen

Eine aufbereitete Liste der [Unterscheidungszeichen](https://de.wikipedia.org/wiki/Kfz-Kennzeichen_(Deutschland)#Unterscheidungszeichen) deutscher Kfz-Kennzeichen als JSON-Datei: [`unterscheidungszeichen.json`](./unterscheidungszeichen.json).

Die Liste wird erstellt, indem der Wikipedia-Artikel <a href="https://de.wikipedia.org/wiki/Liste_der_Kfz-Kennzeichen_in_Deutschland"><q>Liste der Kfz-Kennzeichen in Deutschland</q></a> heruntergeladen und ausgewertet wird und die Daten anschließend aufbereitet werden.

Die so entstandene JSON-Datei enthält eine Liste von Unterscheidungszeichen, die jeweils folgende Attribute haben:

- **`zeichen`** (`string`)
    - Das Unterscheidungszeichen, z. B. `"B"` für Berlin
    - Enthält 1-3 Buchstaben
- **`stadt_landkreis_oder_erklärung`** (`string[]`)
    - Eine nicht-leere Liste von Städten und Kreisen, die das Zeichen verwenden, z. B. `"Kreis Herzogtum Lauenburg"` für das Zeichen `"RZ"`
    - Oder eine Erklärung für die Verwendung des Zeichens, z. B. die Erklärung `"Brandenburg, Landesregierung, Landtag und Polizei"` für das Zeichen `"BBL"`
    - Enthält 1-4 Elemente
- **`abgeleitet_von`** (`string[]`)
    - Eine Liste von Begriffen, von denen das Zeichen abgeleitet wurde, wobei die Buchstaben, die im Zeichen verwendet werden, groß geschrieben werden. Die Liste enthält i. d. R. einen Begriff, z. B. `"ParCHim"` für das Kürzel `"PCH"`. Es gibt zwei Ausnahmen:
        - Die Liste ist leer für das Zeichen `"X"`, welches nicht abgeleitet ist, sondern willkürlich für NATO-Fahrzeuge gewählt wurde
        - Die Liste enthält 2 Elemente für das Zeichen `"BK"`. Dieses lässt sich sowohl von `"BacKnang"` als auch von `"Börde (Kreis)"` ableiten
- **`bundesland`** (`string`)
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
