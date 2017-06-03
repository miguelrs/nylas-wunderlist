import Immutable from 'immutable'

const FolderRecord = Immutable.Record({
    id: null,
    title: '',
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
     * @returns {Number}
     */
    getId()
    {
        return this.get('id')
    }

    /**
     * Returns the user-defined title for the List.
     *
     * @returns {String}
     */
    getTitle()
    {
        return this.get('title')
    }

}

export default Folder
