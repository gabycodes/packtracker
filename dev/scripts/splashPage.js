import React from 'react';
import ReactDOM from 'react-dom';

class SplashPage extends React.Component {
    render() {
        return (
            <section className="splashPage">
                <div className="topWall">
                    <h1>PackTracker</h1>
                    <p>P-p-p-pack it, t-t-t-track it.</p>
                    <div className="overhang">
                        <img src="public/assets/backpackGreen.png" alt=""/>
                    </div>
                </div>
                <div className="bottomWall"></div>
                
            </section>
        )
    }
}

export default SplashPage