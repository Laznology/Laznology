"use client";
import { useFetch } from "@/hooks/useFetch";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import { Project } from "@/types/project";
import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Icon } from "@iconify/react";

export default function ProjectPage() {
  const { data, error, loading } = useFetch<Project[]>("/api/projects", {
    revalidate: 30,
  });

  if (loading) {
    return (
      <div className="container flex flex-col items-center justify-center h-full p-6">
        <div className="gap-4 border-b border-dashed p-6 max-w-2xl">
          <Skeleton className="w-full h-64 rounded-md animate-pulse" />
          <div className="mt-4 space-y-2">
            <Skeleton className="h-8 w-1/2 animate-pulse" />
            <Skeleton className="h-4 w-3/4 animate-pulse" />
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container flex flex-col items-center justify-center h-full p-6">
        <Card className="p-6 w-full max-w-md text-center text-red-600">
          Failed to load projects: {error.message}
        </Card>
      </div>
    );
  }

  return (
    <div className="container flex flex-col items-center justify-center h-full p-6">
      {data?.map((project) => (
        <div
          key={project.title}
          className="gap-4 border-b border-dashed last:border-b-0 p-6 max-w-2xl"
        >
          <div className="relative inline-block">
            <Image
              src={project.image}
              alt={project.title}
              height={600}
              width={500}
              loading="lazy"
              className="relative z-10 rounded-md"
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
                    className="text-gray-600 hover:text-gray-900"
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
                    className="text-gray-600 hover:text-gray-900"
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
