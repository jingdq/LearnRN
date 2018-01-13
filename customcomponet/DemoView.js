import React from 'react';
import {
    Component
} from 'react';
import {
    PropTypes
} from 'prop-types';
import {
    requireNativeComponent,
    View,
    UIManager,
    findNodeHandle
} from 'react-native';

var NativeDemoView = requireNativeComponent('DemoView', null);
class DemoView extends React.Component {
    static propTypes = {
        title: PropTypes.string,
        alpha: PropTypes.number,
        onTextColorChange: PropTypes.func,
        ...View.propTypes
    }

    constructor(props) {
        super(props);
        this._onTextColorChange = this._onTextColorChange.bind(this);
    }

    changeTextColor(color) {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.DemoView.Commands.changeTextColor,
            [ color ]);
    }

    _onTextColorChange(event:Event) {
        console.log('_onTextColorChange');

        if (!this.props.onTextColorChange) {
            return;
        }

        this.props.onTextColorChange(event.nativeEvent.color);
    }

    addView() {
        UIManager.dispatchViewManagerCommand(
            findNodeHandle(this),
            UIManager.DemoView.Commands.addView,
            [ 'DelayView' ]);
        }

    render() {
        return (
            <NativeDemoView
                style = { this.props.style }
                title = { this.props.title }
                alpha = { this.props.alpha }
                onTextColorChange = { this._onTextColorChange }>
            </NativeDemoView>
        );
    }
}
module.exports = DemoView
