import { getSearchIndex } from "@/data/search-index";

/**
 * Індекс пошуку як статичний JSON. GET-роути в Next не кешуються за замовчуванням,
 * тому вмикаємо пререндер: файл збирається на білді, віддається з CDN і
 * інвалідовується разом із каталогом (revalidateTag "catalog" у хуку revalidateCatalog).
 * Живе поза /api, бо цей префікс повністю належить катч-олу Payload.
 */
export const dynamic = "force-static";

export async function GET() {
  return Response.json(await getSearchIndex());
}
