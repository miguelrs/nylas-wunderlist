const {ComponentRegistry} = require('nylas-exports');

const {
    AddToWunderlistToolbarButton
} = require('./ui/wunderlist-buttons');

module.exports = {
    activate: () => {
        console.log('~-~~-~~-~~-~~-~ ACTIVATE ~-~~-~~-~~-~~-~');
        ComponentRegistry.register(AddToWunderlistToolbarButton, {role: 'ThreadActionsToolbarButton'});
    },

    deactivate: () => {
        console.log('~-~~-~~-~~-~~-~ DEACTIVATE ~-~~-~~-~~-~~-~');
        ComponentRegistry.unregister(AddToWunderlistToolbarButton);
    }
};
