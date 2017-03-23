import {React} from 'nylas-exports';
import StylingMixin from '../mixins/StylingMixin.jsx';

/**
 * COPIED FROM: https://github.com/dmfrancisco/react-icons
 *
 * Subset of the SVG icon collection from the Polymer project (goo.gl/N7SB5G)
 */
export default React.createClass({
    mixins: [StylingMixin], // TODO: not sure this is needed!
    propTypes: {
        icon: React.PropTypes.string.isRequired,
        size: React.PropTypes.oneOfType([
            React.PropTypes.string,
            React.PropTypes.number
        ]),
        style: React.PropTypes.object
    },
    getDefaultProps() {
        return {
            size: 18
        };
    },
    renderGraphic() {
        switch (this.props.icon) {
            case 'assignment-turned-in':
                return (
                    <g><path d="M19 3h-4.18c-.42-1.16-1.52-2-2.82-2-1.3 0-2.4.84-2.82 2h-4.18c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm-7 0c.55 0 1 .45 1 1s-.45 1-1 1-1-.45-1-1 .45-1 1-1zm-2 14l-4-4 1.41-1.41 2.59 2.58 6.59-6.59 1.41 1.42-8 8z"></path></g>
                );
            case 'chevron-right':
                return (
                    <g><path d="M10 6l-1.41 1.41 4.58 4.59-4.58 4.59 1.41 1.41 6-6z"></path></g>
                );
            case 'folder':
                return (
                    <g><path d="M10 4h-6c-1.1 0-1.99.9-1.99 2l-.01 12c0 1.1.9 2 2 2h16c1.1 0 2-.9 2-2v-10c0-1.1-.9-2-2-2h-8l-2-2z"></path></g>
                );
            case 'inbox':
                return (
                    <g><path d="M19 3h-14.01c-1.1 0-1.98.9-1.98 2l-.01 14c0 1.1.89 2 1.99 2h14.01c1.1 0 2-.9 2-2v-14c0-1.1-.9-2-2-2zm0 12h-4c0 1.66-1.34 3-3 3s-3-1.34-3-3h-4.01v-10h14.01v10zm-3-5h-2v-3h-4v3h-2l4 4 4-4z"></path></g>
                );
            case 'list':
                return (
                    <g><path d="M3 13h2v-2h-2v2zm0 4h2v-2h-2v2zm0-8h2v-2h-2v2zm4 4h14v-2h-14v2zm0 4h14v-2h-14v2zm0-10v2h14v-2h-14z"></path></g>
                );
        }
    },
    render() {
        let styles = {
            fill: "currentcolor",
            verticalAlign: "text-top", // TODO: revise this - it was 'middle' but it didn't look good.
            // Use CSS instead of the width prop to support non-pixel units (eg: rem)
            width: this.props.size,
            height: this.props.size
        };
        return (
            <svg viewBox="0 0 24 24" preserveAspectRatio="xMidYMid meet" fit
                 style={this.mergeStyles(
                     styles,
                     this.props.style
                 )}>
                {this.renderGraphic()}
            </svg>
        );
    }
});
