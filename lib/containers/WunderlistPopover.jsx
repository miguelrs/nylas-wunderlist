import { FixedPopover, Menu, Spinner } from 'nylas-component-kit'
import { Actions, React } from 'nylas-exports'
import Icon from '../components/Icon'
import List from '../model/List'
import Task from '../model/Task'
import WunderlistStore from '../stores/WunderlistStore'

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
            account: WunderlistStore.getAccount(),
        }
    }

    static onEscape() {
        Actions.closePopover()
    }

    static renderMenuItem(item) {
        const iconLeft = item.isInbox() ? 'inbox' : 'list'

        return (
            <div key={item.getId()}>
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

    componentDidMount() {
        this.unsubscribe = WunderlistStore.listen(this.onChange)
    }

    componentWillUnmount() {
        this.unsubscribe()
    }

    onChange() {
        this.setState(WunderlistPopover.getStateFromStores())
    }

    onSelectList(list) {
        const {thread} = this.props

        if (!list instanceof List) {
            return
        }

        WunderlistStore.postTask(
            new Task({
                list_id: list.getId(),
                title: thread.subject,
            }),
        )

        Actions.closePopover()
    }

    render() {
        const headerComponents = [
            <p style={styles.menuHeader}>Select a list:</p>,
        ]

        return (
            <div style={styles.popover}>
                <Menu
                    footerComponents={[]}
                    headerComponents={headerComponents}
                    itemContent={WunderlistPopover.renderMenuItem.bind(this)}
                    itemKey={item => item.get('id').toString()}
                    items={this.buildListPickerMenuItems()}
                    onEscape={WunderlistPopover.onEscape}
                    onSelect={this.onSelectList.bind(this)}
                />
            </div>
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
    popover: {
        background: '#f6f6f6',
        maxHeight: 400,
        minHeight: 100,
        overflow: 'auto',
        width: 250,
    },
}
