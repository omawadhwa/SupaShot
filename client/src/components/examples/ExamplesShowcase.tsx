import React from "react";
import { Link } from "wouter";
import { Button } from "@/components/ui/button";

interface ExampleCard {
  id: number;
  title: string;
  description: string;
  backgroundClass: string;
  imageUrl: string;
}

const exampleCards: ExampleCard[] = [
  {
    id: 1,
    title: "Analytics Dashboard",
    description: "Clean dashboard UI with gradient background and soft shadows",
    backgroundClass: "bg-[#e6d9c2]",
    imageUrl: "https://cdn.dribbble.com/userupload/11661854/file/original-21af75c26dbae03b13a381c28eceec3a.png?resize=752x"
  },
  {
    id: 2,
    title: "Mobile App Design",
    description: "Modern mobile interface with vibrant gradient background",
    backgroundClass: "bg-gradient-to-r from-purple-200 to-pink-200",
    imageUrl: "https://cdn.dribbble.com/userupload/11519262/file/original-f42aec2ee1faf7c0c97c6df7a8da6309.jpg?resize=752x"
  },
  {
    id: 3,
    title: "Code Snippet",
    description: "Developer-friendly code presentation with clean surrounding frame",
    backgroundClass: "bg-gradient-to-r from-cyan-200 to-blue-200",
    imageUrl: "https://cdn.dribbble.com/userupload/12029467/file/original-d6b15ba8ba64909dd62bf6d8e3578cd3.jpg?resize=752x"
  },
  {
    id: 4,
    title: "Website Mockup",
    description: "Professional website presentation with warm yellow gradient",
    backgroundClass: "bg-gradient-to-r from-amber-200 to-yellow-200",
    imageUrl: "https://cdn.dribbble.com/userupload/9979425/file/original-5fbf8ab78ca5ab2e7aece681de726848.png?resize=752x"
  },
  {
    id: 5,
    title: "Social Media Post",
    description: "Eye-catching social media content with fresh green background",
    backgroundClass: "bg-gradient-to-r from-green-200 to-emerald-200",
    imageUrl: "https://cdn.dribbble.com/userupload/11971766/file/original-14b7d32d8f9ddd12a2ba84cdfcf2e94c.png?resize=752x"
  },
  {
    id: 6,
    title: "Product Interface",
    description: "Showcasing user interface with warm gradient background",
    backgroundClass: "bg-gradient-to-r from-orange-200 to-rose-200",
    imageUrl: "https://cdn.dribbble.com/userupload/11740225/file/original-3fb0dcbbe5c10fa01a0fd6d611b99f7c.jpg?resize=752x"
  }
];

const ExamplesShowcase: React.FC = () => {
  return (
    <section className="mt-16 mb-10">
      <h2 className="text-2xl font-bold text-gray-800 mb-6 text-center">Beautiful Screenshot Examples</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {exampleCards.map(card => (
          <div 
            key={card.id}
            className="bg-white rounded-lg overflow-hidden shadow-md hover:shadow-lg transition-shadow"
          >
            <div className={`p-3 ${card.backgroundClass}`}>
              <div className="rounded-lg overflow-hidden">
                <img 
                  src={card.imageUrl}
                  alt={card.title} 
                  className="w-full h-auto object-cover"
                />
              </div>
            </div>
            <div className="p-4">
              <h3 className="font-medium text-gray-800">{card.title}</h3>
              <p className="text-sm text-gray-500 mt-1">{card.description}</p>
            </div>
          </div>
        ))}
      </div>
      <div className="mt-8 text-center">
        <Link href="/editor">
          <Button className="bg-[#10b981] hover:bg-[#0d9669] text-white">
            Create Your Own
          </Button>
        </Link>
      </div>
    </section>
  );
};

export default ExamplesShowcase;
