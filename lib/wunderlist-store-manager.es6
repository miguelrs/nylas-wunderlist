const WunderlistStore = require('./wunderlist-store');

class WunderlistStoreManager {
    constructor() {
        this.threads = {};
    }

    getStoreForThread(thread) {
        const id = thread.id;
        if (this.threads[id] === undefined) {
            this.threads[id] = new WunderlistStore(thread);
        }
        return this.threads[id];
    }
}

module.exports = new WunderlistStoreManager();
