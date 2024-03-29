# Kandidatarbete: Videosamtal för äldre
Här finns kod för den prototyp som utvecklades av projektgrupp 41 i samband med kandidatarbetet *Videosamtal för äldre* på Chalmers Tekniska Högskola och Göteborgs Universitet.

## Struktur
Projektfilerna är uppdelade i två delar: klient och server.

### Klient
Byggs upp av bl.a. React, web sockets (socket.io) och WebRTC.

### Server
Byggs med hjälp av bl.a. Node.js och web sockets (socket.io).


## Utvecklingsmiljö
### Förutsättningar
Se till att ha följande mjukvara installerad och fungerande innan nästkommande steg:
* [NodeJS](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)

Om du använder terminalen för att köra kommandon kan du behöva lägga till sökvägarna bland dina miljövariabler (Windows).

### Första gången
1. Klona repot.
2. Navigera till klientmappen ``client/`` och kör kommandot ```npm install```.
3. Gör samma sak för servermappen ``server/`` .
4. Skapa en fil i servermappen och namnge denna: ``.env``. I denna fil, definiera variabeln för databasens URI genom att skriva ``DB_URI=<Databasens URI>`` på en ny rad.
5. Verifiera att projektet fungerar som det ska genom att sedan köra kommandot ```npm start``` i respektive mapp. I vissa fall kan detta kan ta sin tid, så ha tålamod.


## React
* ``public/index.html`` är den enda HTML-fil vi kommer ha i appen. Man ändrar oftast inget i denna fil utöver innehållet i ``<head>`` i särskilda fall, detta eftersom React hanterar hela vårt UI.

* Ursprungspunkten för React är ``src/index.tsx`` men vi utgår oftast från ``src/App.tsx`` för själva webb-appen.

Tutorials för React går att hitta [här](https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3).

## MongoDB
Vi hostar vår databas på [MongoDB Atlas](https://cloud.mongodb.com/) (gratis hosting för databaser mindre än 500 mb). För att man ska kunna ansluta till denna måste varje utvecklares IP läggas till i registret - säg till André utifall detta strular eller om det är första gången du ansluter.

För att kunna ansluta måste du ha definierat variabeln ``DB_URI`` i filen ``.env`` i roten till servermappen ``server/``. (googla på .env-filer om du är osäker på vad detta innebär). Denna fil innehåller miljövariabler för serverkoden och måste skapas för varje utvecklare. Anledningen till detta är att lösenordet till databasen står med i denna fil, vilket innebär att vi gärna undviker att pusha upp denna till GitHub.

Tutorials för MongoDB går att hitta [här](https://www.youtube.com/watch?v=bxsemcrY4gQ).

## För att arkivera Git-brancher (via en terminal) som inte längre används
```
 git tag archive/<branchname> <branchname>
 git branch -D <branchname>
 git branch -d -r origin/<branchname>
 git push --tags
 git push origin :<branchname>
```