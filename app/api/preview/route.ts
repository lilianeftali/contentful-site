import { draftMode } from 'next/headers';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  const { searchParams, origin } = new URL(request.url);
  const secret = searchParams.get("secret");
  let slug = searchParams.get("slug");

  if (secret !== process.env.CONTENTFUL_PREVIEW_SECRET) {
    return new NextResponse("Invalid secret", { status: 401 });
  }

  // normalizar slug
  if (!slug || slug === "/" || slug === "undefined") {
    slug = "";
  } else {
    slug = slug.replace(/^\/+/, "");
  }

  const draftModeState = await draftMode()
  draftModeState.enable();

   const redirectUrl = new URL(`/posts/${slug}`, origin);

  return NextResponse.redirect(redirectUrl);
}
