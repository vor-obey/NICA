import React from "react";
import {AuthContainer} from "../../../stories/SignIn/AuthContainer";
import {Input} from "../../../stories/Input/Input";
const styleSignIn = {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '90px'
}
export const SignInPage = () => {
    return (
        <div className="sign-in-wrapper" style={styleSignIn}>
            <AuthContainer nameBtn="Sign In" >
                <Input name='Email' type='text'/>

                <Input name='Password' type='password'/>

                <Input name='Remember Me' type='checkbox' style='checkbox'/>
            </AuthContainer>
        </div>
    )
}