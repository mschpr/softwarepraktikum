# ✨WordWise✨

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
Das Frontend der Anwendung wird mit React umgesetzt und nutzt MaterialUI zum Styling. Diese Entscheidung wurde getroffen, denn React und MaterialUI waren aus der Vorlesung bereits bekannt. Wird ein Teil der Seite aufgerufen, der nutzerspezifischen Inhalte enthält, wird geprüft, ob ein User angemeldet ist. Ist dies nicht der Fall, wird er Nutzer auf die Anmeldeseite weitergeleitet. Im Folgenden wird die Funktion aller zentralen Code-Elemente erklärt.

#### Basis
Die Basis des Client bildet "Client\src\index.js". Dort wird die React-Anwendung in die html-Datei eingebunden und es wird das Layout mit Navigationsleiste festgelegt. Der React-Router legt Pfade fest, welche vom Browser zu erreichen sind. Pro Pfad wird ein Element hinterlegt, das beim Aufruf des Pfads geladen wird. Der lazy-import der Seiten und Komponenten sorgt dafür, dass sie tatsächlich erst während der Laufzeit geladen werden, sobald sie angefragt wurden. Dies erhöht die Performance der Seite und beugt Fehler vor, die entstehen können, wenn kein Nutzer angemeldet ist. 

#### Vokabeltester
Über die Seite "tester" und die Komponente "vocabTester" wird die zentrale Funktion, das Lernen von Vokabeln, implementiert. Es wird eine Liste mit allen verfügbaren Sprachen generiert. Klickt der User auf eine dieser Sprachen, wird die Komponente "vocabTester" für die gewählte Sprache aufgerufen. Die Komponente lädt per API-Aufruf ein Vokabel-Objekt und gibt die Vokabel aus. Bestätigt der Benutzer seine Eingabe, wird sie mit der hinterlegten Übersetzung verglichen und der Nutzer erhält ein Feedback. War die Eingabe korrekt, wird der Lernfortschritt per API-Aufruf in der Datenbank festgehalten. 

#### Statistik
Die individuellen Statistiken werden in der Seite "chart" und über die Funktionen in "chartfunctions" eingebaut. Zur Umsetzung der Darstellung wird das Element "BarChart" der MaterialUI genutzt, welches die Daten als Array erfordert. Es gibt die Stati gelernt, angefangen und ausstehend. Sie repräsentieren, wie viele Vokabeln einer Sprache bereits gelernt wurden. Eine Vokabel gilt als angefangen, wenn sie mindestens ein Mal korrekt beantwortet wurde. Sobald eine Vokabel fünf Mal korrekt beantwortet wurde, gilt sie als gelernt. Jeder der drei Status-Arrays benötigt einen Eintrag pro Sprache. Die Werte für die Arrays werden per API-Anfrage ermittelt. 

#### Klassen
Klassen werden mit Hilfe der Seiten "classes" und "classChart" dargestellt und nutzen die Komponenten "createClassButton", "changeClassMember" und "deleteClassButton". Beim Aufruf der Seite wird eine Liste aller Klassen erzeugt, in denen der Nutzer ein Mitglied ist. Die drei Komponenten werden nur angezeigt, wenn der angemeldete Nutzer die Rolle Lehrer hat. Sobald auf eine Klasse geklickt wird, werden die Inhalte passend zu Klasse geladen. Die Klassenstatistiken funktionieren zum Großteil identisch zu den individuellen Statistiken. Der einzige Unterschied besteht darin, dass der Klassenfortschritt vom Server angefragt wird.

### Backend

#### Anbindung der Datenbank
Die Verbindung zur Datenbank wird über das Toolkit Prisma aufgebaut. Es wurde sich für Prisma entschieden, da das offizielle Tool zur Anbindung einer PostgreSQL-Datenbank pg erheblich komplexer ist. Prisma legt bei der Einrichtung ein Schema der Datenbank an, in dem die Struktur aller Tabellen festgehalten wird. Die Abfragen auf die Datenbank sind in "src/queries" festgehalten und folgen dem Aufbau einer normalen SQL-Query. Die Abfragen werden in verschiedene Funktionen aufgeteilt und lassen sich so einzeln exportieren und aufrufen. 

#### Basis
Die Grundlage des Servers liefert Express. Es wird genutzt, um eine API zur Verfügung zu stellen, welche vom Client aufgerufen wird. Dies geschieht in der Datei "index". Um eine Struktur zu schaffen, wurden die Routen in zwei Pfade unterteilt. In "routerSQL" und "routerAuth" lassen sie sich die Aufrufe zur Datenbank und zur Authentifizierung finden. Am Ende beider Router findet sich ein default-Fall, der den Code 404 zurückgibt, wenn der HTTP-Aufruf ungültig ist.

#### Authentifizierung
Die Authentifizierung erfolgt per Passport mit einer lokalen Authentifizierungsmethode. Passport ist eine Middleware zur Authentifizierung, welche unter anderem auch OAuth bietet. Es wurde sich für die lokale Authentifizierungsstrategie entschieden, damit die Nutzerdaten und Berechtigungen lokal verwaltet werden können. Diese lokale Strategie ist in "index" definiert und wird im "routerAuth" aufgerufen. \
Sind die eingegebenen Nutzerdaten korrekt, wird dem User per cookieSession ein Cookie erstellt. Dies geschieht in "index". Wann immer jetzt eine Authentifizierung notwendig ist, wird der Cookie ausgelesen. Um Cookies im Browser korrekt nutzen zu können, wird cors verwendet. Diese Vorgabe ist verpflichtend und ermöglicht dem Server eine Einsicht in den Ursprung der Anfrage. \
Bei der Registrierung eines Benutzers wird im "routerAuth" ein User-Model erstellt, welches gewissen Constraints unterliegt. In diesen Constraints, die unter "constaints" definiert sind, ist beispielsweise eine Minimallänge des Passworts festgelegt.

## Installation / Ersteinrichtung
### Datenbank
Die Datenbank wird wie folgt eingerichtet: \
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
````SQL
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
````
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
Befüllung der Tabellen mit Werten: \
Sollte es zu einer Fehlermeldung kommen, muss gegebenenfalls die Codepage angepasst werden. Unter Windows geht das in der psql CLI mit dem folgenden Command:
````bash
\\!chcp 1252
````
````SQL
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
````
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
### Packages
Die Installation der benötigten Packages für Server und Client erfolgt im jeweiligen src Verzeichnis mit dem Befehl npm install.
````bash
cd ./Server/src
npm install
````
````bash
cd ./Client/src
npm install
````
\
Zur Erstellung der Cookies werden zwei Schlüssel benötigt. Diese müssen unter "Server/.env" abgelegt werden und haben die Bezeichner "SECRET_OLD" und "SECRET_NEW". Beispielwerte sehen aus wie folgt: 
````JavaScript
SECRET_OLD="geheim"
SECRET_NEW="geheim"
````

### Prisma
Prisma baut seine Verbindung zur Datenbank über eine Database-URL auf. Diese URL muss unter "Server/.env" eingetragen werden und hat folgende Syntax:
````JavaScript
DATABASE_URL="postgresql://admin:sicher@localhost:5432/vokabeltester"
````
\
Als nächstes wird der Prisma Client eingerichtet. Dieser greift auf das bestehende Schema zu und wird mit dem folgenden Befehl erstellt. Der Befehl muss im Verzeichnis "/Server" ausgeführt werden. 
````bash
npx prisma generate
````
## Starten der Anwendung
Zum starten der Anwendung werden der SQL-Server, eine Instanz des Clients und eine Instanz des Server benötigt. Unter Windows startet der SQL-Server bei der Anmeldung des Benutzers automatisch, die Verfügbarkeit lässt sich aber mit der CLI psql testen. Um den Client und den Server zu starten, kann im jeweiligen src Verzeichnis der Befehl npm start genutzt werden. 
````bash
cd ./Server/src
npm start
````
````bash
cd ./Client/src
npm start
````