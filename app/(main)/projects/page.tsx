"use client";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/project";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

export default function ProjectPage() {
  const data: Project[] = [
    {
      title: "Kebon",
      description:
        "Blogging web app with a Notion-style editor. Basically you write in blocks instead of one big text area, so you can drag things around, split into sections, drop in quotes, lists, or code blocks just by typing /. The whole thing feels closer to building with Lego than filling a form.",
      image:
        "https://spcvbpnwlqcdpozamryb.supabase.co/storage/v1/object/public/Images/Screenshot%20From%202025-09-26%2021-28-52.png",
      tech_stack: ["Next.js", "TailwindCSS", "Tiptap", "Postgre"],
      repo_url: "https://github.com/Laznology/kebon",
      demo_url: "https://notes.lazlab.tech",
    },
  ];

  return (
    <div className="container flex flex-col items-center justify-center h-full px-6 py-12">
      {data?.map((project) => (
        <div
          key={project.title}
          className="gap-4 border-b border-dashed last:border-b-0 p-6 max-w-2xl"
        >
          <div className="relative w-full aspect-[16/9]">
            <Image
              src={project.image}
              alt={project.title}
              fill
              priority
              sizes="(max-width: 768px) calc(100vw - 8rem), (max-width: 1024px) calc(100vw - 12rem), calc(100vw - 16rem)"
              className="rounded-md object-cover z-10"
            />
            <div className="absolute inset-0 translate-x-1 translate-y-1 bg-neutral-500 rounded-sm shadow-sm z-0" />
          </div>

          <div className="space-y-4">
            <h2 className="text-[calc(3.75rem+1vw)] leading-tight font-jetbrains font-semibold">
              {project.title}
            </h2>
            <article className="text-muted-foreground">
              {project.description}
            </article>
            <div className="flex items-center justify-between gap-3">
              <div className="flex items-center gap-2">
                {project.tech_stack.map((techStack) => (
                  <Badge key={techStack} variant={"secondary"}>
                    {techStack}
                  </Badge>
                ))}
              </div>
              <div className="flex items-center gap-4">
                {project.repo_url && (
                  <a
                    aria-label="Repo URL"
                    href={project.repo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon icon="mdi:github" width="24" height="24" />
                  </a>
                )}
                {project.demo_url && (
                  <a
                    aria-label="Demo URL"
                    href={project.demo_url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-muted-foreground hover:text-foreground transition-colors"
                  >
                    <Icon icon="mdi:monitor" width="24" height="24" />
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}
