import React , {useState , useEffect} from 'react'
import About from "../components/About";
import Box from "../components/Box";
import Hero from "../components/Hero";
import Kizuki from "../components/Kizuki";
import Hashira from "../components/Hashira";
import { Developer } from "../components/Developer";
import { Footer } from "../components/Footer";
import TogameSectionButton from '../components/togameSectionButton';
import Loader from '../components/loader';

const Home = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false); 
    }, 2000); 
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      {isLoading ? (
        <Loader/>
) :
        (
        <main className="relative min-h-screen w-screen">
        <Hero />
        <About />
        <Box />
        <Kizuki />
        <Hashira />
        <TogameSectionButton/>
        <Developer />
        <Footer />
      </main>)}
    </>
  )
}

export default Home

