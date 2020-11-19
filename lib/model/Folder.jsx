import { Record, Set } from 'immutable'

const FolderRecord = Record({
    id: null,
    list_ids: new Set(),
    title: 'Folder',
})

/**
 * A Folder is a group of lists.
 *
 * @author Miguel Rosales Sueiro
 */
class Folder extends FolderRecord {

    /**
     * Returns the unique ID of the List.
     *
     * @returns {number}
     */
    getId() {
        return this.get('id')
    }

    /**
     * Returns the
     *
     * @returns {Set.<number>}
     */
    getListIds() {
        return this.get('list_ids')
    }

    /**
     * Returns the user-defined title for the List.
     *
     * @returns {string}
     */
    getTitle() {
        return this.get('title')
    }

    /**
     * Returns whether this Folder contains the list with the given ID.
     *
     * @param {number} listId
     * @returns {boolean}
     */
    includesList(listId) {
        return this.getListIds().includes(listId)
    }
}

export default Folder
