import { FixedPopover, Flexbox } from 'nylas-component-kit'
import { Actions, React } from 'nylas-exports'
import WunderlistActions from '../actions'
import { Icon, PopoverContent } from '../components'

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
                    <button className="btn" style={styles.buttonPrimary} onClick={this.handleClickLogin}>Sign in</button>
                    <button className="btn" style={styles.buttonNaked} onClick={this.handleClickCancel}>Cancel</button>
                </Flexbox>
            </PopoverContent>
        )
    }
}

const styles = {
    buttonPrimary: {
        backgroundColor: '#DB4C3E',
        color: '#FFF',
        width: '66%',
    },
    buttonNaked: {
        background: 'transparent',
        boxShadow: 'none',
        width: '66%',
    },
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
