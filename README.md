# Dokumentation Vokabeltester

## Zielsetzung
### Funktionsumfang
Das Ziel ist eine Anwendung, die zum Lernen von Vokabeln verschiedener Sprachen genutzt werden kann. Ein Benutzer wählt eine Sprache aus und bekommt dann zufällige Vokabeln der Sprache. Gibt der Nutzer die korrekte deutsche Übersetzung an, wird dieser Lernfortschritt gespeichert und es geht mit der nächsten Vokabel weiter. Wird eine Vokabel mehrfach korrekt beantwortet, wird sie in Zukunft seltener abgefragt und gilt nach mehreren Runden als gelernt. Sie wird dann nicht mehr erneut geprüft. \
Ein Benutzer hat die Möglichkeit, sich einen individuellen Lernfortschritt anzeigen zu lassen, welcher den Status der Vokabeln darstellt. \
Die Anwendung verfügt über ein User-Management, damit sich verschiedene Personen an ihren Nutzerkonten anmelden können. Ein Nutzerkonto kann die Rolle Schüler oder Lehrer haben. Ein Lehrer kann eine Klasse erstellen und Schüler zu dieser Klasse hinzufügen. Der Lehrer legt dann fest, welche Sprache gelernt werden soll und kann ausgewählte Vokabeln priorisieren. Dadurch wird sie bei jedem Schüler der Klasse als nächstes abgefragt. Ein Lehrer hat außerdem die Möglichkeit, die Lernfortschritte seiner Schüler einzusehen.

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