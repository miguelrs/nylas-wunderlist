const {ComponentRegistry} = require('nylas-exports');

const {
    AddToWunderlistToolbarButton
} = require('./ui/wunderlist-buttons');

module.exports = {
    activate: () => {
        ComponentRegistry.register(AddToWunderlistToolbarButton, {role: 'ThreadActionsToolbarButton'});
    },

    deactivate: () => {
        ComponentRegistry.unregister(AddToWunderlistToolbarButton);
    }
};
