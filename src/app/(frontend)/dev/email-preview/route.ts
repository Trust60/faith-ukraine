import type { NextRequest } from "next/server";
import type { TSubmissionType } from "@/components/elements/forms/schemas";
import { buildSubmissionEmail } from "@/lib/email/submission-email";

/**
 * Дев-превʼю листів про заявки: `/dev/email-preview?type=consultation`.
 * `&format=text` показує текстову частину — її теж отримує менеджер, якщо
 * поштовий клієнт не рендерить HTML. У продакшені роут віддає 404.
 */
const SAMPLES: Record<TSubmissionType, Record<string, unknown>> = {
  consultation: {
    name: "Олена Коваль",
    contact: "olena.koval@gmail.com",
    age: "36–45",
    skinType: "Комбінована",
    concerns: ["Зневоднення", "Зморшки", "Нерівний тон / пігментація"],
    dayBehaviour: "Блищить у Т-зоні",
    usesCare: "Так",
    allergies: "Не впевнена/ий",
    careFormat: "Комплексний щоденний догляд",
  },
  partnership: {
    name: "Ірина Мельник",
    phone: "+380 67 123 45 67",
    city: "Львів",
    business: "Приватний косметолог",
    link: "",
  },
};

export async function GET(request: NextRequest) {
  if (process.env.NODE_ENV === "production") {
    return new Response("Not found", { status: 404 });
  }

  const params = request.nextUrl.searchParams;
  const type: TSubmissionType =
    params.get("type") === "consultation" ? "consultation" : "partnership";

  const { subject, preheader, html, text, replyTo } = buildSubmissionEmail({
    type,
    id: 42,
    createdAt: new Date(),
    answers: SAMPLES[type],
  });

  if (params.get("format") === "text") {
    const meta = [
      `Тема: ${subject}`,
      `Прев'ю: ${preheader}`,
      `Reply-To: ${replyTo ?? "— (контакт не email)"}`,
      "",
      "---",
      "",
    ].join("\n");
    return new Response(meta + text, {
      headers: { "content-type": "text/plain; charset=utf-8" },
    });
  }

  return new Response(html, {
    headers: { "content-type": "text/html; charset=utf-8" },
  });
}
