import React from 'react'
import MainScreen from '../components/MainScreen'

const About = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <MainScreen title="About the developer">
                <p style={{ margin: '10%' }}>
                    Later devs.
                </p>
            </MainScreen>
            <a style={{ textDecoration: 'none', color: 'green' }} href="https://policiesofikigai.netlify.app/" target="_blank" rel="noopener noreferrer" ><p><strong>Privacy policy</strong></p></a>
        </div>
    )
}

export default About
