import { Seq, Set } from 'immutable'
import NylasStore from 'nylas-store'
import WunderlistActions from '../actions'
import { Account, Folder, List } from '../model'
import { Requester } from '../services'
import WunderlistAuthStore from './WunderlistAuthStore'

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistApiStore extends NylasStore {

    /**
     * WunderlistApiStore constructor.
     */
    constructor() {
        super()

        this.account = new Account()

        this.listenTo(WunderlistAuthStore, this._onAuthorizationChanged)
        this.listenTo(WunderlistActions.createTask, this._postTask)
    }

    /**
     * Returns the active account.
     *
     * @returns {Account}
     */
    getAccount = () => {
        return this.account
    }

    /**
     * Returns the Wunderlist URL for the given endpoint.
     *
     * @param {string} endpoint
     */
    _buildUrl = (endpoint) => NylasEnv.config.get('nylas-wunderlist.wunderlistApiUrl') + endpoint

    /**
     * Fetches Folders from Wunderlist API.
     *
     * @returns {request}
     */
    _fetchFolders = () => {
        Requester.get(
            this._buildUrl('folders'),
            data => {
                const foldersArray = data.map(folderData => new Folder(folderData))
                this.account = this.account.addFolders(new Set(foldersArray))
                this.trigger()
            },
            data => Array.isArray(data),
        )
    }

    /**
     * Fetches List positions from Wunderlist API.
     *
     * @returns {request}
     */
    _fetchListPositions = () => {
        Requester.get(
            this._buildUrl('list_positions'),
            data => {
                this.account = this.account.setListPositions(new Seq(data[0].values))
                this.trigger()
            },
            data => Array.isArray(data),
        )
    }

    /**
     * Fetches Lists from Wunderlist API.
     *
     * @returns {request}
     */
    _fetchLists = () => {
        Requester.get(
            this._buildUrl('lists'),
            data => {
                this.account = this.account.addLists(
                    new Set(data.map(listData => new List(listData))),
                )
                this.trigger()
            },
            data => Array.isArray(data),
        )
    }

    /**
     *
     * @param {boolean} authorized
     */
    _onAuthorizationChanged = (authorized) => {
        if (authorized) {
            this._fetchFolders()
            this._fetchListPositions()
            this._fetchLists()
        }
    }

    /**
     * Posts a Task to Wunderlist API.
     *
     * @returns {request}
     */
    _postTask = (task) => {
        Requester.post(
            this._buildUrl('tasks'),
            task.toJS(),
            (data) => this.trigger(),
        )
    }
}

export default new WunderlistApiStore()
