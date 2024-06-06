import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <div className="hero min-h-[calc(100vh-96px)] bg-base-100">
      <div className="hero-content flex-col lg:flex-row-reverse gap-8">
        <img
          src="images/hero.webp"
          className="max-w-[240px] md:max-w-sm mask mask-squircle shadow-2xl"
        />
        <div className="text-center lg:text-left">
          <h1 className="text-5xl font-bold">Feeling hungry?</h1>
          <p className="py-6 text-2xl">Order your favorite Pizza in minutes!</p>
          <Link to={"/menu"} className="btn btn-primary">
            Get Started
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Hero;
