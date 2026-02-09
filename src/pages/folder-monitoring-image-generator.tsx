import { MarkdownPageWithMeta } from "@/components/MarkdownPage";
import content from "../content/folder-monitoring-image-generator.md?raw";

export default function FolderMonitoringImageGeneratorPage() {
  return <MarkdownPageWithMeta rawContent={content} />;
}
