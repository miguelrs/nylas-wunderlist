import { ComponentRegistry } from 'nylas-exports'
import WunderlistToolbarButton from './containers/WunderlistToolbarButton'

module.exports = {
    config: {
        oauthConfig: {
            title: 'OAuth config properties',
            description: 'Properties containing the details for the OAuth process (see electronOauth2 library)',
            type: 'object',
            properties: {
                clientId: {
                    title: 'OAuth Client ID',
                    description: 'The Client ID of Nylas Wunderlist app',
                    type: 'string',
                    default: 'b7fd8757a5c1faeecc78',
                },
                authorizationUrl: {
                    title: 'OAuth Authorization URL',
                    description: 'The URL to get the OAuth temporary code',
                    type: 'string',
                    default: 'https://www.wunderlist.com/oauth/authorize',
                },
                redirectUri: {
                    title: 'OAuth Redirect URL',
                    description: 'The redirect URL after the OAuth process',
                    type: 'string',
                    default: 'https://github.com/miguelrs/nylas-wunderlist',
                },
                tokenUrl: {
                    title: 'OAuth Token URL',
                    description: 'The URL to get the OAuth access token (using gatekeeper deployed on Heroku)',
                    type: 'string',
                    default: 'https://nylas-wunderlist.herokuapp.com/authenticate/',
                },
                useBasicAuthorizationHeader: {
                    title: 'OAuth Basic Authorization Header',
                    description: 'Do not know! Copied from the example in electronOauth2 library', // TODO: investigate.
                    type: 'boolean',
                    default: false,
                },
            },
        },
        oauthWindowParams: {
            title: 'OAuth Window Parameters',
            description: 'Configuration properties for the window used for the OAuth process', // TODO: investigate.
            type: 'object',
            properties: {
                alwaysOnTop: {
                    type: 'boolean',
                    default: true,
                },
                autoHideMenuBar: {
                    type: 'boolean',
                    default: true,
                },
                webPreferences: {
                    type: 'object',
                    properties: {
                        nodeIntegration: {
                            type: 'boolean',
                            default: false,
                        },
                    },
                },
            },
        },
        wunderlistApiUrl: {
            title: 'Wunderlist API URL',
            description: 'The base URL for all the Wunderlist API endpoints',
            type: 'string',
            default: 'https://a.wunderlist.com/api/v1/',
        },
    },

    activate: () => {
        ComponentRegistry.register(WunderlistToolbarButton, {role: 'ThreadActionsToolbarButton'})
    },

    deactivate: () => {
        ComponentRegistry.unregister(WunderlistToolbarButton)
    },
}
