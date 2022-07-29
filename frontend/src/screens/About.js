import React from 'react'
import MainScreen from '../components/MainScreen'
import me from './me.jpg'

const About = () => {
    return (
        <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
            <MainScreen title="About the developer">
                <p style={{ margin: '10%' }}>
                    Hey there, my name is Sambhav Saxena and I'm a full-stack developer based in India. I'm passionate about building things people love.
                    Currently, I'm pursuing my B.Tech in Computer Science from a <a href="https://dcrust.edu.in/" style={{ color: 'magenta', textDecoration: 'none' }} target="_blank" rel="noopener noreferrer"><strong>state government university</strong></a>. I'm a self-taught programmer and a hobbyist. I love learning new technologies and develop useful things out of scratch. Talking about this web app, I started learning React and Vue weeks before i started working on this. Following MERN stack, this web app is the first full-stack application built on stack <strong> <a href="https://reactjs.org/" style={{ color: 'blue', textDecoration: 'none' }} rel="noreferrer noopener" target="_blank">ReactJS</a> | <a href="https://nodejs.org/en/" style={{ color: 'green', textDecoration: 'none' }} rel="noreferrer noreferrer" target="_blank">Node</a> | <a href="https://expressjs.com/" style={{ color: 'red', textDecoration: 'none' }} rel="noreferrer noreferrer" target="_blank">Express</a> and <a href="https://mongodb.com/" style={{ color: 'brown', textDecoration: 'none' }} rel="noreferrer noreferrer" target="_blank">MongoDB</a></strong>.  An article publishing feature for public viewing is on its way soon. For more projects and contributions, check out my <a href="https://github.com/sambhavsaxena" style={{ color: 'black', textDecoration: 'none' }} rel="noreferrer noreferrer" target="_blank"><strong>Github</strong></a> profile.
                </p>
                <img src={me} alt="me" style={{ width: '30%', height: '50%', marginTop: '-6%' }} />
            </MainScreen>
            <a style={{ textDecoration: 'none', color: 'green' }} href="https://policiesofmonospace.netlify.app" target="_blank" rel="noreferrer noreferrer" ><p><strong>Privacy policy</strong></p></a>
        </div>
    )
}

export default About
