import { MarkdownPageWithMeta } from "@/components/MarkdownPage";
import content from "../content/ancient-advanced-knowledge.md?raw";

export default function AncientAdvancedKnowledgePage() {
  return <MarkdownPageWithMeta rawContent={content} />;
}
