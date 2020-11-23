import React from "react";
import './style.css'

const Spinner = () => {
    return (
        <div className="spinner-container">
            <div className="spinner">
                <div className="wBall" id="wBall_1">
                    <div className="wInnerBall" />
                </div>
                <div className="wBall" id="wBall_2">
                    <div className="wInnerBall" />
                </div>
                <div className="wBall" id="wBall_3">
                    <div className="wInnerBall" />
                </div>
                <div className="wBall" id="wBall_4">
                    <div className="wInnerBall" />
                </div>
                <div className="wBall" id="wBall_5">
                    <div className="wInnerBall" />
                </div>
            </div>
        </div>
    );
}

export default Spinner;