import Immutable from "immutable";

const ListRecord = Immutable.Record({
    id: null,
    list_type: 'list',
    title: 'List',
});

class List extends ListRecord {

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

export default List;
