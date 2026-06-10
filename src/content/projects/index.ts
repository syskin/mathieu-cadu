import { projectSchema, type Project, type ProjectInput } from "../schema";
import { boney } from "./boney";
import { changelogit } from "./changelogit";
import { nutriwi } from "./nutriwi";
import { contentLd } from "./content-ld";

// Add new projects here. Each is validated at load — invalid content fails the build.
const raw: ProjectInput[] = [boney, changelogit, nutriwi, contentLd];

export const projects: Project[] = raw
  .map((p) => projectSchema.parse(p))
  .sort((a, b) => a.index - b.index);

export const featuredProjects = projects.filter((p) => p.featured);

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug);
}
