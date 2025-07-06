"use client"
import React from "react"
import { Guestbook } from "@/types/guestbook"
import { formatDistanceToNow } from "date-fns"

interface GuestbookCardProps {
    entry: Guestbook;
    index: number;
}

export default function GuestbookCard({ entry, index }: GuestbookCardProps) {
    return (
        <div 
            className="group relative guestbook-item p-2 sm:p-4"
        >
            {/* Main Card Container with sophisticated border design */}
            <div className="relative bg-background border-2 border-foreground/20 hover:border-foreground/40 transition-all duration-500 ease-out transform hover:-translate-y-1 hover:shadow-2xl">
                
                {/* Top decorative line */}
                <div className="absolute top-0 left-0 w-full h-[2px] bg-gradient-to-r from-transparent via-foreground/30 to-transparent" />
                
                {/* Corner accent squares */}
                <div className="absolute -top-1 -left-1 w-2 h-2 sm:w-3 sm:h-3 border-2 border-foreground bg-background transform rotate-45 group-hover:rotate-90 transition-transform duration-300" />
                <div className="absolute -top-1 -right-1 w-2 h-2 sm:w-3 sm:h-3 border-2 border-foreground bg-background transform rotate-45 group-hover:rotate-0 transition-transform duration-300" />
                
                {/* Main content area */}
                <div className="relative p-3 sm:p-6">
                    {/* Header section with enhanced layout */}
                    <div className="flex items-start justify-between mb-3 sm:mb-4 flex-col sm:flex-row gap-3 sm:gap-0">
                        <div className="flex items-center space-x-3 sm:space-x-4">
                            {/* Enhanced avatar with border design */}
                            <div className="relative flex-shrink-0">
                                <div className="absolute -inset-1 border border-foreground/30 rotate-3 group-hover:rotate-6 transition-transform duration-300" />
                                <div className="relative bg-background border-2 border-foreground">
                                    <img
                                        src={entry.avatar_url || '/default-avatar.png'}
                                        alt={entry.name}
                                        className="w-10 h-10 sm:w-12 sm:h-12 object-cover filter grayscale group-hover:grayscale-0 transition-all duration-300"
                                    />
                                </div>
                                {/* Small decorative dot */}
                                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 bg-foreground" />
                            </div>
                            
                            {/* Name with artistic typography */}
                            <div className="min-w-0 flex-1">
                                <h3 className="text-base sm:text-lg font-antonio font-bold text-foreground tracking-wide relative truncate">
                                    {entry.name}
                                    {/* Underline accent */}
                                    <div className="absolute -bottom-1 left-0 w-0 h-[1px] bg-foreground group-hover:w-full transition-all duration-500" />
                                </h3>
                                {/* Subtle role indicator */}
                                <div className="flex items-center mt-1 space-x-1">
                                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-foreground/40" />
                                    <span className="text-xs font-jetbrains-mono text-muted-foreground tracking-wider">
                                        VISITOR
                                    </span>
                                    <div className="w-0.5 h-0.5 sm:w-1 sm:h-1 bg-foreground/40" />
                                </div>
                            </div>
                        </div>
                        
                        {/* Timestamp with artistic frame */}
                        <div className="relative flex-shrink-0 self-start sm:self-center">
                            <div className="absolute -inset-1 sm:-inset-2 border border-foreground/20 transform rotate-1 group-hover:rotate-2 transition-transform duration-300" />
                            <div className="relative bg-background border border-foreground/30 px-2 py-1 sm:px-3">
                                <span className="text-xs font-jetbrains-mono text-muted-foreground tracking-wide">
                                    {formatDistanceToNow(new Date(entry.created_at), { addSuffix: true })}
                                </span>
                            </div>
                        </div>
                    </div>
                    
                    {/* Message content with enhanced typography */}
                    <div className="relative pl-8 sm:pl-16">
                        {/* Quote mark decoration */}
                        <div className="absolute -left-1 sm:-left-2 top-0 text-2xl sm:text-4xl font-noto-serif-jp text-foreground/20 leading-none">
                            "
                        </div>
                        
                        <blockquote className="text-sm sm:text-base font-noto-serif-jp text-foreground/90 leading-relaxed italic break-words">
                            {entry.message}
                        </blockquote>
                        
                        {/* Closing quote mark */}
                        <div className="text-right text-lg sm:text-2xl font-noto-serif-jp text-foreground/20 leading-none mt-1">
                            "
                        </div>
                    </div>
                    
                    {/* Bottom decorative elements */}
                    <div className="mt-3 sm:mt-4 flex justify-between items-center">
                        <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border border-foreground/30 group-hover:bg-foreground/30 transition-colors duration-300" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border border-foreground/20 group-hover:bg-foreground/20 transition-colors duration-300 delay-75" />
                            <div className="w-1.5 h-1.5 sm:w-2 sm:h-2 border border-foreground/10 group-hover:bg-foreground/10 transition-colors duration-300 delay-150" />
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
                <div className="absolute -bottom-1 -left-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-2 border-foreground bg-background group-hover:bg-foreground transition-colors duration-300" />
                <div className="absolute -bottom-1 -right-1 w-1.5 h-1.5 sm:w-2 sm:h-2 border-2 border-foreground bg-background group-hover:bg-foreground transition-colors duration-300" />
            </div>
            
            {/* Subtle shadow overlay for depth */}
            <div className="absolute inset-0 bg-foreground/5 transform translate-x-0.5 translate-y-0.5 sm:translate-x-1 sm:translate-y-1 -z-10 group-hover:translate-x-1 group-hover:translate-y-1 sm:group-hover:translate-x-2 sm:group-hover:translate-y-2 transition-transform duration-300" />
        </div>
    )
}
