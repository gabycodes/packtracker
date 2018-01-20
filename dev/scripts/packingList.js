import React from 'react';
import ReactDOM from 'react-dom';
import ItemToPack from './itemToPack';

class PackingList extends React.Component {
    constructor() {
        super();
        this.state = {
            clothing: [{
                item: ""
            }],
            electronics: [{
                item: ""
            }],
            toiletries: [{
                item: ""
            }],
            documents: [{
                item: ""
            }],
            misc: [{
                item: ""
            }],
            item: "",
            clothingInput: "",
            toiletriesInput: "",
            documentsInput: "",
            electronicsInput: "",
            miscInput: "",
            name: "",
            currentCategory: "",
            placeHolder: ""
        }
        this.addItem = this.addItem.bind(this);
        this.removeItem = this.removeItem.bind(this);
        this.handleChange = this.handleChange.bind(this);
        // this.handleChange2 = this.handleChange2.bind(this);
        this.getFirebaseData = this.getFirebaseData.bind(this);
    }
    componentWillReceiveProps() {
        this.getFirebaseData();
    }
    getFirebaseData() {
        const user = this.props.user;
        const clothing = firebase.database().ref('users/' + user + "/packingList/clothing");
        const toiletries = firebase.database().ref('users/' + user + "/packingList/toiletries");
        const electronics = firebase.database().ref('users/' + user + "/packingList/electronics");
        const documents = firebase.database().ref('users/' + user + "/packingList/documents");
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
                toiletries.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();
                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey
                        itemsArray.push(itemsData[itemKey])
                    }
                    this.setState({
                        toiletries: itemsArray
                    });
                });
                electronics.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();
                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey
                        itemsArray.push(itemsData[itemKey])
                    }
                    this.setState({
                        electronics: itemsArray
                    });
                });
                documents.on("value", (firebaseData) => {
                    const itemsArray = [];
                    const itemsData = firebaseData.val();
                    for (let itemKey in itemsData) {
                        itemsData[itemKey].key = itemKey
                        itemsArray.push(itemsData[itemKey])
                    }
                    this.setState({
                        documents: itemsArray
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
    handleChange(category, e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    addItem(category, e) {
        e.preventDefault();
        // const thisThing = `this.state.${category}Input`;
        
        let usersItem = {};
        if(category === "clothing") {
            usersItem.item = this.state.clothingInput
        }
        if(category === "toiletries") {
            usersItem.item = this.state.toiletriesInput
        }
        if(category === "electronics") {
            usersItem.item = this.state.electronicsInput
        }
        if(category === "documents") {
            usersItem.item = this.state.documentsInput
        }
        if(category === "misc") {
            usersItem.item = this.state.miscInput
        }
        this.setState({
            clothingInput: "",
            toiletriesInput: "",
            electronicsInput: "",
            documentsInput: "",
            miscInput: ""
        })
        const user = this.props.user;
        const dbRef = firebase.database().ref('users/' + user + "/" + 'packingList' + '/' + category);
        dbRef.push(usersItem);
    }

    removeItem(itemToRemove, category) {
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
                            return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="clothing" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("clothing", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="clothingInput" onChange={(e) => this.handleChange("clothingInput", e)} value={this.state.clothingInput} />
                        <button>Add Item</button>
                    </form>
                </div>  
                <div className="listContainer toiletries">
                    <h3>Toiletries</h3>
                    <ul className="toiletries">
                        {this.state.toiletries.map((item, i) => {
                            return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="toiletries" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("toiletries", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="toiletriesInput" onChange={(e) => this.handleChange("toiletriesInput", e)} value={this.state.toiletriesInput} />
                        <button>Add Item</button>
                    </form>
                </div>  
                <div className="listContainer electronics">
                    <h3>Electronics</h3>
                    <ul className="electronics">
                        {this.state.electronics.map((item, i) => {
                            return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="electronics" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("electronics", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="electronicsInput" onChange={(e) => this.handleChange("electronicsInput", e)} value={this.state.electronicsInput} />
                        <button>Add Item</button>
                    </form>
                </div>  
                <div className="listContainer documents">
                    <h3>Documents</h3>
                    <ul className="documents">
                        {this.state.documents.map((item, i) => {
                            return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="documents" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("documents", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="documentsInput" onChange={(e) => this.handleChange("documentsInput", e)} value={this.state.documentsInput} />
                        <button>Add Item</button>
                    </form>
                </div>  
                <div className="listContainer misc">
                    <h3>Misc</h3>
                    <ul className="misc">
                        {this.state.misc.map((item, i) => {
                            return <ItemToPack data={item} key={item.key} remove={this.removeItem} category="documents" />
                        })}
                    </ul>
                    <form onSubmit={(e) => this.addItem("misc", e)} className="addForm">
                        <label htmlFor="item">Item: </label>
                        <input type="text" name="miscInput" onChange={(e) => this.handleChange("miscInput", e)} value={this.state.miscInput} />
                        <button>Add Item</button>
                    </form>
                </div>  
            </div>
        )
    }
}

export default PackingList