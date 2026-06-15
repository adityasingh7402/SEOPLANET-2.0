import React from "react";

const experience = [
  {
    role: "Senior Frontend Engineer",
    company: "SEO Planet",
    year: "2024 - Present",
    desc: "Leading the development of high-performance web applications and algorithmic SEO platforms."
  },
  {
    role: "UI/UX Developer",
    company: "Creative Studio",
    year: "2022 - 2024",
    desc: "Designed and built converting landing pages for SaaS startups."
  },
  {
    role: "Web Developer",
    company: "Freelance",
    year: "2019 - 2022",
    desc: "Worked with over 20 clients globally to deliver custom websites and digital experiences."
  }
];

export default function Experience() {
  return (
    <section id="about" className="py-20">
      <div className="flex flex-col md:flex-row justify-between md:items-end gap-12 mb-16">
        <h2 className="text-4xl font-bold tracking-tight">Experience</h2>
        <a href="#cv" className="text-sm font-medium hover:text-[#FF8A00] transition-colors pb-1 border-b border-white/20 inline-block w-fit">
          Download CV
        </a>
      </div>

      <div className="space-y-12">
        {experience.map((exp, i) => (
          <div key={i} className="grid grid-cols-1 md:grid-cols-12 gap-4 md:gap-8 group">
            <div className="md:col-span-3 text-sm font-medium text-white/40 pt-1">
              {exp.year}
            </div>
            <div className="md:col-span-9 border-t border-white/10 pt-6 group-hover:border-white/30 transition-colors">
              <h3 className="text-2xl font-medium mb-1">{exp.role}</h3>
              <div className="text-[#FF8A00] font-medium mb-4">{exp.company}</div>
              <p className="text-white/60 max-w-2xl leading-relaxed">
                {exp.desc}
              </p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
