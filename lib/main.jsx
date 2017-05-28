import {ComponentRegistry, TaskRegistry} from 'nylas-exports';
import WunderlistToolbarButton from './containers/WunderlistToolbarButton';
import CreateToDoTask from './tasks/CreateToDoTask';

module.exports = {
    activate: () => {
        TaskRegistry.register('CreateToDoTask', () => CreateToDoTask);
        ComponentRegistry.register(WunderlistToolbarButton, {role: 'ThreadActionsToolbarButton'});
    },

    deactivate: () => {
        ComponentRegistry.unregister(WunderlistToolbarButton);
    }
};
