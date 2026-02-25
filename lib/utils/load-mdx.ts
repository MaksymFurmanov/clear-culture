import fs from "fs";
import path from "path";

export function loadMdx(slug: string): string | null {
  const filePath = path.join(
    process.cwd(),
    "prisma/data/descriptions",
    `${slug}.mdx`
  );

  if (!fs.existsSync(filePath)) {
    console.warn(`MDX file not found for slug: ${slug}`);
    return null;
  }

  return fs.readFileSync(filePath, "utf-8");
}