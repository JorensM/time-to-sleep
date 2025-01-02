import Router, { Link } from './router/router'
import { routes } from './pages'
// import { useMusicPlayer } from './utils/MusicPlayer'

function App() {

  // const { player, playing } = useMusicPlayer();

  //   const toggleMusic = () => {
  //       if(playing) {
  //           player.pause();
  //       } else {
  //           player.play();
  //       }
  //   }

  return (
      <div className='h-full flex flex-col'>
        <header className='flex justify-between items-center w-full py-4 px-4 border-b border-b-neutral-700 box-border'>
          <h1>
            <Link href='/'>
              Time To Sleep
            </Link>
          </h1>
          <Link href='/settings' className='text-neutral-400 focus-within:text-neutral-400'>
            Settings
          </Link>
        </header>
        <main className='p-4 flex-grow box-border'>
          <Router
            routes={routes}
          />
          
        </main>
      </div>
  )
}

export default App
