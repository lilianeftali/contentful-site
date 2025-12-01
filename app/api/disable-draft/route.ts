import { draftMode } from "next/headers";

export async function GET(request: Request) {
  const draftModeResolved = await draftMode()
  draftModeResolved.disable();
  return new Response("Draft mode is disabled");
}
