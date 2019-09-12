# Async IndexedDB
When I made this, I was no stranger to JavaScript or working with databases - including NoSQL - but had no experience with IndexedDB Web API, specifically. So, I used this to learn it. I hope you enjoy my experiment.

## Idea #1 - Promises
I noticed quickly that the Request objects could be easily replaced with Promises, so I created a list of decorator classes I dubbed "AsyncIDB". The core change I added was the use of Async

## Idea #2 - Database Versioning
After thinking deeper about the versioning process, I figured it would be useful to create schema migrations and seed the data, just like you might do with an API/server-side logic.

## Idea #3 - Push-based/Reactive Development
IDBCursors really threw me for a loop (pun 100% intended). I knew Observables were push-based but figured I could still accomplish the same results with an async generator function. That is, until I found callback-to-async-iterator.

## How to run
1. Manually install Node or use the included Dockerfile (see below)
2. `npm install`
3. `npm start`

### Docker Setup (optional)
1. `docker build -t async-indexeddb .`
2. `docker run --rm -it -v [cd]:/app -p 3000:3000 async-indexeddb`, replacing `[cd]` depending on your environment:
  - **CMD**: `%CD%`
  - **PowerShell**: `${PWD}`
  - **Linux/MacOS Terminal**: `$(pwd)`
