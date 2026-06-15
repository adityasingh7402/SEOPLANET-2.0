import React from "react";

const capabilities = [
  "Frontend Development",
  "React & Next.js",
  "UI/UX Design",
  "Framer Motion Animations",
  "Tailwind CSS",
  "Technical SEO",
  "Conversion Rate Optimization",
  "Web Performance"
];

export default function Capabilities() {
  return (
    <section className="py-20">
      <h2 className="text-4xl font-bold tracking-tight mb-12">Capabilities</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-x-4 gap-y-8">
        {capabilities.map((c, i) => (
          <div key={i} className="flex flex-col gap-4">
            <div className="w-full h-[1px] bg-white/10" />
            <div className="font-medium text-white/80">{c}</div>
          </div>
        ))}
      </div>
    </section>
  );
}
