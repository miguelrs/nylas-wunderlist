import { Map, Record, Seq } from 'immutable'

const AccountRecord = Record({
    folders: new Map(),
    list_positions: new Seq(),
    lists: new Map(),
})

/**
 * An Account represents a whole Wunderlist account.
 *
 * This is the root model, grouping all the lists, folders, ToDos, and other configurations.
 *
 * @author Miguel Rosales Sueiro
 */
class Account extends AccountRecord {
    /**
     * Merges the given Folders with the existing Folders in the Account.
     *
     * @param {Map<string, Folder>} newFolders
     * @returns {Account}
     */
    addFolders(newFolders) {
        return this.update('folders', folders => folders.mergeDeep(newFolders))
    }

    /**
     * Merges the given Lists with the existing Lists in the Account.
     *
     * @param {Map<string, List>} newLists
     * @returns {Account}
     */
    addLists(newLists) {
        return this.update('lists', lists => lists.mergeDeep(newLists))
    }

    /**
     * Returns the position for the given List.
     *
     * @param {List} list
     * @returns {Number}
     */
    getListPosition(list) {
        return this.getListPositions().keyOf(list.getId())
    }

    /**
     * Returns the sequence of list positions.
     *
     * @returns {Seq<Number>}
     */
    getListPositions() {
        return this.get('list_positions')
    }

    /**
     * Returns all the Lists in this Account.
     *
     * @returns {Map<List>}
     */
    getLists() {
        return this.get('lists')
    }

    /**
     * Returns the Lists in this Account, sorted by position.
     *
     * It always ensure the Inbox list is in first position.
     *
     * @returns {Map<List>}
     */
    getListsSorted() {
        return this.getLists().sort((listA, listB) => {
            if (listA.isInbox()) {
                return -1
            }
            if (listB.isInbox()) {
                return 1
            }
            return this.getListPosition(listA) < this.getListPosition(listB) ? -1 : 1
        })
    }

    /**
     * Overrides the sequence of list positions.
     *
     * @param {Seq<Number>} listPositions
     * @return {Account}
     */
    setListPositions(listPositions) {
        return this.set('list_positions', listPositions)
    }

}

export default Account
