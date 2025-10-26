import { clsx, type ClassValue } from "clsx"
import { twMerge } from "tailwind-merge"
import slugify from "slugify"

// Helper function to match github-slugger behavior
function slug(text: string): string {
  return slugify(text, { lower: true, strict: true })
}

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs))
}

// Academia utilities
export interface Ejercicio {
  slug: string;
  slugAsParams: string;
  title: string;
  description?: string;
  date: string;
  published: boolean;
  tags?: string[];
  body: string;
}

export function formatDate(input: string | number): string {
  const date = new Date(input)
  return date.toLocaleDateString("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  })
}

export function sortPosts(posts: Array<Ejercicio>) {
  return posts.sort((a, b) => {
    if (a.date > b.date) return -1
    if (a.date < b.date) return 1
    return 0
  })
}

export function getAllTags(posts: Array<Ejercicio>) {
  const tags: Record<string, number> = {}
  posts.forEach(post => {
    if (post.published) {
      post.tags?.forEach(tag => {
        tags[tag] = (tags[tag] ?? 0) + 1;
      })
    }
  })
  return tags;
}

export function sortTagsByCount(tags: Record<string, number>) {
  return Object.keys(tags).sort((a, b) => tags[b] - tags[a])
}

export function getPostsByTagSlug(posts: Array<Ejercicio>, tag: string) {
  return posts.filter(post => {
    if (!post.tags) return false
    const slugifiedTags = post.tags.map(tag => slug(tag))
    return slugifiedTags.includes(tag)
  })
}

// Payment utilities
export function generatePaymentLink(userId: string, planType: 'STUDENT' | 'STUDENT_P') {
  // Define los enlaces base de Stripe (reemplaza con tus enlaces reales)
  const stripeLinks = {
    STUDENT: "https://buy.stripe.com/test_9AQdUw0QVdLZ3Ic14a",
    STUDENT_P: "https://buy.stripe.com/test_fZe17K2Z3dLZ2E8aEL"
  };

  // Añade el userId como parámetro de consulta al enlace
  const paymentLink = `${stripeLinks[planType]}?client_reference_id=${userId}`;

  return paymentLink;
}
