import React from 'react'

const MessagesBlock = ({ messages }) => {
    const messageList = Object.keys(messages).map((key) => {
        const message = messages[key];
        const sender = Object.keys(message)[0];
        const messageText = message[sender];
        return (<div key={key}>
            <b>{sender}</b>: <span>{messageText}</span>
        </div>)
    });
    return (
        <div>
            {messageList}
        </div>
    )
};

export default MessagesBlock;