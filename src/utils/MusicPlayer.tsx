import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MyEvents } from './MyEvents';

export class MusicPlayer {

    queue = [];
    currentlyPlaying = 0;
    playing = false;

    repeat = true;

    events = new MyEvents([
        'state-change'
    ])

    songs: HTMLAudioElement[] = [];

    constructor(files: string[]) {
        this.songs = files.map(file => new Audio(file));
        this.songs.forEach(song => {
            song.volume = 0.2
            song.addEventListener('ended', this.onEnded);
        });
    }

    playNextSong() {
        const nextIndex = this.currentlyPlaying + 1;
        const actualNextIndex = nextIndex <= this.songs.length ? nextIndex : 0;
        this.playSong(actualNextIndex);
    }

    pause() {
        this.playing = false;
        console.log('pausing');
        this.songs[this.currentlyPlaying].pause();
        this.events.callEvent('state-change', 'paused');
    }

    play() {
        this.playing = true;
        this.songs[this.currentlyPlaying].play();
        this.events.callEvent('state-change', 'playing');
    }

    onEnded() {
        if(this.repeat) {
            this.playNextSong();
        }
    }

    playSong(index: number) {
        this.playing = true;
        this.currentlyPlaying = index;
        this.songs[index].play();
    }
};


// Credits: 
// https://pixabay.com/music/modern-classical-peaceful-piano-background-music-218762/
// https://pixabay.com/music/relaxing-piano-music-248868/
const musicPlayer = new MusicPlayer(['./music/piano1.mp3', './music/piano2.mp3']);

const MusicPlayerContext = createContext(musicPlayer);

export const useMusicPlayer = () => {
    const context = useContext(MusicPlayerContext);

    const [playing, setPlaying] = useState<boolean>(context.playing);

    useEffect(() => {
        context.events.on('state-change', (state: 'playing' | 'paused') => {
            setPlaying(state === 'playing');
        })
    }, []);

    return {
        player: context,
        playing
    };
}

export default function MusicPlayerProvider( props: PropsWithChildren ) {
    return (
        <MusicPlayerContext.Provider
            value={musicPlayer}
        >
            {props.children}
        </MusicPlayerContext.Provider>
    );
};
