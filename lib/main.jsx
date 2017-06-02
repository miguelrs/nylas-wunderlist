import {ComponentRegistry, TaskRegistry} from 'nylas-exports';
import WunderlistToolbarButton from './containers/WunderlistToolbarButton';

module.exports = {
    config: {
        clientId: {
            title: 'Wunderlist API Client ID',
            description: 'The Client ID for the app you created in Wunderlist',
            type: 'string',
            default: '',
        },
    },


    //clientId: '6bea596d4278c3d9896b',
    //authorizationUrl: 'https://www.wunderlist.com/oauth/authorize',
    //redirectUri: 'https://github.com/miguelrs/nylas-wunderlist',
    //useBasicAuthorizationHeader: false //???

    activate: () => {
        ComponentRegistry.register(WunderlistToolbarButton, {role: 'ThreadActionsToolbarButton'});
    },

    deactivate: () => {
        ComponentRegistry.unregister(WunderlistToolbarButton);
    }
};
