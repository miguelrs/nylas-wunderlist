import { Map, Seq } from 'immutable'
import NylasStore from 'nylas-store'
import { Account, Folder, List } from '../model'
import { Logger, Requester } from '../services'
import WunderlistAuthStore from './WunderlistAuthStore'

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistStore extends NylasStore {

    /**
     * WunderlistStore constructor.
     */
    constructor() {
        super()

        this.account = new Account()

        this.listenTo(WunderlistAuthStore, this._onAuthorizationChanged)
    }

    /**
     * Fetches Folders from Wunderlist API.
     *
     * @returns {request}
     */
    fetchFolders() {
        const uri = this.getUri('folders')

        return Requester.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.account = this.account.addFolders(
                Map(data.map(folderData => [folderData.id, new Folder(folderData)])),
            )
            this.trigger()
        })
    }

    /**
     * Fetches List positions from Wunderlist API.
     *
     * @returns {request}
     */
    fetchListPositions() {
        const uri = this.getUri('list_positions')

        return Requester.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.account = this.account.setListPositions(
                Seq(data[0].values),
            )
            this.trigger()
        })
    }

    /**
     * Fetches Lists from Wunderlist API.
     *
     * @returns {request}
     */
    fetchLists() {
        const uri = this.getUri('lists')

        return Requester.makeRequest(uri, (error, response, data) => {
            if (error !== null || !Array.isArray(data)) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.account = this.account.addLists(
                Map(data.map(listData => [listData.id, new List(listData)])),
            )
            this.trigger()
        })
    }

    /**
     * Posts a Task to Wunderlist API.
     *
     * @returns {request}
     */
    postTask(task) {
        const uri = this.getUri('tasks')
        const postData = task.toJS()

        return Requester.makeRequest(uri, (error, response, data) => {
            if (error !== null) {
                Logger.logRequestFailed(uri, error, response, data)
                return
            }

            Logger.logRequestSucceed(uri, response, data)
            this.trigger()
        }, postData)
    }

    /**
     * Returns the active account.
     *
     * @returns {Account}
     */
    getAccount() {
        return this.account
    }

    /**
     *
     * @param {boolean} authorized
     */
    _onAuthorizationChanged = (authorized) => {
        if (authorized) {
            this.fetchFolders()
            this.fetchListPositions()
            this.fetchLists()
        }
    }

    getUri = (endpoint) => 'https://a.wunderlist.com/api/v1/' + endpoint
}

export default new WunderlistStore()
