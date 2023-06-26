# Docker Compose für Battlesprout

## Voraussetzungen

Um unser Docker Compose Script zu verwenden, müssen Docker und Docker Compose auf dem System installiert sein. Hier sind die offiziellen Anleitungen für die Installation auf verschiedenen Betriebssystemen:

### Linux
- Docker: [Docker Installationsanleitung für Linux](https://docs.docker.com/engine/install/)
- Docker Compose: [Docker Compose Installationsanleitung für Linux](https://docs.docker.com/compose/install/)

### Mac
- Docker Desktop (enthält Docker Compose): [Docker Desktop Installationsanleitung für Mac](https://docs.docker.com/desktop/mac/install/)

### Windows
- Docker Desktop (enthält Docker Compose): [Docker Desktop Installationsanleitung für Windows](https://docs.docker.com/desktop/windows/install/)

## Nutzung

Sobald Docker und Docker Compose installiert sind, folge diesen Schritten, um die Services zu starten:

1. Öffne ein Terminalfenster und navigieren Sie in das Verzeichnis, in dem sich die `docker-compose.yml` Datei befindet.

2. Führe Sie den folgenden Befehl aus, um die Docker-Container zu erstellen und zu starten:
     
```
docker-compose up -d
 ```

3. Das Frontend ist unter [http://localhost:8080](http://localhost:8080) erreichbar. Das Backend läuft unter den Ports 3000 (Express) und 4000 (SocketIO). Die Mongodb wurde im Docker Compose Network Service gestartet und läuft unter mongodb:27017.#

4. Um die Docker-Container zu stoppen, führe den folgenden Befehl aus:

``` 
docker-compose down
```

## Hinweise

Es wurde ein Volume für die MongoDB Datenbank erstellt, um die Daten persistent zu speichern. Wenn Sie die Datenbank löschen möchten, müssen Sie das Volume löschen. Führen Sie dazu den folgenden Befehl aus:

```
docker volume rm sys-src_mongodb_volume
```