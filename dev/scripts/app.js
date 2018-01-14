import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './components/Header';
import Header from './header';
import ClubItem from './clubItem';

const config = {
    apiKey: "AIzaSyB9g92lbFyfs_qNWhxog2Re3PPbaXN9W5A",
    authDomain: "packinglist-4f592.firebaseapp.com",
    databaseURL: "https://packinglist-4f592.firebaseio.com",
    projectId: "packinglist-4f592",
    storageBucket: "packinglist-4f592.appspot.com",
    messagingSenderId: "495877381266"
};
firebase.initializeApp(config);

class App extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [{
                name: "Gaby",
                item: "Jeans"
            }],
            name: "",
            item: ""
        }
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
    }
    componentDidMount() {
        const dbRef = firebase.database().ref();
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dbRef.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();

                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey// We're adding a key property, in addition to name and item
                        itemsArray.push(itemsData[itemKey])
                    }

                    this.setState({
                        items: itemsArray
                    });
                });
            }
            else {
                console.log("You are not signed in");
            }
        });// Closes AuthChanged
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addItem(e) {
        e.preventDefault();
        const usersItem = {
            item: this.state.item,
            name: this.state.name
        }
        this.setState({
            item: "",
            name: ""
        })
        const dbRef = firebase.database().ref();
        dbRef.push(usersItem);
    }

    removeItem(itemToRemove) {
        console.log(itemToRemove);
        const dbRef = firebase.database().ref(itemToRemove);
        dbRef.remove();
    }
    render() {

        return (
            <div>
                <Header />
                <section>
                    <form onSubmit={this.addItem} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                        <button>Add Item</button>
                    </form>
                    <ul className="items">
                        {this.state.items.map((item, i) => {
                            return <ClubItem data={item} key={item.key} remove={this.removeItem} />
                        })}
                    </ul>
                </section>
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));