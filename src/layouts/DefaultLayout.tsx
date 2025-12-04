import MeNavigation from '@/components/MeNavigation'
import { Outlet } from 'react-router'

const DefaultLayout = () => {
  return (
    <div className='bg-neutral-100 w-full min-h-screen'>
      <header className='h-14 px-3 border-b flex items-center justify-between bg-white shadow fixed top-0 w-full z-100'>
        <div className="font-bold text-xl">MyPorto</div>
        <MeNavigation />
      </header>
      <main className='w-full min-h-screen pt-14 px-3'>
        <Outlet />
      </main>
    </div>
  )
}

export default DefaultLayout