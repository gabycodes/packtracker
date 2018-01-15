import React from 'react';
import ReactDOM from 'react-dom';
// import Header from './components/Header';
import Header from './header';
import ClubItem from './clubItem';
import SplashPage from './splashPage';

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
                // name: "Gaby",
                item: ""
                
            }],
            name: "",
            item: "",
            email: "",
            user: "",
            isAuth: false,
        }
        this.addItem = this.addItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.setIsAuth = this.setIsAuth.bind(this);
        this.removePeriod = this.removePeriod.bind(this);
        this.getFirebaseData = this.getFirebaseData.bind(this);
    }
    componentDidMount() {
    }
    getFirebaseData() {
        const user = this.state.user;
        const category = "clothing"
        const dbRef = firebase.database().ref('users/' + user + "/" + category);
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                dbRef.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();

                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey
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
        });// 
    }
    setIsAuth(bool, email) {
        this.setState({
            isAuth: bool,
            email: email,
            user: this.removePeriod(email)
        }, () => this.getFirebaseData())
        console.log(this.state.user);
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
        // const dbRef = firebase.database().ref();
        const user = this.state.user;
        const category = "clothing"
        const dbRef = firebase.database().ref('users/' + user + "/" + category);
        dbRef.push(usersItem);
    }

    removeItem(itemToRemove) {
        console.log({itemToRemove});
        // console.log(this.state.user);
        // const user = this.state.user;
        const category = "clothing"
        // const dbRef = firebase.database().ref('users/' + user + "/" + category + "/" + itemToRemove)
        // const dbRef = firebase.database().ref(itemToRemove);

        // database.remove();
        // database.child(itemToRemove).remove();
    }
    removePeriod(email) {
        return email.replace(/[.]/g, "");
    }
    render() {
        return (
            <div>
                <SplashPage />
                <Header isAuth={this.setIsAuth}/>
                <section>
                    <form onSubmit={this.addItem} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
                        <label htmlFor="name">Name: </label>
                        <input type="text" name="name" onChange={this.handleChange} value={this.state.name} />
                        <button>Add Item</button>
                    </form>
                    <ul className="clothing">
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