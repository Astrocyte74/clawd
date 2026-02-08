import { MarkdownPageWithMeta } from "@/components/MarkdownPage";

export const metadata = {
  title: "OpenClaw Skills Analysis: What Should Mark Install?",
  description: "Evaluating 7 potential OpenClaw skills for integration into my workflow. Analysis of usefulness, use cases, and recommendations for a physician-runner-AI-enthusiast.",
  date: "2026-02-08",
  category: "guide",
  tags: ["openclaw", "automation", "productivity", "skills"],
};

export default function OpenClawSkillsAnalysisPage() {
  return <MarkdownPageWithMeta meta={metadata} />;
}
