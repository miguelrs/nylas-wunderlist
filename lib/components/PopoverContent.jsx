import { Spinner } from 'nylas-component-kit'
import { React } from 'nylas-exports'

const styles = {
    popover: {
        background: '#f6f6f6',
        maxHeight: 400,
        minHeight: 100,
        overflow: 'auto',
        width: 250,
    },
}

export default class PopoverContent extends React.Component {

    static displayName = 'PopoverContent'

    render() {
        const {children, loading} = this.props

        let content
        if (loading) {
            content = <Spinner visible={true}/>
        } else {
            content = children
        }

        return (
            <div style={styles.popover}>
                {content}
            </div>
        )
    }
}
