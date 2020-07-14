import React, { useEffect, useState } from 'react';

const gin1 = require('../images/gin-idle.png')
const gin2 = require('../images/gin-meow.png')

const ginaudio = [
    require('../audio/gin1.mp3'),
    require('../audio/gin2.mp3')
];

export function Gin() {
    const [playing, setPlaying] = useState(false);
    const [audio] = useState(new Audio());

    useEffect(() => {
        audio.load();
        console.log("audio loaded");
    }, []);

    useEffect(() => {
        audio.addEventListener('ended', () => setPlaying(false));
        return () => {
            audio.removeEventListener('ended', () => setPlaying(false));
        };
    }, []);

    const onClickButton = () => {
        setPlaying(true);
        audio.src = ginaudio[Math.floor(Math.random() * ginaudio.length)];
        audio.play()
            .then(() => { console.log("playing audio") })
            .catch(err => { console.error("error playing audio: " + err) });
    };

    return (
        <div>
            <img
                className="gin"
                onClick={() => onClickButton()}
                src={playing ? gin2 : gin1} />
        </div>
    )
}