import { MarkdownPageWithMeta } from "@/components/MarkdownPage";
import content from "../content/openclaw-playwright-cli.md?raw";

export default function OpenclawPlaywrightCliPage() {
  return <MarkdownPageWithMeta rawContent={content} />;
}
