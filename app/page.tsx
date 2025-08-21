import MaxWidthWrapper from "@/components/MaxWidthWrapper";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import About from "@/components/About";
import Features from "@/components/Features";
import Testimonials from "@/components/Testimonials";
import Footer from "@/components/Footer";

const Home = () => {
  return ( 
    <>
       <Navbar />
      <MaxWidthWrapper className="mb-12 mt-28 sm:mt-32 flex flex-col items-center justify-center text-center">
       <div className="mx-auto mb-4 flex max-w-fit items-center justify-center space-x-2 overflow-hidden rounded-full border border-gray-200 bg-white px-7 py-2 shadow-md backdrop-blur transition-all hover:border-gray-300 hover:bg-white/50">
      <p className="text-small font-semibold text-blue-800">
        RecallMind is now public!
      </p>
      </div>
      <h1 className="max-w-4xl text-4xl font-bold md:text-5xl lg:text-6xl">Transform Your Content into <span className="text-blue-600">Knowledge</span> Instantly.</h1>
      <p className="mt-5 max-w-prose text-zinc-700 text-base sm:text-lg">RecallMind helps you summarize and manage content from various sources. Save, organize, and recall information effortlessly.</p>

      <Link className={buttonVariants({
        size: 'lg',
        className: 'mt-5'
      })} href='/workspace'> Workspace <ArrowRight className="ml-2 h-5 w-5" /> </Link>
        
        <About  />
        <Features />
        <Testimonials />
      </MaxWidthWrapper>
      <Footer />
    </>
   );
}
 
export default Home;