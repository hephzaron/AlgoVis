const noteCache = new Map<string, string>();

// Import every markdown file in the Notes folder as raw text
const notes = import.meta.glob("../Notes/*.md", {
  query: "?raw",
  import: "default",
});

export async function loadMarkdown(noteFile: string): Promise<string> {
  if (noteCache.has(noteFile)) {
    return noteCache.get(noteFile)!;
  }

  const path = `../Notes/${noteFile}`;

  const importer = notes[path];

  if (!importer) {
    console.error(`Markdown file not found: ${path}`);
    return getFallbackNote(noteFile);
  }

  try {
    const content = (await importer()) as string;

    noteCache.set(noteFile, content);

    return content;
  } catch (error) {
    console.error(`Failed to load ${noteFile}`, error);
    return getFallbackNote(noteFile);
  }
}

function getFallbackNote(noteFile: string): string {
  const name = noteFile
    .replace(".md", "")
    .replace(/([A-Z])/g, " $1")
    .trim();

  return ` ${name}

Note content is currently unavailable. Please try again later.`;
}