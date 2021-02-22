# Kandidatarbete: Videosamtal för äldre
Här finns kod för den prototyp som utvecklades av projektgrupp 41 i samband med kandidatarbetet *Videosamtal för äldre* på Chalmers Tekniska Högskola och Göteborgs Universitet.

## Struktur
Projektfilerna är uppdelade i två delar: klient och server.

### Klient
Byggs med hjälp av bl.a. React och web sockets (socket.io).

### Server
Byggs med hjälp av Node.js.


## Utvecklingsmiljö
### Förutsättningar
Se till att ha följande mjukvara installerad och fungerande innan nästkommande steg:
* [NodeJS](https://nodejs.org/en/)
* [Git](https://git-scm.com/downloads)

Om du använder terminalen för att köra kommandon kan du behöva lägga till sökvägarna bland dina miljövariabler (Windows).

### Första gången
1. Klona repot.
2. Navigera till klientmappen ``client`` och kör kommandot ```npm install```.
3. Verifiera att projektet fungerar som det ska genom att sedan köra kommandot ```npm start``` i samma mapp. Kan vara aningen långsamt så ha tålamod.

Tutorials för React går att hitta [här](https://www.youtube.com/playlist?list=PLC3y8-rFHvwgg3vaYJgHGnModB54rxOk3).


## Några grejer om React
* ``public/index.html`` är den enda HTML-fil vi kommer ha i appen. Man ändrar oftast inget i denna fil utöver innehållet i ``<head>`` i särskilda fall, detta eftersom React hanterar hela vårt UI.

* Ursprungspunkten för React är ``src/index.tsx`` men vi utgår oftast från ``src/App.tsx`` för själva webb-appen.