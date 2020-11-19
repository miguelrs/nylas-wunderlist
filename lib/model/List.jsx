import Immutable from 'immutable'

const ListRecord = Immutable.Record({
    id: null,
    list_type: 'list',
    title: '',
})

/**
 * A List represents a List in Wunderlist.
 *
 * It is just a group of ToDos, with a title and a particular position.
 *
 * @author Miguel Rosales Sueiro
 */
class List extends ListRecord
{
    /**
     * Returns the unique ID of the List.
     *
     * @returns {number}
     */
    getId() {
        return this.get('id')
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
     * Whether this List is the Inbox List.
     *
     * @returns {boolean}
     */
    isInbox()
    {
        return this.get('list_type') === 'inbox'
    }
}

export default List
