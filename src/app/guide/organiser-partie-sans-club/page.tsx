import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Organiser une partie de golf sans club : guide complet 2025 | Golf Buddies',
  description: 'Découvrez comment organiser facilement vos parties de golf sans être membre d\'un club. Green fees, réservations, matériel : tout ce qu\'il faut savoir.',
  keywords: 'golf sans club, green fee, partie golf, réserver parcours, golf indépendant, jouer au golf',
};

export default function OrganiserPartieSansClubPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
          <Link href="/guide" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Guide
          </Link>
          {' / '}
          <span>Organiser une partie de golf sans club</span>
        </nav>

        {/* Titre principal */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Organiser une partie de golf sans club
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
          <span>⏱️ 5 min de lecture</span>
          <span>💡 Astuces</span>
        </div>

        {/* Introduction */}
        <div style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', marginBottom: '32px' }}>
          <p>
            Vous n'êtes pas membre d'un club de golf mais vous voulez jouer régulièrement ? Bonne nouvelle :
            c'est tout à fait possible ! Ce guide vous explique comment organiser vos parties en toute autonomie,
            trouver des parcours accessibles et optimiser votre budget.
          </p>
        </div>

        {/* Contenu structuré */}
        <div style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Comprendre le système des green fees
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Le <strong>green fee</strong> est le droit de jeu que vous payez pour accéder au parcours sans être membre.
            C'est votre billet d'entrée pour jouer.
          </p>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Fourchette de prix en France (2025)
          </h3>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Golfs municipaux :</strong> 20-40€ les 18 trous</li>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Golfs privés accessibles :</strong> 40-80€ les 18 trous</li>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Golfs prestigieux :</strong> 80-150€ les 18 trous</li>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Golfs d'exception :</strong> 150-250€ (Golf National, etc.)</li>
          </ul>

          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#166534', marginBottom: '12px' }}>
              💡 Astuce budget
            </h3>
            <p style={{ color: '#166534', margin: 0 }}>
              Les tarifs sont 30-50% moins chers en semaine et en basse saison (novembre-mars).
              Un green fee de 80€ le week-end peut descendre à 50€ un mercredi après-midi !
            </p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Étape par étape : organiser votre première partie
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            1. Choisir votre parcours
          </h3>

          <p style={{ marginBottom: '16px' }}>
            Critères de sélection :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>📍 <strong>Distance :</strong> Maximum 45 min en voiture pour un jeu régulier</li>
            <li style={{ marginBottom: '8px' }}>🎯 <strong>Niveau :</strong> Parcours compact (9 trous) ou école pour débuter</li>
            <li style={{ marginBottom: '8px' }}>💰 <strong>Budget :</strong> Commencez par les golfs municipaux ou associatifs</li>
            <li style={{ marginBottom: '8px' }}>👥 <strong>Ambiance :</strong> Vérifiez les avis sur Google Maps et Golf Buddies</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            2. Réserver votre créneau
          </h3>

          <p style={{ marginBottom: '16px' }}>
            <strong>Méthodes de réservation :</strong>
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>
              📞 <strong>Téléphone</strong> - Méthode classique, vous parlez directement au pro shop
            </li>
            <li style={{ marginBottom: '8px' }}>
              🌐 <strong>Site web du golf</strong> - Beaucoup de clubs ont un système de réservation en ligne
            </li>
            <li style={{ marginBottom: '8px' }}>
              📱 <strong>Apps spécialisées</strong> - Golfoo, Leadingcourses, ou directement sur Golf Buddies
            </li>
          </ul>

          <p style={{ marginBottom: '16px' }}>
            <strong>Quand réserver ?</strong>
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>⏰ <strong>Week-end :</strong> 7-14 jours à l'avance (créneaux prisés)</li>
            <li style={{ marginBottom: '8px' }}>⏰ <strong>Semaine :</strong> 2-3 jours à l'avance suffisent</li>
            <li style={{ marginBottom: '8px' }}>⏰ <strong>Dernière minute :</strong> Appelez le matin même, des créneaux se libèrent souvent</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            3. Trouver vos partenaires de jeu
          </h3>

          <p style={{ marginBottom: '16px' }}>
            Jouer seul est possible mais moins convivial. Options pour trouver des partenaires :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>
              🏆 <strong>Golf Buddies (recommandé)</strong> - Créez votre événement et recevez des demandes
            </li>
            <li style={{ marginBottom: '8px' }}>
              👥 <strong>Sur place</strong> - Demandez au pro shop de vous matcher avec d'autres joueurs solo
            </li>
            <li style={{ marginBottom: '8px' }}>
              📱 <strong>Groupes Facebook</strong> - Groupes locaux de golfeurs
            </li>
            <li style={{ marginBottom: '8px' }}>
              👨‍👩‍👧 <strong>Amis/famille</strong> - Initiez vos proches au golf !
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
              Créez votre partie sur Golf Buddies 3-7 jours à l'avance. Indiquez le parcours, l'heure,
              et le nombre de joueurs recherchés. Vous aurez plusieurs candidatures pour compléter votre flight !
            </p>
          </div>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            4. Préparer votre matériel
          </h3>

          <p style={{ marginBottom: '16px' }}>
            <strong>Si vous avez votre propre matériel :</strong>
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>✅ Vérifier l'état des grips et des clubs</li>
            <li style={{ marginBottom: '8px' }}>✅ Prévoir 12-15 balles minimum</li>
            <li style={{ marginBottom: '8px' }}>✅ Tees, relève-pitch, gant, marqueurs</li>
            <li style={{ marginBottom: '8px' }}>✅ Chaussures de golf (obligatoires sur la plupart des parcours)</li>
          </ul>

          <p style={{ marginBottom: '16px' }}>
            <strong>Si vous n'avez pas de matériel :</strong>
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🎒 <strong>Location clubs :</strong> 15-30€ (demi-série ou série complète)</li>
            <li style={{ marginBottom: '8px' }}>🚗 <strong>Voiturette :</strong> 25-45€ (optionnelle mais confortable)</li>
            <li style={{ marginBottom: '8px' }}>⚠️ <strong>Réservez en même temps</strong> que votre green fee pour garantir la disponibilité</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            5. Le jour J : déroulé type
          </h3>

          <p style={{ marginBottom: '16px' }}>
            <strong>T-30 min :</strong> Arrivée au golf
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Enregistrement au pro shop</li>
            <li style={{ marginBottom: '8px' }}>Paiement du green fee (CB généralement acceptée)</li>
            <li style={{ marginBottom: '8px' }}>Récupération location clubs si besoin</li>
          </ul>

          <p style={{ marginBottom: '16px' }}>
            <strong>T-15 min :</strong> Échauffement
          </p>
          <ul style={{ marginBottom: '16px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Practice : 10-15 balles (souvent inclus ou 5€)</li>
            <li style={{ marginBottom: '8px' }}>Putting green : calibrer la vitesse des greens</li>
          </ul>

          <p style={{ marginBottom: '16px' }}>
            <strong>T-0 :</strong> Départ
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Rendez-vous au tee de départ du 1 ou du 10 (selon votre réservation)</li>
            <li style={{ marginBottom: '8px' }}>Présentez-vous aux autres joueurs si vous ne les connaissez pas</li>
            <li style={{ marginBottom: '8px' }}>C'est parti pour 4-5h de golf ! ⛳</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Budget mensuel pour un joueur indépendant
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Simulation pour <strong>2 parties de 18 trous par mois</strong> :
          </p>

          <div style={{
            backgroundColor: '#f9fafb',
            border: '1px solid #e5e7eb',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <table style={{ width: '100%', fontSize: '14px' }}>
              <tbody>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 0' }}>Green fees (2 × 60€)</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>120€</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 0' }}>Practice (8 seaux × 5€)</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>40€</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 0' }}>Balles (24 balles × 1.50€)</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>36€</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #e5e7eb' }}>
                  <td style={{ padding: '12px 0' }}>Essence (déplacements)</td>
                  <td style={{ padding: '12px 0', textAlign: 'right', fontWeight: '600' }}>20€</td>
                </tr>
                <tr style={{ fontWeight: '700', fontSize: '16px', backgroundColor: '#dbeafe' }}>
                  <td style={{ padding: '12px' }}>TOTAL MENSUEL</td>
                  <td style={{ padding: '12px', textAlign: 'right' }}>216€/mois</td>
                </tr>
                <tr style={{ fontSize: '12px', color: '#6b7280' }}>
                  <td colSpan={2} style={{ padding: '12px 0' }}>
                    Soit 108€ par partie | À comparer : adhésion club 1500-3000€/an
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Astuces pour réduire les coûts
          </h2>

          <ol style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Jouez en semaine</strong> - Tarifs 30-40% moins chers qu'en week-end
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Privilégiez l'après-midi</strong> - Twilight fees (parties de fin de journée) à -50%
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Cartes multi-parcours</strong> - Golf Privilege Card, Cartes Albatros donnent accès à plusieurs golfs
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Balles de lac</strong> - Achetez des balles reconditionnées (1€ au lieu de 3-4€)
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Groupez-vous</strong> - Certains golfs font des tarifs de groupe (4 joueurs = -10%)
            </li>
          </ol>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            FAQ : questions fréquentes
          </h2>

          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginTop: '20px', marginBottom: '12px' }}>
            Ai-je besoin d'une licence FFGolf pour jouer ?
          </h3>
          <p style={{ marginBottom: '24px' }}>
            Oui, la plupart des golfs demandent une licence (40€/an) ou un index pour jouer.
            Certains golfs publics acceptent les joueurs sans licence mais c'est de plus en plus rare
            pour des raisons d'assurance.
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginTop: '20px', marginBottom: '12px' }}>
            Puis-je jouer seul ?
          </h3>
          <p style={{ marginBottom: '24px' }}>
            Oui, mais c'est moins convivial et vous risquez d'être "matché" avec d'autres joueurs solo
            par le golf. Autant anticiper et trouver vos partenaires vous-même sur Golf Buddies !
          </p>

          <h3 style={{ fontSize: '20px', fontWeight: '600', color: '#111827', marginTop: '20px', marginBottom: '12px' }}>
            Que se passe-t-il si j'annule ma réservation ?
          </h3>
          <p style={{ marginBottom: '24px' }}>
            Politiques variables selon les golfs. En général : annulation gratuite 48-72h avant,
            au-delà vous payez 50-100% du green fee. Vérifiez toujours les conditions en réservant.
          </p>

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
              Prêt à organiser votre première partie ?
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
              Trouvez vos partenaires sur Golf Buddies et réservez votre parcours dès maintenant
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
              Créer mon premier événement
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
