
import NextImage from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { ChevronRight } from 'lucide-react';

export default function HomePage() {
  return (
    <div className="relative min-h-screen flex flex-col items-center text-center bg-background">
      {/* Background Image */}
      <NextImage
        src="https://storage.googleapis.com/idx-assets/uwgqo40p-dora-run-310324/IN_uwgqo40p-dora-run-310324_0_0_1920_1080.png"
        alt="Anime style girl looking at phone with mountain sunset background"
        fill
        style={{ objectFit: 'cover' }}
        quality={85}
        className="-z-20"
        data-ai-hint="anime sunset"
        priority
      />
      {/* Overlay for better text readability on the entire page */}
      <div className="absolute inset-0 bg-black/50 -z-10" />

      <header className="z-10 w-full py-6 px-4 sm:px-8 md:px-12 sticky top-0 bg-background/30 backdrop-blur-md">
        <div className="container mx-auto flex justify-between items-center">
          <h1 className="text-3xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-primary to-secondary" style={{ textShadow: '0 0 8px rgba(255,255,255,0.3)' }}>ImageForge AI</h1>
          <div className="flex items-center gap-4">
            
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <main className="z-10 p-6 sm:p-8 md:p-12 flex flex-col items-center justify-center min-h-[calc(100vh-100px)] flex-grow"> {/* Adjusted min-height for hero */}
        <h2
          className="text-5xl sm:text-6xl md:text-7xl lg:text-8xl font-extrabold tracking-tight text-white mb-6 bg-clip-text text-transparent bg-gradient-to-r from-primary via-purple-400 to-accent"
          style={{ textShadow: '0 0 20px rgba(0,0,0,0.8), 0 0 10px rgba(0,0,0,0.6)' }}
        >
          Step into Wonder
        </h2>
        <p
          className="mt-4 mb-12 text-lg sm:text-xl md:text-2xl text-slate-100 max-w-3xl mx-auto leading-relaxed"
          style={{ textShadow: '0 0 10px rgba(0,0,0,0.7), 0 0 5px rgba(0,0,0,0.4)' }}
        >
          Welcome to ImageForge AI, where your words bloom into breathtaking visuals. Inspired by the enchanting aesthetics of modern anime and the limitless expanse of your imagination, our AI-powered platform is your canvas. Create, explore, and bring your unique dreams to vivid life.
        </p>
        <Button
          asChild
          size="lg"
          className="text-lg py-4 px-8 font-semibold bg-gradient-to-r from-pink-500 via-purple-600 to-indigo-700 hover:from-pink-600 hover:via-purple-700 hover:to-indigo-700 text-primary-foreground transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-xl hover:shadow-primary/60 focus-visible:ring-4 focus-visible:ring-primary/50 focus-visible:ring-offset-2 focus-visible:ring-offset-background"
        >
          <Link href="/create" passHref>
            Get Started
            <ChevronRight className="ml-2 h-6 w-6" />
          </Link>
        </Button>
      </main>

      {/* About Section */}
      <section className="z-10 w-full py-20 px-4 sm:px-8 md:px-12 bg-card/50 backdrop-blur-sm mt-10">
        <div className="container mx-auto">
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-8 bg-clip-text text-transparent bg-gradient-to-r from-secondary to-accent">Our Mission</h3>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed" style={{ textShadow: '0 0 8px rgba(0,0,0,0.6)' }}>
            At ImageForge AI, we believe in the power of imagination. Our mission is to provide artists, creators, and dreamers with cutting-edge tools that transform abstract ideas into tangible visual art. We're democratizing creativity, one pixel at a time.
          </p>
        </div>
      </section>

      {/* Features Showcase Section */}
      <section className="z-10 w-full py-20 px-4 sm:px-8 md:px-12">
         <div className="container mx-auto">
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-12 bg-clip-text text-transparent bg-gradient-to-r from-accent to-primary">Unlock Your Potential</h3>
          <div className="grid md:grid-cols-3 gap-8 text-left">
            <div className="p-6 bg-card/40 backdrop-blur-sm rounded-lg shadow-xl border border-border/30">
              <h4 className="text-2xl font-semibold text-primary mb-3">Limitless Styles</h4>
              <p className="text-slate-300">From photorealism to anime, cyberpunk to abstract art, choose from a diverse palette of artistic styles to perfectly match your vision.</p>
            </div>
            <div className="p-6 bg-card/40 backdrop-blur-sm rounded-lg shadow-xl border border-border/30">
              <h4 className="text-2xl font-semibold text-secondary mb-3">AI-Powered Enhancement</h4>
              <p className="text-slate-300">Our intelligent prompt engineering takes your simple ideas and refines them into detailed descriptions for stunning, nuanced image generation.</p>
            </div>
            <div className="p-6 bg-card/40 backdrop-blur-sm rounded-lg shadow-xl border border-border/30">
              <h4 className="text-2xl font-semibold text-accent mb-3">Intuitive Interface</h4>
              <p className="text-slate-300">Crafting your masterpiece is easy with our user-friendly design. Focus on your creativity, not on complex controls.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Community / Gallery Link Section */}
      <section className="z-10 w-full py-20 px-4 sm:px-8 md:px-12 bg-card/50 backdrop-blur-sm">
        <div className="container mx-auto">
          <h3 className="text-4xl sm:text-5xl font-bold text-white mb-8">Join Our Community</h3>
          <p className="text-lg sm:text-xl text-slate-200 max-w-3xl mx-auto leading-relaxed mb-8" style={{ textShadow: '0 0 8px rgba(0,0,0,0.6)' }}>
            Become part of a growing community of creators. Share your artwork, get inspired, and push the boundaries of AI-generated art.
          </p>
          <Button
            asChild
            size="lg"
            variant="outline"
            className="text-lg py-4 px-8 font-semibold border-primary text-primary hover:bg-primary/10 transition-all duration-300 ease-in-out transform hover:scale-105 rounded-lg shadow-lg hover:shadow-primary/40 focus-visible:ring-4 focus-visible:ring-primary/50"
          >
            <Link href="/gallery">
              Explore Gallery
            </Link>
          </Button>
        </div>
      </section>

      <footer className="z-10 py-12 text-center text-sm text-slate-300 w-full mt-10 border-t border-border/30 bg-background/30 backdrop-blur-md" style={{ textShadow: '0 0 8px rgba(0,0,0,0.7)' }}>
        <p>&copy; {new Date().getFullYear()} ImageForge AI. All rights reserved.</p>
      </footer>
    </div>
  );
}
