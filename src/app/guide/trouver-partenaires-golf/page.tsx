import { Metadata } from 'next';
import Link from 'next/link';

export const metadata: Metadata = {
  title: 'Comment trouver des partenaires de golf près de chez soi | Golf Buddies',
  description: 'Découvrez toutes les méthodes pour rencontrer des golfeurs et organiser vos parties facilement. Guide complet avec astuces et applications recommandées.',
  keywords: 'partenaires golf, trouver golfeurs, golf buddies, rencontre golf, partie golf',
};

export default function TrouverPartenairesGolfPage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#ffffff' }}>
      <article style={{ maxWidth: '800px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Breadcrumb */}
        <nav style={{ marginBottom: '24px', fontSize: '14px', color: '#6b7280' }}>
          <Link href="/guide" style={{ color: '#3b82f6', textDecoration: 'none' }}>
            Guide
          </Link>
          {' / '}
          <span>Comment trouver des partenaires de golf</span>
        </nav>

        {/* Titre principal */}
        <h1 style={{
          fontSize: '36px',
          fontWeight: '700',
          color: '#111827',
          marginBottom: '16px',
          lineHeight: '1.2'
        }}>
          Comment trouver des partenaires de golf près de chez soi
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
          <span>📚 Démarrage</span>
        </div>

        {/* Introduction */}
        <div style={{ fontSize: '18px', color: '#374151', lineHeight: '1.8', marginBottom: '32px' }}>
          <p>
            Vous adorez le golf mais vous ne savez pas avec qui jouer ? Vous venez d'emménager dans une nouvelle région ?
            Vous cherchez des partenaires de votre niveau ? Ce guide vous présente toutes les solutions pour trouver
            facilement des golfeurs près de chez vous et organiser vos parties.
          </p>
        </div>

        {/* Contenu structuré */}
        <div style={{ fontSize: '16px', color: '#374151', lineHeight: '1.8' }}>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            1. Les applications de rencontre golf
          </h2>

          <p style={{ marginBottom: '16px' }}>
            La méthode la plus simple et rapide en 2025 est d'utiliser une application dédiée comme <strong>Golf Buddies</strong>.
            Ces plateformes vous permettent de :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>🔍 Rechercher des golfeurs près de chez vous</li>
            <li style={{ marginBottom: '8px' }}>📅 Créer ou rejoindre des événements de golf</li>
            <li style={{ marginBottom: '8px' }}>⛳ Filtrer par niveau (index), parcours préféré et disponibilités</li>
            <li style={{ marginBottom: '8px' }}>💬 Discuter avant de vous rencontrer sur le parcours</li>
            <li style={{ marginBottom: '8px' }}>⭐ Consulter les avis d'autres golfeurs</li>
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
              Sur Golf Buddies, créez votre premier événement en 2 minutes : choisissez votre parcours favori,
              la date et le format de jeu. Vous recevrez des demandes de golfeurs intéressés dans les heures qui suivent !
            </p>
          </div>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            2. Rejoindre un club de golf
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Les clubs restent un excellent moyen de rencontrer des partenaires réguliers. Avantages :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Compétitions et tournois organisés chaque mois</li>
            <li style={{ marginBottom: '8px' }}>Groupes de niveau pour progresser ensemble</li>
            <li style={{ marginBottom: '8px' }}>Événements sociaux au club house</li>
            <li style={{ marginBottom: '8px' }}>Accès prioritaire aux créneaux de jeu</li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            <strong>Point d'attention :</strong> L'adhésion coûte entre 800€ et 3000€ par an selon les clubs.
            Une solution parfaite si vous jouez régulièrement (+ de 2 fois par semaine).
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            3. Les groupes Facebook et forums locaux
          </h2>

          <p style={{ marginBottom: '16px' }}>
            De nombreux groupes Facebook régionaux existent pour les golfeurs :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>"Golf Paris et Île-de-France"</li>
            <li style={{ marginBottom: '8px' }}>"Golfeurs Côte d'Azur"</li>
            <li style={{ marginBottom: '8px' }}>"Golf Aquitaine - Rencontres et Parties"</li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            <strong>Limites :</strong> Organisation artisanale, messages qui se perdent, difficile de trouver
            quelqu'un disponible le jour même.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            4. Sur le parcours : la méthode directe
          </h2>

          <p style={{ marginBottom: '16px' }}>
            N'hésitez pas à aborder d'autres golfeurs au practice, au putting green ou même sur le parcours.
            Les golfeurs sont généralement très ouverts aux rencontres !
          </p>

          <p style={{ marginBottom: '24px' }}>
            <strong>Conseil :</strong> Arrivez 30 minutes avant votre départ, prenez un café au club house,
            discutez avec les autres joueurs. C'est ainsi que naissent les meilleures amitiés golfiques !
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            5. Les stages et cours collectifs
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Participer à des cours collectifs est idéal pour :
          </p>

          <ul style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '8px' }}>Rencontrer des joueurs de votre niveau</li>
            <li style={{ marginBottom: '8px' }}>Créer un groupe qui continue à jouer ensemble après les cours</li>
            <li style={{ marginBottom: '8px' }}>Bénéficier des conseils d'un pro en groupe</li>
          </ul>

          <p style={{ marginBottom: '24px' }}>
            Tarif moyen : 150-300€ pour 10 séances collectives.
          </p>

          <h2 style={{ fontSize: '28px', fontWeight: '600', color: '#111827', marginTop: '40px', marginBottom: '16px' }}>
            Conclusion : quelle méthode choisir ?
          </h2>

          <p style={{ marginBottom: '16px' }}>
            Pour trouver rapidement des partenaires près de chez vous en 2025, nous recommandons :
          </p>

          <ol style={{ marginBottom: '24px', paddingLeft: '24px' }}>
            <li style={{ marginBottom: '12px' }}>
              <strong>Applications comme Golf Buddies</strong> : rapide, flexible, adapté aux emplois du temps variables
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Club de golf</strong> : si vous jouez très régulièrement et cherchez une communauté stable
            </li>
            <li style={{ marginBottom: '12px' }}>
              <strong>Rencontres sur parcours</strong> : complément parfait aux deux premières méthodes
            </li>
          </ol>

          <p style={{ marginBottom: '24px' }}>
            L'important est de multiplier les opportunités de rencontre. N'hésitez pas à combiner plusieurs méthodes
            pour maximiser vos chances de trouver vos golfeurs préférés !
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
              Prêt à trouver vos partenaires de golf ?
            </h3>
            <p style={{ fontSize: '16px', color: '#6b7280', marginBottom: '24px' }}>
              Rejoignez Golf Buddies et organisez votre première partie dès cette semaine
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
