import {NylasAPI, Actions} from 'nylas-exports';
import NylasStore from 'nylas-store';
import request from 'request';
import Immutable from 'immutable';

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistStore extends NylasStore {
    constructor() {
        super();

        this.folders = new Immutable.Map();
        this.listPositions = new Immutable.OrderedSet();
        this.lists = new Immutable.Map();
        this.loading = false;
        this.toDos = new Immutable.OrderedSet();

        this.fetchFolders();
        this.fetchListPositions();
        this.fetchLists();

        // This is to test new lists get appended:
        // setTimeout(() => {
        //     this.lists = this.lists.set(154090000, Immutable.Map(Immutable.fromJS({
        //         id: 154090000,
        //         list_type: "list",
        //         title: "Async Fetched List",
        //         type: "list",
        //     })));
        //     this.listPositions = this.listPositions.add(154090000);
        //     this.trigger();
        // }, 10000);
    }

    fetchFolders() {
        return this.makeGetRequest('https://a.wunderlist.com/api/v1/folders', (err, resp, data) => {
            console.log('Fetched FOLDERS:');
            console.log(data);
            if (Array.isArray(data)) {
                this.folders = Immutable.Map(data.map((folder, index) => ([folder.id, Immutable.fromJS(folder)])));
                this.trigger();
            } else {
                console.error('WUNDERLIST ERROR: unexpected fetched FOLDERS');
            }
        });
    }

    fetchListPositions() {
        return this.makeGetRequest('https://a.wunderlist.com/api/v1/list_positions', (err, resp, data) => {
            console.log('Fetched LIST POSITIONS:');
            console.log(data);
            if (Array.isArray(data)) {
                this.listPositions = Immutable.OrderedSet(data[0].values);
                this.trigger();
            } else {
                console.error('WUNDERLIST ERROR: unexpected fetched LIST POSITIONS');
            }
        });
    }

    fetchLists() {
        return this.makeGetRequest('https://a.wunderlist.com/api/v1/lists', (err, resp, data) => {
            console.log('Fetched LISTS:');
            console.log(data);
            if (Array.isArray(data)) {
                this.lists = Immutable.Map(data.map((list, index) => ([list.id, Immutable.fromJS(list)])));
                this.trigger();
            } else {
                console.error('WUNDERLIST ERROR: unexpected fetched LISTS');
            }
        });
    }

    postToDo(toDo) {
        this.loading = true;
        this.trigger();

        return this.makePostRequest('https://a.wunderlist.com/api/v1/tasks', (err, resp, data) => {
            console.log('Posted TODO:');
            console.log(data);

            this.loading = false;
            this.toDos = this.toDos.add(data);
            this.trigger();
        }, toDo);
    }

    isLoading() {
        return this.loading;
    }

    getCreatedToDo() {
        return this.createdToDo;
    }

    getFolderByList(list) {
        return this.folders.find((folder) => {
            let listId = list.get('id');
            return folder.get('list_ids').contains(listId);
        });
    }

    getFolders() {
        return this.folders;
    }

    getListByType(listType) {
        return this.lists.find((list) => {
            return list.get('list_type') === listType;
        });
    }

    getListPositions() {
        return this.listPositions;
    }

    getLists() {
        return this.lists;
    }

    getListsSorted() {
        return this.listPositions.map((listId) => {
            return this.lists.get(listId);
        });
    }

    getAllFoldersAndListsSorted() {
        let menuItems = Immutable.OrderedSet();
        let lastUsedFolder = null;

        let inboxList = this.getListByType('inbox');
        menuItems = menuItems.add(inboxList.set('menu_item_type', 'inbox'));

        for (let list of this.getListsSorted()) {
            let currentFolder = this.getFolderByList(list);
            if (currentFolder !== undefined && (lastUsedFolder === null || lastUsedFolder.get('id') !== currentFolder.get('id'))) {
                menuItems = menuItems.add(currentFolder.set('menu_item_type', 'folder'));
            }
            if (list.get('list_type') !== 'inbox') {
                menuItems = menuItems.add(list.set('menu_item_type', 'list'));
            }
        }

        return menuItems;
    };

    makeGetRequest = (uri, callback) => {
        return request({
            uri: uri,
            method: 'GET',
            headers: {
                'X-Client-ID': '333010247bc2f5e520da',
                'X-Access-Token': 'fe5678ea4b15fe262f2aabe43462f143429439355281170a8fbfccf2dc9b',
            },
            json: true
        }, callback);
    };

    makePostRequest = (uri, callback, data) => {
        return request({
            uri: uri,
            method: 'POST',
            headers: {
                'X-Client-ID': '333010247bc2f5e520da',
                'X-Access-Token': 'fe5678ea4b15fe262f2aabe43462f143429439355281170a8fbfccf2dc9b',
            },
            json: true,
            body: data,
        }, callback);
    };

    getToDos() {
        return this.toDos;
    }
}

export default new WunderlistStore();
