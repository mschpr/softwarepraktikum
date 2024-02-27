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