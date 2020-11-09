import React from "react";
import {AuthContainer} from "./AuthContainer";

export default {
    title: 'SignInBlock',
    component: AuthContainer
}

export const Template = () => <AuthContainer children={'YOUR_CONTENT'} nameBtn='Button'/>