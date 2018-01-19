import React from 'react';
import ReactDOM from 'react-dom';
import ItemToPack from './itemToPack';

class PackingList extends React.Component {
    constructor() {
        super();
        this.state = {
            items: [{
                name: "",
                item: ""
            }],
            item: "",
            name: "",
            currentCategory: "",
            placeHolder: ""
        }
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.getFirebaseData = this.getFirebaseData.bind(this);
    }
    componentWillReceiveProps() {
        // console.log(this.props.user);
        // console.log(this.props.email);
        // console.log(this.props.isAuth);
        this.getFirebaseData();
    }
    getFirebaseData() {
        // if(this.state.email === "") {
        //     this.setState({
        //         isAuth: this.props.isAuth,
        //         email: this.props.email,
        //         user: this.props.user,
        //         authPageClasses: "logInButtons hideAuth"
        //     }, () => this.getFirebaseData())
        // }

        const user = this.props.user;
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
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addItem(e) {
        e.preventDefault();
        console.log("addItem...");
        const usersItem = {
            item: this.state.item,
            name: this.state.name
        }
        this.setState({
            item: "",
            name: ""
        })
        const user = this.props.user;
        const category = "clothing"
        const dbRef = firebase.database().ref('users/' + user + "/" + category);
        dbRef.push(usersItem);

    }

    removeItem(itemToRemove) {
        const user = this.props.user;
        const category = "clothing"
        const database = firebase.database().ref('users/' + user + "/" + category)
        database.child(itemToRemove).remove();
    }
    render() {
        return (
            <div className="listContainer clothing">
                <h3>Clothing</h3>
                <form onSubmit={this.addItem} className="addForm">
                    <label htmlFor="item">Item: </label>
                    <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
                    <button>Add Item</button>
                </form>
                <ul className="clothing">
                    {this.state.items.map((item, i) => {
                        return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="clothing" />
                    })}
                </ul>
            </div>  
        )
    }
}

export default PackingList