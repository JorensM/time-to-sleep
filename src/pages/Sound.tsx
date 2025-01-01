import { useEffect } from 'react';
import { MusicPlayer, useMusicPlayers } from '../utils/MusicPlayer';
import useSettings from '../hooks/useSettings';

export const path = '/sound';

type SoundButtonProps = {
    label: string,
    player: MusicPlayer,
    isPlaying: boolean,
    _key: string
}

function SoundButton( { player, isPlaying, label, _key }: SoundButtonProps) {

    const { settings, updateSettings } = useSettings();

    const toggleSound = () => {
        if(isPlaying) {
            updateSettings({soundsPlaying: settings.soundsPlaying.filter(sound => sound !== _key)});
            player.pause()
        } else {
            updateSettings({soundsPlaying: [...settings.soundsPlaying, _key]})
            player.play()
        }
    }

    return (
        <li className='w-[50%] aspect-square max-w-48 p-2 box-border' key={_key}>
            {_key}
            <button
                onClick={toggleSound}
                className='h-full w-full'
            >
                {label} ({isPlaying ? 'On' : 'Off'})
            </button>
        </li>
    )
}

export default function SoundPage() {

    const players = useMusicPlayers();

    return(
        <ul className='flex flex-wrap'>
            {Object.entries(players.players).map(([key, player]) => (
                <SoundButton
                    player={player}
                    label={player.name}
                    isPlaying={players.isPlaying(key)}
                    _key={key}
                />
            ))}
        </ul>
        
    )
}