import React from 'react';
import ReactDOM from 'react-dom';
import Header from './header';
import ItemToPack from './itemToPack';
import SplashPage from './splashPage';
import PackingList from './packingList';

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
            name: "name",
            item: "",
            email: "email",
            user: "user",
            isAuth: false,
            authPageClasses: "logInButtons"
        }
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
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
        });
    }
    setIsAuth(bool, email) {
        this.setState({
            isAuth: bool,
            email: email,
            user: this.removePeriod(email),
            authPageClasses: "logInButtons hideAuth"
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
        const user = this.state.user;
        const category = "clothing"
        const dbRef = firebase.database().ref('users/' + user + "/" + category);
        dbRef.push(usersItem);
    }

    removeItem(itemToRemove) {
        const user = this.state.user;
        const category = "clothing"
        const database = firebase.database().ref('users/' + user + "/" + category)
        database.child(itemToRemove).remove();
    }
    removePeriod(email) {
        return email.replace(/[.]/g, "");
    }
    render() {
        return (
            // <div>
            //     <SplashPage />
            //     <Header isAuth={this.setIsAuth} authClasses={this.state.authPageClasses}/>
            //     <section className="mainPage">
            //         <form onSubmit={this.addItem} className="addForm">
            //             <label htmlFor="item">Item: </label>
            //             <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
            //             <button>Add Item</button>
            //         </form>
            //         <div className="listContainer Clothing">
            //             <ul className="clothing">
            //                 {this.state.items.map((item, i) => {
            //                     return <ItemToPack data={item} key={item.key} remove={this.removeItem} />
            //                 })}
            //             </ul>

            //         </div>
            //     </section>
            // </div>


            <div className="">
                <SplashPage />
                <Header isAuth={this.setIsAuth} authClasses={this.state.authPageClasses} />
                <PackingList isAuth={this.state.isAuth} email={this.state.email} user={this.state.user} name={this.state.name} />
                {/* <section className="mainPage">
                    // <div className="listContainer clothing">
                        <h3>Clothing</h3>
                        <ul className="clothing">
                            {this.state.items.map((item, i) => {
                                return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="clothing" />
                            })}
                        </ul>
                        <form onSubmit={this.addItem} className="addForm">
                            <label htmlFor="item">Item: </label>
                            <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
                            <button>Add Item</button>
                        </form>
                    </div>
                </section> */}
            </div>
        )
    }
}

ReactDOM.render(<App />, document.getElementById('app'));