import { business } from '@/lib/data';
import { c } from '@/lib/content';
import { Reveal } from './Reveal';
import { Photo } from './Photo';
import { IconWhatsApp } from './Icons';
import type { Locale } from '@/lib/types';

export function Vouchers({ locale }: { locale: Locale }) {
  const x = c(locale);
  const href = `https://wa.me/${business.contact.whatsappNumber}?text=${encodeURIComponent(
    x.vouchers.waMessage,
  )}`;

  return (
    <section id="gutscheine" className="section border-b border-line" aria-labelledby="vouchers-title">
      <div className="shell grid items-center gap-block md:grid-cols-12 md:gap-10">
        <Reveal className="md:col-span-7">
          <p className="kicker">{x.vouchers.kicker}</p>
          <h2 id="vouchers-title" className="mt-4 max-w-[16ch]">
            {x.vouchers.h2}
          </h2>
          <p className="prose-body mt-6 text-lead">{x.vouchers.body}</p>
          <a
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn-whatsapp mt-7 no-underline"
          >
            <IconWhatsApp size={18} />
            {x.vouchers.cta}
          </a>
        </Reveal>

        <Reveal delay={80} className="md:col-span-5">
          <Photo id="gutschein" locale={locale} sizes="(min-width: 900px) 40vw, 100vw" className="w-full" />
        </Reveal>
      </div>
    </section>
  );
}
