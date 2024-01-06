import DynamicBanner from "@/AtomicComponents/DynamicBanner";
import Footer from "@/AtomicComponents/Footer";
import Nav from "@/AtomicComponents/Nav";
import PreFooter from "@/AtomicComponents/PreFooter";
import Link from "next/link";
import React from "react";
import { RiArrowRightFill } from "react-icons/ri";
import { useState } from "react";


const About = () => {
  const images = ["/i1.jpg", "pic10.jpg", "/i2.jpg", "i3.jpg"];
  const [isModalOpen, setIsModalOpen] = useState(false);
  //const [modalImages, setModalImages] = useState([]); // Images for the modal

  // Function to open the modal
  const openModal = () => {
    //setModalImages();
    setIsModalOpen(true);
  };

  // Function to close the modal
  const closeModal = () => {
    setIsModalOpen(false);
  };
  return (
    <>
      <Nav active={3} />
      <DynamicBanner images={images}>
        <h1 className="text-white text-[4em] sm:text-[40px] font-[700]">
          ABOUT <span className="text-primary1">CREAM!</span>
        </h1>        
        <p className="text-primary1 font-[800] w-full text-center">
          Step into a realm where your desires are fulfilled in minutes, not
          hours
        </p>
        <button className="bg-primary1 text-black px-12 py-3 mt-3 rounded-md">
          Explore
        </button>
      </DynamicBanner>

      <div className="grid grid-cols-2 gap-20 sm:grid-cols-1 mx-xPadding my-44 sm:my-20 items-center">
        <div className="w-full cflexms gap-3">
          <h5>About CREAM Platform</h5>
          <h1 className="text-[2em] sm:text-[1.5em] font-[700]">
            THE FUTURE OF PROPERTY AND AUTOMOBILE SEARCH
          </h1>
          <p className="text-gray-500">
            Welcome to CREAM – a groundbreaking marketplace where technology
            meets desire. We're not just a platform; we're an innovation-driven
            solution that utilizes the incredible potential of artificial
            intelligence to redefine the way you explore real estate,
            automobiles, and resources.
          </p>
          <p className="text-gray-500">
            At CREAM, envision describing your dream property or automobile in
            plain text, and in moments, our AI reveals the best-matched options.
            This isn't magic; it's the power of technology making your search
            seamless, precise, and thrilling. We make your dreams come true in
            minutes, not hours, setting us apart from traditional marketplaces.
          </p>
          <p className="text-gray-500">
            Beyond borders, CREAM connects you to a realm of possibilities,
            whether it's a cozy home, a luxury estate in a different continent,
            a sleek car, or unique resources like a property manager for your
            vacation property. Our AI-powered approach accelerates your journey
            to find what you desire.
          </p>
          <p className="text-gray-500">
            As a community of seekers, CREAM's curated selection guarantees
            quality and relevance, elevating your experience. Join us in shaping
            the future of searching – where AI-driven discovery sparks new
            opportunities and redefines your journey. Explore, discover, and
            revolutionize your search with CREAM today."
          </p>

          <button className="flex gap-3 items-center px-10 py-3 mt-5 bg-primary1 rounded-md">
            Get Started <RiArrowRightFill />
          </button>
        </div>

        <div>
          <img src="/frame.jpg" alt="" />
        </div>
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-1 gap-20 mx-xPadding my-44 items-center">
        <div>
          <img src="/frame2.jpg" alt="" className="h-[400px] rounded-md" />
        </div>

        <div className="w-full cflexms gap-3">
          <h1 className="text-[2em] sm:text-[1.5em] font-[700]">
            Reasons For Our Establishment
          </h1>
          <p className="text-gray-500">
            At CREAM, we noticed the problems people face when looking for homes
            and cars online. Endless scrolling, confusing options, and
            uncertainty led us to rethink things. Our goal: change how you find
            and buy properties and automobiles.
          </p>
          <p className="text-gray-500">
            Imagine this: you tell us what you want, and our smart tech finds
            the perfect matches instantly. No more endless searches – we use
            clever AI to make your dreams real in minutes, not hours. But we're
            not just a marketplace; we're here to give you a whole new way of
            finding and buying.
          </p>
          <p className="text-gray-500">
            Welcome to CREAM, where your dream property or car is easy to find.
            We're all about making your wishes come true quickly and reliably.
            Join us and discover a simpler, better way to explore and succeed in
            the world of properties and automobiles.
          </p>
          <button className="flex gap-3 items-center px-10 py-3 mt-5 bg-black text-white rounded-md">
            Read More <RiArrowRightFill />
          </button>
        </div>
      </div>

      <div className="mx-xPadding my-20 sm:px-[10px] rounded-md bg-black text-white py-20 flex flex-col items-center justify-center">
        <p>
          HAVE ANY <span className="text-primary1">QUESTIONS</span>?
        </p>
        <p className="text-center">
          PLEASE REACH OUT TO US SO WE CAN HELP YOU BETTER.
        </p>
        <a
          href={"/contact-us"}
          className="bg-primary1 px-5 py-2 rounded-md mt-3 sm:mt-5"
        >
          Contact Us
        </a>
      </div>

      <Footer />
    </>
  );
};

export default About;
