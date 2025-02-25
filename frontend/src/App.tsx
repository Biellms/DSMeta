import Footer from "./components/Footer"
import Header from "./components/Header"
import SalesCard from "./components/SalesCard"
import { ToastContainer } from 'react-toastify';

function App() {
  return (
    <>
      <ToastContainer />

      <Header />

      <main>
        <section id="sales">
          <div className="dsmeta-container">
            <SalesCard />
          </div>
        </section>
      </main>

      <Footer />
    </>
  )
}

export default App