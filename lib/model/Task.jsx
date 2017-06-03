import { Record } from 'immutable'

const TaskRecord = Record({
    'due_date': '',
    'id': null,
    'list_id': null,
    'title': '',
    'starred': false,
})

/**
 * A Task represents a To-Do in Wunderlist.
 *
 * @author Miguel Rosales Sueiro
 */
class Task extends TaskRecord {
    /**
     * Returns the unique ID of the Task.
     *
     * @returns {Number}
     */
    getId() {
        return this.get('id')
    }

    /**
     * Returns the user-defined title for the Task.
     *
     * @returns {String}
     */
    getTitle() {
        return this.get('title')
    }
}

export default Task
