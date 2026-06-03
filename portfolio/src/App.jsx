const skills = [
  { title: 'React.js', level: 'Expert' },
  { title: 'Tailwind CSS', level: 'Modern UI' },
  { title: 'JavaScript & TypeScript', level: 'Clean architecture' },
  { title: 'Responsive design', level: 'Mobile-first' },
]

const projects = [
  {
    name: 'Brand Website',
    description: 'High-converting landing pages for startups and agencies.',
  },
  {
    name: 'Dashboard UI',
    description: 'Data-forward admin dashboards with strong usability.',
  },
  {
    name: 'E-commerce App',
    description: 'Fast shopping experiences with real checkout flows.',
  },
]

function App() {
  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="pointer-events-none fixed inset-x-0 top-0 h-40 bg-gradient-to-b from-slate-900 via-slate-950/80 to-transparent opacity-90" />
      <div className="mx-auto max-w-7xl px-6 py-8 lg:px-8">
        <header className="flex flex-col gap-5 border-b border-slate-700/70 pb-6 md:flex-row md:items-center md:justify-between">
          <div>
            <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Divy Dadhich</p>
            <h1 className="mt-4 text-4xl font-semibold tracking-tight text-white sm:text-5xl">
              UI-focused React developer building polished products for teams and freelancers.
            </h1>
            <p className="mt-4 max-w-2xl text-base leading-8 text-slate-400 sm:text-lg">
              I design fast, modern portfolio experiences that feel personal and carry a professional edge. Ready to help companies hire a reliable React developer or deliver freelance websites that convert.
            </p>
          </div>

          <nav className="flex flex-wrap items-center gap-3 text-sm text-slate-400">
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white" href="#about">About</a>
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white" href="#skills">Skills</a>
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white" href="#work">Work</a>
            <a className="rounded-full px-4 py-2 transition hover:bg-slate-800 hover:text-white" href="#contact">Contact</a>
          </nav>
        </header>

        <main className="mt-12 space-y-20">
          <section id="about" className="grid gap-8 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
            <div className="space-y-6">
              <span className="inline-flex items-center rounded-full bg-emerald-500/15 px-3 py-1 text-sm text-emerald-300 ring-1 ring-emerald-300/20">
                Freelance + full-time ready
              </span>
              <h2 className="text-3xl font-semibold tracking-tight text-white sm:text-4xl">
                Human-first digital products with a polished React foundation.
              </h2>
              <p className="max-w-2xl text-base leading-8 text-slate-400">
                I help brands and agencies turn simple ideas into websites that feel handcrafted, modern, and highly usable. The result is fast, accessible, and easy to maintain.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-6 shadow-[0_20px_55px_-35px_rgba(14,165,233,0.55)]">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Experience</p>
                  <p className="mt-3 text-3xl font-semibold text-white">3+ years</p>
                  <p className="mt-2 text-slate-400">Building web apps, landing pages, and design systems in React.</p>
                </div>
                <div className="rounded-3xl border border-slate-700/80 bg-slate-900/70 p-6">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Projects</p>
                  <p className="mt-3 text-3xl font-semibold text-white">15+</p>
                  <p className="mt-2 text-slate-400">Completed freelance builds, marketing sites, and internal dashboards.</p>
                </div>
              </div>
            </div>
            <div className="relative overflow-hidden rounded-[2rem] border border-slate-700/70 bg-slate-900/80 p-6 shadow-2xl shadow-slate-950/40">
              <div className="absolute inset-x-0 top-0 h-36 bg-gradient-to-b from-emerald-500/20 via-transparent to-transparent" />
              <div className="relative rounded-[1.75rem] border border-slate-700/80 bg-slate-950 p-7">
                <div className="space-y-5">
                  <div className="flex items-center justify-between gap-4">
                    <div>
                      <p className="text-sm uppercase tracking-[0.32em] text-slate-500">Featured</p>
                      <h3 className="mt-3 text-xl font-semibold text-white">Dev brand refresh</h3>
                    </div>
                    <span className="rounded-full bg-emerald-500/10 px-3 py-1 text-xs text-emerald-300">React</span>
                  </div>
                  <p className="text-slate-400">
                    Designed and shipped a sales-focused portfolio experience with motion, fine typography, and a smooth CTA path.
                  </p>
                  <div className="grid gap-3 sm:grid-cols-2">
                    <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-300">Fast build times</div>
                    <div className="rounded-3xl bg-slate-900/70 p-4 text-sm text-slate-300">Reusable components</div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section id="skills">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Core skills</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Tools I use to ship quality work.</h2>
              </div>
              <p className="max-w-xl text-slate-400">
                Everything is built around modern React, responsive UI, and performance that feels fast on every device.
              </p>
            </div>

            <div className="mt-10 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
              {skills.map((skill) => (
                <div key={skill.title} className="rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/50 hover:bg-slate-900/95">
                  <p className="text-sm uppercase tracking-[0.32em] text-slate-500">{skill.title}</p>
                  <p className="mt-4 text-xl font-semibold text-white">{skill.level}</p>
                </div>
              ))}
            </div>
          </section>

          <section id="work">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Work samples</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Design-led web projects with a strong code base.</h2>
              </div>
            </div>

            <div className="mt-10 grid gap-5 lg:grid-cols-3">
              {projects.map((project) => (
                <article key={project.name} className="group overflow-hidden rounded-3xl border border-slate-700/80 bg-slate-900/80 p-6 transition hover:-translate-y-1 hover:border-emerald-400/50">
                  <div className="flex items-center justify-between">
                    <h3 className="text-xl font-semibold text-white">{project.name}</h3>
                    <span className="text-xs uppercase tracking-[0.32em] text-slate-500">Project</span>
                  </div>
                  <p className="mt-4 text-slate-400">{project.description}</p>
                  <div className="mt-6 flex items-center gap-3 text-sm text-emerald-300">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-2xl bg-emerald-500/10">→</span>
                    <span>See case study</span>
                  </div>
                </article>
              ))}
            </div>
          </section>

          <section id="contact" className="rounded-[2rem] border border-slate-700/80 bg-slate-900/80 p-10 shadow-xl shadow-slate-950/30">
            <div className="grid gap-6 lg:grid-cols-[1.3fr_0.9fr] lg:items-center">
              <div>
                <p className="text-sm uppercase tracking-[0.32em] text-emerald-400/80">Let’s talk</p>
                <h2 className="mt-3 text-3xl font-semibold tracking-tight text-white sm:text-4xl">Ready to start your next React project?</h2>
                <p className="mt-4 max-w-xl text-slate-400">
                  I build websites for hire and freelance clients. Send a quick note, and I’ll reply fast with a clear scope and timeline.
                </p>
              </div>
              <div className="space-y-4 rounded-3xl bg-slate-950/80 p-6 text-slate-300 ring-1 ring-slate-500/10">
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Email</p>
                  <p className="mt-2 text-lg text-white">hello@divyportfolio.dev</p>
                </div>
                <div>
                  <p className="text-xs uppercase tracking-[0.32em] text-slate-500">Availability</p>
                  <p className="mt-2 text-lg text-white">Open for freelance and full-time work</p>
                </div>
                <a className="inline-flex items-center justify-center rounded-full bg-emerald-500 px-5 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400" href="mailto:hello@divyportfolio.dev">
                  Email me
                </a>
              </div>
            </div>
          </section>
        </main>
      </div>
    </div>
  )
}

export default App
