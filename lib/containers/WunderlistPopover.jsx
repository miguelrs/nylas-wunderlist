import { List as ArrayList, OrderedSet, Seq } from 'immutable'
import { FixedPopover, Menu } from 'nylas-component-kit'
import { Actions, React } from 'nylas-exports'
import WunderlistActions from '../actions'
import { Icon, PopoverContent } from '../components'
import { Folder, List, Task } from '../model'
import WunderlistApiStore from '../stores/WunderlistApiStore'

/**
 * Component to manage the Wunderlist popover.
 *
 * @author Miguel Rosales Sueiro
 */
export default class WunderlistPopover extends FixedPopover {
    static displayName = 'WunderlistPopover'

    static propTypes = {
        thread: React.PropTypes.object.isRequired,
    }

    constructor(props) {
        super(props)
        this.state = this._getStateFromStores()
    }

    componentDidMount() {
        this.unsubscribe = WunderlistApiStore.listen(this._onChange)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    _onChange = () => {
        this.setState(this._getStateFromStores())
    }

    _getStateFromStores = () => {
        return {
            account: WunderlistApiStore.getAccount(),
        }
    }

    _renderMenuItem = (item) => {
        if (item === null) {
            const key = Math.floor(Math.random() * 1000)
            return <Menu.Item key={key} divider={true}/>
        }

        if (item instanceof Folder) {
            return <Menu.Item key={item.getId()} divider={item.getTitle()}/>
        }

        const iconLeft = item.isInbox() ? 'inbox' : 'list'

        return (
            <div>
                <span style={styles.iconLeft}><Icon icon={iconLeft}/></span>
                {item.getTitle()}
                <span style={styles.iconRight}><Icon icon='chevron-right'/></span>
            </div>
        )
    }

    _buildListPickerMenuItems = () => {
        const {account} = this.state

        // Build the list of items for the menu.
        let items = new ArrayList()

        let currentFolder = null
        account.getListsSorted().forEach((list) => {
            // Add each folder once to the items.
            let nextFolder = account.getFolderForList(list.getId())
            if (nextFolder !== currentFolder) {
                // Add the folder even if it's NULL, which means
                // the current folder ended and next list has no folder.
                items = items.push(nextFolder)
                currentFolder = nextFolder
            }
            // Add all the lists to the items.
            items = items.push(list)
        })

        return items.toArray()
    };

    _onSelectList = (list) => {
        const {thread} = this.props

        if (!list instanceof List) {
            return
        }

        WunderlistActions.createTask(
            new Task({
                list_id: list.getId(),
                title: thread.subject,
            }),
        )

        Actions.closePopover()
    }

    render() {
        const headerComponents = [
            <p key='header' style={styles.menuHeader}>Select a list:</p>,
        ]

        return (
            <PopoverContent>
                <Menu
                    footerComponents={[]}
                    headerComponents={headerComponents}
                    itemContent={this._renderMenuItem}
                    itemKey={item => item.getId().toString()}
                    items={this._buildListPickerMenuItems()}
                    onEscape={() => Actions.closePopover()}
                    onSelect={this._onSelectList}
                />
            </PopoverContent>
        )
    }
}

const styles = {
    iconLeft: {
        marginRight: 10,
    },
    iconRight: {
        float: 'right',
    },
    menuHeader: {
        margin: 0,
    },
}
