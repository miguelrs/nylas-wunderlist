const WunderlistStore = require('./wunderlist-store');

class WunderlistStoreManager {
    constructor() {
        console.log('~-~~-~~-~~-~~-~ STORE MANAGER CONSTRUCTOR ~-~~-~~-~~-~~-~');
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
