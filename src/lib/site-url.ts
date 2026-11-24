/**
 * The public address of the site, used for canonical links, the sitemap and
 * the social preview image.
 *
 * 1. NEXT_PUBLIC_SITE_URL, when set (use this for a custom domain).
 * 2. On Vercel, the project's production domain, which Vercel provides to the
 *    build on its own. No setup needed.
 * 3. Otherwise the local dev address.
 */
const fromEnv = process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, "");
const fromVercel = process.env.VERCEL_PROJECT_PRODUCTION_URL
  ? `https://${process.env.VERCEL_PROJECT_PRODUCTION_URL}`
  : undefined;

export const siteUrl = fromEnv || fromVercel || "http://localhost:3000";
