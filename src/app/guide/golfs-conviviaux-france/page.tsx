import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Les golfs les plus conviviaux en France pour rencontrer des joueurs | Golf Buddies',
  description: 'Découvrez notre sélection des parcours de golf français où il est facile de faire des rencontres et de jouer en groupe. Guide régional complet.',
  keywords: 'golf convivial, parcours golf france, rencontre golfeurs, golf accueillant, club golf amical',
};

export default function GolfsConviviauxFrancePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
          <Link href="/guide" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Guide
          </Link>
          {' / '}
          <span>Les golfs les plus conviviaux en France</span>
        </nav>

        {/* Titre principal */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Les golfs les plus conviviaux en France
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
          <span>⏱️ 6 min de lecture</span>
          <span>⛳ Parcours</span>
        </div>

        {/* Introduction */}
        <div style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', marginBottom: '32px' }}>
          <p>
            Certains parcours de golf se distinguent par leur atmosphère accueillante et la facilité d'y
            rencontrer d'autres joueurs. Voici notre sélection des golfs les plus conviviaux de France,
            région par région, où vous pourrez facilement jouer en groupe et tisser des liens.
          </p>
        </div>

        {/* Contenu structuré */}
        <div style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Île-de-France
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf de Courson (Essonne)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Un parcours familial avec une ambiance décontractée et un accueil chaleureux.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🌳 Parcours 18 trous dans un domaine historique</li>
            <li style={{ marginBottom: '8px' }}>👨‍👩‍👧‍👦 Très ouvert aux débutants et familles</li>
            <li style={{ marginBottom: '8px' }}>💰 Tarifs accessibles (45-65€)</li>
            <li style={{ marginBottom: '8px' }}>☕ Club house convivial avec terrasse</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf Paris International (Val-d'Oise)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Un golf accessible avec une communauté active de joueurs réguliers.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏌️ Practice éclairé jusqu'à 22h</li>
            <li style={{ marginBottom: '8px' }}>👥 Nombreux événements et compétitions amicales</li>
            <li style={{ marginBottom: '8px' }}>🎯 Facilite les rencontres entre joueurs solo</li>
            <li style={{ marginBottom: '8px' }}>💰 Green fees 40-60€</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Provence-Alpes-Côte d'Azur
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf de Pont Royal (Bouches-du-Rhône)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Le parcours le plus social de Provence, réputé pour son ambiance internationale.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🌍 Clientèle internationale et ouverte</li>
            <li style={{ marginBottom: '8px' }}>🏨 Resort avec hébergement (facilite les week-ends golf)</li>
            <li style={{ marginBottom: '8px' }}>🍷 Nombreux événements golf + œnologie</li>
            <li style={{ marginBottom: '8px' }}>☀️ 300 jours de soleil par an</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf d'Opio-Valbonne (Alpes-Maritimes)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Un parcours de l'arrière-pays niçois avec une atmosphère chaleureuse.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🌲 Cadre naturel exceptionnel</li>
            <li style={{ marginBottom: '8px' }}>👫 Club très actif socialement</li>
            <li style={{ marginBottom: '8px' }}>🎉 Tournois et animations régulières</li>
            <li style={{ marginBottom: '8px' }}>🍽️ Restaurant réputé au club house</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Nouvelle-Aquitaine
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf de Moliets (Landes)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Un links landais avec une ambiance surf et golf unique en France.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏄 Atmosphère décontractée surf & golf</li>
            <li style={{ marginBottom: '8px' }}>🌊 À 5 min de la plage</li>
            <li style={{ marginBottom: '8px' }}>🎸 Soirées et concerts en été au club house</li>
            <li style={{ marginBottom: '8px' }}>👨‍👩‍👧 Parfait pour vacances golf en famille</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf de Biarritz Le Phare (Pyrénées-Atlantiques)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Le golf historique de Biarritz, toujours aussi convivial depuis 1888.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏛️ Histoire et tradition</li>
            <li style={{ marginBottom: '8px' }}>🌅 Vue imprenable sur l'océan</li>
            <li style={{ marginBottom: '8px' }}>🎭 Ambiance élégante mais accessible</li>
            <li style={{ marginBottom: '8px' }}>🥘 Gastronomie basque au restaurant</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Auvergne-Rhône-Alpes
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf Club d'Évian Resort (Haute-Savoie)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Un resort de luxe qui reste étonnamment ouvert et convivial.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🏔️ Vue sur le lac Léman et les Alpes</li>
            <li style={{ marginBottom: '8px' }}>⛳ Hôte de l'Evian Championship (LPGA)</li>
            <li style={{ marginBottom: '8px' }}>🧖 Spa et wellness après le golf</li>
            <li style={{ marginBottom: '8px' }}>🎯 Nombreux packages golf + hébergement</li>
          </ul>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf de Lyon Verger (Rhône)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Le plus grand club de la région lyonnaise, très accueillant.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>👥 Communauté de 1500+ membres</li>
            <li style={{ marginBottom: '8px' }}>🏌️ Practice couvert et école de golf active</li>
            <li style={{ marginBottom: '8px' }}>🎊 Nombreux événements pour tous niveaux</li>
            <li style={{ marginBottom: '8px' }}>🚗 Facile d'accès depuis Lyon (20 min)</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Bretagne
          </h2>

          <h3 style={{ fontSize: '22px', fontWeight: '600', color: '#111827', marginTop: '24px', marginBottom: '12px' }}>
            Golf de Dinard (Ille-et-Vilaine)
          </h3>
          <p style={{ marginBottom: '16px' }}>
            Un parcours centenaire avec l'esprit breton chaleureux.
          </p>
          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>⛵ Links en bord de mer</li>
            <li style={{ marginBottom: '8px' }}>🎩 Tradition british + hospitalité bretonne</li>
            <li style={{ marginBottom: '8px' }}>🦞 Crêperie et fruits de mer au club house</li>
            <li style={{ marginBottom: '8px' }}>🌊 Ambiance station balnéaire</li>
          </ul>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Comment reconnaître un golf convivial ?
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Avant de vous déplacer, voici les signes qui ne trompent pas :
          </p>

          <div style={{
            backgroundColor: '#f0fdf4',
            border: '1px solid #22c55e',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#166534', marginBottom: '12px' }}>
              ✅ Signes d'un golf convivial
            </h3>
            <ul style={{ marginBottom: 0, paddingLeft: '20px', color: '#166534' }}>
              <li style={{ marginBottom: '8px' }}>Accueil téléphonique chaleureux et patient</li>
              <li style={{ marginBottom: '8px' }}>Site web mentionnant "débutants bienvenus"</li>
              <li style={{ marginBottom: '8px' }}>Calendrier d'événements et compétitions variés</li>
              <li style={{ marginBottom: '8px' }}>Club house actif avec terrasse</li>
              <li style={{ marginBottom: '8px' }}>École de golf et cours collectifs réguliers</li>
              <li style={{ marginBottom: '8px' }}>Présence sur Golf Buddies avec événements ouverts</li>
            </ul>
          </div>

          <div style={{
            backgroundColor: '#fef2f2',
            border: '1px solid #ef4444',
            borderRadius: '8px',
            padding: '20px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#991b1b', marginBottom: '12px' }}>
              ❌ Signes d'un golf moins ouvert
            </h3>
            <ul style={{ marginBottom: 0, paddingLeft: '20px', color: '#991b1b' }}>
              <li style={{ marginBottom: '8px' }}>Mention "membres uniquement" ou "sur invitation"</li>
              <li style={{ marginBottom: '8px' }}>Green fees très élevés (stratégie pour limiter l'accès)</li>
              <li style={{ marginBottom: '8px' }}>Dress code très strict</li>
              <li style={{ marginBottom: '8px' }}>Peu ou pas d'événements ouverts aux non-membres</li>
            </ul>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Maximiser vos chances de rencontres
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Même sur les golfs les plus conviviaux, adoptez ces réflexes :
          </p>

          <ol style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Arrivez 30 minutes en avance</strong> - Prenez un café au club house, discutez avec d'autres joueurs
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Dites bonjour à tout le monde</strong> - Practice, putting green, vestiaires... la convivialité se crée partout
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Participez aux événements</strong> - Scrambles, coupe club, compétitions amicales
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Restez pour le 19ème trou</strong> - Les meilleures amitiés golfiques naissent au club house après la partie
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Utilisez Golf Buddies</strong> - Même sur ces parcours accueillants, organisez vos parties en amont via l'app
            </li>
          </ol>

          <div style={{
            backgroundColor: '#dbeafe',
            border: '1px solid #3b82f6',
            borderRadius: '8px',
            padding: '20px',
            marginTop: '32px',
            marginBottom: '24px'
          }}>
            <h3 style={{ fontSize: '18px', fontWeight: '600', color: '#1e40af', marginBottom: '12px' }}>
              💡 Astuce Golf Buddies
            </h3>
            <p style={{ color: '#1e40af', margin: 0 }}>
              Sur Golf Buddies, filtrez les événements par parcours pour voir qui joue sur votre golf convivial préféré.
              Contactez les organisateurs en amont pour vous joindre à leur partie !
            </p>
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
              Trouvez vos partenaires sur ces golfs conviviaux
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
              Rejoignez Golf Buddies et organisez vos parties sur les parcours les plus accueillants de France
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
              Commencer gratuitement
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
