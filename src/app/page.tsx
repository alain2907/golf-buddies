'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import { useAuth } from '@/hooks/useAuth'
import Link from 'next/link'
import { Calendar, Users, Trophy, MapPin, Clock, Target, Star, TrendingUp, Award, Zap } from 'lucide-react'

export default function HomePage() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && user) {
      router.push('/dashboard')
    }
  }, [user, loading, router])

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="loading-spinner"></div>
      </div>
    )
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section with animated background */}
      <section className="relative bg-gradient-to-br from-golf-green via-golf-light to-golf-fairway text-white overflow-hidden">
        <div className="absolute inset-0 bg-black/20"></div>
        <div className="absolute -top-10 -right-10 w-40 h-40 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>
        <div className="absolute -bottom-10 -left-10 w-60 h-60 bg-white/10 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="relative max-w-7xl mx-auto px-4 py-24 sm:px-6 lg:px-8">
          <div className="text-center animate-slide-up">
            <div className="flex justify-center mb-6">
              <div className="p-4 bg-white/10 rounded-full backdrop-blur-lg">
                <Trophy className="w-12 h-12 text-golf-sand" />
              </div>
            </div>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              Golf Buddies
            </h1>
            <p className="text-xl md:text-2xl mb-8 opacity-95 max-w-2xl mx-auto">
              Trouvez votre partenaire de golf parfait et ne jouez plus jamais seul
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="btn-golf bg-white text-golf-green hover:bg-gray-100 px-8 py-4 text-lg">
                Commencer gratuitement
              </Link>
              <Link href="/search" className="btn-golf bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 text-lg">
                Parcourir les events
              </Link>
            </div>
            <p className="mt-8 text-golf-sand/80 text-sm">
              Rejoignez plus de 10 000 golfeurs qui utilisent déjà Golf Buddies
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" label="Golfeurs actifs" />
            <StatCard number="5,000+" label="Parties jouées" />
            <StatCard number="500+" label="Parcours de golf" />
            <StatCard number="4.9★" label="Note utilisateurs" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Tout ce dont vous avez besoin pour améliorer votre jeu
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              De la recherche de partenaires au suivi de vos progrès, nous nous occupons de tout
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Matching intelligent"
              description="Notre algorithme vous associe avec des golfeurs de votre niveau pour la partie parfaite"
              gradient="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Planification facile"
              description="Réservez des créneaux, organisez des parties et gérez votre calendrier golf sans effort"
              gradient="from-green-500 to-green-600"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Tournois"
              description="Rejoignez des tournois locaux, affrontez vos amis et gagnez des prix"
              gradient="from-yellow-500 to-yellow-600"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Découverte de parcours"
              description="Explorez de nouveaux parcours, lisez les avis et trouvez des perles cachées près de chez vous"
              gradient="from-purple-500 to-purple-600"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Suivi des progrès"
              description="Surveillez votre handicap, vos statistiques et votre amélioration au fil du temps"
              gradient="from-red-500 to-red-600"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Chat instantané"
              description="Communiquez avec vos partenaires de jeu en temps réel"
              gradient="from-indigo-500 to-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Comment ça marche
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard step="1" title="Inscription" description="Créez votre compte gratuit en quelques secondes" />
            <StepCard step="2" title="Définir les préférences" description="Indiquez-nous votre niveau et vos disponibilités" />
            <StepCard step="3" title="Trouver des partenaires" description="Parcourez les événements ou soyez associé automatiquement" />
            <StepCard step="4" title="Jouez au golf !" description="Retrouvez-vous sur le parcours et profitez de votre partie" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-golf-fairway/10 to-golf-sky/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            Ce que disent les golfeurs
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Golf Buddies a transformé mon jeu. J'ai rencontré des partenaires formidables et mon handicap a baissé de 5 coups !"
              author="Sarah M."
              rating={5}
            />
            <TestimonialCard
              quote="En tant que nouveau dans la région, cette app m'a aidé à trouver une super communauté golf. Je recommande vivement !"
              author="John D."
              rating={5}
            />
            <TestimonialCard
              quote="La fonctionnalité tournoi est fantastique. J'ai gagné deux événements locaux grâce à l'app !"
              author="Mike R."
              rating={5}
            />
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-golf-green to-golf-light py-20">
        <div className="max-w-4xl mx-auto text-center px-4">
          <h2 className="text-4xl font-bold mb-4 text-white">
            Prêt à transformer votre expérience golf ?
          </h2>
          <p className="text-xl mb-8 text-golf-sand">
            Rejoignez des milliers de golfeurs qui n'ont plus jamais à jouer seuls
          </p>
          <Link href="/login" className="inline-block bg-white text-golf-green btn-golf text-lg px-10 py-4">
            Commencez à jouer aujourd'hui - C'est gratuit !
          </Link>
          <p className="mt-4 text-golf-sand/80 text-sm">
            Aucune carte de crédit requise • Plan gratuit à vie disponible
          </p>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-golf-green text-white py-12">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            <div>
              <h3 className="font-bold mb-4">Golf Buddies</h3>
              <p className="text-golf-fairway/80 text-sm">
                Votre application compagnon golf ultime
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Fonctionnalités</h4>
              <ul className="space-y-2 text-sm text-golf-fairway/80">
                <li><Link href="/search" className="hover:text-white">Trouver des partenaires</Link></li>
                <li><Link href="/create" className="hover:text-white">Créer des événements</Link></li>
                <li><Link href="/courses" className="hover:text-white">Parcours</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-golf-fairway/80">
                <li><a href="#" className="hover:text-white">Centre d'aide</a></li>
                <li><a href="#" className="hover:text-white">Nous contacter</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Légal</h4>
              <ul className="space-y-2 text-sm text-golf-fairway/80">
                <li><Link href="/settings/privacy" className="hover:text-white">Politique de confidentialité</Link></li>
                <li><Link href="/settings/terms" className="hover:text-white">Conditions d'utilisation</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-golf-light/30 pt-8 text-center text-sm text-golf-fairway/80">
            © 2025 Golf Buddies. Tous droits réservés.
          </div>
        </div>
      </footer>
    </div>
  )
}

function StatCard({ number, label }: { number: string, label: string }) {
  return (
    <div className="animate-fade-in">
      <div className="text-3xl font-bold text-golf-green">{number}</div>
      <div className="text-gray-600 text-sm mt-1">{label}</div>
    </div>
  )
}

function FeatureCard({ icon, title, description, gradient }: any) {
  return (
    <div className="group card-golf hover:transform hover:scale-105 transition-all duration-300">
      <div className={`bg-gradient-to-r ${gradient} p-3 rounded-xl inline-flex text-white mb-4 group-hover:scale-110 transition-transform`}>
        {icon}
      </div>
      <h3 className="text-xl font-semibold mb-2">{title}</h3>
      <p className="text-gray-600">{description}</p>
    </div>
  )
}

function StepCard({ step, title, description }: any) {
  return (
    <div className="text-center">
      <div className="w-12 h-12 bg-gradient-to-r from-golf-green to-golf-light rounded-full flex items-center justify-center text-white font-bold text-xl mx-auto mb-4">
        {step}
      </div>
      <h3 className="font-semibold mb-2">{title}</h3>
      <p className="text-gray-600 text-sm">{description}</p>
    </div>
  )
}

function TestimonialCard({ quote, author, rating }: any) {
  return (
    <div className="card-golf">
      <div className="flex mb-3">
        {[...Array(rating)].map((_, i) => (
          <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
        ))}
      </div>
      <p className="text-gray-700 mb-4 italic">&quot;{quote}&quot;</p>
      <p className="font-semibold text-golf-green">- {author}</p>
    </div>
  )
}