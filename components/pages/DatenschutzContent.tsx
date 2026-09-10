import { business } from '@/lib/data';
import type { Locale } from '@/lib/types';

/**
 * Datenschutzerklärung nach DSGVO und TDDDG.
 *
 * ENTWURF — vor dem Livegang anwaltlich prüfen lassen.
 *
 * Der Text beschreibt bewusst genau das, was diese Seite tatsächlich tut:
 * Es gibt keinen eigenen Server, keine Datenbank, kein Nutzerkonto und kein
 * Tracking. Warenkorb und Spracheinstellung bleiben im Browser. Übertragen wird
 * nur, was jemand selbst per WhatsApp oder E-Mail abschickt — und die Karte,
 * wenn sie ausdrücklich geladen wird.
 */
export function DatenschutzContent({ locale }: { locale: Locale }) {
  return locale === 'de' ? <De /> : <En />;
}

function De() {
  return (
    <>
      <h2>1. Verantwortlicher</h2>
      <p>Verantwortlich für die Datenverarbeitung auf dieser Website ist:</p>
      <address>
        <strong>Patties &amp; Berries</strong>
        <br />
        <span className="todo">{business.impressum.operatorName}</span>
        <br />
        Uerdinger Straße 101b, 47441 Moers, Deutschland
        <br />
        Telefon: <a href={`tel:${business.contact.phoneE164}`}>{business.contact.phoneDisplay}</a>
        <br />
        E-Mail: <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
      </address>
      <p>
        Wir haben keine Datenschutzbeauftragte bzw. keinen Datenschutzbeauftragten
        bestellt, weil die Voraussetzungen des Art. 37 DSGVO in Verbindung mit
        § 38 BDSG bei uns nicht vorliegen.{' '}
        <span className="todo">
          Bitte prüfen, falls dauerhaft mehr als 20 Personen mit der
          automatisierten Verarbeitung personenbezogener Daten beschäftigt sind.
        </span>
      </p>

      <h2>2. Grundsatz: Wie wenig diese Seite über dich erfährt</h2>
      <p>
        Diese Website ist eine reine HTML-Seite ohne Nutzerkonten, ohne Datenbank
        und ohne Analysewerkzeuge. Es gibt keine Registrierung, kein
        Nutzerprofil, keine Werbe-Pixel und keine Weitergabe an
        Werbenetzwerke. Alles, was du hier zusammenstellst, bleibt zunächst
        ausschließlich auf deinem Gerät.
      </p>

      <h2>3. Aufruf der Website und Server-Logfiles</h2>
      <p>
        Diese Website wird bei der Netlify, Inc., 512 2nd Street, Suite 200,
        San Francisco, CA 94107, USA, gehostet. Beim Aufruf werden technisch
        notwendige Verbindungsdaten verarbeitet, insbesondere:
      </p>
      <ul>
        <li>IP-Adresse des anfragenden Geräts</li>
        <li>Datum und Uhrzeit des Zugriffs</li>
        <li>aufgerufene Adresse und übertragene Datenmenge</li>
        <li>Browsertyp, Browserversion und Betriebssystem</li>
        <li>zuvor besuchte Seite (Referrer), sofern übermittelt</li>
      </ul>
      <p>
        <strong>Zweck:</strong> Auslieferung der Seite, Betriebssicherheit und
        Abwehr von Angriffen.
        <br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. f DSGVO. Unser
        berechtigtes Interesse liegt im technisch fehlerfreien und sicheren
        Betrieb der Website.
        <br />
        <strong>Speicherdauer:</strong>{' '}
        <span className="todo">
          Von Netlify vorgehaltene Logdaten; übliche Aufbewahrung 30 Tage —
          bitte im Netlify-Konto prüfen und den Wert hier eintragen.
        </span>
      </p>
      <p>
        Netlify verarbeitet Daten auch in den USA. Wir haben mit Netlify einen
        Auftragsverarbeitungsvertrag nach Art. 28 DSGVO geschlossen; die
        Übermittlung stützt sich auf die Standardvertragsklauseln der
        EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO) sowie auf die Zertifizierung
        nach dem EU-US Data Privacy Framework.{' '}
        <span className="todo">
          Abschluss des AV-Vertrags im Netlify-Konto bestätigen.
        </span>
      </p>

      <h2>4. Speicherung auf deinem Gerät (§ 25 TDDDG)</h2>
      <p>
        Wir setzen keine Werbe- oder Analyse-Cookies. Gespeichert wird nur
        Folgendes, und zwar ausschließlich lokal im Speicher deines Browsers
        (<em>localStorage</em>) — diese Daten werden zu keinem Zeitpunkt an uns
        oder an Dritte übertragen:
      </p>
      <table>
        <thead>
          <tr>
            <th>Bezeichnung</th>
            <th>Inhalt</th>
            <th>Zweck</th>
            <th>Dauer</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>
              <code>pb-cart-v1</code>
            </td>
            <td>Artikel, Mengen und Optionen deiner Bestellung</td>
            <td>
              Damit dein Warenkorb beim Neuladen nicht verloren geht. Ohne das
              funktioniert die Bestellfunktion nicht.
            </td>
            <td>bis du die Bestellung abschickst oder den Warenkorb leerst</td>
          </tr>
          <tr>
            <td>
              <code>pb-consent-v1</code>
            </td>
            <td>Deine Cookie-Entscheidung mit Zeitstempel</td>
            <td>
              Damit wir deine Entscheidung respektieren und nicht bei jedem
              Aufruf erneut fragen.
            </td>
            <td>bis du sie über die Fußzeile änderst</td>
          </tr>
        </tbody>
      </table>
      <p>
        <strong>Rechtsgrundlage:</strong> Beide Einträge sind für den von dir
        ausdrücklich gewünschten Dienst unbedingt erforderlich; die Speicherung
        ist daher nach § 25 Abs. 2 Nr. 2 TDDDG einwilligungsfrei. Die zugehörige
        Verarbeitung stützt sich auf Art. 6 Abs. 1 lit. b DSGVO
        (vorvertragliche Maßnahmen) bzw. lit. c DSGVO
        (rechtliche Verpflichtung zur Dokumentation der Einwilligung).
      </p>
      <p>
        Du kannst diese Daten jederzeit selbst löschen, indem du in deinem
        Browser die Websitedaten für diese Seite entfernst.
      </p>

      <h2>5. Bestellung über WhatsApp</h2>
      <p>
        Wenn du die Bestellstrecke ausfüllst, entsteht auf deinem Gerät ein
        Nachrichtentext. Erst wenn du auf „Bestellung per WhatsApp senden“
        klickst, öffnet sich WhatsApp mit diesem vorbereiteten Text. Du siehst
        die Nachricht dort noch einmal vollständig und entscheidest selbst, ob du
        sie absendest. Bis zu diesem Klick verlassen deine Angaben dein Gerät
        nicht.
      </p>
      <p>
        <strong>Verarbeitete Daten:</strong> Name, Telefonnummer, Bestellinhalt,
        gewünschte Zeit, Art der Abwicklung sowie bei Lieferung die
        Lieferadresse und ein etwaiger Hinweis für den Fahrer.
        <br />
        <strong>Zweck:</strong> Annahme, Bestätigung und Ausführung deiner
        Bestellung.
        <br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. b DSGVO
        (Durchführung vorvertraglicher Maßnahmen und Erfüllung des Vertrags).
      </p>
      <p>
        <strong>Wichtiger Hinweis zu WhatsApp:</strong> Betreiber ist die
        WhatsApp Ireland Limited, Merrion Road, Dublin 4, D04 X2K5, Irland, ein
        Unternehmen der Meta-Gruppe. WhatsApp verarbeitet dabei
        Verbindungs- und Metadaten (unter anderem deine Telefonnummer und die
        Zeitpunkte der Kommunikation) und kann Daten an die Meta Platforms, Inc.
        in den USA übermitteln. Die Übermittlung stützt sich auf die
        Standardvertragsklauseln der EU-Kommission sowie auf die Zertifizierung
        von Meta nach dem EU-US Data Privacy Framework. Trotz dieser Grundlagen
        besteht in den USA kein mit der EU vollständig vergleichbares
        Datenschutzniveau; insbesondere sind weitergehende Zugriffe durch
        US-Behörden nicht auszuschließen. Die Inhalte einzelner Chats sind
        Ende-zu-Ende-verschlüsselt, die Metadaten hingegen nicht.
      </p>
      <p>
        Die Nutzung von WhatsApp ist freiwillig. Du kannst uns stattdessen
        jederzeit{' '}
        <a href={`tel:${business.contact.phoneE164}`}>telefonisch</a>, per{' '}
        <a href={`mailto:${business.contact.email}`}>E-Mail</a> oder persönlich im
        Laden erreichen. Näheres zur Datenverarbeitung durch WhatsApp findest du
        in deren{' '}
        <a
          href="https://www.whatsapp.com/legal/privacy-policy-eea"
          target="_blank"
          rel="noopener noreferrer"
        >
          Datenschutzrichtlinie für den EWR
        </a>
        .
      </p>
      <p>
        <strong>Speicherdauer:</strong> Bestellnachrichten werden gelöscht, sobald
        sie für die Abwicklung nicht mehr benötigt werden, spätestens{' '}
        <span className="todo">nach 3 Monaten — Frist bitte bestätigen</span>.
        Soweit sich aus der Bestellung ein Beleg im Sinne der §§ 147 AO,
        257 HGB ergibt, gelten die dortigen Aufbewahrungsfristen von bis zu
        10 Jahren; die Verarbeitung stützt sich insoweit auf Art. 6 Abs. 1 lit. c
        DSGVO.
      </p>

      <h2>6. Kontaktaufnahme per E-Mail und Telefon</h2>
      <p>
        Wenn du uns per E-Mail schreibst oder anrufst, verarbeiten wir die dabei
        anfallenden Angaben, um dein Anliegen zu bearbeiten. Rechtsgrundlage ist
        Art. 6 Abs. 1 lit. b DSGVO, wenn es um eine Bestellung oder deren
        Anbahnung geht, sonst Art. 6 Abs. 1 lit. f DSGVO (berechtigtes Interesse
        an der Beantwortung von Anfragen). Die Daten werden gelöscht, sobald dein
        Anliegen abschließend geklärt ist und keine gesetzlichen
        Aufbewahrungsfristen entgegenstehen.
      </p>

      <h2>7. Google Maps</h2>
      <p>
        Auf der Seite „Finden &amp; Kontakt“ bieten wir eine Karte an. Diese
        Karte wird <strong>nicht automatisch geladen</strong>. Zunächst siehst du
        nur ein Vorschaubild von unserem eigenen Server. Erst wenn du aktiv auf
        „Karte laden“ klickst, wird eine Verbindung zu Google hergestellt.
      </p>
      <p>
        <strong>Anbieter:</strong> Google Ireland Limited, Gordon House, Barrow
        Street, Dublin 4, Irland, gegebenenfalls unter Beteiligung der Google
        LLC, 1600 Amphitheatre Parkway, Mountain View, CA 94043, USA.
        <br />
        <strong>Übertragene Daten:</strong> unter anderem deine IP-Adresse,
        Angaben zu Browser und Gerät, Bildschirmauflösung, Zeitpunkt des Abrufs
        sowie die aufgerufene Seite. Google kann dabei Cookies setzen und, sofern
        du in einem Google-Konto angemeldet bist, den Aufruf diesem Konto
        zuordnen.
        <br />
        <strong>Zweck:</strong> Anzeige unseres Standorts und Routenplanung.
        <br />
        <strong>Rechtsgrundlage:</strong> Art. 6 Abs. 1 lit. a DSGVO sowie § 25
        Abs. 1 TDDDG — ausschließlich deine Einwilligung, erteilt durch den
        Klick auf „Karte laden“ oder über die Cookie-Einstellungen.
        <br />
        <strong>Drittlandübermittlung:</strong> Eine Übermittlung in die USA ist
        möglich. Sie stützt sich auf die Standardvertragsklauseln der
        EU-Kommission (Art. 46 Abs. 2 lit. c DSGVO) und die Zertifizierung von
        Google nach dem EU-US Data Privacy Framework.
      </p>
      <p>
        Du kannst deine Einwilligung jederzeit mit Wirkung für die Zukunft
        widerrufen, indem du unten in der Fußzeile die Cookie-Einstellungen
        öffnest. Näheres in der{' '}
        <a href="https://policies.google.com/privacy" target="_blank" rel="noopener noreferrer">
          Datenschutzerklärung von Google
        </a>
        .
      </p>

      <h2>8. Schriftarten</h2>
      <p>
        Die verwendeten Schriften (Anton und Inter) liegen auf unserem eigenen
        Server und werden von dort geladen. Es wird <strong>keine</strong>{' '}
        Verbindung zu Google Fonts oder einem anderen externen Dienst
        aufgebaut. Deine IP-Adresse wird dabei an niemanden außerhalb unseres
        Hostings übermittelt.
      </p>

      <h2>9. Verlinkung sozialer Netzwerke</h2>
      <p>
        In der Fußzeile verlinken wir auf unsere Profile bei Instagram und
        Facebook (Meta Platforms Ireland Limited, Merrion Road, Dublin 4,
        Irland). Es handelt sich um einfache Links, keine eingebetteten Inhalte
        und keine „Gefällt mir“-Schaltflächen. Es werden erst dann Daten an Meta
        übertragen, wenn du einen dieser Links anklickst und die dortige Seite
        aufrufst. Für die Verarbeitung auf den Plattformen selbst ist Meta
        verantwortlich.
      </p>

      <h2>10. Analyse und Reichweitenmessung</h2>
      <p>
        Wir setzen derzeit keine Analysewerkzeuge ein. Es findet kein Tracking,
        kein Profiling und keine automatisierte Entscheidungsfindung
        einschließlich Profiling im Sinne des Art. 22 DSGVO statt. Sollte sich
        das ändern, holen wir vorher deine Einwilligung ein und ergänzen diese
        Erklärung.
      </p>

      <h2>11. Empfänger deiner Daten</h2>
      <ul>
        <li>
          <strong>Netlify, Inc.</strong> — Hosting der Website
          (Auftragsverarbeiter nach Art. 28 DSGVO)
        </li>
        <li>
          <strong>WhatsApp Ireland Limited</strong> — nur wenn du eine Bestellung
          über WhatsApp absendest
        </li>
        <li>
          <strong>Google Ireland Limited</strong> — nur wenn du die Karte lädst
        </li>
        <li>
          <strong>Steuerberatung und Finanzbehörden</strong> — soweit
          Aufbewahrungs- und Nachweispflichten dies erfordern
        </li>
      </ul>
      <p>
        Ein Verkauf oder eine sonstige Weitergabe deiner Daten zu Werbezwecken
        findet nicht statt.
      </p>

      <h2>12. Deine Rechte</h2>
      <p>Du hast uns gegenüber jederzeit folgende Rechte:</p>
      <ul>
        <li>
          <strong>Auskunft</strong> darüber, ob und welche Daten wir über dich
          verarbeiten (Art. 15 DSGVO)
        </li>
        <li>
          <strong>Berichtigung</strong> unrichtiger oder unvollständiger Daten
          (Art. 16 DSGVO)
        </li>
        <li>
          <strong>Löschung</strong> deiner Daten, soweit keine Aufbewahrungspflicht
          entgegensteht (Art. 17 DSGVO)
        </li>
        <li>
          <strong>Einschränkung der Verarbeitung</strong> (Art. 18 DSGVO)
        </li>
        <li>
          <strong>Datenübertragbarkeit</strong> in einem gängigen, maschinenlesbaren
          Format (Art. 20 DSGVO)
        </li>
        <li>
          <strong>Widerspruch</strong> gegen Verarbeitungen, die wir auf ein
          berechtigtes Interesse stützen (Art. 21 DSGVO)
        </li>
        <li>
          <strong>Widerruf einer Einwilligung</strong> mit Wirkung für die
          Zukunft (Art. 7 Abs. 3 DSGVO) — etwa für die Google-Karte, jederzeit
          über die Cookie-Einstellungen in der Fußzeile
        </li>
      </ul>
      <p>
        Für alle diese Anliegen genügt eine formlose Nachricht an{' '}
        <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>.
      </p>

      <h2>13. Beschwerderecht bei der Aufsichtsbehörde</h2>
      <p>
        Wenn du der Ansicht bist, dass wir deine Daten nicht rechtmäßig
        verarbeiten, kannst du dich bei einer Datenschutz-Aufsichtsbehörde
        beschweren. Für uns zuständig ist:
      </p>
      <address>
        Landesbeauftragte für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen
        <br />
        Kavalleriestraße 2–4, 40213 Düsseldorf
        <br />
        Telefon: 0211 38424-0
        <br />
        <a href="https://www.ldi.nrw.de" target="_blank" rel="noopener noreferrer">
          www.ldi.nrw.de
        </a>
      </address>
      <p>
        Unabhängig davon steht dir der Rechtsweg offen, und du kannst dich auch
        an die Aufsichtsbehörde deines gewöhnlichen Aufenthaltsorts wenden.
      </p>

      <h2>14. Sicherheit</h2>
      <p>
        Die Übertragung dieser Website erfolgt ausschließlich verschlüsselt über
        HTTPS (TLS). Das erkennst du am Schloss-Symbol in der Adresszeile deines
        Browsers.
      </p>

      <h2>15. Änderungen dieser Erklärung</h2>
      <p>
        Wir passen diese Datenschutzerklärung an, wenn sich die Rechtslage oder
        die Funktionen dieser Website ändern. Es gilt jeweils die hier
        veröffentlichte Fassung.
      </p>
    </>
  );
}

function En() {
  return (
    <>
      <p>
        This is a courtesy translation. The legally binding version is the{' '}
        <a href="/datenschutz/">German privacy policy</a>.
      </p>

      <h2>1. Controller</h2>
      <address>
        <strong>Patties &amp; Berries</strong>
        <br />
        <span className="todo">{business.impressum.operatorName}</span>
        <br />
        Uerdinger Straße 101b, 47441 Moers, Germany
        <br />
        Email: <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a>
      </address>

      <h2>2. The short version</h2>
      <p>
        This is a static website. There are no user accounts, no database, no
        analytics and no advertising pixels. What you put together in the order
        flow stays on your device until you actively choose to send it.
      </p>

      <h2>3. Hosting and server logs</h2>
      <p>
        The site is hosted by Netlify, Inc., 512 2nd Street, Suite 200, San
        Francisco, CA 94107, USA. Standard connection data (IP address, time of
        access, requested page, browser and operating system, referrer) is
        processed to deliver the site securely. Legal basis: Art. 6 (1) (f) GDPR
        — our legitimate interest in operating the site reliably. Transfers to
        the USA are based on the EU Commission’s standard contractual clauses and
        Netlify’s EU-US Data Privacy Framework certification.
      </p>

      <h2>4. Local storage on your device (§ 25 TDDDG)</h2>
      <p>
        We set no advertising or analytics cookies. Two entries are kept in your
        browser’s local storage and never transmitted anywhere:{' '}
        <code>pb-cart-v1</code> (your order, so it survives a page reload) and{' '}
        <code>pb-consent-v1</code> (your cookie choice with a timestamp). Both
        are strictly necessary for the service you asked for and therefore
        exempt from consent under § 25 (2) no. 2 TDDDG. You can delete them at
        any time by clearing site data in your browser.
      </p>

      <h2>5. Ordering via WhatsApp</h2>
      <p>
        Filling in the order form composes a message on your device. Only when
        you tap “Send order via WhatsApp” does WhatsApp open with that text
        prepared — you see it in full and decide whether to send it. Until that
        tap, nothing leaves your device.
      </p>
      <p>
        Data processed: name, phone number, order contents, requested time,
        fulfilment type and, for delivery, your address. Legal basis: Art. 6 (1)
        (b) GDPR (pre-contractual steps and performance of the contract).
      </p>
      <p>
        WhatsApp is operated by WhatsApp Ireland Limited, Merrion Road, Dublin 4,
        Ireland, part of the Meta group. WhatsApp processes connection and
        metadata (including your phone number and timing of messages) and may
        transfer data to Meta Platforms, Inc. in the USA on the basis of the
        standard contractual clauses and Meta’s EU-US Data Privacy Framework
        certification. Despite these safeguards, the level of protection in the
        USA is not fully equivalent to the EU; access by US authorities cannot be
        ruled out. Message contents are end-to-end encrypted; metadata is not.
      </p>
      <p>
        Using WhatsApp is entirely optional — you can always call us, email us or
        come by the shop instead.
      </p>

      <h2>6. Google Maps</h2>
      <p>
        The map does not load automatically. You first see a preview image served
        from our own domain. Only when you click “Load the map” is a connection
        to Google established, transferring your IP address, browser and device
        details. Legal basis: Art. 6 (1) (a) GDPR and § 25 (1) TDDDG — your
        consent alone. You can withdraw it at any time via the cookie settings in
        the footer.
      </p>

      <h2>7. Fonts</h2>
      <p>
        Anton and Inter are served from our own domain. No connection is made to
        Google Fonts or any other external font service.
      </p>

      <h2>8. Your rights</h2>
      <p>
        You have the right to access (Art. 15), rectification (Art. 16), erasure
        (Art. 17), restriction (Art. 18), data portability (Art. 20) and
        objection (Art. 21) under the GDPR, and you may withdraw any consent at
        any time with effect for the future (Art. 7 (3)). An informal email to{' '}
        <a href={`mailto:${business.contact.email}`}>{business.contact.email}</a> is
        enough.
      </p>
      <p>
        You may also lodge a complaint with a supervisory authority. Ours is the
        Landesbeauftragte für Datenschutz und Informationsfreiheit
        Nordrhein-Westfalen, Kavalleriestraße 2–4, 40213 Düsseldorf, Germany.
      </p>
    </>
  );
}
