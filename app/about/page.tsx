import Image from "next/image";
import Link from "next/link";
import {Icon} from "@iconify/react"

export default function AboutPage() {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 items-center container mx-auto justify-center px-12 py-6">
            <div className="aspect-square items-center flex justify-center">
                <Image priority src={"/meh.webp"} alt={"Laznology"} height={400} width={400} className={"object-cover"}/>
            </div>
            <div className="space-y-12">
                <div className="items-center font-jetbrains">
                    <h2 className="font-jetbrains text-center md:text-start text-5xl sm:text-9xl font-semibold">ABOUT
                        ME</h2>
                    <p className="text-justify text-muted-foreground">I’m enjoys combining logic and
                        creativity to build meaningful digital experiences. I see every project as a chance to learn
                        something new, and I’m driven by curiosity and persistence to keep improving. Whether working on
                        personal projects or collaborating with a team, I focus on creating solutions that are not only
                        functional but also intuitive and enjoyable to use.</p>
                </div>
                <div className="text-muted-foreground grid grid-cols-3 gap-4 md:gap:-6 items-center justify-between">
                    <div>
                        <h2>Ahmad Hanaffi Rahmadhani</h2>
                    </div>
                    <div className="align">
                        <div className="flex items-center justify-start gap-2">
                            <Icon icon={"mdi:github"}/>
                            <Link href={"https://github.com/Laznology"}>GitHub</Link>
                        </div>
                        <div className="flex items-center justify-start gap-2">
                            <Icon icon={"mdi:linkedin"}/>
                            <Link href={"https://www.linkedin.com/in/ahmad-hanaffi"}>LinkedIn</Link>
                        </div>
                    </div>
                    <div>
                        Special Region Yogyakarta, Indonesia
                    </div>
                </div>
            </div>
        </div>
    )
}