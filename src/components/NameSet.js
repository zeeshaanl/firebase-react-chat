import React, { Component } from 'react'

class NameSet extends Component {
    constructor(props) {
        super(props);
        this.state = {
            nameInputValue: ''
        }
    }

    _handleKeyPress = (e) => {
        if (e.key === 'Enter') {
            const { setName } = this.props;
            setName(this.state.nameInputValue);
        }
    };

    render() {
        const { setName } = this.props;
        const { nameInputValue } = this.state;

        return (
            <div>
                <input type="text" id="userName" value={nameInputValue} onKeyPress={this._handleKeyPress} onChange={this.updateInputValue} placeholder="Enter Name" />
                <button onClick={() => setName(this.state.nameInputValue)}>Set Name</button>
            </div>
        )
    }

    updateInputValue = (event) => {
        this.setState({
            nameInputValue: event.target.value
        })
    }
}

export default NameSet;