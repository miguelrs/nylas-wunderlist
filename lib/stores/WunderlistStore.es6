/**
 * Store for the actions related with Wunderlist API.
 */
import {NylasAPI, Actions} from 'nylas-exports';
import NylasStore from 'nylas-store';
import request from 'request';
import Immutable from 'immutable';
import Account from "../model/Account";
import Folder from "../model/Folder";
import List from "../model/List";

class WunderlistStore extends NylasStore {
    constructor() {
        super();

        this.account = new Account();

        this.fetchFolders();
        this.fetchListPositions();
        this.fetchLists();
    }

    fetchFolders() {
        const uri = this.getUri('folders');

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                this.logRequestError(uri, error, response, data);
                return;
            }

            this.logRequestFinished(uri, response, data);
            this.account = this.account.addFolders(
                Immutable.Map(data.map(folderData => [folderData.id, new Folder(folderData)]))
            );
            this.trigger();
        });
    }

    fetchListPositions() {
        const uri = this.getUri('list_positions');

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                this.logRequestError(uri, error, response, data);
                return;
            }

            this.logRequestFinished(uri, response, data);
            this.account = this.account.setListPositions(
                Immutable.OrderedSet(data[0].values)
            );
            this.trigger();
        });
    }

    fetchLists() {
        const uri = this.getUri('lists');

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                this.logRequestError(uri, error, response, data);
                return;
            }

            this.logRequestFinished(uri, response, data);
            this.account = this.account.addLists(
                Immutable.Map(data.map(listData => [listData.id, new List(listData)]))
            );
            this.trigger();
        });
    }

    postToDo(toDo) {
        const uri = this.getUri('tasks');
        const postData = toDo.toJS();

        return this.makeRequest(uri, (error, response, data) => {
            if (error !== null) {
                this.logRequestError(uri, error, response, data);
                return;
            }

            this.logRequestFinished(uri, response, data);
            this.trigger();
        }, postData);
    }

    getAccount() {
        return this.account;
    }

    makeRequest = (uri, callback, body = null) => {
        this.logRequestStarted(uri, body);
        return request({
            uri: uri,
            method: body === null ? 'GET' : 'POST',
            headers: {
                'X-Client-ID': '',
                'X-Access-Token': '',
            },
            json: true,
            body: body,
        }, callback);
    };

    logRequestStarted = (uri, body) => {
        console.log(this.getLogHeader());
        console.log('Request started: ' + uri);
        console.log(body);
        console.log(this.getLogFooter());
    };

    logRequestFinished = (uri, response, body) => {
        console.log(this.getLogHeader());
        console.log('Request finished to: ' + uri);
        console.log(response);
        console.log(body);
        console.log(this.getLogFooter());
    };

    logRequestError = (uri, error, response, body) => {
        console.error(this.getLogHeader());
        console.error('Request failed to: ' + uri);
        console.error(error);
        console.error(response);
        console.error(body);
        console.error(this.getLogFooter());
    };

    getLogHeader = () => '~-~ Wunderlist log (' + (new Date()).toString() + ') -~-~-~-~-~-~-~-~-~-~';
    getLogFooter = () => '~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~-~';

    getUri = (endpoint) => 'https://a.wunderlist.com/api/v1/' + endpoint;
}

export default new WunderlistStore();
