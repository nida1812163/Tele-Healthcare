import React from "react";
import './App.css'


const Popup=(props) => {
    return(
        <div className="popup-box" style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '100vh'}}>
            <div className="box">
                <span className="close-icon" onClick={props.handleClose} style={{color:'white'}}>x</span>
                {props.content}
            </div>
            <div>
            {/* <button style={{ width:'15%', height:'150%', color:'white',
          borderRadius:'20px', marginTop:'50px'}} onClick={props.onClick}>Save</button> */}
            </div>

        </div>
    )
}

export default Popup;