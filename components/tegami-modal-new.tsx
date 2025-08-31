"use client"
import React, { useState } from "react"
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { MessageSquareIcon } from "lucide-react"
import Tegami from "@/components/tegami"

interface TegamiModalProps {
    onMessageSent?: () => void;
}

export default function TegamiModal({ onMessageSent }: TegamiModalProps) {
    const [isOpen, setIsOpen] = useState(false)

    const handleMessageSent = () => {
        onMessageSent?.()
        // Don't close modal immediately, wait for envelope to close
    }

    const handleEnvelopeClosed = () => {
        // Close modal only after envelope animation is complete
        setIsOpen(false)
    }

    return (
        <Dialog open={isOpen} onOpenChange={setIsOpen}>
            <DialogTrigger asChild>
                <Button 
                    size="lg"
                    className="fixed bottom-4 right-4 sm:bottom-8 sm:right-8 z-50 rounded-full w-14 h-14 sm:w-16 sm:h-16 p-0 shadow-lg hover:shadow-xl transition-all duration-300 bg-primary hover:bg-primary/90"
                >
                    <MessageSquareIcon className="w-5 h-5 sm:w-6 sm:h-6" />
                </Button>
            </DialogTrigger>
            <DialogContent className="max-w-[95vw] sm:max-w-2xl w-full h-[500px] sm:h-[600px] p-0 border-none bg-transparent">
                <div className="w-full h-full flex items-center justify-center">
                    <Tegami 
                        onMessageSent={handleMessageSent} 
                        defaultOpen={true} 
                        onEnvelopeClosed={handleEnvelopeClosed}
                    />
                </div>
            </DialogContent>
        </Dialog>
    )
}
