import React from 'react';
import ReactDOM from 'react-dom';
import ItemToPack from './itemToPack';

class PackingList extends React.Component {
    constructor() {
        super();
        this.state = {
            clothing: [{
                // name: "",
                item: ""
            }],
            misc: [{
                // name: "",
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
        this.getFirebaseData();
    }
    getFirebaseData() {
        const user = this.props.user;
        const clothing = firebase.database().ref('users/' + user + "/packingList/clothing");
        const misc = firebase.database().ref('users/' + user + "/packingList/misc");
        firebase.auth().onAuthStateChanged((user) => {
            if (user) {
                clothing.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();

                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey
                        itemsArray.push(itemsData[itemKey])
                    }
                    this.setState({
                        clothing: itemsArray
                    });
                });
                misc.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();

                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey
                        itemsArray.push(itemsData[itemKey])
                    }
                    this.setState({
                        misc: itemsArray
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
    addItem(category, e) {
        console.log(category);        
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
        // const category = "clothing"
        const dbRef = firebase.database().ref('users/' + user + "/" + 'packingList' + '/' + category);
        dbRef.push(usersItem);
    }

    removeItem(itemToRemove, category) {
        // console.log(itemToRemove,category);
        console.log(this.props.data.item);
        console.log(this.data.item);
        const user = this.props.user;
        const database = firebase.database().ref('users/' + user + "/" + 'packingList' + '/' + category)
        database.child(itemToRemove).remove();
    }
    render() {
        return (
            <div className="parent">
                <div className="listContainer clothing">
                    <h3>Clothing</h3>
                    <ul className="clothing">
                        {this.state.clothing.map((item, i) => {
                            return <ItemToPack data={item} key={item.key} remove={(e) => this.removeItem("clothing")} category="clothing" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("clothing", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
                        <button>Add Item</button>
                    </form>
                </div>  
                <div className="listContainer toiletries">
                    <h3>Misc</h3>
                    <ul className="misc">
                        {this.state.misc.map((item, i) => {
                            return <ItemToPack data={item} key={item.key} remove={(e) => this.removeItem(this, "misc")} category="misc" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("misc", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="item" onChange={this.handleChange} value={this.state.item} />
                        <button>Add Item</button>
                    </form>
                </div>  
            </div>
        )
    }
}

export default PackingList