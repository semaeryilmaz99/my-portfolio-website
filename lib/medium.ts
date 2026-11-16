import type { MediumPost } from '@/components/sections';
import { profile } from '@/content/profile';

function pick(xml: string, tag: string) {
  const m = xml.match(new RegExp(`<${tag}>(?:<!\\[CDATA\\[)?([\\s\\S]*?)(?:\\]\\]>)?</${tag}>`));
  return m ? m[1].trim() : '';
}

/**
 * Only software posts are shown: a post needs at least one tech tag.
 * Add a word here if a future software post uses a tag that isn't matched.
 */
const TECH_TAG = /program|coding|develop|software|javascript|typescript|react|node|php|sql|python|java|web|front-?end|back-?end|full-?stack|api|database|mobile-app|framework|llm|rag|\bai\b|ai-|-ai|machine-learning|generative|agent|langchain|cursor|devops|cloud|data/i;

/** Tags that look technical by word but aren't (e.g. "personal-development"). */
const NON_TECH_TAG = /self|personal|life|psycholog|relationship|mindful|motivation|productivity/i;
const isTechTag = (tag: string) => TECH_TAG.test(tag) && !NON_TECH_TAG.test(tag);

/**
 * Latest Medium posts from the public RSS feed, refreshed hourly.
 * Medium's feed only contains the most recent ~10 posts.
 * Any failure returns [] and the page shows a "read on Medium" link instead.
 */
export async function getMediumPosts(locale: string): Promise<MediumPost[]> {
  try {
    const res = await fetch(profile.contact.mediumFeed, {
      next: { revalidate: 3600 },
      headers: { 'User-Agent': 'Mozilla/5.0 (portfolio RSS reader)' },
    });
    if (!res.ok) return [];
    const xml = await res.text();
    const items = xml.split('<item>').slice(1).map((chunk) => chunk.split('</item>')[0]);
    return items.map((it) => {
      const content = pick(it, 'content:encoded');
      const tags = [...it.matchAll(/<category>(?:<!\[CDATA\[)?([\s\S]*?)(?:\]\]>)?<\/category>/g)].map((m) => m[1].trim());
      const thumb = content.match(/<img[^>]+src="([^"]+)"/)?.[1];
      const d = new Date(pick(it, 'pubDate'));
      return {
        title: pick(it, 'title'),
        link: pick(it, 'link').split('?')[0],
        date: isNaN(d.getTime()) ? '' : d.toLocaleDateString(locale, { year: 'numeric', month: 'short', day: 'numeric' }),
        thumb,
        tags,
      };
    })
      .filter((p) => p.title && p.link && p.tags.some(isTechTag))
      .map(({ tags: _tags, ...post }) => post);
  } catch {
    return [];
  }
}
