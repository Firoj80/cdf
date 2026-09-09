// This is file with demos of your component
// Each export is one usecase for your component

import { Component } from "@/components/ui/image-auto-slider";

const images = [
  "https://images.pexels.com/photos/3762453/pexels-photo-3762453.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=800",
  "https://images.pexels.com/photos/3762402/pexels-photo-3762402.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=800",
  "https://images.pexels.com/photos/3762400/pexels-photo-3762400.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=800",
  "https://images.pexels.com/photos/3762407/pexels-photo-3762407.jpeg?auto=compress&cs=tinysrgb&fit=crop&w=800&h=800",
];

const DemoOne = () => (
  <Component
    speed={60}
    items={images.map((src, i) => (
      <div
        key={i}
        className="w-64 h-64 rounded-xl overflow-hidden shadow-2xl bg-slate-900"
      >
        <img
          src={src}
          alt={`Gallery ${i + 1}`}
          className="w-full h-full object-cover"
          loading="lazy"
        />
      </div>
    ))}
  />
);

export { DemoOne };
