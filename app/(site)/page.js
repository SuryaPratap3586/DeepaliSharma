import Link from "next/link";
import { getSite } from "@/lib/db";
import { slugOf } from "@/lib/util";
import Reveal from "@/components/Reveal";
import FeaturedTrack from "@/components/FeaturedTrack";
import SocialMarquee from "@/components/SocialMarquee";
import ContactForm from "@/components/ContactForm";
export const dynamic = "force-dynamic";
const TL = ({ a }) =>
  a.map((x, i) => (
    <Reveal key={i} delay={i * 90} variant="right">
      <div className="tc">
        <small>{x.year}</small>
        <h4>{x.title}</h4>
        <p>{x.place}</p>
      </div>
    </Reveal>
  ));
// Education: image beside the details when one is uploaded, otherwise centered text.
const Edu = ({ a }) => (
  <div className="edu-list">
    {a.map((x, i) => (
      <Reveal key={i} delay={i * 110} variant="zoom">
        <div className={"edu" + (x.image ? " has-img" : "")}>
          {x.image && (
            <div className="edu-img">
              <img src={x.image} alt={x.place || x.title || ""} loading="lazy" />
            </div>
          )}
          <div className="edu-body">
            <small>{x.year}</small>
            <h4>{x.title}</h4>
            <p>{x.place}</p>
          </div>
        </div>
      </Reveal>
    ))}
  </div>
);
export default async function Home() {
  const d = await getSite();
  const p = d.profile || {};
  const L = (k) => d[k] || [];
  return (
    <>
      <section className="hero">
        <div className="blob" />
        <h2 className="hi">{p.greeting}</h2>
        <h1>
          {p.role} <em>{p.roleAccent}</em>
        </h1>
        <p>{p.subtitle}</p>

        <div className="btns">
          <Link href="/portfolio" className="btn">
            {p.ctaText || "View My Work"} <span className="arr">→</span>
          </Link>

          {p.resume && (
            <a
              href={p.resume}
              target="_blank"
              rel="noopener noreferrer"
              className="btn dl"
            >
              <span className="dl-i" aria-hidden="true">
                ↓
              </span>
              Download Resume
            </a>
          )}
        </div>
      </section>

      <section id="portfolio">
        <Reveal>
          <h2 className="ttl">PORTFOLIO</h2>
          <p className="sub">Featured Projects</p>
        </Reveal>
        <Reveal variant="zoom">
          <FeaturedTrack items={L("projects")} />
        </Reveal>
        <div className="ctr">
          <Link href="/portfolio" className="btn">
            View all projects <span className="arr">→</span>
          </Link>
        </div>
      </section>

      <section id="services">
        <Reveal>
          <h2 className="ttl">SERVICE</h2>
          <p className="sub">What I Do</p>
        </Reveal>
        <div className="sg">
          {L("services").map((x, i) => (
            <Reveal key={i} delay={i * 100}>
              <Link href={"/service/" + slugOf(x)} className="sv tilt">
                <h3>{x.title}</h3>
                <p>{x.desc}</p>
              </Link>
            </Reveal>
          ))}
        </div>
      </section>

      <section id="about">
        <Reveal>
          <h2 className="ttl">
            <span style={{ color: "var(--ac)" }}>About</span>{" "}
            <span style={{ color: "var(--tx)" }}>Me</span>
          </h2>
          <p className="sub">{p.aboutHeadline}</p>
        </Reveal>
        <div className={"ab " + (p.photo ? "has-photo" : "no-photo")}>
          {p.photo && (
            <Reveal variant="left" className="ab-media">
              <img className="ab-photo" src={p.photo} alt={p.aboutRole || "Profile photo"} />
            </Reveal>
          )}
          <div className="ab-text">
            <Reveal variant="right">
              <small className="hl">{p.aboutRole}</small>
              <p>{p.about}</p>
            </Reveal>
            <h3 className="h3">Experience</h3>
            <TL a={L("experience")} />
            <h3 className="h3">Education</h3>
            <Edu a={L("education")} />
          </div>
        </div>
        <Reveal className="stg">
          <div className="tools">
            {L("tools").map((t, i) => (
              <div className="tool" key={i} style={{ "--i": i }} title={t.name}>
                {t.image ? <img src={t.image} alt={t.name} /> : t.name}
              </div>
            ))}
          </div>
        </Reveal>
      </section>

      {L("posters").length > 0 && (
        <section style={{ maxWidth: "none", padding: "35px 0 0" }}>
          <Reveal>
            <h2 className="ttl" style={{ color: "var(--tx)" }}>
              SOCIAL <em>MEDIA</em>
            </h2>
          </Reveal>
          <br />
          <Reveal>
            <SocialMarquee
              images={L("posters")
                .map((x) => x.image)
                .filter(Boolean)}
            />
          </Reveal>
        </section>
      )}

      <section id="contact">
        <Reveal>
          <h2 className="ttl" style={{ color: "var(--tx)" }}>
            GET IN <em>TOUCH</em>
          </h2>
        </Reveal>
        <Reveal variant="zoom">
          <ContactForm p={p} />
        </Reveal>
        <h2 className="ttl lets">LET&apos;S TALK</h2>
        <a className="mail" href={"mailto:" + p.email}>
          {p.email}
        </a>
      </section>
    </>
  );
}
