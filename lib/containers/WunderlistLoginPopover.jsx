import { FixedPopover, Flexbox } from 'nylas-component-kit'
import { Actions, React } from 'nylas-exports'
import WunderlistActions from '../actions'
import { Button, Icon, PopoverContent } from '../components'

/**
 * Component to manage the Wunderlist popover.
 *
 * @author Miguel Rosales Sueiro
 */
export default class WunderlistLoginPopover extends FixedPopover {
    static displayName = 'WunderlistLoginPopover'

    handleClickCancel = () => {
        Actions.closePopover()
    }

    handleClickLogin = () => {
        WunderlistActions.authorize()
    }

    render() {
        return (
            <PopoverContent>
                <Flexbox direction="row" style={styles.buttonGroup}>
                    <p style={styles.message}><span><Icon icon='warning'/></span> Not signed in to Wunderlist</p>
                    <Button type="primary" onClick={this.handleClickLogin}>Sign in</Button>
                    <Button type="naked" onClick={this.handleClickCancel}>Cancel</Button>
                </Flexbox>
            </PopoverContent>
        )
    }
}

const styles = {
    buttonGroup: {
        alignItems: 'center',
        flexDirection: 'column',
        height: 100,
        justifyContent: 'space-around',
        paddingTop: 10,
    },
    message: {
        color: 'grey',
    }
}
