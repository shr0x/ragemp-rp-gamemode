# RAEG ROLEPLAY VERSION 0.0.8 (th)

This is a newly version mainly updated to give a better developer experience, extending the gamemode API and adding further game feature calling in a easier way.
The whole purpose of this update is to make our lovely devs code various system without having to go back and forth from client to server.

## ✨ Player Tasks
Introduces a new system to execute GTA player tasks from the server.

- Added support for 100+ GTA task natives
- Manual task wrappers with a dynamic typed system
- Improved parameter naming using GTA native documentation
- Introduced `player.task.*` API

### Improvements
- Easier to maintain and extend
- Reduced code duplication
- Better developer experience

### Example
```ts
const performArrestTask = (playerOne: PlayerMp, playerTwo: PlayerMp) => {
    if (!mp.players.exists(playerOne) || !mp.players.exists(playerTwo)) {
        return;
    }

    if (!playerOne.isStreamed(playerTwo) || !playerTwo.isStreamed(playerOne)) {
        return;
    }
    playerOne.task.taskArrest(playerTwo.id);
}

performArrestTask(mp.players.at(0), mp.players.at(1));
```