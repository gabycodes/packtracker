import React from 'react';

export default class Header extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            formToShow: '',
            email: '',
            password: '',
            confirm: ''
        };
        this.formToShow = this.formToShow.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.signup = this.signup.bind(this);
        this.login = this.login.bind(this);
    }
    formToShow(e) {
        e.preventDefault();
        this.setState({
            formToShow: e.target.className
        })
    }
    handleChange(e) {
        this.setState({
            [e.target.name]: e.target.value
        });
    }
    signup(e) {
        e.preventDefault();
        if (this.state.password === this.state.confirm) {
            firebase.auth().createUserWithEmailAndPassword(this.state.email, this.state.password)// This method returns a promise
                .then((data) => {
                    console.log(data);
                })
            this.props.isAuth(true, this.state.email);
        }
    }
    login(e) {
        e.preventDefault();
        firebase.auth().signInWithEmailAndPassword(this.state.email, this.state.password)
            .then((data) => {
                this.props.isAuth(true, this.state.email);
            })
    }
    render() {
        let loginForm = '';
        if (this.state.formToShow === 'signup') {
            loginForm = (
                <form onSubmit={this.signup} className="user-form">
                    <label htmlFor="email" className="visually-hidden">Email: </label>
                    <input type="email" name="email" onChange={this.handleChange} placeholder="Email"/>
                    <label htmlFor="password" className="visually-hidden">Password: </label>
                    <input type="password" name="password" onChange={this.handleChange} placeholder="Password"/>
                    <label htmlFor="confirm" className="visually-hidden">Confirm Password:</label>
                    <input type="password" name="confirm" onChange={this.handleChange} placeholder="Confirm password"/>
                    <button>Sign In</button>
                </form>
            );
        }
        else if (this.state.formToShow === "login") {
            loginForm = (
                <form onSubmit={this.login} className="user-form">
                    <label htmlFor="email" className="visually-hidden">Email: </label>
                    <input type="email" name="email" onChange={this.handleChange} placeholder="Email"/>
                    <label htmlFor="password" className="visually-hidden">Password: </label>
                    <input type="password" name="password" onChange={this.handleChange} placeholder="Password"/>
                    <button>Log In</button>
                </form>
            );
        }
        return (
            <div>
                <section className={this.props.authClasses}>
                    <ul>
                        <li><a href="" className="signup" onClick={this.formToShow}>Sign Up</a></li>
                        <li><a href="" className="login" onClick={this.formToShow}>Log In</a></li>
                    </ul>
                    {loginForm}
                </section>
            </div>
        )
    }
}