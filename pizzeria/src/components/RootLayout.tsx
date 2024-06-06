import { Outlet } from "react-router-dom"
import Header from "./Header"

const RootLayout = () => {
  return (
    <>
      <Header />
      <main>
        <div className="py-4 bg-base-100">
          <section className="max-w-3xl mx-auto">
            <Outlet />
          </section>
        </div>
      </main>
    </>
  )
}

export default RootLayout