import { Outlet } from "react-router-dom"
import Header from "./components/Header"
import Footer from "./components/Footer"
import { Toaster } from "sonner"

const App = () => {
  return (
    <div>
      <Header />
        <main className="bg-slate-100">
          <Outlet />
        </main>
      <Footer />

      <Toaster />
    </div>
  )
}

export default App