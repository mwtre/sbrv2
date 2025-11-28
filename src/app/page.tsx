'use client';

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Menu, X, ShoppingBag, ChevronDown, Droplet, Mountain, Leaf, Users, Phone, Wallet } from "lucide-react";
import { useState, useEffect } from "react";
import dynamic from "next/dynamic";
import Image from "next/image";
import AnimatedSection from "@/components/AnimatedSection";
import { ModalSkeleton } from "@/components/ui/modal-skeleton";
import BubbleBackground from "@/components/BubbleBackground";

const ShopModal = dynamic(() => import("@/components/ShopModal"), {
  loading: () => <ModalSkeleton />,
  ssr: false,
});

const Web3Modal = dynamic(() => import("@/components/Web3Modal"), {
  loading: () => <ModalSkeleton />,
  ssr: false,
});

export default function Home() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isShopOpen, setIsShopOpen] = useState(false);
  const [isWeb3Open, setIsWeb3Open] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, targetId: string) => {
    e.preventDefault();
    setIsMenuOpen(false);
    const element = document.getElementById(targetId);
    if (element) {
      const headerOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - headerOffset;

      window.scrollTo({
        top: offsetPosition,
        behavior: 'smooth'
      });
    }
  };

  return (
    <main className="min-h-screen bg-gradient-to-b from-zinc-50 to-white relative w-full overflow-x-hidden">
      {/* Bubble Background Effect */}
      <BubbleBackground />
      
      {/* Header */}
      <nav className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-lg' : 'bg-white/90 backdrop-blur-sm'
      }`}>
        <div className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Left: Menu Button */}
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-2 hover:bg-zinc-100 rounded-lg transition-colors group"
            >
              {isMenuOpen ? (
                <X className="w-6 h-6 transition-transform group-hover:rotate-90 duration-300" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>

            {/* Center: Logo */}
            <div className="absolute left-1/2 -translate-x-1/2">
              <div className="flex flex-col items-center">
                <div className="w-8 h-8 bg-zinc-900 rounded-sm mb-1" />
                <h1 className="text-xl font-bold tracking-wider">SAN BERNARDINO</h1>
              </div>
            </div>

            {/* Right: Action Buttons */}
            <div className="flex items-center gap-3">
              <Button
                variant="outline"
                size="sm"
                className="hidden sm:flex items-center gap-2"
                onClick={() => setIsShopOpen(true)}
              >
                <ShoppingBag className="w-4 h-4" />
                Shop
              </Button>
              <Button
                size="sm"
                className="hidden sm:flex items-center gap-2 bg-gradient-to-r from-zinc-900 to-zinc-700"
                onClick={() => setIsWeb3Open(true)}
              >
                <Wallet className="w-4 h-4" />
                Web3
              </Button>
              <button
                className="sm:hidden p-2 hover:bg-zinc-100 rounded-lg transition-colors"
                onClick={() => setIsShopOpen(true)}
              >
                <ShoppingBag className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Sidebar Navigation */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 ${
          isMenuOpen ? 'opacity-100 pointer-events-auto' : 'opacity-0 pointer-events-none'
        }`}
      >
        {/* Backdrop */}
        <div
          className="absolute inset-0 bg-black/50 backdrop-blur-sm"
          onClick={() => setIsMenuOpen(false)}
        />

        {/* Sidebar */}
        <div
          className={`absolute left-0 top-0 bottom-0 w-full sm:w-80 bg-white shadow-2xl transform transition-transform duration-300 ${
            isMenuOpen ? 'translate-x-0' : '-translate-x-full'
          }`}
        >
          <div className="h-full flex flex-col">
            {/* Sidebar Header */}
            <div className="p-6 border-b border-zinc-200">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 bg-zinc-900 rounded-lg" />
                <div>
                  <h2 className="font-bold text-lg">San Bernardino</h2>
                  <p className="text-xs text-zinc-500">Alpine Waters</p>
                </div>
              </div>
            </div>

            {/* Navigation Links */}
            <nav className="flex-1 p-6 space-y-2 overflow-y-auto">
              <a
                href="#waters"
                onClick={(e) => handleSmoothScroll(e, 'waters')}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors group"
              >
                <Droplet className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <div>
                  <div className="font-medium">Waters</div>
                  <div className="text-xs text-zinc-500">Our Product Range</div>
                </div>
              </a>

              <a
                href="#origin"
                onClick={(e) => handleSmoothScroll(e, 'origin')}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors group"
              >
                <Mountain className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <div>
                  <div className="font-medium">Sign of the Mountain</div>
                  <div className="text-xs text-zinc-500">Our Origin Story</div>
                </div>
              </a>

              <a
                href="#source"
                onClick={(e) => handleSmoothScroll(e, 'source')}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors group"
              >
                <Droplet className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <div>
                  <div className="font-medium">The Source</div>
                  <div className="text-xs text-zinc-500">Where We Come From</div>
                </div>
              </a>

              <a
                href="#sustainability"
                onClick={(e) => handleSmoothScroll(e, 'sustainability')}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors group"
              >
                <Leaf className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <div>
                  <div className="font-medium">Active Sustainability</div>
                  <div className="text-xs text-zinc-500">Our Commitment</div>
                </div>
              </a>

              <a
                href="#reseller"
                onClick={(e) => handleSmoothScroll(e, 'reseller')}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors group"
              >
                <Users className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <div>
                  <div className="font-medium">Become Reseller</div>
                  <div className="text-xs text-zinc-500">Partner With Us</div>
                </div>
              </a>

              <a
                href="#contact"
                onClick={(e) => handleSmoothScroll(e, 'contact')}
                className="flex items-center gap-4 px-4 py-3 rounded-xl hover:bg-zinc-100 transition-colors group"
              >
                <Phone className="w-5 h-5 text-zinc-600 group-hover:text-zinc-900 transition-colors" />
                <div>
                  <div className="font-medium">Contact</div>
                  <div className="text-xs text-zinc-500">Get In Touch</div>
                </div>
              </a>
            </nav>

            {/* Sidebar Footer - Mobile Action Buttons */}
            <div className="p-6 border-t border-zinc-200 space-y-3 sm:hidden">
              <Button
                className="w-full"
                variant="outline"
                onClick={() => {
                  setIsShopOpen(true);
                  setIsMenuOpen(false);
                }}
              >
                <ShoppingBag className="w-4 h-4 mr-2" />
                Shop Now
              </Button>
              <Button 
                className="w-full bg-gradient-to-r from-zinc-900 to-zinc-700"
                onClick={() => {
                  setIsWeb3Open(true);
                  setIsMenuOpen(false);
                }}
              >
                <Wallet className="w-4 h-4 mr-2" />
                Connect Web3
              </Button>
            </div>

            {/* Language Selector */}
            <div className="p-6 border-t border-zinc-200">
              <div className="flex items-center justify-between">
                <span className="text-sm text-zinc-600">Language</span>
                <button className="px-3 py-1.5 rounded-full border border-zinc-300 hover:bg-zinc-100 transition-colors text-sm font-medium">
                  EN
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://ext.same-assets.com/1656755911/1266563085.jpeg"
            alt="Alpine landscape"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/20 via-transparent to-white" />
        </div>

        <div className="relative z-10 text-center px-4 sm:px-6 animate-fade-in">
          <h2 className="text-3xl sm:text-5xl md:text-7xl lg:text-8xl font-bold text-white mb-4 sm:mb-6 drop-shadow-2xl leading-tight">
            Alpine by Origin<br />Pure by Nature
          </h2>
          <p className="text-base sm:text-xl md:text-2xl text-white/90 max-w-2xl mx-auto drop-shadow-lg px-2">
            Experience the untouched essence of the Swiss Alps
          </p>
          <div className="mt-6 sm:mt-10">
            <Button size="lg" className="bg-white text-zinc-900 hover:bg-zinc-100 text-sm sm:text-base">
              Discover Our Waters
            </Button>
          </div>
        </div>

        <div className="absolute bottom-10 left-1/2 -translate-x-1/2 animate-bounce">
          <ChevronDown className="w-8 h-8 text-white" />
        </div>
      </section>

      {/* Waters Section */}
      <section id="waters" className="py-12 sm:py-24 px-4 sm:px-6 bg-white scroll-mt-20 relative z-10">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection className="mb-8 sm:mb-12">
            <div className="w-16 h-16 sm:w-20 sm:h-20 mx-auto mb-4 sm:mb-6">
              <svg viewBox="0 0 100 100" className="w-full h-full">
                <path d="M50 10 L70 40 L90 70 L50 90 L10 70 L30 40 Z" fill="none" stroke="currentColor" strokeWidth="2"/>
              </svg>
            </div>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 px-2">Three Souls, One Origin.</h2>
            <p className="text-base sm:text-lg md:text-xl text-zinc-600 max-w-3xl mx-auto leading-relaxed px-2">
              We are more than water.<br />
              We are the story of a land, the voice of an untouched ecosystem,<br />
              the breath of the Swiss Alps.
            </p>
          </AnimatedSection>

          {/* Product Grid */}
          <AnimatedSection delay={0.2} className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-8 sm:mt-16">
            {/* Pure Spring */}
            <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100">
                <Image
                  src="https://ext.same-assets.com/1656755911/4227031535.jpeg"
                  alt="Pure Spring"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Pure Spring</h3>
                <p className="text-zinc-500 mb-1">750-250ml</p>
                <p className="text-lg font-semibold">Still</p>
                <p className="text-sm text-zinc-600 mt-3">
                  Untouched purity from the heart of the Alps
                </p>
                <Button variant="outline" className="mt-4">
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Sparkling Crest */}
            <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100">
                <Image
                  src="https://ext.same-assets.com/1656755911/971678446.jpeg"
                  alt="Sparkling Crest"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Sparkling Crest</h3>
                <p className="text-zinc-500 mb-1">750-250ml</p>
                <p className="text-lg font-semibold">Sparkling</p>
                <p className="text-sm text-zinc-600 mt-3">
                  Natural effervescence, refined elegance
                </p>
                <Button variant="outline" className="mt-4">
                  Learn More
                </Button>
              </div>
            </Card>

            {/* Alpine Burst */}
            <Card className="group overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all duration-500 hover:-translate-y-2">
              <div className="aspect-square relative overflow-hidden bg-gradient-to-br from-zinc-50 to-zinc-100">
                <Image
                  src="https://ext.same-assets.com/1656755911/1577364574.jpeg"
                  alt="Alpine Burst"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700"
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                />
              </div>
              <div className="p-6 text-center">
                <h3 className="text-2xl font-bold mb-2">Alpine Burst</h3>
                <p className="text-zinc-500 mb-1">750-250ml</p>
                <p className="text-lg font-semibold">Extra Sparkling</p>
                <p className="text-sm text-zinc-600 mt-3">
                  Bold personality, superior intensity
                </p>
                <Button variant="outline" className="mt-4">
                  Learn More
                </Button>
              </div>
            </Card>
          </AnimatedSection>
        </div>
      </section>

      {/* Sustainable Elegance */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-zinc-50 to-zinc-100">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Sustainable<br />Elegance
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-4 sm:mb-6">
                From the very beginning, we have chosen to move away from plastic,
                embracing materials that respect the environment and the purity of our product.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed mb-8">
                Glass and aluminium are the tangible expression of our values:
                transparency, lightness, sustainable reusability.
              </p>
              <Button size="lg">
                Learn More About Our Commitment
              </Button>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://ext.same-assets.com/1656755911/3680167584.jpeg"
                  alt="Sustainable bottles"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Gallery Section */}
      <section className="py-12 sm:py-24 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <AnimatedSection className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-2 sm:gap-4">
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
              <Image
                src="https://ext.same-assets.com/1656755911/4129149451.jpeg"
                alt="Gallery 1"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
              <Image
                src="https://ext.same-assets.com/1656755911/515093026.jpeg"
                alt="Gallery 2"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
              <Image
                src="https://ext.same-assets.com/1656755911/3649516832.jpeg"
                alt="Gallery 3"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
            <div className="aspect-square overflow-hidden rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:scale-105 relative">
              <Image
                src="https://ext.same-assets.com/1656755911/2667005913.jpeg"
                alt="Gallery 4"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 50vw, 25vw"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Extra Sparkling Feature */}
      <section className="py-12 sm:py-24 px-4 sm:px-6 bg-zinc-900 text-white">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://ext.same-assets.com/1656755911/4129149451.jpeg"
                  alt="Pouring water"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>

            <AnimatedSection direction="right" delay={0.2}>
              <div className="text-left sm:text-right">
                <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6 leading-tight">
                  More doesn't always<br />means better.<br />
                  <span className="text-zinc-400">But sometimes it does.</span>
                </h2>
                <p className="text-base sm:text-lg text-zinc-300 leading-relaxed mb-4 sm:mb-6">
                  Extra Sparkling is for those seeking a bold personality.
                  More bubbles, more character. But never beyond the limit.
                </p>
                <p className="text-lg text-zinc-300 leading-relaxed mb-8">
                  We maintain the same scientific rigor, just with a superior intensity.
                </p>
                <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-zinc-900">
                  Discover Alpine Burst
                </Button>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Active Sustainability */}
      <section id="sustainability" className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-emerald-50 to-zinc-50 scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Active<br />Sustainability
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 max-w-2xl mx-auto mb-6 sm:mb-10 px-2">
              Our commitment goes beyond words. Every bottle, every drop,
              every decision reflects our dedication to preserving the Alpine ecosystem.
            </p>
          </AnimatedSection>
          <AnimatedSection delay={0.2}>
            <div className="relative aspect-video rounded-3xl overflow-hidden shadow-2xl mb-8">
              <Image
                src="https://ext.same-assets.com/1656755911/2667005913.jpeg"
                alt="Sustainability"
                fill
                className="object-cover"
                sizes="(max-width: 1024px) 100vw, 80vw"
              />
            </div>
            <Button size="lg">
              Learn More About Our Initiatives
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Sign of the Mountain Section */}
      <section id="origin" className="py-12 sm:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <AnimatedSection direction="left">
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://ext.same-assets.com/1656755911/1266563085.jpeg"
                  alt="Swiss Alps"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                Sign of the<br />Mountain
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-4 sm:mb-6">
                Our origin story begins in the heart of the Swiss Alps, where pristine
                mountain peaks touch the sky and ancient glaciers feed crystal-clear springs.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed mb-6">
                For generations, these mountains have been our guide, our inspiration,
                and our source. The sign of the mountain is not just a symbol—it's our promise
                of purity, authenticity, and respect for nature's timeless wisdom.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed mb-8">
                Every drop we bottle carries the essence of these sacred peaks,
                filtered through millennia of Alpine rock, untouched by modern interference.
              </p>
              <Button size="lg">
                Discover Our Story
              </Button>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* The Source Section */}
      <section id="source" className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-blue-50 to-zinc-50 scroll-mt-20">
        <div className="max-w-7xl mx-auto">
          <div className="grid lg:grid-cols-2 gap-6 sm:gap-12 items-center">
            <AnimatedSection direction="left">
              <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
                The<br />Source
              </h2>
              <p className="text-base sm:text-lg text-zinc-700 leading-relaxed mb-4 sm:mb-6">
                Deep within the Swiss Alps, at an elevation where the air is pure
                and the silence is profound, lies our source—a natural spring that has
                flowed uninterrupted for thousands of years.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed mb-6">
                Protected by layers of ancient rock and Alpine snow, this water
                emerges with a mineral composition that nature herself perfected.
                No human intervention, no artificial enhancement—just pure, natural
                Alpine water as it was meant to be.
              </p>
              <p className="text-lg text-zinc-700 leading-relaxed mb-8">
                We honor this source by maintaining the highest standards of
                environmental stewardship, ensuring it remains pristine for generations to come.
              </p>
              <Button size="lg">
                Learn About Our Source
              </Button>
            </AnimatedSection>
            <AnimatedSection direction="right" delay={0.2}>
              <div className="aspect-square rounded-3xl overflow-hidden shadow-2xl relative">
                <Image
                  src="https://ext.same-assets.com/1656755911/515093026.jpeg"
                  alt="Water source"
                  fill
                  className="object-cover"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Become Reseller Section */}
      <section id="reseller" className="py-12 sm:py-24 px-4 sm:px-6 bg-white scroll-mt-20">
        <div className="max-w-6xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Become a<br />Reseller
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 max-w-3xl mx-auto mb-6 sm:mb-10 leading-relaxed px-2">
            Join our network of partners who share our passion for purity, sustainability,
            and excellence. As a reseller of San Bernardino Alpine Waters, you become part
            of a community dedicated to bringing the essence of the Swiss Alps to discerning
            customers worldwide.
          </p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mb-8 sm:mb-12">
            <Card className="p-6 border-0 shadow-lg">
              <Users className="w-12 h-12 mx-auto mb-4 text-zinc-900" />
              <h3 className="text-xl font-bold mb-3">Partnership</h3>
              <p className="text-zinc-600">
                Build a sustainable business relationship with competitive margins
                and dedicated support from our team.
              </p>
            </Card>
            <Card className="p-6 border-0 shadow-lg">
              <Mountain className="w-12 h-12 mx-auto mb-4 text-zinc-900" />
              <h3 className="text-xl font-bold mb-3">Quality Products</h3>
              <p className="text-zinc-600">
                Offer your customers premium Alpine water products with proven
                quality and authentic Swiss heritage.
              </p>
            </Card>
            <Card className="p-6 border-0 shadow-lg">
              <Leaf className="w-12 h-12 mx-auto mb-4 text-zinc-900" />
              <h3 className="text-xl font-bold mb-3">Shared Values</h3>
              <p className="text-zinc-600">
                Partner with a brand that prioritizes sustainability and
                environmental responsibility.
              </p>
            </Card>
          </div>
            <Button size="lg">
              Contact Us to Become a Reseller
            </Button>
          </AnimatedSection>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="py-12 sm:py-24 px-4 sm:px-6 bg-gradient-to-br from-zinc-50 to-white scroll-mt-20">
        <div className="max-w-4xl mx-auto text-center">
          <AnimatedSection>
            <h2 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 sm:mb-6">
              Get In<br />Touch
            </h2>
            <p className="text-base sm:text-lg text-zinc-700 max-w-2xl mx-auto mb-8 sm:mb-12 leading-relaxed px-2">
            Have questions about our products, want to become a reseller, or simply
            want to learn more about San Bernardino Alpine Waters? We'd love to hear from you.
          </p>
          <div className="grid md:grid-cols-2 gap-8 mb-12">
            <Card className="p-8 border-0 shadow-lg text-left">
              <Phone className="w-10 h-10 mb-4 text-zinc-900" />
              <h3 className="text-xl font-bold mb-3">Phone</h3>
              <p className="text-zinc-600 mb-4">
                Call us during business hours
              </p>
              <a href="tel:+41123456789" className="text-zinc-900 font-semibold hover:underline">
                +41 12 345 67 89
              </a>
            </Card>
            <Card className="p-8 border-0 shadow-lg text-left">
              <div className="w-10 h-10 mb-4 flex items-center justify-center bg-zinc-900 rounded-lg">
                <span className="text-white text-xl">@</span>
              </div>
              <h3 className="text-xl font-bold mb-3">Email</h3>
              <p className="text-zinc-600 mb-4">
                Send us a message anytime
              </p>
              <a href="mailto:info@fsbsa.ch" className="text-zinc-900 font-semibold hover:underline">
                info@fsbsa.ch
              </a>
            </Card>
          </div>
          <div className="bg-white rounded-2xl p-8 shadow-lg border border-zinc-200">
            <h3 className="text-2xl font-bold mb-6">Send us a message</h3>
            <form className="space-y-4 text-left">
              <div>
                <input
                  type="text"
                  placeholder="Your Name"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <input
                  type="email"
                  placeholder="Your Email"
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900"
                />
              </div>
              <div>
                <textarea
                  placeholder="Your Message"
                  rows={5}
                  className="w-full px-4 py-3 rounded-lg border border-zinc-300 focus:outline-none focus:ring-2 focus:ring-zinc-900 resize-none"
                />
              </div>
              <Button size="lg" className="w-full">
                Send Message
              </Button>
            </form>
          </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-zinc-900 text-white py-8 sm:py-16 px-4 sm:px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-2 sm:grid-cols-2 md:grid-cols-4 gap-6 sm:gap-8 lg:gap-12 mb-8 sm:mb-12">
            <div>
              <h3 className="font-bold text-lg mb-4">About</h3>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Sign of the Mountain</a></li>
                <li><a href="#" className="hover:text-white transition-colors">The Source</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Active Sustainability</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Contacts</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Become Reseller</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Waters</h3>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Pure Spring</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Sparkling Crest</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Alpine Burst</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Compliance</h3>
              <ul className="space-y-2 text-zinc-400">
                <li><a href="#" className="hover:text-white transition-colors">Privacy Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Policy</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Cookie Management</a></li>
              </ul>
            </div>

            <div>
              <h3 className="font-bold text-lg mb-4">Follow Us</h3>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                  <span className="sr-only">Facebook</span>
                  f
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                  <span className="sr-only">Instagram</span>
                  @
                </a>
                <a href="#" className="w-10 h-10 rounded-full bg-zinc-800 flex items-center justify-center hover:bg-zinc-700 transition-colors">
                  <span className="sr-only">LinkedIn</span>
                  in
                </a>
              </div>
              <p className="text-zinc-400 mt-6 text-sm">
                info@fsbsa.ch
              </p>
            </div>
          </div>

          <div className="border-t border-zinc-800 pt-8 text-center text-zinc-500 text-sm">
            <p>© 2025 FONTI SAN BERNARDINO</p>
          </div>
        </div>
      </footer>

      {/* Shop Modal */}
      <ShopModal open={isShopOpen} onOpenChange={setIsShopOpen} />
      
      {/* Web3 Modal */}
      <Web3Modal open={isWeb3Open} onOpenChange={setIsWeb3Open} />
    </main>
  );
}
