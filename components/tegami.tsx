"use client"
import React, { useEffect, useRef, useState} from "react"
import gsap from "gsap"
import { useGSAP } from "@gsap/react"
import { Textarea } from "@/components/ui/textarea"
import { MapPinIcon} from "lucide-react"

import { createGuestbook } from "@/lib/api/guestbook"
import { createClient } from "@/lib/supabase/client"
import { toast } from "sonner"

interface TegamiProps {
    onMessageSent?: () => void;
    defaultOpen?: boolean;
    onEnvelopeClosed?: () => void;
}

export default function Tegami({ onMessageSent, defaultOpen = false, onEnvelopeClosed }: TegamiProps){
    const [message, setMessage] = useState<string>("")
    const [avatar, setAvatar] = useState("")
    const [userName, setUserName] = useState("")
    const [loading, setLoading] = useState<boolean>(false)
    const [isOpen, setIsOpen] = useState(defaultOpen)
    const tegamiRef = useRef<HTMLDivElement>(null)
    const flapRef = useRef<HTMLDivElement>(null)
    const envelopeRef = useRef<HTMLDivElement>(null)

    const handelSubmit = async (e: React.FormEvent) => {
        e.preventDefault()
        if (!message.trim()) {
            toast.error("Please write a message")
            return
        }
        
        try {
            setLoading(true)
            await createGuestbook(message, userName, avatar)
            toast.success("Message sent successfully!")
            setMessage("")
            setIsOpen(false)
            // Call the callback to refresh the guestbook list
            onMessageSent?.()
        } catch (e) {
            toast.error(e instanceof Error ? e.message : "An error occurred")
        } finally {
            setLoading(false)
        }
    }

    useEffect(() => {
        const getUser = async () => {
            const supabase = createClient()
            const { data: { user } } = await supabase.auth.getUser()
            if (user) {
                setUserName(user.user_metadata.name || "Guest")
                setAvatar(user.user_metadata.avatar_url || null)
            }
        }
        getUser()
    }, [])

    useGSAP(() => {
        if(tegamiRef.current && envelopeRef.current && flapRef.current){
            gsap.set(tegamiRef.current, {
                y: -80,
                opacity: 1,
                scale: 1.1,
            })
            gsap.set(flapRef.current, {
                rotateX: 180,
                transformOrigin: "top center"
            })
            gsap.set(envelopeRef.current, {
                scaleY: 1,
                y: 5
            })
        }
    })
    
    useGSAP(() => {        
        const tl = gsap.timeline()
        if(envelopeRef.current && flapRef.current && tegamiRef.current){
            if (isOpen) {
                tl.to(flapRef.current, {
                    rotateX: 180,
                    duration: 0.3,
                    ease: "power2.in"
                  })
                  .to(envelopeRef.current, {
                    scaleY: 1,
                    y: 5,
                    duration: 0.4,
                    ease: "power3.in"
                  }, "-=0.1")
                  .to(tegamiRef.current, {
                    y: -80,
                    scale: 1.1,
                    opacity: 1,
                    duration: 0.5,
                    ease: "power2.inOut"
                  }, "+=0.3")
            } else {
                tl.to(tegamiRef.current, {
                    y: 0,
                    scale: 0.8,
                    opacity: 0,
                    ease: "power2.in",
                    duration: 0.3
                  })  
                  .to(envelopeRef.current, { 
                    scaleY: 1,
                    y: 0,
                    duration: 0.3
                  }, "<")
                  .to(flapRef.current, {
                    rotateX: 0,
                    duration: 0.3,
                    ease: "power2.out",
                    onComplete: () => {
                        // Call the callback when envelope is fully closed
                        onEnvelopeClosed?.()
                    }
                  }, "<0.3")
            }
        }
    }, [isOpen])
    
    return (
        <div className="flex justify-center items-center h-full [perspective:1000px]">
            <div 
                ref={envelopeRef}
                {...(!defaultOpen && {
                    onMouseEnter: () => setIsOpen(true),
                    onMouseLeave: () => setIsOpen(false)
                })}
                className="bg-background border border-border rounded-lg p-4 h-56 shadow-md relative w-96 flex justify-center items-center hover:shadow-lg transition-shadow duration-300"
            >
                <div className="absolute bottom-2 left-4 text-xs text-muted-foreground font-jetbrains flex items-center gap-1">
                    <MapPinIcon className="w-3 h-3" />
                        {userName || "Guest"}
                </div>

                <div className="absolute bottom-2 right-4 text-xs text-muted-foreground font-jetbrains">
                    Tegami
                </div>
                

                <div 
                    ref={flapRef} 
                    className="absolute top-0 left-0 w-full h-1/3 bg-gray-200 rounded-t-lg border-b border-border"
                    style={{ clipPath: "polygon(0 0, 100% 0 , 100% 100%, 50% 70%, 0 100%)" }}
                >

                </div>
                
                <div className="absolute w-3/4 h-[0.5px] bg-border/50 top-[55%] left-1/2 -translate-x-1/2" />
                <div className="absolute w-3/4 h-[0.5px] bg-border/50 top-[65%] left-1/2 -translate-x-1/2" />
                <div className="absolute w-3/4 h-[0.5px] bg-border/50 top-[75%] left-1/2 -translate-x-1/2" />
                
                <div 
                    ref={tegamiRef} 
                    className="w-[85%] h-2/3 bg-card rounded-md p-4 shadow-inner z-10 border border-border"
                >
                    <form onSubmit={handelSubmit} className="h-full flex flex-col">
                        <Textarea 
                            className="flex-1 resize-none border-none bg-transparent focus-visible:ring-0 focus-visible:ring-offset-0"
                            placeholder="Write your message here..."
                            value={message}
                            onChange={(e) => setMessage(e.target.value)}
                            disabled={loading}
                        />
                        <div className="flex justify-end mt-2">
                            <button
                                type="submit"
                                disabled={loading || !message.trim()}
                                className="px-3 py-1 text-xs bg-primary text-primary-foreground rounded hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
                            >
                                {loading ? "Sending..." : "Send"}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}