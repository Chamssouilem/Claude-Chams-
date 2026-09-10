import { Photo } from './Photo';
import { Reveal } from './Reveal';
import { c } from '@/lib/content';
import type { Locale } from '@/lib/types';

export function About({ locale }: { locale: Locale }) {
  const x = c(locale);

  return (
    <section id="ueber-uns" className="section border-b border-line" aria-labelledby="about-title">
      <div className="shell grid gap-block md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-5">
          <Photo
            id="team"
            locale={locale}
            sizes="(min-width: 900px) 40vw, 100vw"
            className="w-full"
          />
        </Reveal>

        <Reveal delay={80} className="md:col-span-7 md:pt-4">
          <p className="kicker">{x.about.kicker}</p>
          <h2 id="about-title" className="mt-4 max-w-[18ch]">
            {x.about.h2}
          </h2>
          <div className="prose-body mt-7 text-body">
            {x.about.paragraphs.map((p, i) => (
              <p key={i}>{p}</p>
            ))}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
