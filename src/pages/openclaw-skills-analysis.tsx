import { MarkdownPageWithMeta } from "@/components/MarkdownPage";
import content from "../content/openclaw-skills-analysis.md?raw";

export default function OpenClawSkillsAnalysisPage() {
  return <MarkdownPageWithMeta rawContent={content} />;
}
