import { createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MyEvents } from './MyEvents';

const randRange = (max: number) => {
    return Math.floor(Math.random() * max);
}

export class MusicPlayer {

    queue = [];
    currentlyPlaying = 0;
    playing = false;

    repeat = true;
    shuffle = false;

    events = new MyEvents([
        'state-change'
    ])

    songs: HTMLAudioElement[] = [];

    constructor(files: string[], options?: {
        shuffle?: boolean,
        repeat?: boolean
    }) {
        this.shuffle = options?.shuffle || this.shuffle;
        this.repeat = options?.repeat || this.repeat;
        this.songs = files.map(file => new Audio(file));
        this.songs.forEach(song => {
            song.volume = 0.2
            song.addEventListener('ended', this.onEnded);
        });
        if(this.shuffle) {
            this.currentlyPlaying = this.getRandomSongIndex();
        }
    }

    getRandomSongIndex() {
        return randRange(this.songs.length);
    }

    playNextSong() {
        let actualNextIndex;
        if(this.shuffle) {
            actualNextIndex = this.getRandomSongIndex();
        } else {
            const nextIndex = this.currentlyPlaying + 1;
            actualNextIndex = nextIndex <= this.songs.length ? nextIndex : 0;
        }
        this.playSong(actualNextIndex);
    }

    pause() {
        this.playing = false;
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


const musicPlayer = new MusicPlayer(['./music/piano1.mp3', './music/piano2.mp3'], { shuffle: true, repeat: true });

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
