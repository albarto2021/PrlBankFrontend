import React from 'react'
import Register from '../components/register/Register'
import PageHeader from '../components/shared/PageHeader'

const RegisterPage = () => {
    return (
        <div>
            <PageHeader page='register' title='free register'/>
            <Register />
        </div>
    )
}

export default RegisterPage
