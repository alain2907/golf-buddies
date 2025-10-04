'use client';

import Link from 'next/link';
import { ArrowRight } from 'lucide-react';

const guides = [
  {
    slug: 'trouver-partenaires-golf',
    title: 'Comment trouver des partenaires de golf près de chez soi',
    description: 'Découvrez toutes les méthodes pour rencontrer des golfeurs et organiser vos parties facilement.',
    category: 'Démarrage',
    readTime: '5 min'
  },
  {
    slug: 'meilleures-apps-golf',
    title: 'Les meilleures apps pour jouer au golf à plusieurs',
    description: 'Comparatif des applications qui facilitent les rencontres entre golfeurs en France.',
    category: 'Technologie',
    readTime: '4 min'
  },
  {
    slug: 'golfs-conviviaux-france',
    title: 'Les golfs les plus conviviaux en France',
    description: 'Sélection des parcours français où il est facile de faire des rencontres et de jouer en groupe.',
    category: 'Parcours',
    readTime: '6 min'
  },
  {
    slug: 'organiser-partie-sans-club',
    title: 'Organiser une partie de golf sans club',
    description: 'Guide complet pour jouer au golf sans être membre d\'un club privé.',
    category: 'Astuces',
    readTime: '5 min'
  },
  {
    slug: 'jouer-sans-membre',
    title: 'Jouer au golf sans être membre : nos astuces',
    description: 'Tous nos conseils pour profiter du golf en tant que joueur indépendant.',
    category: 'Astuces',
    readTime: '4 min'
  }
];

export default function GuidePage() {
  return (
    <div style={{ minHeight: '100vh', backgroundColor: '#f9fafb' }}>
      {/* Header */}
      <div style={{
        backgroundColor: '#ffffff',
        borderBottom: '1px solid #e5e7eb',
        padding: '20px',
        marginBottom: '32px'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <h1 style={{
            fontSize: '32px',
            fontWeight: '700',
            color: '#111827',
            marginBottom: '8px'
          }}>
            📚 Guide Golf Buddies
          </h1>
          <p style={{
            fontSize: '16px',
            color: '#6b7280',
            lineHeight: '1.5'
          }}>
            Conseils, astuces et guides pratiques pour profiter au maximum du golf en France
          </p>
        </div>
      </div>

      {/* Liste des guides */}
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '0 20px 40px'
      }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {guides.map((guide) => (
            <Link
              key={guide.slug}
              href={`/guide/${guide.slug}`}
              style={{ textDecoration: 'none' }}
            >
              <article style={{
                backgroundColor: '#ffffff',
                border: '1px solid #e5e7eb',
                borderRadius: '12px',
                padding: '24px',
                height: '100%',
                display: 'flex',
                flexDirection: 'column',
                transition: 'all 0.2s',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.boxShadow = '0 4px 12px rgba(0,0,0,0.1)';
                e.currentTarget.style.transform = 'translateY(-2px)';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.boxShadow = 'none';
                e.currentTarget.style.transform = 'translateY(0)';
              }}>
                {/* Badge catégorie */}
                <div style={{
                  display: 'inline-block',
                  backgroundColor: '#dbeafe',
                  color: '#1e40af',
                  fontSize: '12px',
                  fontWeight: '600',
                  padding: '4px 12px',
                  borderRadius: '6px',
                  marginBottom: '16px',
                  width: 'fit-content'
                }}>
                  {guide.category}
                </div>

                {/* Titre */}
                <h2 style={{
                  fontSize: '20px',
                  fontWeight: '600',
                  color: '#111827',
                  marginBottom: '12px',
                  lineHeight: '1.3'
                }}>
                  {guide.title}
                </h2>

                {/* Description */}
                <p style={{
                  fontSize: '14px',
                  color: '#6b7280',
                  lineHeight: '1.6',
                  marginBottom: '16px',
                  flex: 1
                }}>
                  {guide.description}
                </p>

                {/* Footer */}
                <div style={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingTop: '16px',
                  borderTop: '1px solid #f3f4f6'
                }}>
                  <span style={{
                    fontSize: '13px',
                    color: '#9ca3af'
                  }}>
                    ⏱️ {guide.readTime} de lecture
                  </span>

                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '4px',
                    color: '#3b82f6',
                    fontSize: '14px',
                    fontWeight: '500'
                  }}>
                    Lire l'article
                    <ArrowRight size={16} />
                  </div>
                </div>
              </article>
            </Link>
          ))}
        </div>

        {/* CTA vers le blog */}
        <div style={{
          marginTop: '48px',
          backgroundColor: '#1f2937',
          borderRadius: '16px',
          padding: '32px',
          textAlign: 'center'
        }}>
          <h3 style={{
            fontSize: '24px',
            fontWeight: '600',
            color: '#ffffff',
            marginBottom: '12px'
          }}>
            Plus d'articles sur notre blog
          </h3>
          <p style={{
            fontSize: '16px',
            color: '#d1d5db',
            marginBottom: '24px'
          }}>
            Découvrez nos guides complets, actualités golf et conseils d'experts
          </p>
          <a
            href="https://golf-buddies.fr"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              display: 'inline-block',
              backgroundColor: '#3b82f6',
              color: '#ffffff',
              fontSize: '16px',
              fontWeight: '600',
              padding: '12px 32px',
              borderRadius: '8px',
              textDecoration: 'none',
              transition: 'background-color 0.2s'
            }}
            onMouseEnter={(e) => e.currentTarget.style.backgroundColor = '#2563eb'}
            onMouseLeave={(e) => e.currentTarget.style.backgroundColor = '#3b82f6'}
          >
            Visiter le blog →
          </a>
        </div>
      </div>
    </div>
  );
}
