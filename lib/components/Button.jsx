import { React } from 'nylas-exports'

const styles = {
    buttonPrimary: {
        backgroundColor: '#DB4C3E',
        color: '#FFF',
        width: '90%',
    },
    buttonNaked: {
        background: 'transparent',
        boxShadow: 'none',
        width: '90%',
    },
}

export default class Button extends React.Component {

    static displayName = 'Button'

    render() {
        const {children, type, onClick} = this.props

        let button
        if (type === 'primary') {
            return (
                <button className="btn" style={styles.buttonPrimary} onClick={onClick}>
                    {children}
                </button>
            )
        } else if (type === 'naked') {
            return (
                <button className="btn" style={styles.buttonNaked} onClick={onClick}>
                    {children}
                </button>
            )
        } else {
            return (
                <button className="btn" onClick={onClick}>
                    {children}
                </button>
            )
        }
    }
}
