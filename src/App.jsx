import { Outlet } from "react-router-dom"
import Navbar from "./components/Navbar"
import Footer from "./components/Footer"
import { Toaster } from "sonner"

const App = () => {
  return (
    <div>
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