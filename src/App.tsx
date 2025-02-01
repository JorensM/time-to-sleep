import Router, { Link, useRouter } from './router/router'
import { routes } from './pages'
import { routes as routeNames } from './constants';
import { Analytics } from "@vercel/analytics/react";
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

  const router = useRouter();

  return (
      <div className='h-full flex flex-col'>
        <Analytics />
        <header className='flex justify-between items-center w-full py-4 px-4 border-b border-b-neutral-700 box-border'>
          <h1>
            <Link href={routeNames.app.url}>
              Time To Sleep
            </Link>
          </h1>
          {router.path !== '/' ?
            <Link href='/settings' className='text-neutral-400 focus-within:text-neutral-400'>
              Settings
            </Link>
          : null }
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
