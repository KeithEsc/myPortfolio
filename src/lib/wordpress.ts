// src/lib/wordpress.ts
import { GraphQLClient } from 'graphql-request';

interface ImportMetaEnv {
  PUBLIC_WORDPRESS_API_URL: string;
}

const endpoint = import.meta.env.PUBLIC_WORDPRESS_API_URL;
export const client = new GraphQLClient(endpoint, {
  headers: {
    'Content-Type': 'application/json',
    'User-Agent': 'Astro/1.0',
    'Accept': 'application/json',
  },
});

// Single exported Post interface
export interface Post {
  id: string;
  title: string;
  slug: string;
  date: string;
  content: string;
  excerpt: string;
}

interface PostsResponse {
  posts: {
    nodes: Post[];
  };
}

export async function getPosts(): Promise<Post[]> {
  const query = `
    query GetPosts {
      posts {
        nodes {
          id
          title
          slug
          date
          content
          excerpt
        }
      }
    }
  `;

  try {
    const data = await client.request<PostsResponse>(query);
    return data.posts.nodes;
  } catch (error) {
    console.error('Error fetching posts:', error);
    return [];
  }
}

export async function getPost(slug: string): Promise<Post | null> {
  const query = `
    query GetPost($slug: ID!) {
      post(id: $slug, idType: SLUG) {
        id
        title
        slug
        date
        content
        excerpt
      }
    }
  `;

  try {
    const data = await client.request<{ post: Post }>(query, { slug });
    return data.post;
  } catch (error) {
    console.error('Error fetching post:', error);
    return null;
  }
}

// Truncate text to a certain length in excerpt
export function truncateText(text: string, length: number): string {
  if (text.length <= length) return text;

  // Find the last space before the truncation length
  const truncated = text.substring(0, length);
  const lastSpaceIndex = truncated.lastIndexOf(' ');

  // If there's no space, just truncate at the limit (this happens if there are no spaces)
  return lastSpaceIndex === -1 ? truncated : truncated.substring(0, lastSpaceIndex) + '...';
}