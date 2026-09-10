import { menu, allergenLegend, additiveLegend } from '@/lib/data';
import { price } from '@/lib/format';
import type { Locale } from '@/lib/types';

/**
 * Allergen- und Zusatzstofftabelle.
 *
 * Pflicht nach der Lebensmittelinformations-Verordnung (EU) Nr. 1169/2011 in
 * Verbindung mit der deutschen LMIDV: Bei loser Ware müssen die 14
 * kennzeichnungspflichtigen Allergene angegeben werden, bei Zusatzstoffen
 * zusätzlich die ZZulV-Kennzeichnung.
 *
 * Die Tabelle wird vollständig aus data/menu.json erzeugt. Wer dort ein
 * Allergen ändert, ändert es hier automatisch mit — es kann also nicht
 * passieren, dass Karte und Allergentabelle auseinanderlaufen.
 */
export function AllergeneContent({ locale }: { locale: Locale }) {
  const de = locale === 'de';

  return (
    <>
      {!menu._allergeneGeprueft && (
        <p className="rounded border border-signal-closed bg-ink-3 p-4 text-small leading-relaxed">
          <strong className="text-signal-closed">
            {de ? '⚠ Noch nicht freigegeben — ' : '⚠ Not yet approved — '}
          </strong>
          {de
            ? 'Die folgenden Angaben sind eine sorgfältige Ersteinschätzung anhand der Zutatenbeschreibungen. Sie sind rechtlich verbindlich und müssen vor der Veröffentlichung anhand der Datenblätter der Lieferanten (Buns, Saucen, Käse, Sucuk, Veggie-Patty, Cheesecake) geprüft werden. Danach in data/menu.json den Wert „_allergeneGeprueft“ auf true setzen — dann verschwindet dieser Hinweis.'
            : 'The information below is a careful first assessment based on the ingredient descriptions. It is legally binding and must be checked against supplier data sheets (buns, sauces, cheese, sucuk, veggie patty, cheesecake) before publication. Then set "_allergeneGeprueft" to true in data/menu.json and this notice disappears.'}
        </p>
      )}

      <h2>{de ? 'Wichtiger Hinweis' : 'Important note'}</h2>
      <p>
        {de
          ? 'Wir bereiten alle Speisen in einer offenen Küche auf gemeinsam genutzten Flächen und in gemeinsam genutzten Fritteusen zu. Auch wenn wir sorgfältig arbeiten, können wir Spuren anderer Allergene nicht sicher ausschließen. Wenn du eine Allergie oder Unverträglichkeit hast, sprich uns bitte vor der Bestellung an — telefonisch, per WhatsApp oder direkt an der Theke. Wir sagen dir ehrlich, was geht und was wir nicht garantieren können.'
          : 'We prepare everything in an open kitchen on shared surfaces and in shared fryers. However carefully we work, we cannot rule out traces of other allergens. If you have an allergy or intolerance, please speak to us before ordering — by phone, on WhatsApp or at the counter. We will tell you honestly what works and what we cannot guarantee.'}
      </p>

      <h2>{de ? 'Legende' : 'Key'}</h2>
      <table>
        <thead>
          <tr>
            <th style={{ width: '5rem' }}>{de ? 'Kürzel' : 'Code'}</th>
            <th>{de ? 'Allergen' : 'Allergen'}</th>
          </tr>
        </thead>
        <tbody>
          {allergenLegend.map((a) => (
            <tr key={a.id}>
              <td>
                <strong>{a.symbol}</strong>
              </td>
              <td>{a[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p>
        {de
          ? 'Ein Kürzel in Klammern — zum Beispiel (SS) — bedeutet: Das Allergen ist nicht als Zutat enthalten, Spuren lassen sich in unserer Küche aber nicht ausschließen.'
          : 'A code in brackets — for example (SS) — means the allergen is not an ingredient, but traces cannot be ruled out in our kitchen.'}
      </p>

      <h2>{de ? 'Speisen im Einzelnen' : 'Item by item'}</h2>
      {menu.categories.map((cat) => (
        <section key={cat.id}>
          <h3>{cat.name[locale]}</h3>
          <table>
            <thead>
              <tr>
                <th>{de ? 'Gericht' : 'Item'}</th>
                <th style={{ width: '7rem' }}>{de ? 'Preis' : 'Price'}</th>
                <th>{de ? 'Enthält' : 'Contains'}</th>
                <th>{de ? 'Spuren möglich' : 'May contain'}</th>
              </tr>
            </thead>
            <tbody>
              {cat.items.map((item) => (
                <tr key={item.id}>
                  <td>
                    <strong>{item.name}</strong>
                    {item.tags.includes('vegetarisch') && (
                      <span aria-label={de ? 'vegetarisch' : 'vegetarian'}> 🌱</span>
                    )}
                    {item.tags.includes('scharf') && (
                      <span aria-label={de ? 'scharf' : 'spicy'}> 🌶️</span>
                    )}
                  </td>
                  <td className="tnum">
                    {price(item.price, locale)}
                    {item.menuPrice != null && (
                      <>
                        {' / '}
                        {price(item.menuPrice, locale)}
                      </>
                    )}
                  </td>
                  <td>
                    {item.allergens.length > 0
                      ? item.allergens
                          .map((a) => allergenLegend.find((x) => x.id === a)?.[locale] ?? a)
                          .join(', ')
                      : de
                        ? '—'
                        : '—'}
                  </td>
                  <td>
                    {item.mayContain && item.mayContain.length > 0
                      ? item.mayContain
                          .map((a) => allergenLegend.find((x) => x.id === a)?.[locale] ?? a)
                          .join(', ')
                      : '—'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      ))}

      <h2>{de ? 'Zusatzstoffe' : 'Additives'}</h2>
      <p>
        {de
          ? 'Nach der Zusatzstoff-Zulassungsverordnung (ZZulV) sind bestimmte Zusatzstoffe bei loser Ware kenntlich zu machen. Es gelten folgende Kennzeichnungen:'
          : 'German law requires certain additives to be declared for non-prepacked food. The following labels apply:'}
      </p>
      <table>
        <thead>
          <tr>
            <th style={{ width: '5rem' }}>{de ? 'Nummer' : 'Number'}</th>
            <th>{de ? 'Bedeutung' : 'Meaning'}</th>
          </tr>
        </thead>
        <tbody>
          {additiveLegend.map((a) => (
            <tr key={a.id}>
              <td>
                <strong>{a.id}</strong>
              </td>
              <td>{a[locale]}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <p className="todo">
        {de
          ? 'Zu ergänzen: Die Zuordnung der Zusatzstoffe zu den einzelnen Getränken und zugekauften Saucen muss anhand der Etiketten der Lieferanten in data/menu.json eingetragen werden. Bei Getränken betrifft das insbesondere „koffeinhaltig“ (Cola, Mezzo Mix), „mit Farbstoff“ und „mit Süßungsmittel“ (Light-Varianten).'
          : 'To be completed: additive declarations for individual drinks and bought-in sauces must be entered in data/menu.json from the suppliers’ labels — for drinks especially caffeine, colouring and sweeteners.'}
      </p>

      <h2>{de ? 'Nährwerte' : 'Nutrition information'}</h2>
      <p>
        {de
          ? 'Für frisch zubereitete Speisen, die nicht vorverpackt sind, besteht nach Art. 44 LMIV keine Pflicht zur Nährwertkennzeichnung. Wir geben derzeit keine Nährwerte an, weil wir sie ohne Laboranalyse nicht seriös berechnen könnten — und eine gerundete Schätzung wäre für Menschen, die auf genaue Werte angewiesen sind, schlimmer als keine Angabe.'
          : 'Freshly prepared, non-prepacked food is exempt from mandatory nutrition labelling under Art. 44 of the Food Information Regulation. We do not publish nutrition values because we could not calculate them reliably without laboratory analysis — and a rounded guess would be worse than nothing for anyone who depends on accurate figures.'}
      </p>
      <p>
        {de
          ? 'Wenn du für eine Ernährungsumstellung oder aus medizinischen Gründen genaue Werte brauchst, sag uns Bescheid — wir sagen dir gern genau, was in einem bestimmten Burger drin ist.'
          : 'If you need exact figures for medical or dietary reasons, tell us — we are happy to walk you through exactly what goes into a given burger.'}
      </p>

      <h2>{de ? 'Helal' : 'Halal'}</h2>
      <p>
        {de
          ? 'Alle bei uns verarbeiteten Produkte sind helal — ohne Ausnahme. Das betrifft das Rindfleisch ebenso wie Beef Bacon und Sucuk. Alkohol wird in der Küche nicht verwendet. Die Zertifikate unserer Lieferanten liegen im Laden vor und können jederzeit eingesehen werden.'
          : 'Everything we serve is halal, without exception — beef, beef bacon and sucuk alike. No alcohol is used in the kitchen. Our suppliers’ certificates are kept in the shop and can be seen at any time.'}
      </p>
    </>
  );
}
