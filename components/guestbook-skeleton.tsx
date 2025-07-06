"use client"
import React from "react"

export default function GuestbookSkeleton() {
    return (
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
    )
}
