import {ComponentRegistry} from 'nylas-exports';
import WunderlistToolbarButton from './containers/WunderlistToolbarButton';

module.exports = {
    activate: () => {
        ComponentRegistry.register(WunderlistToolbarButton, {role: 'ThreadActionsToolbarButton'});
    },

    deactivate: () => {
        ComponentRegistry.unregister(WunderlistToolbarButton);
    }
};
