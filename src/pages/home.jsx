import React, { useState, useEffect } from 'react';
import About from "../components/About";
import Box from "../components/Box";
import Hero from "../components/Hero";
import Kizuki from "../components/Kizuki";
import Hashira from "../components/Hashira";
import { Developer } from "../components/Developer";
import { Footer } from "../components/Footer";
import TogameSectionButton from '../components/togameSectionButton';
import Loader from '../components/loader';

const preloadVideo = (videoSrc) => {
  return new Promise((resolve, reject) => {
    const video = document.createElement('video');
    video.src = videoSrc;
    video.onloadeddata = resolve;
    video.onerror = reject;
  });
};

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const videoAssets = [
      "videos/hero-1.mp4",
      "videos/hero-2.mp4",
      "videos/hero-3.mp4",
    ];

    const minLoadingTime = 2000; // Minimum loading time of 2 seconds
    const startTime = Date.now();

    Promise.all(videoAssets.map(preloadVideo))
      .then(() => {
        const elapsedTime = Date.now() - startTime;
        const remainingTime = minLoadingTime - elapsedTime;
        if (remainingTime > 0) {
          setTimeout(() => setIsLoading(false), remainingTime);
        } else {
          setIsLoading(false);
        }
      })
      .catch(() => setIsLoading(false)); // Fallback to hide loader if preload fails
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader />
      ) : (
        <main className="relative min-h-screen w-screen">
          <Hero />
          <About />
          <Box />
          <Kizuki />
          <Hashira />
          <TogameSectionButton />
          <Developer />
          <Footer />
        </main>
      )}
    </>
  );
};

export default Home;
