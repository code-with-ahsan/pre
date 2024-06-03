import { Outlet } from "react-router-dom";
import Header from "../components/Header";

const Root = () => {
  return (
    <>
      <Header />
      <main>
        <div className="py-4 min-h-[calc(100vh-66px)] bg-base-100">
          <section className="max-w-3xl mx-auto">
            <Outlet />
          </section>{" "}
        </div>
      </main>
    </>
  );
};

export default Root;
