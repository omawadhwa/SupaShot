import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

const CallToAction: React.FC = () => {
  return (
    <section className="py-12 px-4 sm:px-6 lg:px-8 bg-white rounded-xl shadow-sm border border-gray-100 mb-10">
      <div className="max-w-3xl mx-auto text-center">
        <h2 className="text-3xl font-bold text-gray-900 mb-4">Ready to enhance your screenshots?</h2>
        <p className="text-lg text-gray-600 mb-8">
          Create stunning visuals for your social media, documentation, or presentations in seconds.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link href="/editor">
            <Button 
              size="lg" 
              className="bg-[#10b981] hover:bg-[#0d9669] text-white w-full sm:w-auto"
            >
              Start Creating For Free
            </Button>
          </Link>
          <Link href="/pricing">
            <Button 
              variant="outline" 
              size="lg"
              className="w-full sm:w-auto"
            >
              View Pricing Plans
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default CallToAction;
