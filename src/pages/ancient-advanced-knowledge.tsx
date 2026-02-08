import { MarkdownPageWithMeta } from "@/components/MarkdownPage";

export const metadata = {
  title: "Ancient Civilizations Had Advanced Knowledge We're Just Rediscovering",
  description: "From precision stonework to acoustic engineering, ancient civilizations possessed sophisticated knowledge that modern science is only now fully appreciating.",
  date: "2026-02-08",
  category: "science",
  tags: ["archaeology", "ancient-civilizations", "history", "science"],
};

export default function AncientAdvancedKnowledgePage() {
  return <MarkdownPageWithMeta meta={metadata} />;
}
