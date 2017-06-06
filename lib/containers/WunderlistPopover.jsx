import { FixedPopover, Menu, Spinner } from 'nylas-component-kit'
import { Actions, React } from 'nylas-exports'
import {Icon, PopoverContent} from '../components'
import {List, Task} from '../model'
import WunderlistApiStore from '../stores/WunderlistApiStore'
import WunderlistActions from '../actions'

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
        this.state = WunderlistPopover.getStateFromStores()
    }

    static getStateFromStores() {
        return {
            account: WunderlistApiStore.getAccount(),
        }
    }

    componentDidMount() {
        this.unsubscribe = WunderlistApiStore.listen(this.onChange)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    onChange() {
        this.setState(WunderlistPopover.getStateFromStores())
    }

    static renderMenuItem(item) {
        const iconLeft = item.isInbox() ? 'inbox' : 'list'

        return (
            <div>
                <span style={styles.iconLeft}><Icon icon={iconLeft}/></span>
                {item.getTitle()}
                <span style={styles.iconRight}><Icon icon='chevron-right'/></span>
            </div>
        )
    }

    buildListPickerMenuItems() {
        const {account} = this.state

        return account.getListsSorted().toArray()
    };

    onSelectList(list) {
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
                    itemContent={WunderlistPopover.renderMenuItem}
                    itemKey={item => item.getId().toString()}
                    items={this.buildListPickerMenuItems()}
                    onEscape={() => Actions.closePopover()}
                    onSelect={this.onSelectList.bind(this)}
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
