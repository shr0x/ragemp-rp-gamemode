try {
    require('./app');
} catch (err) {
    mp.console.logError(JSON.stringify(err));
}
