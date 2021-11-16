import React from 'react'
import MainScreen from '../components/MainScreen'
import { Link } from 'react-router-dom'
import { Button } from 'react-bootstrap'

const NotFound = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center', marginTop: '10%' }}>
            <MainScreen title="Lost your way?">
                <Link to="/">
                    <Button variant="outline-primary">I'll take you Home 🤝</Button>
                </Link>
            </MainScreen>
        </div>
    )
}

export default NotFound
