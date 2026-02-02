import { MarkdownPageWithMeta } from '../components/MarkdownPage'
import markdownContent from './space-exploration-guide.md?raw'

/**
 * Space Exploration Guide
 *
 * Comprehensive guide to NASA's Artemis program, SpaceX's Starship,
 * and the path to Mars. Explains rocket tech, timelines, and how
 * NASA and SpaceX are working together.
 */
export default function SpaceExplorationGuidePage() {
  return <MarkdownPageWithMeta rawContent={markdownContent} />
}
