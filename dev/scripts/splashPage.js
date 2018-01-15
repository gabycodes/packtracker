import React from 'react';
import ReactDOM from 'react-dom';

class SplashPage extends React.Component {
    constructor() {
        super();
        this.state = {
            topWallClasses: "topWall",
            bottomWallClasses: "bottomWall"
        }
        this.enterSite = this.enterSite.bind(this);
    }

    enterSite() {
        this.setState({
            topWallClasses: "topWall slideUp",
            bottomWallClasses: "bottomWall slideDown"
        })

    }

    render() {
        return (
            <section className="splashPage">
                <div className={this.state.topWallClasses}>
                    <h1>PackTracker</h1>
                    <button onClick={this.enterSite}>Get tracking!</button>
                    <div className="overhang">
                        <img src="public/assets/backpackRed.png" alt=""/>
                    </div>
                </div>
                <div className={this.state.bottomWallClasses}></div>
                
            </section>
        )
    }
}

export default SplashPage