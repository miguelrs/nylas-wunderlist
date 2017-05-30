import Immutable from "immutable";

const FolderRecord = Immutable.Record({
    id: null,
    title: '',
    list_ids: new Immutable.Set(),
});

class Folder extends FolderRecord {

    getId() {
        return this.get('id');
    }

    getTitle() {
        return this.get('title');
    }
}

export default Folder;
