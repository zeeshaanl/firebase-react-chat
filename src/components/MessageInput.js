import React, { Component } from 'react'

class MessageInput extends Component {
    constructor(props) {
        super(props);
        this.state = {
            messageInputValue: ''
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const { sendMessage } = this.props;
            sendMessage(this.state.messageInputValue);
            this.setState({
                messageInputValue: ''
            })
        }
    };

    render() {
        const { sendMessage } = this.props;
        const { messageInputValue } = this.state;

        return (
            <div>
                <input type="text" id="userName" value={messageInputValue} onKeyPress={this._handleKeyPress.bind(this)} onChange={this.updateInputValue.bind(this)} placeholder="Enter Chat Message" />
                <button onClick={() => sendMessage(this.state.messageInputValue)}>Send Message</button>
            </div>
        )
    }

    updateInputValue(event) {
        this.setState({
            messageInputValue: event.target.value
        })
    }
}

export default MessageInput;