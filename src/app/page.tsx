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
              Find Your Perfect Golf Partner & Never Play Alone Again
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Link href="/login" className="btn-golf bg-white text-golf-green hover:bg-gray-100 px-8 py-4 text-lg">
                Get Started Free
              </Link>
              <Link href="/search" className="btn-golf bg-transparent border-2 border-white hover:bg-white/10 px-8 py-4 text-lg">
                Browse Events
              </Link>
            </div>
            <p className="mt-8 text-golf-sand/80 text-sm">
              Join 10,000+ golfers already using Golf Buddies
            </p>
          </div>
        </div>
        <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-white to-transparent"></div>
      </section>

      {/* Stats Section */}
      <section className="py-12 bg-white border-b">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <StatCard number="10,000+" label="Active Golfers" />
            <StatCard number="5,000+" label="Rounds Played" />
            <StatCard number="500+" label="Golf Courses" />
            <StatCard number="4.9★" label="User Rating" />
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold mb-4 gradient-text">
              Everything You Need to Elevate Your Game
            </h2>
            <p className="text-gray-600 text-lg max-w-2xl mx-auto">
              From finding partners to tracking your progress, we've got you covered
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            <FeatureCard
              icon={<Users className="w-8 h-8" />}
              title="Smart Matching"
              description="Our algorithm pairs you with golfers at your skill level for the perfect round"
              gradient="from-blue-500 to-blue-600"
            />
            <FeatureCard
              icon={<Calendar className="w-8 h-8" />}
              title="Easy Scheduling"
              description="Book tee times, organize rounds, and manage your golf calendar effortlessly"
              gradient="from-green-500 to-green-600"
            />
            <FeatureCard
              icon={<Trophy className="w-8 h-8" />}
              title="Tournaments"
              description="Join local tournaments, compete with friends, and win prizes"
              gradient="from-yellow-500 to-yellow-600"
            />
            <FeatureCard
              icon={<MapPin className="w-8 h-8" />}
              title="Course Discovery"
              description="Explore new courses, read reviews, and find hidden gems near you"
              gradient="from-purple-500 to-purple-600"
            />
            <FeatureCard
              icon={<TrendingUp className="w-8 h-8" />}
              title="Track Progress"
              description="Monitor your handicap, stats, and improvement over time"
              gradient="from-red-500 to-red-600"
            />
            <FeatureCard
              icon={<Zap className="w-8 h-8" />}
              title="Instant Chat"
              description="Communicate with your playing partners in real-time"
              gradient="from-indigo-500 to-indigo-600"
            />
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-20 px-4 bg-white">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            How It Works
          </h2>
          <div className="grid md:grid-cols-4 gap-8">
            <StepCard step="1" title="Sign Up" description="Create your free account in seconds" />
            <StepCard step="2" title="Set Preferences" description="Tell us your skill level and availability" />
            <StepCard step="3" title="Find Partners" description="Browse events or get matched automatically" />
            <StepCard step="4" title="Play Golf!" description="Meet at the course and enjoy your round" />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gradient-to-br from-golf-fairway/10 to-golf-sky/10">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center mb-12">
            What Golfers Are Saying
          </h2>
          <div className="grid md:grid-cols-3 gap-8">
            <TestimonialCard
              quote="Golf Buddies transformed my game. I've met amazing partners and my handicap has dropped by 5 strokes!"
              author="Sarah M."
              rating={5}
            />
            <TestimonialCard
              quote="As someone new to the area, this app helped me find a great golf community. Highly recommend!"
              author="John D."
              rating={5}
            />
            <TestimonialCard
              quote="The tournament feature is fantastic. I've won two local events through the app!"
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
            Ready to Transform Your Golf Experience?
          </h2>
          <p className="text-xl mb-8 text-golf-sand">
            Join thousands of golfers who never have to play alone
          </p>
          <Link href="/login" className="inline-block bg-white text-golf-green btn-golf text-lg px-10 py-4">
            Start Playing Today - It's Free!
          </Link>
          <p className="mt-4 text-golf-sand/80 text-sm">
            No credit card required • Free forever plan available
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
                Your ultimate golf companion app
              </p>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Features</h4>
              <ul className="space-y-2 text-sm text-golf-fairway/80">
                <li><Link href="/search" className="hover:text-white">Find Partners</Link></li>
                <li><Link href="/create" className="hover:text-white">Create Events</Link></li>
                <li><Link href="/courses" className="hover:text-white">Courses</Link></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Support</h4>
              <ul className="space-y-2 text-sm text-golf-fairway/80">
                <li><a href="#" className="hover:text-white">Help Center</a></li>
                <li><a href="#" className="hover:text-white">Contact Us</a></li>
                <li><a href="#" className="hover:text-white">FAQ</a></li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-3">Legal</h4>
              <ul className="space-y-2 text-sm text-golf-fairway/80">
                <li><Link href="/settings/privacy" className="hover:text-white">Privacy Policy</Link></li>
                <li><Link href="/settings/terms" className="hover:text-white">Terms of Service</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-golf-light/30 pt-8 text-center text-sm text-golf-fairway/80">
            © 2024 Golf Buddies. All rights reserved.
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
      <p className="text-gray-700 mb-4 italic">"{quote}"</p>
      <p className="font-semibold text-golf-green">- {author}</p>
    </div>
  )
}