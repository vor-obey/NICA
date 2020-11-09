import React from "react";
import PropTypes from "prop-types"
import "./authcontainer.css";
import TitleLogo from "../../img/icon_red_white_tent-ec1b0da21cdb3893b38a1d94f6aeb2bd2581d2b674099d0955c3650f38abb8b2.svg";
import {Button} from "../Button/Button";
import NICALogo from '../../img/NICA-lockup-6a88004892178050c3b2c8d2ee3fc11ccdb3a7932a41c5449011cfed24e8ca5e.svg'

export const AuthContainer = ({children, nameBtn, onSignIn}) => {
    return (
        <div className="container">
            <img src={NICALogo} className="logo" alt="Not Found"/>
            <div className="wrapper">
                <div className="title">
                    <img src={TitleLogo} alt="Not Found"/>
                    <span>pit zone</span>
                </div>

                <div className="children-container">
                    {children}
                </div>

                <div className="btn-wrapper">
                    <Button
                        onClick={onSignIn}
                        label={nameBtn}
                        primary={true}
                        size='medium'
                    />
                </div>

            </div>
        </div>
    )
}

AuthContainer.propTypes = {
    nameBtn: PropTypes.string,
    children: PropTypes.object,
    onSignIn: PropTypes.func
}