import {React} from 'nylas-exports';

const styles = {
    popover: {
        background: '#f6f6f6',
        maxHeight: 400,
        minHeight: 100,
        overflow: 'auto',
        width: 250,
    },
};

export default class PopoverContent extends React.Component {

    static displayName = 'PopoverContent';

    render() {
        const {children} = this.props;
        return (
            <div style={styles.popover}>
                {children}
            </div>
        );
    }
}
