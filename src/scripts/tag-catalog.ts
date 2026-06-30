import type { CollectionSlug, Payload } from "payload";
import { getPayloadClient } from "@/lib/getPayload";

/**
 * Розмітка каталогу таксономією: категорія / тип / призначення / тип шкіри.
 *
 * НЕдеструктивний та ідемпотентний: терміни таксономій створюються за потреби
 * (find-or-create), товари ОНОВЛЮЮТЬСЯ за slug — нічого не видаляється, запускати
 * можна повторно. Розмітка взята з описів товарів на faithukraine.com.ua.
 *
 * Запуск: `pnpm tag:catalog`. Потрібен доступ до БД; у dev спершу зупини dev-сервер,
 * щоб push схеми не конкурував за зʼєднання.
 */

// Порядок термінів у масивах = порядок у списку фільтра.
const TYPES = [
  "Очищення",
  "Вмивання",
  "Тонік/Лосьйон",
  "Міст",
  "Есенція/Сироватка",
  "Гель/Крем",
  "Маска/Пак",
  "Пудра",
  "Гель для душу",
  "Шампунь",
  "Догляд для волосся",
  "Тональна основа",
  "База",
];
const CONCERNS = [
  "Зволоження",
  "Анти-ейдж",
  "Очищення/детокс",
  "Заспокоєння",
  "Сяйво/освітлення",
  "Баланс/себорегуляція",
  "Тонус/пружність",
  "Бар'єр/відновлення",
  "Звуження пор",
  "Проти акне",
  "Проти куперозу/почервоніння",
  "Сонцезахист",
  "Проти розтяжок",
  "Відновлення волосся",
];
const SKIN_TYPES = ["Суха", "Жирна", "Комбінована", "Чутлива", "Зріла", "Проблемна"];

type TAssign = { type: string; concerns: string[]; skin: string[] };

// Розмітка згрупована за категорією (зовнішній ключ = категорія товару).
// Порожній skin[] = універсальний засіб / тип шкіри не застосовується (волосся, губи).
const CATALOG: Record<string, Record<string, TAssign>> = {
  Обличчя: {
    "lamellar-veil-ex-cleansing": { type: "Очищення", skin: ["Чутлива"], concerns: ["Очищення/детокс", "Зволоження", "Заспокоєння", "Бар'єр/відновлення"] },
    "lamellar-veil-ex-wash": { type: "Вмивання", skin: ["Жирна"], concerns: ["Очищення/детокс", "Баланс/себорегуляція", "Зволоження", "Заспокоєння"] },
    "lamellar-veil-ex-calming-and-moist-pack": { type: "Маска/Пак", skin: ["Суха", "Зріла", "Чутлива"], concerns: ["Зволоження", "Заспокоєння", "Анти-ейдж", "Бар'єр/відновлення", "Проти куперозу/почервоніння", "Сяйво/освітлення"] },
    "lamellar-veil-ex-moist-keep-essence": { type: "Есенція/Сироватка", skin: ["Суха", "Зріла"], concerns: ["Зволоження", "Анти-ейдж", "Бар'єр/відновлення", "Сяйво/освітлення"] },
    "lamellar-veil-ex-moist-keep-lotion": { type: "Тонік/Лосьйон", skin: ["Суха", "Зріла"], concerns: ["Зволоження", "Анти-ейдж", "Бар'єр/відновлення", "Заспокоєння"] },
    "lamellar-veil-ex-moist-keep-gel": { type: "Гель/Крем", skin: ["Суха", "Зріла"], concerns: ["Зволоження", "Анти-ейдж", "Бар'єр/відновлення"] },
    "lamellar-mode-cleansing": { type: "Очищення", skin: ["Жирна", "Комбінована"], concerns: ["Очищення/детокс", "Звуження пор", "Баланс/себорегуляція", "Проти акне"] },
    "lamellar-mode-clay-gel-wash-pack": { type: "Маска/Пак", skin: ["Жирна", "Комбінована", "Проблемна"], concerns: ["Очищення/детокс", "Звуження пор", "Проти акне", "Сяйво/освітлення"] },
    "lamellar-mode-precare-essence-isq": { type: "Есенція/Сироватка", skin: ["Зріла", "Суха"], concerns: ["Анти-ейдж", "Зволоження", "Бар'єр/відновлення", "Сяйво/освітлення"] },
    "lamellar-mode-balancing-pack": { type: "Маска/Пак", skin: ["Чутлива", "Проблемна"], concerns: ["Заспокоєння", "Бар'єр/відновлення", "Зволоження", "Проти куперозу/почервоніння"] },
    "lamellar-mode-balancing-lotion": { type: "Тонік/Лосьйон", skin: ["Чутлива", "Проблемна"], concerns: ["Заспокоєння", "Проти куперозу/почервоніння", "Зволоження", "Бар'єр/відновлення"] },
    "lamellar-mode-balancing-gel": { type: "Гель/Крем", skin: ["Чутлива", "Проблемна", "Комбінована"], concerns: ["Баланс/себорегуляція", "Заспокоєння", "Бар'єр/відновлення", "Проти акне", "Зволоження"] },
    "lamellar-mode-energizing-pack": { type: "Маска/Пак", skin: ["Зріла"], concerns: ["Анти-ейдж", "Тонус/пружність", "Звуження пор", "Сяйво/освітлення"] },
    "lamellar-mode-energizing-essence": { type: "Есенція/Сироватка", skin: ["Зріла"], concerns: ["Анти-ейдж", "Тонус/пружність", "Сяйво/освітлення"] },
    "lamellar-mode-energizing-lotion": { type: "Тонік/Лосьйон", skin: ["Зріла"], concerns: ["Анти-ейдж", "Тонус/пружність", "Зволоження", "Звуження пор"] },
    "lamellar-mode-energizing-gel": { type: "Гель/Крем", skin: ["Зріла"], concerns: ["Анти-ейдж", "Тонус/пружність", "Звуження пор"] },
    "lamellar-mode-brightening-pack": { type: "Маска/Пак", skin: [], concerns: ["Сяйво/освітлення", "Заспокоєння", "Анти-ейдж"] },
    "lamellar-mode-white-powder": { type: "Пудра", skin: ["Зріла"], concerns: ["Сяйво/освітлення", "Анти-ейдж", "Зволоження"] },
    "lamellar-mode-brightening-lotion": { type: "Тонік/Лосьйон", skin: [], concerns: ["Сяйво/освітлення", "Зволоження", "Бар'єр/відновлення"] },
    "lamellar-mode-brightening-gel": { type: "Гель/Крем", skin: [], concerns: ["Сяйво/освітлення", "Звуження пор"] },
    "at-system-cleansing": { type: "Очищення", skin: ["Чутлива"], concerns: ["Очищення/детокс", "Заспокоєння", "Проти куперозу/почервоніння", "Бар'єр/відновлення"] },
    "at-system-washing": { type: "Вмивання", skin: ["Чутлива"], concerns: ["Очищення/детокс", "Зволоження", "Заспокоєння", "Бар'єр/відновлення"] },
    "at-system-control-mist": { type: "Міст", skin: ["Чутлива"], concerns: ["Заспокоєння", "Зволоження", "Бар'єр/відновлення", "Проти куперозу/почервоніння"] },
    "at-system-mild-lotion": { type: "Тонік/Лосьйон", skin: ["Чутлива"], concerns: ["Заспокоєння", "Бар'єр/відновлення", "Зволоження", "Проти куперозу/почервоніння"] },
    "at-system-skin-moist": { type: "Гель/Крем", skin: ["Чутлива", "Суха"], concerns: ["Зволоження", "Бар'єр/відновлення", "Заспокоєння", "Проти куперозу/почервоніння"] },
    "at-system-emollient-gel": { type: "Гель/Крем", skin: ["Чутлива", "Суха"], concerns: ["Бар'єр/відновлення", "Заспокоєння", "Зволоження"] },
  },
  Тіло: {
    "elemois-body-gel-bright-calm": { type: "Гель/Крем", skin: ["Чутлива"], concerns: ["Зволоження", "Заспокоєння", "Сяйво/освітлення", "Бар'єр/відновлення", "Анти-ейдж"] },
    "elemois-body-serum": { type: "Есенція/Сироватка", skin: ["Суха", "Чутлива"], concerns: ["Зволоження", "Заспокоєння", "Проти розтяжок", "Тонус/пружність", "Сяйво/освітлення"] },
    "elemois-body-wash": { type: "Гель для душу", skin: ["Чутлива"], concerns: ["Очищення/детокс", "Заспокоєння", "Зволоження", "Бар'єр/відновлення"] },
    "elemois-body-gel-fitting": { type: "Гель/Крем", skin: ["Чутлива"], concerns: ["Тонус/пружність", "Зволоження", "Сяйво/освітлення"] },
  },
  Волосся: {
    "nonative-hair-shampoo": { type: "Шампунь", skin: [], concerns: ["Очищення/детокс", "Баланс/себорегуляція", "Заспокоєння", "Відновлення волосся"] },
    "nonative-repair-treatment": { type: "Догляд для волосся", skin: [], concerns: ["Відновлення волосся", "Бар'єр/відновлення", "Заспокоєння"] },
    "nonative-hair-essence": { type: "Есенція/Сироватка", skin: [], concerns: ["Відновлення волосся", "Бар'єр/відновлення", "Зволоження"] },
  },
  "Макіяж/база": {
    "insist-lamellar-gel-foundation": { type: "Тональна основа", skin: [], concerns: ["Сонцезахист", "Зволоження", "Бар'єр/відновлення", "Сяйво/освітлення"] },
    "insist-lamellar-sun-protector-essence-spf-40": { type: "Есенція/Сироватка", skin: ["Чутлива"], concerns: ["Сонцезахист", "Зволоження", "Анти-ейдж", "Бар'єр/відновлення"] },
    "insist-lamellar-ubp-make-base-spf-20": { type: "База", skin: ["Чутлива"], concerns: ["Сонцезахист", "Зволоження", "Тонус/пружність", "Сяйво/освітлення"] },
    "belseeq-essence-lip-base": { type: "База", skin: [], concerns: ["Зволоження", "Бар'єр/відновлення", "Сяйво/освітлення"] },
  },
};

const context = { disableRevalidate: true };

/** Find-or-create термінів таксономії; повертає мапу name → id. */
async function ensureTerms(
  payload: Payload,
  collection: CollectionSlug,
  names: string[],
): Promise<Map<string, number>> {
  const map = new Map<string, number>();
  for (let i = 0; i < names.length; i++) {
    const name = names[i];
    const found = await payload.find({
      collection,
      where: { name: { equals: name } },
      limit: 1,
      depth: 0,
    });
    if (found.docs[0]) {
      map.set(name, found.docs[0].id as number);
      continue;
    }
    // Динамічний slug колекції → Payload не звужує тип data; усі таксономії мають
    // однакову форму {name, order}, тож каст безпечний.
    const created = await payload.create({
      collection,
      data: { name, order: i } as never,
      context,
    });
    map.set(name, created.id as number);
  }
  return map;
}

const tagCatalog = async () => {
  const payload = await getPayloadClient();

  payload.logger.info("Розмітка: терміни таксономій (find-or-create)…");
  const categoryIds = await ensureTerms(payload, "product-categories", Object.keys(CATALOG));
  const typeIds = await ensureTerms(payload, "product-types", TYPES);
  const concernIds = await ensureTerms(payload, "concerns", CONCERNS);
  const skinIds = await ensureTerms(payload, "skin-types", SKIN_TYPES);

  let updated = 0;
  const missing: string[] = [];

  for (const [category, products] of Object.entries(CATALOG)) {
    for (const [slug, a] of Object.entries(products)) {
      const found = await payload.find({
        collection: "products",
        where: { slug: { equals: slug } },
        limit: 1,
        depth: 0,
      });
      const product = found.docs[0];
      if (!product) {
        missing.push(slug);
        continue;
      }
      await payload.update({
        collection: "products",
        id: product.id,
        draft: false,
        context,
        data: {
          category: categoryIds.get(category)!,
          type: typeIds.get(a.type)!,
          concerns: a.concerns.map((c) => concernIds.get(c)!),
          skinTypes: a.skin.map((s) => skinIds.get(s)!),
        },
      });
      updated++;
    }
  }

  payload.logger.info(`Розмітка: оновлено ${updated} товарів.`);
  if (missing.length) {
    payload.logger.warn(`Не знайдено за slug (${missing.length}): ${missing.join(", ")}`);
  }
  process.exit(0);
};

await tagCatalog();
