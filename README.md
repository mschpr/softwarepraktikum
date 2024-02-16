# Dokumentation Vokabeltester

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
CREATE TABLE public."VokabelEnglisch"
(
    "ID" serial NOT NULL,
    "Vokabel" character varying NOT NULL,
    "Uebersetzung" character varying NOT NULL,
    PRIMARY KEY ("ID")
);
```
```SQL
CREATE TABLE public."LernfortschrittEnglisch"
(
    "ID" serial NOT NULL,
    "IDVokabel" integer,
    "Datum" date,
    "Stufe" integer,
    PRIMARY KEY ("ID")
);
```
\
Befüllung der Tabellen mit Werten:
```SQL
INSERT INTO "VokabelEnglisch" ("Vokabel", "Uebersetzung") VALUES
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

```

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
