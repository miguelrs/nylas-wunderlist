import Immutable from "immutable";

const ToDoRecord = Immutable.Record({
    'due_date': '',
    'id': null,
    'list_id': null,
    'title': '',
    'starred': false,
});

class ToDo extends ToDoRecord {

    getId() {
        return this.get('id');
    }

    getTitle() {
        return this.get('title');
    }

    isInbox() {
        return this.get('list_type') === 'inbox';
    }
}

export default ToDo;
