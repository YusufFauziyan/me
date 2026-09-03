import Image from "next/image";
import WorkCarousel from "@/components/WorkCarousel";
import FlappyPixel from "@/components/FlappyPixel";
import JakartaClock from "@/components/JakartaClock";
import QuotePixels from "@/components/QuotePixels";
import Motion from "@/components/Motion";
import { site, projects, featuredProjects, skills, experience } from "@/lib/data";
import FeaturedSection from "@/components/FeaturedSection";

function Mark() {
  return (
    <svg viewBox="0 0 120 60" aria-hidden="true">
      <use href="#yf-mark" />
    </svg>
  );
}

export default function Home() {
  return (
    <>
      <Motion />

      <svg width="0" height="0" style={{ position: "absolute" }} aria-hidden="true">
        <symbol id="yf-mark" viewBox="0 0 120 60">
          <rect x="0" y="0" width="12" height="12" fill="currentColor" />
          <rect x="12" y="12" width="12" height="12" fill="currentColor" />
          <rect x="24" y="24" width="12" height="12" fill="currentColor" />
          <rect x="36" y="12" width="12" height="12" fill="currentColor" />
          <rect x="48" y="0" width="12" height="12" fill="currentColor" />
          <rect x="24" y="36" width="12" height="12" fill="currentColor" />
          <rect x="24" y="48" width="12" height="12" fill="currentColor" />
          <rect x="72" y="0" width="48" height="12" fill="currentColor" />
          <rect x="72" y="12" width="12" height="48" fill="currentColor" />
          <rect x="84" y="24" width="30" height="12" fill="currentColor" />
        </symbol>
      </svg>

      <main id="top">
        <header className="masthead">
          <div className="mh-l">
            <span className="mh-name">{site.name}</span>
            <span className="mh-sub mono">{site.role}</span>
          </div>
          <div className="mh-c">
            <Mark />
          </div>
          <div className="mh-r">
            <span className="mh-status mono">
              <i className="dot" aria-hidden="true" />
              Available for work
            </span>
            <span className="mh-sub mono">
              Jakarta, ID <JakartaClock />
            </span>
          </div>
        </header>

        <section className="hero" id="hero">
          <div className="hhead">
            <div className="hgrid">
              <h1 className="hl split-hold">
                <span className="ln-mask"><span className="ln-child">Fullstack,</span></span>
                <span className="ln-mask"><span className="ln-child">engineered.</span></span>
              </h1>
              <div className="hcol">
                <span className="rule-y" aria-hidden="true" />
                <p className="hdesc split-hold">
                  <span className="ln-mask"><span className="ln-child j">A developer &amp; problem</span></span>
                  <span className="ln-mask"><span className="ln-child j">solver for modern products</span></span>
                </p>
                <div className="hfoot">
                  <span className="wlogo fade-hold"><Mark /></span>
                  <p className="htag fade-hold">{site.tagline}</p>
                </div>
              </div>
            </div>
            <span className="rule-x" aria-hidden="true" />
          </div>

          {/* Closing bar for the hero. The 100vh section was ~700px of bare
              field between the headline and the first section. */}
          <div className="hcue fade-hold">
            <div className="hcue-in">
              <dl className="hstats">
                <div><dt className="mono">Years shipping</dt><dd>4+</dd></div>
                <div><dt className="mono">Projects live</dt><dd>7</dd></div>
                <div><dt className="mono">Daily drivers</dt><dd>Go / TS</dd></div>
              </dl>
              <p className="hplay mono">
                Move the cursor · double-click anywhere to detonate the grid
              </p>
              <a className="hscroll mono" href="#work">
                Selected work <span className="arw" aria-hidden="true">↓</span>
              </a>
            </div>
          </div>
        </section>

        <section className="intro">
          <div className="wrap">
            <p className="lead" data-split>
              Four years of shipping web and mobile products, from enterprise platforms to side
              projects that got a little out of hand. <em>But first, here&apos;s some work:</em>
            </p>
          </div>
        </section>

        <section className="caro" id="work" aria-label="Selected work">
          <WorkCarousel projects={projects} />
        </section>

        <div className="sheet">
          <section className="ed" id="about">
            <div className="wrap">
              <div className="head" data-reveal>
                <h2>Four years behind an espresso bar, first.</h2>
                <p className="kick mono">Where I come from</p>
              </div>
              <div className="body" data-reveal>
                <p>
                  Before I wrote a line of production code I pulled shots at Starbucks for four
                  years. It sounds like a detour. It wasn&apos;t. A busy bar teaches you the same
                  things a busy sprint does: the order of operations matters, the details are the
                  product, and nobody cares how hard it was if the cup is wrong.
                </p>
                <p>
                  In 2022 I went through the DumbWays bootcamp on the PERN stack, shipped an
                  e-commerce platform and a music player, and haven&apos;t stopped since. Two
                  engineering roles later I&apos;m building enterprise platforms, cross-platform
                  mobile apps, and big-data dashboards.
                </p>
                <p className="s">
                  Same discipline, different counter. Nothing half-finished goes out the door.
                </p>
              </div>
            </div>
          </section>
        </div>

        <div className="sheet">
          <section className="ed" id="approach">
            <div className="wrap">
              <div className="head" data-reveal>
                <h2>Shipping is easy. Keeping it shippable isn&apos;t.</h2>
                <p className="kick mono">How I work</p>
              </div>
              <div className="body" data-reveal>
                <p>
                  Anyone can get a feature working once. The interesting problem is the version that
                  still works in eighteen months, after four people have touched it and the
                  requirements moved twice.
                </p>
                <p>
                  So I optimise for the boring things: readable code, tested paths, honest error
                  handling, and a data model that doesn&apos;t need a comment to explain itself.
                  Performance work comes from measuring, not guessing.
                </p>
                <div className="two">
                  <div className="c">
                    <span className="chip" style={{ ["--c" as string]: "#d8ff00" }}>4+</span>
                    <div className="l mono">Years shipping</div>
                    <p>Enterprise platforms, real-time dashboards, and iOS/Android apps in production.</p>
                  </div>
                  <div className="c">
                    <span className="chip" style={{ ["--c" as string]: "#3b5bd9", ["--tc" as string]: "#fff" }}>10+</span>
                    <div className="l mono">Projects delivered</div>
                    <p>From internal tooling to public SaaS, front to back and everything in between.</p>
                  </div>
                </div>
                <p className="s" style={{ marginTop: "1.2em" }}>
                  The last ten percent — the empty states, the loading skeletons, the offline case —
                  is where a product stops feeling like a demo.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="quote">
          <div className="wrap">
            <div>
              <p className="q" data-split>Attention to detail isn&apos;t a phase. It&apos;s the whole job.</p>
              <p className="attr mono" data-reveal>
                {site.name} · {site.role}
              </p>
              <p className="after" data-reveal>
                Pixel-perfect interfaces, robust state management, and REST APIs that behave the
                same on a bad connection as on a good one.
              </p>
            </div>
            <QuotePixels />
          </div>
        </section>

        <section className="proc" id="skills">
          <div className="wrap">
            <div className="ph" data-reveal>
              <h2>
                Frontend. Backend.
                <br />
                Data. Mobile.
              </h2>
              <p className="pd">
                I work across the whole stack, which mostly means I know where the seams are and who
                has to fix them.
              </p>
            </div>
            <div className="donuts">
              {skills.map((s) => (
                <div className="step" key={s.n}>
                  <div className="dl">
                    <span className="dn">{s.n}</span>
                    <span className="dt">{s.title}</span>
                  </div>
                  <p className="dd">{s.description}</p>
                  <div className="chips">
                    {s.chips.map((c) => (
                      <span key={c}>{c}</span>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        <FeaturedSection projects={featuredProjects} />

        <div className="sheet">
          <section className="ed" id="experience">
            <div className="wrap">
              <div className="head" data-reveal>
                <h2>Where I&apos;ve been building.</h2>
                <p className="kick mono">Experience</p>
              </div>
              <div className="body" data-reveal>
                <p>
                  Currently a Software Engineer at PT Bodha Padma Nawadhya, leading development on
                  the EMAS enterprise platform and its iOS and Android clients. Before that,
                  fullstack work on VM management and big-data platforms across enterprise systems.
                </p>
                <ul className="pts">
                  {experience.map((e) => (
                    <li key={e.company}>
                      <span className="n mono">{e.period}</span>
                      <span>
                        <b>
                          {e.role}, {e.company}.
                        </b>{" "}
                        {e.description}
                      </span>
                    </li>
                  ))}
                </ul>
                <p className="s" style={{ marginTop: "1.2em" }}>
                  Full CV available on request, or grab the PDF below.
                </p>
              </div>
            </div>
          </section>
        </div>

        <section className="cta" id="contact">
          <div className="wrap">
            <h2 data-split>
              Let&apos;s build
              <br />
              something.
            </h2>
            <a className="ctabtn" href={`mailto:${site.email}`} data-reveal>
              Get in touch
            </a>
            <p className="meta" data-reveal>
              Based in Indonesia, open to remote work and interesting problems. If you have a
              product that needs shipping properly, I&apos;d like to hear about it.
            </p>
            <p className="meta" data-reveal>
              <a href={`mailto:${site.email}`}>{site.email}</a> ·{" "}
              <a href={site.github} target="_blank" rel="noopener noreferrer">GitHub</a> ·{" "}
              <a href={site.linkedin} target="_blank" rel="noopener noreferrer">LinkedIn</a> ·{" "}
              <a href={site.cv} target="_blank" rel="noopener noreferrer">CV</a>
            </p>
          </div>
        </section>
      </main>

      <FlappyPixel />

      <footer>
        <div className="wrap">
          <span className="mono">© {new Date().getFullYear()} {site.name}</span>
          <span className="mono">
            <a href="#top">Back to top</a>
          </span>
        </div>
      </footer>
    </>
  );
}
