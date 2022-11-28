import React, { lazy } from 'react';
const RegistrationForm = lazy(() => import('../containers/RegistrationForm/RegistrationForm'));

const SignUp = () => {
    return (
        <div className='app__container center'>
            <RegistrationForm />
        </div>
    )
}

export default SignUp
