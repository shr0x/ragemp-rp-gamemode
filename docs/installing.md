# Getting started with server development
>
**Introduction:**<br>


>
**Database setup:**<br>
This code requires you to have PostgreSQL installed on your machine, [read more](https://www.postgresql.org/).<br>
After installing posgree, connect to your database using [PGAdmin](https://www.pgadmin.org/) or [HeidiSQL](https://www.heidisql.com/) and create a new database by executing a query like:
```
CREATE DATABASE mydb;
```
After creating a database successfully, head back to the server files and edit .env by describing the database connection details there.
Once you're setup with that, simply start the server, and the TypeORM will start creating the required database tables on its own (see Database.module.ts for deeper info)
>
**Code structure**

```sh
+---client_packages #contains server & client source code
|   +---package2 # this folder contains the build code of frontend
|   +---app.js # the output after building/watching client-side code
|   +---index.js # a default index file to load app.js or other files within this folder
+---backend #contains server & client source code
|   +---client #client side source code
|   |   +---assets
|   |   +---classes
|   |   +---clientevents
|   |   \---modules
|   \---server #server side source code
|       +---@types
|       +---classes
|       +---commands
|       +---database
|       |   \---entity
|       +---modules
|       +---prototype
|       +---serverevents
|       \---utils
+---frontend #contains frontend (CEF) source code
|   +---public
|   \---src
|       +---assets #holds frontend assets such as images/videos
|       +---events # holds frontend events that can be called from server/client
|       +---pages # holds pages which we display to the players in game
|       +---stores # holds stores which we use as temporary storage for as long as the player is in game
|       +---styles # contains styling code
|       \---utils # contains utils and code helpers
\---shared # contains shared data across backend and frontend
```
>
**Starting the server in development mode:**<br>
Client side:<br>
![.vid](./gifs/client-watch.gif)<br>
Server side<br>
![.vid](./gifs/server-watch.gif)

>
**Adding your first command:**<br>
>
**Creating your first page:**<br>
>
**Using bridge to call CEF events directly from the server and vice versa:**<br>