import React, { Component } from 'react';
import * as firebase from 'firebase';
import Header from './components/Header';
import MessagesBlock from './components/MessagesBlock';
import NameSet from './components/NameSet';
import MessageInput from './components/MessageInput';
import './App.css';

class App extends Component {
    constructor(props) {
        super(props);

        this.state = {
            messages: null,
            currentUser: null
        };
    }

    async componentDidMount() {
        const config = {
            apiKey: "AIzaSyAjtxmQD29dAeMruRmTjq7ZkHuCDjwm-as",
            authDomain: "test-f3f38.firebaseapp.com",
            databaseURL: "https://test-f3f38.firebaseio.com",
            projectId: "test-f3f38",
            storageBucket: "",
            messagingSenderId: "654369996275"
        };
        firebase.initializeApp(config);
        try {
            // Get a reference to the database service -> then listen to changes
            firebase.database().ref('/').on('value', (snapshot) => {
                if (snapshot.hasChild('messages')) {
                    const messages = snapshot.child('messages').val();
                    this.setState({
                        messages
                    });
                } else {
                    this.resetFirebaseMessages();
                }
            });
        } catch (err) {
            console.log(err);
        }
    }

    resetFirebaseMessages = () => {
        firebase.database().ref('/').set({
            messages: ''
        });
    };

    render() {
        const { messages, currentUser } = this.state;
        const body = currentUser ? (
            <div>
                <MessagesBlock messages={messages} />
                <MessageInput sendMessage={this.sendMessage} />
            </div>
        ) : (
            <div>
                <NameSet setName={this.setName} />
            </div>
        );
        return (
            <div className="App">
                <Header />
                <div className="clear-messages">
                    <button onClick={this.resetFirebaseMessages}>Clear All Messages</button>
                </div>
                <div>
                    {body}
                </div>
            </div>
        );
    }

    setName = (userName) => {
        this.setState({
            currentUser: userName
        });
    }

    sendMessage = (message) => {
        const { currentUser } = this.state;
        const newPostKey = firebase.database().ref().child('messages').push().key;
        const updates = {};
        updates[`/messages/${newPostKey}/${currentUser}`] = message;
        firebase.database().ref().update(updates)
    }
}

export default App;
