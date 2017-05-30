import Immutable from "immutable";
import Folder from "./Folder";

const AccountRecord = Immutable.Record({
    folders: new Immutable.Map(),
    list_positions: new Immutable.OrderedSet(),
    lists: new Immutable.Map(),
});

class Account extends AccountRecord {

    /**
     * @param {Map<string, Folder>} newFolders
     * @returns {Account}
     */
    addFolders(newFolders) {
        return this.update('folders', folders => folders.mergeDeep(newFolders));
    }

    /**
     * @param {Map<string, List>} newLists
     * @returns {Account}
     */
    addLists(newLists) {
        return this.update('lists', lists => lists.mergeDeep(newLists));
    }

    getListPosition(list) {
        return this.getListPositions().keySeq().indexOf(list.getId());
    }

    getListPositions() {
        return this.get('list_positions');
    }

    getLists() {
        return this.get('lists');
    }

    getListsSorted() {
        return this.getLists().sort((listA, listB) => {
            if (listA.isInbox()) {
                return -1;
            }
            if (listB.isInbox()) {
                return 1;
            }
            return this.getListPosition(listA) < this.getListPosition(listB) ? -1 : 1;
        });
    }

    /**
     * @param {Immutable.OrderedSet} listPositions
     * @return {Account}
     */
    setListPositions(listPositions) {
        return this.set('list_positions', listPositions);
    }

}

export default Account;
