import React from 'react';
import { Link } from 'react-router-dom';

const ResumePage = () => {
  return (
    <main className="min-h-screen bg-black text-white px-6 py-16">
      <div className="container max-w-4xl mx-auto">
        <div className="mb-8 flex items-center justify-between">
          <h1 className="text-4xl font-bold text-yellow-400">Luan Belon</h1>
          <Link className="btn btn-outline" to="/">
            Voltar ao Portfolio
          </Link>
        </div>

        <section className="card mb-6">
          <p>Salvador, Bahia, Brazil (Remote-friendly)</p>
          <p>Email: luanbelon@gmail.com | Phone: +55 (71) 98640-6627</p>
          <p>LinkedIn: linkedin.com/in/luansantos-dev | GitHub: github.com/luanbelon</p>
        </section>

        <section className="card mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">Professional Summary</h2>
          <p>
            Front-end and UX professional with experience building high-converting websites, portfolio
            experiences, and WordPress solutions for international clients. Strong focus on user-centered
            design, responsive interfaces, and measurable business outcomes.
          </p>
        </section>

        <section className="card mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">Skills</h2>
          <p>
            React, JavaScript, HTML, CSS, Tailwind, WordPress, Elementor, UX/UI, Figma, Accessibility,
            SEO Fundamentals, Client Communication, Agile Delivery.
          </p>
        </section>

        <section className="card mb-6">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">Professional Experience</h2>
          <div className="space-y-6">
            <div>
              <h3 className="font-semibold">Front-end Systems Analyst</h3>
              <p className="text-gray-300">Freelance / Agency Collaboration</p>
              <ul className="list-disc ml-5 text-gray-200">
                <li>Built and maintained websites with WordPress and custom front-end components.</li>
                <li>Delivered responsive UI with HTML, CSS, JavaScript, Angular, and Next.js.</li>
                <li>Collaborated with stakeholders to improve user flow and visual quality.</li>
              </ul>
            </div>
            <div>
              <h3 className="font-semibold">WordPress Developer</h3>
              <p className="text-gray-300">Freelance</p>
              <ul className="list-disc ml-5 text-gray-200">
                <li>Created institutional websites and ecommerce pages for local and international clients.</li>
                <li>Improved conversion through UX and content hierarchy updates.</li>
                <li>Maintained delivery quality and fast turnaround across multiple projects.</li>
              </ul>
            </div>
          </div>
        </section>

        <section className="card">
          <h2 className="text-2xl font-semibold mb-3 text-yellow-400">Education</h2>
          <p>Systems Analysis and Development (ongoing/complete, add your final status here).</p>
        </section>
      </div>
    </main>
  );
};

export default ResumePage;
