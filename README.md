# ✨WordWise✨

## Zielsetzung
### Funktionsumfang
Das Ziel ist eine Anwendung, die zum Lernen von Vokabeln verschiedener Sprachen genutzt werden kann. Ein Benutzer wählt eine Sprache aus und bekommt dann zufällige Vokabeln der Sprache. Gibt der Nutzer die korrekte deutsche Übersetzung an, wird dieser Lernfortschritt gespeichert und es geht mit der nächsten Vokabel weiter. Wird eine Vokabel korrekt beantwortet, wird sie in Zukunft seltener abgefragt und gilt nach mehreren Runden als gelernt. Sie wird dann nicht mehr erneut geprüft. \
Ein Benutzer hat die Möglichkeit, sich einen individuellen Lernfortschritt anzeigen zu lassen, welcher den Status der Vokabeln darstellt. \
Die Anwendung verfügt über ein User-Management, damit sich verschiedene Personen an ihren Nutzerkonten anmelden können. Ein Nutzerkonto kann die Rolle Schüler oder Lehrer haben. Ein Lehrer kann eine Klasse erstellen und Schüler zu dieser Klasse hinzufügen. Der Lehrer legt dann fest, welche Sprache gelernt werden soll und kann ausgewählte Vokabeln priorisieren. Dadurch wird sie bei jedem Schüler der Klasse als nächstes abgefragt. Ein Lehrer hat außerdem die Möglichkeit, die Lernfortschritte seiner Schüler einzusehen. \
Idee: User manuell Vokabeln hinzufügen lassen

## Installation
### Datenbank
Es wird eine SQL-Datenbank benötigt, auf der die Vokabeln und Lernfortschritte der User gespeichert werden. Dazu wird eine lokal gehostete Datenbank auf Basis von PostgreSQL genutzt. Der User "System" hat einen Lese- und Schreibzugriff auf die im Folgenden genannten Tabellen und wird vom Programm zur Interaktion genutzt.

Erstellung des Admin-Users:
```SQL 
CREATE USER admin SUPERUSER ENCRYPTED PASSWORD 'sicher';
```
\
Erstellung der Datenbank:
```SQL
CREATE DATABASE vokabeltester OWNER = admin ENCODING = 'UTF-8';
```
\
Erstellung der Tabellen:
```SQL
CREATE TABLE public."VocabEnglish"
(
    "ID" serial,
    vocab character varying,
    translation character varying,
    PRIMARY KEY ("ID")
);
```
````SQL
CREATE TABLE public."VocabSpanish"
(
    "ID" serial NOT NULL,
    vocab character varying NOT NULL,
    translation character varying NOT NULL,
    PRIMARY KEY ("ID")
);
````
```SQL
CREATE TABLE public."ProgressEnglish"
(
    "ID" serial,
    "IDVocab" integer,
    "IDUser" integer,
    date date,
    stage integer,
    PRIMARY KEY ("ID"),
    CONSTRAINT "IDVocab" FOREIGN KEY ("IDVocab")
        REFERENCES public."VocabEnglish" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "IDUser" FOREIGN KEY ("IDUser")
        REFERENCES public."Users" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
```
````SQL
CREATE TABLE public."ProgressSpanish"
(
    "ID" serial,
    "IDVocab" integer,
    "IDUser" integer,
    date date,
    stage integer,
    PRIMARY KEY ("ID"),
    CONSTRAINT "IDVocab" FOREIGN KEY ("IDVocab")
        REFERENCES public."VocabSpanish" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "IDUser" FOREIGN KEY ("IDUser")
        REFERENCES public."Users" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
````
````SQL
CREATE TABLE public."Users"
(
    "ID" serial,
    username character varying,
    password character varying,
    name character varying,
    role character varying,
    PRIMARY KEY ("ID"),
    CONSTRAINT username UNIQUE (username)
);
````
````SQL
CREATE TABLE public."Classes"
(
    "ID" smallserial,
    name character varying,
    teacher character varying,
    language character varying,
    PRIMARY KEY ("ID"),
    CONSTRAINT teacher FOREIGN KEY (teacher)
        REFERENCES public."Users" (username) MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
````
````SQL
CREATE TABLE public."ClassMembers"
(
    "IDClass" integer,
    "IDUser" integer,
    PRIMARY KEY ("IDClass", "IDUser"),
    CONSTRAINT "IDClass" FOREIGN KEY ("IDClass")
        REFERENCES public."Classes" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID,
    CONSTRAINT "IDUser" FOREIGN KEY ("IDUser")
        REFERENCES public."Users" ("ID") MATCH SIMPLE
        ON UPDATE NO ACTION
        ON DELETE NO ACTION
        NOT VALID
);
````
\
Befüllung der Tabellen mit Werten:
```SQL
INSERT INTO "VocabEnglish" ("vocab", "translation") VALUES
  ('apple', 'Apfel'),
  ('banana', 'Banane'),
  ('car', 'Auto'),
  ('dog', 'Hund'),
  ('elephant', 'Elefant'),
  ('flower', 'Blume'),
  ('guitar', 'Gitarre'),
  ('house', 'Haus'),
  ('ice cream', 'Eis'),
  ('jacket', 'Jacke'),
  ('key', 'Schlüssel'),
  ('lion', 'Löwe'),
  ('moon', 'Mond'),
  ('notebook', 'Notizbuch'),
  ('orange', 'Orange'),
  ('pencil', 'Bleistift'),
  ('queen', 'Königin'),
  ('rainbow', 'Regenbogen'),
  ('sun', 'Sonne'),
  ('tree', 'Baum');
```
```SQL
INSERT INTO "VocabSpanish" ("vocab", "translation") VALUES 
('Hola', 'Hallo'),
('Adiós', 'Auf Wiedersehen'),
('Sí', 'Ja'),
('No', 'Nein'),
('Por favor', 'Bitte'),
('Gracias', 'Danke'),
('Lo siento', 'Es tut mir leid'),
('¿Cómo estás?', 'Wie geht es dir?'),
('Bien', 'Gut'),
('Mal', 'Schlecht'),
('Amigo', 'Freund'),
('Familia', 'Familie'),
('Comida', 'Essen'),
('Agua', 'Wasser'),
('Casa', 'Haus'),
('Escuela', 'Schule'),
('Libro', 'Buch'),
('Perro', 'Hund'),
('Gato', 'Katze'),
('Playa', 'Strand');
```

Bei Fehler Kodierung:  \\!chcp 1252 (Codepage in psql anpassen)

### JavaScript <--> SQL
Um eine Verbindung zur SQL-Datenbank herzustellen, wird das Modul pg (PostgreSQL-Client für Node.js) genutzt. Das Modul setzt voraus, dass Node.js und npm (Node Package Manager) installiert sind. \
Installation von pg:
```bash
npm install pg
```


Ggf. Installation Prisma (https://www.prisma.io/docs/getting-started/setup-prisma/add-to-existing-project/relational-databases-typescript-postgresql)
\
Prisma Schema aktualisieren: npx prisma db pull --> npx prisma generate


### React
````bash
npm install react react-dom react-scripts
````

### MUI
````bash
npm install @mui/material @emotion/react @emotion/styled
````
Express: https://expressjs.com/en/starter/installing.html


YT Tutorial Passport: https://www.youtube.com/watch?v=fYow8zDOUVg&list=PLUUOvUPrFYcjel-IKiAQY4coJJ9EUjfcP&index=21


## Einführung und Ziele
Das Ziel meines Softwareprojekts ist es, einen Vokabeltester zu entwickeln, der zum Beispiel an Schulen eingesetzt werden kann. Das Programm soll durch die Abfrage von Vokabeln beim Lernen einer Sprache unterstützen und Feedback über den Lernerfolg geben. Um in der Umgebung einer Schulklasse zu funktionieren, müssen mehrere Nutzer das Programm gleichzeitig und unabhängig voneinander nutzen können. Benutzer müssen sich als Klassen zusammenfassen lassen und haben dann einen gemeinsamen Lernfortschritt. 

## Lösungsstrategie
Zur Umsetzung dieser Anforderungen wird eine Webseite verwendet, welche auf eine lokal gehostete Datenbank zugreift. Die Benutzeroberfläche kommuniziert über eine API mit dem Server, über den sämtliche Daten bereitgestellt und verwaltet werden. Ein Anwender kann sich registrieren und von da an mit dem erstellten Account arbeiten. Die Nutzerverwaltung findet auf dem Server statt, welcher die Anmeldedaten wiederum auf der Datenbank speichert. 

### Datenbank
Die SQL-Datenbank wird auf dem Server gehostet und nutzt PostgreSQL als DBMS. PostgreSQL wird genutzt, da es für die Zwecke dieses Projekts ausreicht und bereits aus anderen Vorlesungen bekannt war. Es gibt zu jeder Sprache, die das Programm abfragen kann, zwei Tabellen. Die erste Tabelle enthält die Vokabeln ihre Übersetzungen. Die zweite speichert den individuellen Lernfortschritt aller User. Die Vokabeln und der Lernfortschritt werden pro Sprache in einzelnen Tabellen gespeichert, um eine klare Struktur zu wahren. Die Erweiterung des Programms um weitere Sprachen hätte andernfalls zu einer riesigen unübersichtlicheren Tabelle geführt. 

#### Vocab...
| Spalte | Beschreibung | Referenziert |
|---|---|---|
|ID|Primärschlüssel, inkrementiert automatisch|/|
|vocab|Die eigentliche Vokabel|/|
|translation|Die deutsche Übersetzung der Vokabel|/|

#### Progress...
| Spalte | Beschreibung | Referenziert |
|---|---|---|
|ID|Primärschlüssel, inkrementiert automatisch|/|
|IDVocab|Fremdschlüssel, Verweis auf gelernte Vokabel|Vocab... (ID)|
|IDUser|Fremdschlüssel, Verweis auf User|Users (ID)|
|date|Das Datum des letzen Updates des Eintrags|/|
|stage|Zähler, wie oft bereits korrekt beantwortet|/|

\
Alle Anmelde- und Berechtigungsinformationen der Nutzer werden in der Tabelle Users gespeichert.
#### Users
| Spalte | Beschreibung | Referenziert |
|---|---|---|
|ID|Primärschlüssel, inkrementiert automatisch|/|
|username|Nutzername, wird bei der Anmeldung genutzt|/|
|password|per bcrypt gehasht|/|
|name|Anzeigename, kann sich von username unterscheiden|/|
|role|Berechtigungsrolle, durch Admin zu vergeben|/|

\
Klassen werden in zwei Tabellen gespeichert. Die Tabelle Classes speichert alle Grundinformationen und die Tabelle ClassMembers die Mitglieder der Klassen.

#### Classes
| Spalte | Beschreibung | Referenziert |
|---|---|---|
|ID|Primärschlüssel, inkrementiert automatisch|/|
|name|Anzeigename der Klasse|/|
|teacher|Der Lehrer, der die Klasse erstellt hat|/|
|language|Die gewählte Sprache der Klasse|/|

#### ClassMembers
| Spalte | Beschreibung | Referenziert |
|---|---|---|
|IDClass|Fremdschlüssel, Verweis auf Klasse|Classes (ID)|
|IDUser|Fremdschlüssel, Verweis auf User| Users (ID)|

### Frontend
Das Frontend der Anwendung wird mit React umgesetzt und nutzt MaterialUI zum Styling. Wird ein Teil der Seite aufgerufen, der nutzerspezifischen Inhalte enthält, wird geprüft, ob ein User angemeldet ist. Ist dies nicht der Fall, wird er Nutzer auf die Anmeldeseite weitergeleitet. Im Folgenden wird die Funktion aller zentralen Code-Elemente erklärt.

#### Basis
Die Basis des Client bildet "Client\src\index.js". Dort wird die React-Anwendung in die html-Datei eingebunden und es wird das Layout mit Navigationsleiste festgelegt. Der React-Router legt Pfade fest, welche vom Browser zu erreichen sind. Pro Pfad wird ein Element hinterlegt, das beim Aufruf des Pfads geladen wird. Der lazy-import der Seiten und Komponenten sorgt dafür, dass sie tatsächlich erst während der Laufzeit geladen werden, sobald sie angefragt wurden. Dies erhöht die Performance der Seite und beugt Fehler vor, die entstehen können, wenn kein Nutzer angemeldet ist. 

#### Vokabeltester
Über die Seite "tester" und die Komponente "vocabTester" wird die zentrale Funktion, das Lernen von Vokabeln, implementiert. Es wird eine Liste mit allen verfügbaren Sprachen generiert. Klickt der User auf eine dieser Sprachen, wird die Komponente "vocabTester" für die gewählte Sprache aufgerufen. Die Komponente lädt per API-Aufruf ein Vokabel-Objekt und gibt die Vokabel aus. Bestätigt der Benutzer seine Eingabe, wird sie mit der hinterlegten Übersetzung verglichen und der Nutzer erhält ein Feedback. War die Eingabe korrekt, wird der Lernfortschritt per API-Aufruf in der Datenbank festgehalten. 

#### Statistik
Die individuellen Statistiken werden in der Seite "chart" und über die Funktionen in "chartfunctions" eingebaut. Zur Umsetzung der Darstellung wird das Element "BarChart" der MaterialUI genutzt, welches die Daten als Array erfordert. Es gibt die Stati gelernt, angefangen und ausstehend. Sie repräsentieren, wie viele Vokabeln einer Sprache bereits gelernt wurden. Eine Vokabel gilt als angefangen, wenn sie mindestens ein Mal korrekt beantwortet wurde. Sobald eine Vokabel fünf Mal korrekt beantwortet wurde, gilt sie als gelernt. Jeder der drei Status-Arrays benötigt einen Eintrag pro Sprache. Die Werte für die Arrays werden per API-Anfrage ermittelt. 

#### Klassen
Klassen werden mit Hilfe der Seiten "classes" und "classChart" dargestellt und nutzen die Komponenten "createClassButton", "changeClassMember" und "deleteClassButton". Beim Aufruf der Seite wird eine Liste aller Klassen erzeugt, in denen der Nutzer ein Mitglied ist. Die drei Komponenten werden nur angezeigt, wenn der angemeldete Nutzer die Rolle Lehrer hat. Sobald auf eine Klasse geklickt wird, werden die Inhalte passend zu Klasse geladen. Die Klassenstatistiken funktionieren zum Großteil identisch zu den individuellen Statistiken. Der einzige Unterschied besteht darin, dass der Klassenfortschritt vom Server angefragt wird.

### Backend

## Installation / Ersteinrichtung

## Starten der Anwendung