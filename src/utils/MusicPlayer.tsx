import { ComponentState, createContext, PropsWithChildren, useContext, useEffect, useState } from 'react';
import { MyEvents } from './MyEvents';
import useSettings from '../hooks/useSettings';

const randRange = (max: number) => {
    return Math.floor(Math.random() * max);
}

export class MusicPlayer {


    queue = [];
    currentlyPlaying: number | null = null;
    playing = false;

    repeat = true;
    shuffle = false;

    volume = 0.2;

    name = 'Music Player'

    events = new MyEvents([
        'state-change'
    ])

    songs: HTMLAudioElement[] = [];

    constructor(files: string[], options?: {
        shuffle?: boolean,
        repeat?: boolean
        name?: string,
        volume?: number
    }) {
        this.volume = options?.volume || this.volume;
        this.name = options?.name || this.name;
        this.shuffle = options?.shuffle || this.shuffle;
        this.repeat = options?.repeat || this.repeat;
        this.songs = files.map(file => new Audio(file));
        this.songs.forEach(song => {
            song.volume = this.volume;
            song.addEventListener('ended', this.onEnded.bind(this));
        });
        if(this.shuffle) {
            this.currentlyPlaying = this.getRandomSongIndex();
        } else if (this.songs.length) {
            this.currentlyPlaying = 0;
        }
    }

    getRandomSongIndex() {
        if(!this.songs.length) return null;
        return randRange(this.songs.length);
    }

    playNextSong() {
        if(this.currentlyPlaying === null) return;
        let actualNextIndex;
        if(this.shuffle) {
            actualNextIndex = this.getRandomSongIndex()!;
        } else {
            const nextIndex = this.currentlyPlaying + 1;
            actualNextIndex = nextIndex <= this.songs.length ? nextIndex : 0;
        }
        this.playSong(actualNextIndex);
    }

    pause() {
        if(this.currentlyPlaying === null) return;
        this.playing = false;
        this.songs[this.currentlyPlaying].pause();
        this.events.callEvent('state-change', 'paused');
    }

    play() {
        if(this.currentlyPlaying === null) return;
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


// const musicPlayer = new MusicPlayer(['./music/piano1.mp3', './music/piano2.mp3'], { shuffle: true, repeat: true });

const musicPlayers = {
    'wind': new MusicPlayer(['./sound/wind1.mp3'], { shuffle: true, repeat: true, name: 'Wind', volume: 0.2 }),
    'rain': new MusicPlayer(['./sound/rain1.mp3'], { shuffle: true, repeat: true, name: 'Rain', volume: 0.04 }),
    'flowingWater': new MusicPlayer(['./sound/flowingWater1.mp3'], { shuffle: true, repeat: true, name: 'Flowing Water', volume: 0.05 }),
    'birds': new MusicPlayer(['./sound/birds1.mp3'], { shuffle: true, repeat: true, name: 'Birds', volume: 0.4 }),
    'piano': new MusicPlayer(['./sound/piano1.mp3', './sound/piano2.mp3'], { shuffle: true, repeat: true, name: 'Piano', volume: 0.08 }),
    // 'boink': new MusicPlayer(['./sound/boink.mp3'], { shuffle: true, repeat: true, name: 'Boink', volume: 0.08 })
}

const MusicPlayersContext = createContext(musicPlayers);

export const useMusicPlayers = () => {
    const context = useContext(MusicPlayersContext);

    const playerStateIsPlaying: Record<keyof typeof musicPlayers | string, ComponentState> = {}

    for(const playerEntry of Object.entries(musicPlayers)) {
        const player = playerEntry[1];
        const key = playerEntry[0];
        // eslint-disable-next-line
        playerStateIsPlaying[key] = useState<boolean>(player.playing);
    }

    useEffect(() => {
        Object.entries(context).forEach(([key, player]) => {
            player.events.on('state-change', (state: 'playing' | 'paused') => {
                playerStateIsPlaying[key][1](state === 'playing');
            })
        });
    }, []);

    const isPlaying = (key: string) => {
        return playerStateIsPlaying[key][0];
    }

    return {
        players: context,
        isPlaying
    };
}

export default function MusicPlayerProvider( props: PropsWithChildren ) {

    const { settings } = useSettings();
    const players = useMusicPlayers();

    useEffect(() => {
        if(settings.retainMusic) {
            const listener = () => {
                settings.soundsPlaying.forEach(key => {
                    players.players[key as keyof typeof players.players]?.play();
                })
                document.removeEventListener('click', listener);
            }
            document.addEventListener('click', listener);
            
        }
    }, [])

    return (
        <MusicPlayersContext.Provider
            value={musicPlayers}
        >
            {props.children}
        </MusicPlayersContext.Provider>
    );
};
