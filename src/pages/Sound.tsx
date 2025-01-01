import useToast from '../hooks/useToast';
import { MusicPlayer, useMusicPlayers } from '../utils/MusicPlayer';

export const path = '/sound';

type SoundButtonProps = {
    label: string,
    player: MusicPlayer,
    isPlaying: boolean
}

function SoundButton( { player, isPlaying, label }: SoundButtonProps) {
    const toggleSound = () => {
        if(isPlaying) {
            player.pause()
        } else {
            player.play()
        }
    }

    return (
        <div className='w-[50%] aspect-square max-w-48 p-2 box-border'>
            <button
                onClick={toggleSound}
                className='h-full w-full'
            >
                {label} ({isPlaying ? 'On' : 'Off'})
            </button>
        </div>
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
                />
            ))}
        </ul>
        
    )
}