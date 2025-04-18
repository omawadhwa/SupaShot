import React from "react";
import { Link } from "wouter";
import ExamplesShowcase from "@/components/examples/ExamplesShowcase";
import CallToAction from "@/components/common/CallToAction";
import { Button } from "@/components/ui/button";

const Home: React.FC = () => {
  return (
    <div className="py-6">
      {/* Hero section */}
      <section className="py-12 flex flex-col items-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
          Beautify Your Screenshots
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-8">
          Quickly create stunning screenshots for social media with customizable backgrounds, 
          browser frames, aspect ratios, borders, and more. Enhance your posts in just a few clicks!
        </p>
        <Link href="/editor">
          <Button size="lg" className="bg-[#10b981] hover:bg-[#0d9669] text-white">
            Start Creating Now
          </Button>
        </Link>
      </section>

      {/* Features section */}
      <section className="py-12">
        <h2 className="text-3xl font-bold text-center mb-12">Powerful Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-[#d8c9ad] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10b981]">
                <path d="M15 2H9a1 1 0 0 0-1 1v2c0 .6.4 1 1 1h6c.6 0 1-.4 1-1V3c0-.6-.4-1-1-1Z"/>
                <path d="M8 4H6a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V6a2 2 0 0 0-2-2h-2"/>
                <path d="M12 11v6"/>
                <path d="m9 14 3-3 3 3"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Easy Upload</h3>
            <p className="text-gray-600">
              Drag and drop your screenshots or capture websites directly by URL. Works with all common image formats.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-[#d8c9ad] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10b981]">
                <path d="M12 20a8 8 0 1 0 0-16 8 8 0 0 0 0 16Z"/>
                <path d="M12 14a2 2 0 1 0 0-4 2 2 0 0 0 0 4Z"/>
                <path d="M12 2v2"/>
                <path d="M12 22v-2"/>
                <path d="m17 20.66-1-1.73"/>
                <path d="M11 10.27 7 3.34"/>
                <path d="m20.66 17-1.73-1"/>
                <path d="m3.34 7 1.73 1"/>
                <path d="M14 12h8"/>
                <path d="M2 12h2"/>
                <path d="m20.66 7-1.73 1"/>
                <path d="m3.34 17 1.73-1"/>
                <path d="m17 3.34-1 1.73"/>
                <path d="m7 20.66 1-1.73"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Custom Backgrounds</h3>
            <p className="text-gray-600">
              Choose from solid colors, beautiful gradients, or transparent backgrounds to make your screenshots pop.
            </p>
          </div>
          
          <div className="bg-white p-6 rounded-lg shadow-sm">
            <div className="h-12 w-12 bg-[#d8c9ad] rounded-lg flex items-center justify-center mb-4">
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-[#10b981]">
                <path d="M21 16V8a2 2 0 0 0-1-1.73l-7-4a2 2 0 0 0-2 0l-7 4A2 2 0 0 0 3 8v8a2 2 0 0 0 1 1.73l7 4a2 2 0 0 0 2 0l7-4A2 2 0 0 0 21 16z"/>
                <polyline points="3.29 7 12 12 20.71 7"/>
                <line x1="12" y1="22" x2="12" y2="12"/>
              </svg>
            </div>
            <h3 className="text-xl font-semibold mb-2">Frame Templates</h3>
            <p className="text-gray-600">
              Apply professional frame templates to give your screenshots a polished look. Choose from various styles.
            </p>
          </div>
        </div>
      </section>

      {/* Example showcase */}
      <ExamplesShowcase />

      {/* Call to action */}
      <CallToAction />
    </div>
  );
};

export default Home;
