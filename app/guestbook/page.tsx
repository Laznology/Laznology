'use client';

import { useEffect, useState, useRef } from 'react';
import { fetchGuestbooks } from '@/lib/api/guestbook';
import { Guestbook } from '@/types/guestbook';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import GuestbookForm from '@/components/guestbook-form';
import { formatDistanceToNow } from 'date-fns';

// Register ScrollTrigger plugin
gsap.registerPlugin(ScrollTrigger);

export default function GuestbookPage() {
  const [guestbooks, setGuestbooks] = useState<Guestbook[]>([]);
  const [loading, setLoading] = useState(true);
  const containerRef = useRef<HTMLDivElement>(null);
  const titleRef = useRef<HTMLHeadingElement>(null);
  const subtitleRef = useRef<HTMLParagraphElement>(null);  const listRef = useRef<HTMLDivElement>(null);
  const shapesRef = useRef<(HTMLDivElement | null)[]>([]);
  const cyanBoxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    async function loadGuestbooks() {
      try {
        const data = await fetchGuestbooks();
        setGuestbooks(data);
      } catch (error) {
        console.error('Error loading guestbooks:', error);
      } finally {
        setLoading(false);
      }
    }

    loadGuestbooks();
  }, []);
  useEffect(() => {
    if (!loading && containerRef.current) {
      // Initial animations
      gsap.fromTo(titleRef.current, 
        { opacity: 0, y: 30 },
        { opacity: 1, y: 0, duration: 1, ease: "power2.out" }
      );

      gsap.fromTo(subtitleRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 1, delay: 0.3, ease: "power2.out" }
      );

      // Floating shapes animation
      shapesRef.current.forEach((shape, index) => {
        if (shape) {
            gsap.to(shape, {
            y: "random(-50, 50)",
            x: "random(-40, 40)",
            rotation: "random(-45, 45)",
            scale: "random(0.8, 1.3)",
            duration: "random(1.5, 3)",
            repeat: -1,
            yoyo: true,
            ease: "power2.inOut",
            delay: index * 0.15
            });
        }
      });      // Animate guestbook cards with stagger
      const cards = containerRef.current.querySelectorAll('.guestbook-item');
      gsap.fromTo(cards, 
        { opacity: 0, y: 50, scale: 0.95 },
        { 
          opacity: 1, 
          y: 0, 
          scale: 1,
          duration: 0.8, 
          stagger: 0.1, 
          delay: 0.5,
          ease: "power2.out" 
        }
      );      // ScrollTrigger animation for cyan box based on list scroll progress
      if (cyanBoxRef.current && listRef.current) {        console.log('Setting up ScrollTrigger for cyan box');
        console.log('Trigger element:', listRef.current);
        console.log('Target element:', cyanBoxRef.current);
        console.log('Trigger scrollHeight:', listRef.current.scrollHeight);
        console.log('Trigger clientHeight:', listRef.current.clientHeight);
        console.log('Can scroll?', listRef.current.scrollHeight > listRef.current.clientHeight);
          gsap.to(cyanBoxRef.current, {
          rotation: 360,
          scale: 1.5,
          backgroundColor: "#ffffff", // putih
          borderRadius: "50%",
          border: "1px dashed #000000", // border hitam
          y: 300,
          scrollTrigger: {
            trigger: listRef.current,
            scroller: listRef.current,
            start: "center top", // Ubah dari "top top" ke "top center"
            end: "bottom center", // Ubah dari "bottom bottom" ke "bottom center"
            scrub: 1,
            toggleActions: "play pause resume reverse",
            markers: true,
            refreshPriority: 1,
            onRefresh: () => console.log('ScrollTrigger refreshed'),
            onToggle: (self) => console.log('ScrollTrigger toggled:', self.isActive),
            onUpdate: (self) => {
              // Debug: log progress untuk troubleshooting
              const progress = self.progress;
              console.log('ScrollTrigger Progress:', progress);
              console.log('ScrollTrigger Direction:', self.direction);
              console.log('ScrollTrigger isActive:', self.isActive);
              
              // Optional: additional custom animations based on progress
              gsap.to(cyanBoxRef.current, {
                opacity: 0.3 + (progress * 0.7), // opacity from 0.3 to 1
                duration: 0.1
              });            }
          }
        });
          // Force refresh ScrollTrigger setelah content loaded
        setTimeout(() => {
          ScrollTrigger.refresh();
          console.log('ScrollTrigger manually refreshed');
        }, 1000);
        
        // Backup: Test scroll event untuk debugging
        const scrollContainer = listRef.current;
        const handleScroll = () => {
          const scrollTop = scrollContainer.scrollTop;
          const scrollHeight = scrollContainer.scrollHeight;
          const clientHeight = scrollContainer.clientHeight;
          const progress = scrollTop / (scrollHeight - clientHeight);
          console.log('Manual scroll progress:', progress.toFixed(3));
        };
        
        scrollContainer.addEventListener('scroll', handleScroll);
        
        // Cleanup
        return () => {
          scrollContainer.removeEventListener('scroll', handleScroll);
          ScrollTrigger.getAll().forEach(st => st.kill());
        };
      }
    }
  }, [loading]);

  return (
        <div ref={containerRef} className="h-full bg-background relative overflow-hidden">   
        <div className="fixed bottom-20 right-20 z-50">
          <GuestbookForm />
          </div>       {/* Floating Geometric Shapes */}
          <div className="absolute inset-0 pointer-events-none z-10">            <div>              <div 
                ref={cyanBoxRef}
                className="box-cyan absolute top-1/2 left-90 w-16 h-16 bg-black rounded-lg transform rotate-12"
              />
            </div>
            <div
              ref={el => { if (el) shapesRef.current[0] = el; }}
              className="absolute top-20 left-10 w-12 h-12 border-2 border-foreground bg-background"
            />
            <div
              ref={el => { if (el) shapesRef.current[1] = el; }}
              className="absolute top-40 right-20 w-8 h-8 border-2 border-foreground bg-foreground"
            />
            <div 
              ref={el => { if (el) shapesRef.current[2] = el; }}
              className="absolute top-60 left-1/4 w-6 h-6 border-2 border-foreground bg-background rotate-45"
            />
            <div 
              ref={el => { if (el) shapesRef.current[3] = el; }}
              className="absolute bottom-40 right-10 w-10 h-10 border-2 border-foreground bg-background rounded-full"
            />
            <div 
              ref={el => { if (el) shapesRef.current[4] = el; }}
              className="absolute bottom-60 left-20 w-4 h-16 border-2 border-foreground bg-foreground"
            />
            <div 
              ref={el => { if (el) shapesRef.current[5] = el; }}
              className="absolute top-80 right-1/3 w-14 h-6 border-2 border-foreground bg-background"
            />
          </div>

      <div className="relative z-20 px-6 py-8 h-full flex flex-col">
        {/* Header */}
        <div className="text-center mb-8 flex-shrink-0">
          <h1 
            ref={titleRef}
            className="text-5xl md:text-7xl font-antonio font-bold text-foreground mb-4 tracking-tight"
          >
            Guestbook
          </h1>
          <p 
            ref={subtitleRef}
            className="text-base md:text-lg text-muted-foreground font-jetbrains-mono"
          >
            Leave your mark, share your thoughts
          </p>
        </div>        {/* Guestbook List - Scrollable */}
        <div 
          ref={listRef} 
          className="flex-1 overflow-y-auto px-4 md:px-8 scrollable-content"
        >
          <div className="max-w-4xl mx-auto space-y-6 pb-8">
            {loading ? (
              // Loading Skeleton
              <>
                {[...Array(5)].map((_, index) => (
                  <div 
                    key={`skeleton-${index}`}
                    className="group relative guestbook-item"
                  >
                    {/* Main Card Container with sophisticated border design */}
                    <div className="relative bg-background border-2 border-foreground/20 animate-pulse">
                      
                      {/* Top decorative line */}
                      <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />

                      {/* Corner accent squares */}
                      <div className="absolute -top-1 -left-1 w-3 h-3 border-2 border-foreground/30 bg-background transform rotate-45" />
                      <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-foreground/30 bg-background transform rotate-45" />
                      
                      {/* Main content area */}
                      <div className="relative p-6">
                        {/* Header section skeleton */}
                        <div className="flex items-start justify-between mb-4">
                          <div className="flex items-center space-x-4">
                            {/* Avatar skeleton */}
                            <div className="relative">
                              <div className="absolute -inset-1 border border-foreground/20" />
                              <div className="relative bg-foreground/10 border-2 border-foreground/20">
                                <div className="w-12 h-12 bg-foreground/5" />
                              </div>
                              <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-foreground/20" />
                            </div>
                            
                            {/* Name skeleton */}
                            <div>
                              <div className="relative">
                                <div className="h-5 w-24 bg-foreground/10 mb-2" />
                              </div>
                              <div className="flex items-center mt-1 space-x-1">
                                <div className="w-1 h-1 bg-foreground/20" />
                                <div className="h-3 w-16 bg-foreground/5" />
                                <div className="w-1 h-1 bg-foreground/20" />
                              </div>
                            </div>
                          </div>
                          
                          {/* Timestamp skeleton */}
                          <div className="relative">
                            <div className="absolute -inset-2 border border-foreground/10" />
                            <div className="relative bg-background border border-foreground/20 px-3 py-1">
                              <div className="h-3 w-16 bg-foreground/5" />
                            </div>
                          </div>
                        </div>
                        
                        {/* Message content skeleton */}
                        <div className="relative pl-16">
                          {/* Quote mark decoration */}
                          <div className="absolute -left-2 top-0 text-4xl font-noto-serif-jp text-foreground/10 leading-none">
                            "
                          </div>
                          
                          <div className="space-y-2">
                            <div className="h-4 w-full bg-foreground/5" />
                            <div className="h-4 w-4/5 bg-foreground/5" />
                            <div className="h-4 w-3/4 bg-foreground/5" />
                          </div>
                          
                          {/* Closing quote mark */}
                          <div className="text-right text-2xl font-noto-serif-jp text-foreground/10 leading-none mt-1">
                            "
                          </div>
                        </div>
                        
                        {/* Bottom decorative elements */}
                        <div className="mt-4 flex justify-between items-center">
                          <div className="flex space-x-1">
                            <div className="w-2 h-2 border border-foreground/20 bg-foreground/5" />
                            <div className="w-2 h-2 border border-foreground/15 bg-foreground/5" />
                            <div className="w-2 h-2 border border-foreground/10 bg-foreground/5" />
                          </div>
                          
                          {/* Serial number skeleton */}
                          <div className="h-3 w-8 bg-foreground/5" />
                        </div>
                      </div>
                      
                      {/* Bottom decorative line */}
                      <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/10 to-transparent" />
                      
                      {/* Bottom corner accents */}
                      <div className="absolute -bottom-1 -left-1 w-2 h-2 border-2 border-foreground/20 bg-background" />
                      <div className="absolute -bottom-1 -right-1 w-2 h-2 border-2 border-foreground/20 bg-background" />
                    </div>
                    
                    {/* Subtle shadow overlay for depth */}
                    <div className="absolute inset-0 bg-foreground/5 transform translate-x-1 translate-y-1 -z-10" />
                  </div>               
                 ))}
              </>
            ) : (
              <>
                {guestbooks.map((entry, index) => (
              <div 
                key={entry.id || index}
                className="group relative guestbook-item p-4"
              >
                {/* Main Card Container with sophisticated border design */}
                <div className="relative bg-background border-2 border-foreground/20 hover:border-foreground/40 transition-all duration-500 ease-out transform hover:-translate-y-1 hover:shadow-2xl">
                  
                  {/* Top decorative line */}
                  <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
                  
                  {/* Corner accent squares */}
                  <div className="absolute -top-1 -left-1 w-3 h-3 border-2 border-foreground bg-background transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                  <div className="absolute -top-1 -right-1 w-3 h-3 border-2 border-foreground bg-background transform rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                  
                  {/* Main content area */}
                  <div className="relative p-6">
                    {/* Header section with enhanced layout */}
                    <div className="flex items-start justify-between mb-4">
                      <div className="flex items-center space-x-4">
                        {/* Enhanced avatar with border design */}
                        <div className="relative">
                          <div className="absolute -inset-1 border border-foreground/30 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                          <div className="relative bg-background border-2 border-foreground">
                            <img
                              src={entry.avatar_url || '/default-avatar.png'}
                              alt={entry.name}
                              className="w-12 h-12 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                            />
                          </div>
                          {/* Small decorative dot */}
                          <div className="absolute -bottom-1 -right-1 w-2 h-2 bg-foreground" />
                        </div>
                        
                        {/* Name with artistic typography */}
                        <div>
                          <h3 className="text-lg font-antonio font-bold text-foreground tracking-wide relative">
                            {entry.name}
                            {/* Underline accent */}
                            <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500" />
                          </h3>
                          {/* Subtle role indicator */}
                          <div className="flex items-center mt-1 space-x-1">
                            <div className="w-1 h-1 bg-foreground/40" />
                            <span className="text-xs font-jetbrains-mono text-muted-foreground tracking-wider">
                              VISITOR
                            </span>
                            <div className="w-1 h-1 bg-foreground/40" />
                          </div>
                        </div>
                      </div>
                      
                      {/* Timestamp with artistic frame */}
                      <div className="relative">
                        <div className="absolute -inset-2 border border-foreground/20 transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                        <div className="relative bg-background border border-foreground/30 px-3 py-1">
                          <span className="text-xs font-jetbrains-mono text-muted-foreground tracking-wide">
                            {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                          </span>
                        </div>
                      </div>
                    </div>
                    
                    {/* Message content with enhanced typography */}
                    <div className="relative pl-16">
                      {/* Quote mark decoration */}
                      <div className="absolute -left-2 top-0 text-4xl font-noto-serif-jp text-foreground/20 leading-none">
                        "
                      </div>
                      
                      <blockquote className="text-base font-noto-serif-jp text-foreground/90 leading-relaxed italic">
                        {entry.message}
                      </blockquote>
                      
                      {/* Closing quote mark */}
                      <div className="text-right text-2xl font-noto-serif-jp text-foreground/20 leading-none mt-1">
                        "
                      </div>
                    </div>
                    
                    {/* Bottom decorative elements */}
                    <div className="mt-4 flex justify-between items-center">
                      <div className="flex space-x-1">
                        <div className="w-2 h-2 border border-foreground/30 group-hover:bg-foreground/30 transition-colors duration-300" />
                        <div className="w-2 h-2 border border-foreground/20 group-hover:bg-foreground/20 transition-colors duration-300 delay-75" />
                        <div className="w-2 h-2 border border-foreground/10 group-hover:bg-foreground/10 transition-colors duration-300 delay-150" />
                      </div>
                      
                      {/* Serial number aesthetic */}
                      <div className="text-xs font-jetbrains-mono text-muted-foreground/50 tracking-widest">
                        #{String(index + 1).padStart(3, '0')}
                      </div>
                    </div>
                  </div>
                  
                  {/* Bottom decorative line */}
                  <div className="absolute bottom-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-foreground/20 to-transparent" />
                  
                  {/* Bottom corner accents */}
                  <div className="absolute -bottom-1 -left-1 w-2 h-2 border-2 border-foreground bg-background group-hover:bg-foreground transition-colors duration-300" />
                  <div className="absolute -bottom-1 -right-1 w-2 h-2 border-2 border-foreground bg-background group-hover:bg-foreground transition-colors duration-300" />
                </div>
                
                {/* Subtle shadow overlay for depth */}
                <div className="absolute inset-0 bg-foreground/5 transform translate-x-1 translate-y-1 -z-10 group-hover:translate-x-2 group-hover:translate-y-2 transition-transform duration-300" />
              </div>            ))}
              </>
            )}
          </div>

          {!loading && guestbooks.length === 0 && (
            <div className="text-center py-12">
              <p className="text-muted-foreground text-sm font-jetbrains-mono">
                No entries yet. Be the first!
              </p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
