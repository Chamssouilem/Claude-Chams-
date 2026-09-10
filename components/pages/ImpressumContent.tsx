import { business } from '@/lib/data';
import type { Locale } from '@/lib/types';

/**
 * Impressum nach § 5 DDG (früher § 5 TMG) und § 18 Abs. 2 MStV.
 *
 * ENTWURF — vor dem Livegang anwaltlich prüfen lassen. Die mit .todo markierten
 * Stellen müssen zwingend vom Betreiber ausgefüllt oder bestätigt werden.
 */
export function ImpressumContent({ locale }: { locale: Locale }) {
  return locale === 'de' ? <De /> : <En />;
}

function De() {
  return (
    <>
      <h2>Angaben gemäß § 5 DDG</h2>
      <address>
        <strong>Patties &amp; Berries</strong>
        <br />
        Inhaberin/Inhaber: <span className="todo">{business.impressum.operatorName}</span>
        <br />
        Uerdinger Straße 101b
        <br />
        47441 Moers
        <br />
        Deutschland
      </address>

      <p>
        <strong>Unternehmensform:</strong> Einzelunternehmen
      </p>

      <h2>Kontakt</h2>
      <p>
        Telefon:{' '}
        <a href={`tel:${business.contact.phoneE164}`}>{business.contact.phoneDisplay}</a>
        <br />
        E-Mail: <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
      </p>

      <h2>Umsatzsteuer-Identifikationsnummer</h2>
      <p>
        Umsatzsteuer-Identifikationsnummer gemäß § 27 a Umsatzsteuergesetz:
        <br />
        <strong>{business.impressum.vatId}</strong>
      </p>

      <h2>Verantwortlich für den Inhalt nach § 18 Abs. 2 MStV</h2>
      <address>
        <span className="todo">{business.impressum.contentResponsible}</span>
        <br />
        Uerdinger Straße 101b
        <br />
        47441 Moers
      </address>

      <h2>Aufsichtsbehörde</h2>
      <p>
        Zuständig für die Lebensmittelüberwachung ist das Amt für
        Verbraucherschutz und Veterinärwesen des Kreises Wesel,
        Reeser Landstraße 31, 46483 Wesel.
      </p>

      <h2>Berufsrechtliche Angaben</h2>
      <p>
        Gaststättengewerbe nach dem Gaststättengesetz (GastG) in Verbindung mit
        dem Gaststättengesetz Nordrhein-Westfalen. Die Gewerbeanmeldung erfolgte
        bei der Stadt Moers.
      </p>

      <h2>Streitbeilegung</h2>
      <p>
        Die Europäische Kommission stellt eine Plattform zur
        Online-Streitbeilegung (OS) bereit:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . Unsere E-Mail-Adresse findest du oben unter „Kontakt“.
      </p>
      <p>
        Wir sind nicht bereit und nicht verpflichtet, an Streitbeilegungsverfahren
        vor einer Verbraucherschlichtungsstelle teilzunehmen.
      </p>

      <h2>Haftung für Inhalte</h2>
      <p>
        Als Diensteanbieter sind wir gemäß § 7 Abs. 1 DDG für eigene Inhalte auf
        diesen Seiten nach den allgemeinen Gesetzen verantwortlich. Nach den
        §§ 8 bis 10 DDG sind wir als Diensteanbieter jedoch nicht verpflichtet,
        übermittelte oder gespeicherte fremde Informationen zu überwachen oder
        nach Umständen zu forschen, die auf eine rechtswidrige Tätigkeit
        hinweisen. Verpflichtungen zur Entfernung oder Sperrung der Nutzung von
        Informationen nach den allgemeinen Gesetzen bleiben hiervon unberührt.
        Eine diesbezügliche Haftung ist jedoch erst ab dem Zeitpunkt der Kenntnis
        einer konkreten Rechtsverletzung möglich. Bei Bekanntwerden von
        entsprechenden Rechtsverletzungen werden wir diese Inhalte umgehend
        entfernen.
      </p>

      <h2>Haftung für Links</h2>
      <p>
        Unser Angebot enthält Links zu externen Websites Dritter, auf deren
        Inhalte wir keinen Einfluss haben. Deshalb können wir für diese fremden
        Inhalte auch keine Gewähr übernehmen. Für die Inhalte der verlinkten
        Seiten ist stets der jeweilige Anbieter oder Betreiber der Seiten
        verantwortlich. Die verlinkten Seiten wurden zum Zeitpunkt der
        Verlinkung auf mögliche Rechtsverstöße überprüft. Rechtswidrige Inhalte
        waren zum Zeitpunkt der Verlinkung nicht erkennbar. Bei Bekanntwerden von
        Rechtsverletzungen werden wir derartige Links umgehend entfernen.
      </p>

      <h2>Urheberrecht</h2>
      <p>
        Die durch die Seitenbetreiber erstellten Inhalte und Werke auf diesen
        Seiten unterliegen dem deutschen Urheberrecht. Die Vervielfältigung,
        Bearbeitung, Verbreitung und jede Art der Verwertung außerhalb der
        Grenzen des Urheberrechtes bedürfen der schriftlichen Zustimmung des
        jeweiligen Autors bzw. Erstellers. Downloads und Kopien dieser Seite sind
        nur für den privaten, nicht kommerziellen Gebrauch gestattet.
      </p>

      <h2>Bildnachweise</h2>
      <p>
        Alle Fotografien auf dieser Seite stammen aus eigenen Aufnahmen im
        Restaurant. <span className="todo">
          Sofern Aufnahmen von einer externen Fotografin oder einem externen
          Fotografen erstellt wurden, ist hier der Name zu ergänzen.
        </span>{' '}
        Für Aufnahmen, auf denen Mitarbeitende erkennbar sind, liegen
        schriftliche Einwilligungen nach § 22 KUG und Art. 6 Abs. 1 lit. a DSGVO
        vor.
      </p>

      <h2 id="hinweise">Noch zu prüfen vor der Veröffentlichung</h2>
      <p>
        Diese Punkte müssen vom Betreiber bestätigt werden, bevor die Seite
        online geht:
      </p>
      <ul>
        <li>
          <strong>Vollständiger Name der Inhaberin/des Inhabers.</strong> § 5 DDG
          verlangt Vor- <em>und</em> Nachnamen der verantwortlichen natürlichen
          Person. Im bisherigen Impressum stand nur „Yeter“; in Bewertungen wird
          durchgängig „Emre“ als Inhaber genannt. Beides ist zu klären und hier
          korrekt einzutragen (in <code>data/business.json</code> unter{' '}
          <code>impressum.operatorName</code>).
        </li>
        <li>
          <strong>Rechtsform und ggf. Handelsregistereintrag.</strong> Sollte
          keine Einzelunternehmung, sondern z. B. eine GmbH oder GbR vorliegen,
          sind Registergericht, Registernummer und alle Vertretungsberechtigten
          zu ergänzen.
        </li>
        <li>
          <strong>Zuständige Aufsichtsbehörde.</strong> Die oben genannte Behörde
          ist nach Lage des Betriebs im Kreis Wesel eingesetzt und sollte kurz
          bestätigt werden.
        </li>
        <li>
          <strong>Berufshaftpflicht.</strong> Falls eine Versicherung besteht,
          deren Namen und räumlichen Geltungsbereich ergänzen.
        </li>
      </ul>
    </>
  );
}

function En() {
  return (
    <>
      <p>
        This page is a courtesy translation. The legally binding version is the{' '}
        <a href="/impressum/">German imprint</a>, as required under § 5 DDG.
      </p>

      <h2>Information pursuant to § 5 DDG</h2>
      <address>
        <strong>Patties &amp; Berries</strong>
        <br />
        Owner: <span className="todo">{business.impressum.operatorName}</span>
        <br />
        Uerdinger Straße 101b
        <br />
        47441 Moers
        <br />
        Germany
      </address>
      <p>
        <strong>Legal form:</strong> sole proprietorship
      </p>

      <h2>Contact</h2>
      <p>
        Phone: <a href={`tel:${business.contact.phoneE164}`}>{business.contact.phoneDisplay}</a>
        <br />
        Email: <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
      </p>

      <h2>VAT identification number</h2>
      <p>
        VAT ID pursuant to § 27 a of the German VAT Act: <strong>{business.impressum.vatId}</strong>
      </p>

      <h2>Responsible for content under § 18 (2) MStV</h2>
      <address>
        <span className="todo">{business.impressum.contentResponsible}</span>
        <br />
        Uerdinger Straße 101b, 47441 Moers, Germany
      </address>

      <h2>Supervisory authority</h2>
      <p>
        Food safety supervision is carried out by the consumer protection and
        veterinary office of Kreis Wesel, Reeser Landstraße 31, 46483 Wesel.
      </p>

      <h2>Online dispute resolution</h2>
      <p>
        The European Commission provides a platform for online dispute
        resolution:{' '}
        <a href="https://ec.europa.eu/consumers/odr/" target="_blank" rel="noopener noreferrer">
          https://ec.europa.eu/consumers/odr/
        </a>
        . We are neither willing nor obliged to participate in dispute resolution
        proceedings before a consumer arbitration board.
      </p>

      <h2>Liability and copyright</h2>
      <p>
        We are responsible for our own content on these pages under general law
        (§ 7 (1) DDG). Under §§ 8 to 10 DDG we are not obliged to monitor
        transmitted or stored third-party information. Our site contains links to
        external websites over whose content we have no influence; responsibility
        for that content lies with the respective provider. Content created by us
        is subject to German copyright law.
      </p>
    </>
  );
}
