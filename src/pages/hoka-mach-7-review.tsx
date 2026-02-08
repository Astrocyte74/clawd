import MarkdownPage from '../components/MarkdownPage';
import hokaMach7Review from '../content/hoka-mach-7-review.md?raw';

export default function HokaMach7Review() {
  return <MarkdownPage content={hokaMach7Review} />;
}

export const metadata = {
  title: 'Hoka Mach 7 Review - What\'s New vs Mach 6?',
  description: 'First run review of the Hoka Mach 7. Minor updates to the popular Mach 6 daily trainer with improved outsole grip and cosmetic refresh.',
};
