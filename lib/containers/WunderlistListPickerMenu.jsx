import {React, ReactDOM, Actions, TaskRegistry} from 'nylas-exports';
import {RetinaImg, Menu} from 'nylas-component-kit';
import WunderlistStore from '../stores/WunderlistStore';
import WunderlistListPickerMenuItem from './WunderlistListPickerMenuItem';
import CreateToDoTask from '../tasks/CreateToDoTask';
import Immutable from 'immutable';

/**
 *
 */
export default class WunderlistListPickerMenu extends React.Component {

    static displayName = 'WunderlistListPickerMenu';

    static propTypes = {
        thread: React.PropTypes.object.isRequired,
    };

    constructor(props) {
        super(props);
        this.state = this.getStateFromStores();
    }

    componentDidMount() {
        this.unsubscribe = WunderlistStore.listen(this.onChange);
    }

    componentWillUnmount() {
        this.unsubscribe();
    }

    onChange = () => {
        this.setState(this.getStateFromStores());
    };

    getStateFromStores = () => {
        return {
            folders: WunderlistStore.getFolders(),
            lists: WunderlistStore.getLists(),
        };
    };

    buildListPickerMenuItems = () => {
        let menuItems = Immutable.OrderedSet();
        let lastUsedFolder = null;

        menuItems = menuItems.add(WunderlistStore.getListByType('inbox').set('indent_level', 0));

        for (let list of WunderlistStore.getListsSorted()) {
            let currentFolder = WunderlistStore.getFolderByList(list);
            if (currentFolder && (!lastUsedFolder || lastUsedFolder.get('id') !== currentFolder.get('id'))) {
                menuItems = menuItems.add(currentFolder.set('indent_level', 0));
            }
            if (list.get('list_type') !== 'inbox') {
                menuItems = menuItems.add(list.set('indent_level', currentFolder ? 1 : 0));
            }
        }

        return menuItems.toArray();
    };

    onSelectList(item) {
        if (item.get('type') !== 'list') {
            return;
        }

        let toDo = {
            list_id: item.get('id'),
            title: this.props.thread.subject,
        };

        // TODO: THIS IS NOT WORKING!!!
        const task = new CreateToDoTask(toDo);
        Actions.queueTask(task);

        // const buttonRectangle = ReactDOM.findDOMNode(this.refs.wunderlist_button).getBoundingClientRect();
        //
        // Actions.openPopover(
        //     <p>Done</p>,
        //     {
        //         originRect: buttonRectangle,
        //         direction: 'down',
        //     }
        // );
    }

    render() {
        const menuTitle = <p style={styles.menuHeader}>Pick a Wunderlist list:</p>;

        return (
            <Menu
                style={styles.menu}
                headerComponents={[menuTitle]}
                itemContent={(item) => (<WunderlistListPickerMenuItem item={item.toJS()} />)}
                itemKey={(item) => item.get('id')}
                items={this.buildListPickerMenuItems()}
                onSelect={this.onSelectList.bind(this)}
            />
        );
    }
}

const styles = {
    menuHeader: {
        margin: 0,
    },
    menu: {
        maxHeight: 400,
    },
};
