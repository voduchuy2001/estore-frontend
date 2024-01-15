import { Outlet } from 'react-router-dom'
import Navbar from './components/Navbar'
import Footer from './components/Footer'
import { Toaster } from 'sonner'

const App = () => {
  return (
    <div className="h-full dark:bg-slate-700">
      <Navbar />
      <main>
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </div>
  )
}

export default App
