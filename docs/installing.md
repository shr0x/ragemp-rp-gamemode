# Getting started with server development

>
Code structure

```sh
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