import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Jouer au golf sans être membre : toutes nos astuces 2025 | Golf Buddies',
  description: 'Guide complet pour profiter du golf sans adhérer à un club : cartes d\'accès, tarifs réduits, meilleurs parcours et astuces pour économiser.',
  keywords: 'golf sans membre, golf indépendant, green fee, carte golf, jouer au golf, golf pas cher',
};

export default function JouerSansMembrePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
          <Link href="/guide" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Guide
          </Link>
          {' / '}
          <span>Jouer au golf sans être membre</span>
        </nav>

        {/* Titre principal */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Jouer au golf sans être membre : nos astuces
        </h1>

        {/* Meta info */}
        <div style={{
          display: 'flex',
          gap: '16px',
          marginBottom: '32px',
          paddingBottom: '24px',
          borderBottom: '1px solid #e5e7eb',
          fontSize: '14px',
          color: '#6b7280'
        }}>
          <span>📅 Mis à jour : Janvier 2025</span>
          <span>⏱️ 4 min de lecture</span>
          <span>💰 Astuces</span>
        </div>

        {/* Introduction */}
        <div style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', marginBottom: '32px' }}>
          <p>
            Être membre d'un club de golf coûte entre 800€ et 3000€ par an. Heureusement, il existe de nombreuses
            astuces pour jouer régulièrement sans payer cette cotisation annuelle. Voici notre guide complet pour
            devenir un golfeur indépendant malin !
          </p>
        </div>

        {/* Contenu structuré */}
        <div style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Pourquoi jouer sans être membre ?
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Le statut de joueur indépendant présente plusieurs avantages :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Économies importantes</strong> - Pas de cotisation annuelle</li>
            <li style={{ marginBottom: '8px' }}>🗺️ <strong>Liberté totale</strong> - Jouez sur différents parcours chaque semaine</li>
            <li style={{ marginBottom: '8px' }}>⏰ <strong>Flexibilité</strong> - Aucune obligation de présence ou de compétitions</li>
            <li style={{ marginBottom: '8px' }}>🌍 <strong>Découverte</strong> - Explorez tous les golfs de votre région</li>
            <li style={{ marginBottom: '8px' }}>👥 <strong>Rencontres variées</strong> - Nouveaux partenaires à chaque partie</li>
          </ul>

          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#991b1b', marginBottom: '12px' }}>
              ⚠️ Attention : seuil de rentabilité
            </h3>
            <p style={{ color: '#991b1b', margin: 0 }}>
              Si vous jouez plus de 2 fois par semaine sur le même parcours, l'adhésion au club devient
              probablement plus rentable. Faites le calcul : (green fee × nombre de parties/mois × 12) vs cotisation annuelle.
            </p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Les cartes multi-parcours : votre meilleur allié
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Ces cartes donnent accès à plusieurs golfs à tarif réduit. Idéal pour les joueurs indépendants !
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            1. Golf Privilege Card (GPC)
          </h3>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>💳 <strong>Prix :</strong> 350€/an (couple 550€)</li>
            <li style={{ marginBottom: '8px' }}>⛳ <strong>Accès :</strong> 50+ parcours en France</li>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Réduction :</strong> -30 à -50% sur les green fees</li>
            <li style={{ marginBottom: '8px' }}>🎯 <strong>Rentabilité :</strong> Dès 10-12 parties/an</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            2. Carte Albatros
          </h3>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>💳 <strong>Prix :</strong> 250€/an</li>
            <li style={{ marginBottom: '8px' }}>⛳ <strong>Accès :</strong> 30+ parcours (surtout région parisienne)</li>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Réduction :</strong> -25 à -40% sur les green fees</li>
            <li style={{ marginBottom: '8px' }}>🎯 <strong>Idéal pour :</strong> Joueurs Île-de-France</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            3. Passeports régionaux
          </h3>

          <p style={{ marginBottom: '16px' }}>
            Plusieurs régions proposent des cartes d'accès :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏖️ <strong>Golf Pass Côte d'Azur :</strong> 15 parcours (200€/an)</li>
            <li style={{ marginBottom: '8px' }}>🌊 <strong>Pass Golf Bretagne :</strong> 12 parcours (180€/an)</li>
            <li style={{ marginBottom: '8px' }}>🍇 <strong>Golf Pass Aquitaine :</strong> 20 parcours (280€/an)</li>
          </ul>

          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#166534', marginBottom: '12px' }}>
              💡 Notre recommandation
            </h3>
            <p style={{ color: '#166534', margin: 0 }}>
              Investissez dans une carte multi-parcours si vous jouez 10+ fois par an.
              Vous économiserez 500-1000€ sur l'année par rapport aux green fees pleins tarifs.
            </p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Astuces pour réduire le coût de chaque partie
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            1. Jouez en semaine
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Les tarifs week-end sont 30-50% plus élevés. Un green fee à 80€ le samedi peut descendre à 50€ le mercredi !
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>✅ Mardi, mercredi, jeudi : meilleurs tarifs</li>
            <li style={{ marginBottom: '8px' }}>✅ Moins de monde = rythme de jeu plus agréable</li>
            <li style={{ marginBottom: '8px' }}>✅ Plus facile de trouver des créneaux</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            2. Profitez des "Twilight Fees"
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Parties de fin d'après-midi (à partir de 16h-17h) à tarif réduit (-40 à -60%).
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>⏰ Départs après 16h en été, 15h en hiver</li>
            <li style={{ marginBottom: '8px' }}>💰 Parfois aussi peu que 25-35€ les 18 trous</li>
            <li style={{ marginBottom: '8px' }}>⚠️ Risque de ne pas finir les 18 trous si coucher de soleil</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            3. Privilégiez la basse saison
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Novembre à mars : tarifs réduits et golfs quasiment vides.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>❄️ Tarifs 30-40% moins chers</li>
            <li style={{ marginBottom: '8px' }}>🌤️ Parcours accessible (sauf neige/gel intense)</li>
            <li style={{ marginBottom: '8px' }}>👕 Investissez dans des vêtements chauds</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            4. Parcours 9 trous
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Moins chers (15-30€) et parfaits pour progresser ou jouer en 2h.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>⚡ Durée : 2h vs 4-5h pour 18 trous</li>
            <li style={{ marginBottom: '8px' }}>💰 Budget : 20€ en moyenne</li>
            <li style={{ marginBottom: '8px' }}>🎯 Idéal pour : après le travail en semaine</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            5. Golfs municipaux et publics
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Tarifs très accessibles (20-45€ les 18 trous).
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏛️ Golfs gérés par les communes</li>
            <li style={{ marginBottom: '8px' }}>💰 Prix publics imbattables</li>
            <li style={{ marginBottom: '8px' }}>👥 Ambiance souvent plus décontractée</li>
            <li style={{ marginBottom: '8px' }}>📍 Exemples : Golf de Joyenval, Golf de Chanteloup</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Réduire les coûts annexes
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Balles de golf
          </h3>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏊 <strong>Balles de lac reconditionnées :</strong> 1€/balle vs 3-4€ neuves</li>
            <li style={{ marginBottom: '8px' }}>📦 <strong>Achats en gros :</strong> Lots de 50-100 balles reconditionnées (40-80€)</li>
            <li style={{ marginBottom: '8px' }}>♻️ <strong>Sites recommandés :</strong> Golfballsdirect.fr, 2ndswing.fr</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Matériel
          </h3>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🛒 <strong>Occasion :</strong> Le Bon Coin, Golftechnic (économie 50-70%)</li>
            <li style={{ marginBottom: '8px' }}>🏪 <strong>Decathlon :</strong> Gamme Inesis excellent rapport qualité/prix</li>
            <li style={{ marginBottom: '8px' }}>🔧 <strong>Entretien :</strong> Changez les grips vous-même (10€ vs 40€ au pro shop)</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Practice
          </h3>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🎫 <strong>Cartes prépayées :</strong> -20% vs paiement à l'unité</li>
            <li style={{ marginBottom: '8px' }}>🆓 <strong>Practice municipal :</strong> Certains sont gratuits ou 2€/seau</li>
            <li style={{ marginBottom: '8px' }}>🏠 <strong>Filet de practice maison :</strong> 100-300€, amorti en 6 mois</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Comparer : membre vs indépendant
          </h2>

          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '16px' }}>
              Scénario : 40 parties de 18 trous par an
            </h3>

            <table style={{ width: '100%', fontSize: '14px', marginBottom: '16px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #e5e7eb' }}>
                  <th style={{ padding: '12px', textAlign: 'left' }}>Option</th>
                  <th style={{ padding: '12px', textAlign: 'right' }}>Coût annuel</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>
                    <strong>Membre club moyen</strong>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Cotisation 1500€</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>1500€</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb', backgroundColor: '#dbeafe' }}>
                  <td style={{ padding: '12px' }}>
                    <strong>Indépendant avec carte GPC</strong>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Carte 350€ + green fees réduits 40€</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>1950€</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px' }}>
                    <strong>Indépendant sans carte</strong>
                    <div style={{ fontSize: '12px', color: '#6b7280' }}>Green fees moyens 60€</div>
                  </td>
                  <td style={{ padding: '12px', textAlign: 'right', fontWeight: '600' }}>2400€</td>
                </tr>
              </tbody>
            </table>

            <p style={{ fontSize: '12px', color: '#6b7280', margin: 0 }}>
              <strong>Verdict :</strong> Pour 40 parties/an, l'adhésion club est plus rentable.
              En dessous de 25 parties/an, le statut indépendant avec carte multi-parcours est idéal.
            </p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Trouver des partenaires de jeu
          </h2>

          <p style={{ marginBottom: '16px' }}>
            En tant qu'indépendant, vous n'avez pas la communauté d'un club. Solutions :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>
              ⭐ <strong>Golf Buddies (recommandé) :</strong> Trouvez des partenaires sur tous les parcours de France
            </li>
            <li style={{ marginBottom: '8px' }}>
              👥 <strong>Groupes Facebook locaux :</strong> Gratuit mais organisation artisanale
            </li>
            <li style={{ marginBottom: '8px' }}>
              🏌️ <strong>Practice :</strong> Discutez avec d'autres joueurs, échangez vos coordonnées
            </li>
            <li style={{ marginBottom: '8px' }}>
              📱 <strong>Applications GPS golf :</strong> Certaines ont une fonction "trouver des joueurs"
            </li>
          </ul>

          <div style={{
            backgroundColor: '#dbeafe',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af', marginBottom: '12px' }}>
              💡 Astuce Golf Buddies
            </h3>
            <p style={{ color: '#1e40af', margin: 0 }}>
              En tant qu'indépendant, utilisez Golf Buddies pour créer votre "club virtuel" :
              suivez vos partenaires préférés, créez des événements récurrents et construisez votre
              propre communauté de golfeurs sans payer de cotisation !
            </p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Récapitulatif : le kit du golfeur indépendant
          </h2>

          <div style={{
            backgroundColor: '#f0fdf4',
            border: '2px solid #22c55e',
            borderRadius: '8px',
            padding: '24px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#166534', marginBottom: '16px' }}>
              ✅ Checklist pour réussir
            </h3>
            <ul style={{ marginBottom: 0, paddingLeft: '20px', color: '#166534' }}>
              <li style={{ marginBottom: '8px' }}>Licence FFGolf (40€/an) - obligatoire</li>
              <li style={{ marginBottom: '8px' }}>Carte multi-parcours si vous jouez 10+ fois/an</li>
              <li style={{ marginBottom: '8px' }}>Compte Golf Buddies pour trouver des partenaires</li>
              <li style={{ marginBottom: '8px' }}>Matériel d'occasion de qualité</li>
              <li style={{ marginBottom: '8px' }}>Stock de balles reconditionnées</li>
              <li style={{ marginBottom: '8px' }}>Liste de golfs municipaux/publics près de chez vous</li>
              <li style={{ marginBottom: '8px' }}>Flexibilité pour jouer en semaine</li>
            </ul>
          </div>

          {/* CTA */}
          <div style={{
            backgroundColor: '#f9fafb',
            border: '2px solid #3b82f6',
            borderRadius: '12px',
            padding: '32px',
            textAlign: 'center',
            marginTop: '48px'
          }}>
            <h3 style={{ fontSize: '24px', fontWeight: '600', color: '#111827', marginBottom: '12px' }}>
              Devenez un golfeur indépendant épanoui
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
              Rejoignez Golf Buddies et trouvez vos partenaires de jeu partout en France
            </p>
            <Link
              href="/signup"
              style={{
                display: 'inline-block',
                backgroundColor: '#3b82f6',
                color: '#ffffff',
                fontSize: '16px',
                fontWeight: '600',
                padding: '14px 32px',
                borderRadius: '8px',
                textDecoration: 'none'
              }}
            >
              S'inscrire gratuitement
            </Link>
          </div>

        </div>

        {/* Retour au guide */}
        <div style={{ marginTop: '48px', paddingTop: '24px', borderTop: '1px solid #e5e7eb' }}>
          <Link
            href="/guide"
            style={{
              color: '#3b82f6',
              textDecoration: 'none',
              fontSize: '16px',
              fontWeight: '500'
            }}
          >
            ← Retour au guide
          </Link>
        </div>
      </article>
    </div>
  );
}
