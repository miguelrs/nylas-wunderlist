import electronOauth2 from 'electron-oauth2'
import NylasStore from 'nylas-store'
import WunderlistActions from '../actions'
import { Logger, Requester } from '../services'

const config = {
    clientId: '6bea596d4278c3d9896b',
    authorizationUrl: 'https://www.wunderlist.com/oauth/authorize',
    redirectUri: 'https://github.com/miguelrs/nylas-wunderlist',
    useBasicAuthorizationHeader: false //???
}

// ???
const windowParams = {
    alwaysOnTop: true,
    autoHideMenuBar: true,
    webPreferences: {
        nodeIntegration: false,
    },
}

const myApiOauth = electronOauth2(config, windowParams)

/**
 * Store for the actions related with Wunderlist API.
 */
class WunderlistAuthStore extends NylasStore {

    /**
     * WunderlistStore constructor.
     */
    constructor() {
        super()

        this.token = localStorage.getItem('nylas-wunderlist.access_token')

        this.listenTo(WunderlistActions.authorize, this._authorize)

        // Set timeout to give the other store time to start listening. TODO: Improve this.
        setTimeout(() => {
            this.trigger(this.isAuthorized())
            this._refresh();
        }, 1000)
    }

    isAuthorized = () => this.token !== null

    /**
     * Ensures there is an access token and runs the callback afterwards.
     */
    _authorize = () => {
        if (this.authorized) {
            return
        }

        myApiOauth.getAuthorizationCode().then(code => {
            Logger.logRequestSucceed(config.authorizationUrl, {}, {code: code})

            const uri = 'https://nylas-wunderlist.herokuapp.com/authenticate/' + code
            Requester.makeRequest(uri, (error, response, data) => {
                if (error !== null || !data.access_token) {
                    Logger.logRequestFailed(uri, error, response, data)
                    return
                }

                Logger.logRequestSucceed(uri, response, data)

                this.token = data.access_token
                localStorage.setItem('nylas-wunderlist.access_token', this.token)

                this.trigger(this.isAuthorized())
            })
        }).catch(error => {
            Logger.logRequestFailed(config.authorizationUrl, error)
        })
    }

    /**
     * Triggers every 10 minutes so data is refreshed.
     */
    _refresh = () => {
        setTimeout(() => {
            this.trigger(this.isAuthorized())
            this._refresh();
        }, 600000)
    }
}

export default new WunderlistAuthStore()
