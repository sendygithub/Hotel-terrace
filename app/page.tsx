import Hero from "@/components/navbar/Hero"
import Card from "@/components/navbar/card";
import Main from "@/components/main";
import contactform from "@/components/contactform";
import Headersection from "@/components/header-section";


export default function Home() {
  return (
    <div>
      <Hero/>
      <div className="mt-16">
        <div className="text-center">
          <h1 className="text-4xl font-bold uppercase"> Room & Rates</h1>
          <p className="py-3">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Modi expedita dolorem vero sed quo vel.
          </p>
        </div>
        <Main />
      </div>
    </div>     
  );
}
