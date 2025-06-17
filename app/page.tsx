"use client"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import { SplitText } from "gsap/SplitText"
import { useRef } from "react"

gsap.registerPlugin(SplitText)

export default function Home() {    
    const mainContainer = useRef<HTMLDivElement>(null)
    const teaTitle = useRef<HTMLDivElement>(null)
    const teaLeaves = useRef<HTMLDivElement>(null)   
    const laznologyRef = useRef<HTMLHeadingElement>(null)
    const devRef = useRef<HTMLHeadingElement>(null)
    const japaneseTextRef = useRef<HTMLSpanElement>(null)
    const topRopeRef = useRef(null);
    const bottomRopeRef = useRef(null);
    
    useGSAP(() => {
        const tl = gsap.timeline();
        const elements = [teaTitle.current, teaLeaves.current].filter(Boolean);
        
        if (elements.length > 0) {
            gsap.set(elements, {
                opacity: 0,
                scale: 0.8,
            });
        }
          if (laznologyRef.current) {
            gsap.set(laznologyRef.current, { opacity: 1 });
        }
        
        if (devRef.current) {
            gsap.set(devRef.current, { opacity: 1 });
        }
        
        if (japaneseTextRef.current) {
            gsap.set(japaneseTextRef.current, { opacity: 1 });
        }


        tl.to(teaTitle.current, {
            opacity: 1,
            scale: 1,
            duration: 1.8,
            ease: "back.out(1.4)",
        })

        .to(teaLeaves.current, {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: "power2.out",
        }, "-=0.5")

        gsap.to(teaLeaves.current, {
            y: -12,
            x: 3,
            rotation: 1.5,
            duration: 4,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })        
        gsap.to(teaTitle.current, {
            filter: "brightness(1.05)",
            duration: 5,
            repeat: -1,
            yoyo: true,
            ease: "sine.inOut",
        })
        gsap.fromTo(".underline", {
            opacity: 0,
            width: "0%"
        }, {
            width: "100%",
            opacity: 1,
            duration: 1,
            delay: 1,
            ease: "power2.in,"
        })

        gsap.to(topRopeRef.current, {
          attr: { d: "M 0 100 Q 250 150 500 100 T 1000 100" },
          duration: 2,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut"
        })
        
    
        gsap.to(bottomRopeRef.current, {
          attr: { d: "M 0 120 Q 200 80 500 120 T 1000 120" },
          duration: 2.5,
          repeat: -1,
          yoyo: true,
          ease: "sine.inOut",
          delay: 0.3
        })
        
        if (laznologyRef.current) {
            const splitLaznology = new SplitText(laznologyRef.current, { 
                type: "chars",
                charsClass: "char"
            });
            
            gsap.set(splitLaznology.chars, { opacity: 0, y: 20 });

            gsap.to(splitLaznology.chars, {
                opacity: 1,
                y: 0,
                duration: 0.8,
                stagger: 0.05,
                ease: "back.out(1.7)",
                delay: 1 
            });
        }
        
        if (devRef.current) {
            const splitDev = new SplitText(devRef.current, {
                type: "chars,words",
                charsClass: "devChar"
            });
            
            const firstWord = splitDev.words[0];
            const firstWordChars = splitDev.chars.slice(0, firstWord.textContent?.length || 0);
            const restChars = splitDev.chars.slice(firstWord.textContent?.length || 0);
            
            gsap.set([firstWordChars, restChars], { opacity: 0 });
            
            gsap.to(firstWordChars, {
                opacity: 1,
                duration: 0.2,
                stagger: 0.05,
                ease: "power2.in",
                delay: 1.5
            });
            
            gsap.to(firstWordChars, {
                scale: 1.1,
                duration: 0.3,
                stagger: 0.02,
                ease: "power1.out",
                delay: 1.8
            });
            
            gsap.to(firstWordChars, {
                scale: 1,
                duration: 0.5,
                stagger: 0.01,
                ease: "elastic.out(1.2, 0.3)",
                delay: 2.1
            });
            
            gsap.to(restChars, {
                opacity: 1,
                stagger: 0.02,
                duration: 0.8,
                ease: "power2.out",
                delay: 2.3
            });

            gsap.to(firstWord, {
                scale: 1.03,
                duration: 1.2,
                repeat: -1,
                yoyo: true,
                ease: "sine.inOut",
                delay: 2.8
            });
        }       
    })

return (        
        <div 
            ref={mainContainer}
            className="h-full w-full bg-gray-50 overflow-hidden relative flex flex-col items-center justify-center"
        >
            <div className={"absolute inset-0 flex items-center justify-center z-10"}>
                <span className="block p-4 text-9xl text-gray-200 filter blur-[2px] font-jetbrains-mono">イラジー</span>
            </div>

            <div className="absolute w-full flex items-center justify-center z-10 bottom-0">
                <svg width={"100%"} viewBox="0 0 1000 200" preserveAspectRatio="none">
                    <defs>
                        <filter id="glow">
                            <feGaussianBlur stdDeviation="3" result="blur" />
                            <feComposite in="SourceGraphic" in2="blur" operator="over" />
                        </filter>
                    </defs>
        
                    <path ref={topRopeRef}
                        d="M 0 100 Q 250 50 500 100 T 1000 100"
                        stroke="#cccccc"
                        strokeWidth="2"
                        fill="none"
                        filter="url(#glow)"
                    />
                    <path ref={bottomRopeRef}
                        d="M 0 120 Q 200 160 500 120 T 1000 120"
                        stroke="#cccccc"
                        strokeWidth="1.5"
                        fill="none"
                        filter="url(#glow)"
                    />
                </svg>
            </div>

            <div className="absolute inset-0 opacity-5">
                <div className="w-full h-full bg-gradient-to-br from-gray-200 via-white to-gray-100"></div>
            </div>   

            <div 
                ref={teaTitle}
                    className="text-center mb-16 z-20"
                >
                <h1 
                    ref={laznologyRef}
                    className="text-6xl md:text-9xl font-antonio text-gray-800 mb-4 tracking-widest"
                >
                    Laznology
                </h1>
                <h2 
                    ref={devRef}
                    className="text-lg md:text-3xl font-noto-serif-jp text-gray-600 tracking-[0.3em]"
                >
                    !Dev, just people
                </h2>
                <div className="underline w-auto h-1 bg-gray-800 mx-auto mt-4"></div>            
            </div>

            <div 
                ref={teaLeaves}
                className="flex justify-center space-x-4 z-15 mt-6"
            >
                {[0, 1, 2, 3, 4, 5].map((index) => (
                    <div 
                        key={index}
                        className="w-3 h-7 bg-gray-800 transform"
                        style={{
                            borderRadius: '50% 10px 50% 10px',
                            transform: `rotate(${index * 15 - 40}deg)`,
                            opacity: 0.7 - (index * 0.08)
                        }}
                    ></div>
                ))}
            </div>                            
        </div>
    )
}