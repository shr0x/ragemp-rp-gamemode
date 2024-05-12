try {
    require('./app');
    require('./noclip')
} catch (err) {
    mp.game.ui.notification.show(JSON.stringify(err));
}
