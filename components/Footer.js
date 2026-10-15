import Link from "next/link";
import Image from "next/image";
import { slugOf } from "@/lib/util";

const SOCIAL_ICONS = {
  instagram: "/instagram (1).png",
  linkedin: "/linkedin (1).png",
  behance: "/behance.png",
  pinterest: "/logo.png",
};

export default function Footer({ d }) {
  const p = d.profile || {};

  return (
    <footer className="ft">
      <div className="fg">
        <div className="footer-about">
          <h4>About Us</h4>
          <p>{p.footerAbout}</p>

          <div className="soc">
            {(d.socials || []).map((s, i) => {
              const key = s.name?.toLowerCase().trim();
              const icon = SOCIAL_ICONS[key];

              return (
                <a
                  key={i}
                  href={s.url}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={s.name}
                  title={s.name}
                  className="soc-icon"
                >
                  {icon ? (
                    <Image src={icon} alt={s.name} width={65} height={65} />
                  ) : (
                    s.name
                  )}
                </a>
              );
            })}
          </div>
        </div>

        <div className="footer-links">
          <h4>Navigation</h4>
          <Link href="/">Home</Link>
          <Link href="/portfolio">Portfolio</Link>
        </div>

        <div className="footer-links">
          <h4>Services</h4>
          {(d.services || []).map((s, i) => (
            <Link key={i} href={"/service/" + slugOf(s)}>
              {s.title}
            </Link>
          ))}
        </div>
      </div>

      <p className="cp">{p.copyright}</p>
    </footer>
  );
}
