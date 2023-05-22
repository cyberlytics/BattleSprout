## Eine MongoDB Datenbank in Docker starten

### Vorbedingungen
Bitte installiert als erstes Docker auf eurem System.
* [Docker for Windows](https://docs.docker.com/docker-for-windows/install/)
* [Docker for Mac](https://docs.docker.com/docker-for-mac/install/)
* [Docker for Linux](https://docs.docker.com/install/linux/docker-ce/ubuntu/)



### Docker Volume erstellen

Danach könnt ihr mit folgendem Befehl ein Docker Volumen erstellen.

```
docker volume create mongoDB_volume
```

Dieses Docker Volumen ist eine Art mobiler Speicher und wird später von der Datenbank benutzt
um die Daten persitent zu speichern.


### Docker Image erstellen

Bitte verischert euch, dass ihr im Ordner `open\sys-src\infrastructure\mongodb` seid.
```
docker build -t mongoDB .
```
#### DEN PUNKT AM ENDE NICHT VERGESSEN

Dieser Befehl erstellt ein Docker Image, also eine Art Vorlage für einen Docker Container.
Das ganze muss nur einmal gemacht werden, da wir an der Datenbank nichts verändern.


### Docker Container erstellen und starten

Mit diesem Command erstellt ihr einen Docker Container und startet ihn direkt.
Jetzt könnt ihr über **localhost:27017** auf die Datenbank zugreifen.

```
docker run -d -p 27017:27017 -v mongoDB_volume:/data/db --name mongoDB_container mongoDB
```



