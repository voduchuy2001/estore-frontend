import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Toaster } from "sonner"

const App = () => {
  return (
    <div>
      <Navbar />
        <main className="bg-slate-100 dark:bg-slate-700">
          <Outlet />
        </main>
      <Footer />

      <Toaster />
    </div>
  )
}

export default App