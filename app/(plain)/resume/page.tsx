export default function ResumePage() {
  return (
    <main className="prose prose-neutral max-w-3xl mx-auto py-12 px-4">
      <header className="not-prose mb-12 text-center">
        <h1 className="text-4xl font-bold tracking-tight">
          Ahmad Hanaffi Rahmadhani
        </h1>
        <p className="text-gray-600">Special Region Yogyakarta, Indonesia</p>
        <p className="text-sm text-gray-500 mt-1">
          <a href="mailto:you@example.com" className="hover:underline">
            laznology.dev@gmail.conm
          </a>{" "}
          •{" "}
          <a href="https://t.me/username" className="hover:underline">
            Telegram
          </a>{" "}
          •{" "}
          <a href="https://github.com/Laznology" className="hover:underline">
            GitHub
          </a>{" "}
          •{" "}
          <a
            href="https://www.linkedin.com/in/ahmad-hanaffi/"
            className="hover:underline"
          >
            LinkedIn
          </a>{" "}
          •{" "}
          <a href="https://laznology.dev" className="hover:underline">
            Website
          </a>
        </p>
      </header>

      <section>
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Summary
        </h2>
        <p>
          Hello! I&apos;m Ahmad Hanaffi, a detail-oriented Web Developer passionate about building efficient and
          intuitive digital solutions. Skilled in both frontend and backend
          development, with a focus on performance optimization, scalability,
          and clean code practices. Values clear communication and active
          collaboration across teams to deliver maintainable and impactful
          products. Continuously learning and refining techniques to ensure
          technical relevance and long-term quality.
        </p>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Education
        </h2>
        <div>
          <h3 className="font-medium text-lg">SMK Negeri 2 Depok Sleman</h3>
          <p className="text-sm text-gray-600">
            Major: Sistem Informasi Jaringan Aplikasi — 2022–2026
          </p>
          <p>
            Focus on website development, API, Database and system
            administration.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Technical Skills
        </h2>
        <ul className="grid grid-cols-2 list-disc list-inside">
          <li>HTML / CSS / JavaScript</li>
          <li>React / Next.js</li>
          <li>Laravel </li>
          <li>MySQL / Supabase / PostgreSQL</li>
          <li>REST API </li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Soft Skills
        </h2>
        <ul className="grid grid-cols-2 list-disc list-inside">
          <li>Problem Solving</li>
          <li>Team Collaboration</li>
          <li>Time Management</li>
          <li>Adaptability</li>
          <li>Attention to Detail</li>
        </ul>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Projects
        </h2>
        <article className="mb-6">
          <h3 className="font-medium text-lg">
            <a
              href="https://github.com/Laznology/laznology"
              className="hover:underline"
            >
              Laznology.dev
            </a>
          </h3>
          <p className="text-sm text-gray-600">
            Next.js • TailwindCSS • TypeScript • GSAP (Green Sock Animation
            Paltform)
          </p>
          <p>
            A personal portfolio website showcasing projects, resume, and blog,
            built with modern web technologies for a clean and responsive user
            experience.
          </p>
        </article>

        <article className="mb-6">
          <h3 className="font-medium text-lg">
            <a
              href="https://github.com/Laznology/kebon"
              className="hover:underline"
            >
              Kebon
            </a>
          </h3>
          <p className="text-sm text-gray-600">
            Next.js • TailwindCSS • Tiptap • PostgreSQL
          </p>
          <p>
            Blogging web app with a Notion-style editor. Basically you write in
            blocks instead of one big text area, so you can drag things around,
            split into sections, drop in quotes, lists, or code blocks just by
            typing /. The whole thing feels closer to building with Lego than
            filling a form.
          </p>
        </article>
      </section>
      <section className="mt-10">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Experience
        </h2>

        <div className="mb-6">
          <h3 className="font-medium text-lg">
            Fullstack Developer (Internship){" "}
            <span className="text-gray-600 text-base">
              — PT Teknologi Nusantara
            </span>
          </h3>
          <p className="text-sm text-gray-600">Jul 2025 - Present </p>
          <p>
            Interned as a Fullstack Developer while also taking on the role of
            Project Lead. Actively participated in code reviews, provided
            technical considerations to the Project Manager, and revised
            workflow processes to improve efficiency. Additionally contributed
            to selecting the project’s technology stack, proposing simplified
            solutions, and sharing insights with the Project Manager to maintain
            development relevance and effectiveness.
          </p>
        </div>

        <div>
          <h3 className="font-medium text-lg">
            Frontend Developer & API Tester{" "}
            <span className="text-gray-600 text-base">
              — PT Solusi Karya Technology Indonesia
            </span>
          </h3>
          <p className="text-sm text-gray-600">Apr 2025 – Present</p>
          <p>
            Serving as a Frontend Developer & API Tester for the School
            Information Management Website project. Responsible for implementing
            UI/UX designs into the frontend to ensure a seamless user experience
            across key features such as industry listings, internship
            submissions, and student attendance. Also involved in API testing to
            validate performance and feature alignment with the user journey,
            while actively collaborating with the Project Manager on system
            planning and workflow validation.
          </p>
        </div>
      </section>

      <section className="mt-10">
        <h2 className="text-2xl font-semibold border-b border-gray-300 pb-1 mb-4">
          Contact
        </h2>
        <p>
          Open to collaborations or freelance projects,
        </p>
        <ul className="list-disc list-inside">
          <li>
            Email:{" "}
            <a
              href="mailto:laznology.dev@gmail.com"
              className="hover:underline"
            >
              laznology.dev@gmail.com
            </a>
          </li>
          <li>
            Telegram:{" "}
            <a href="https://t.me/Laztech" className="hover:underline">
              @Laztech
            </a>
          </li>
        </ul>
      </section>
    </main>
  );
}
