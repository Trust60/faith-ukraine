import type { CollectionConfig } from "payload";

/** Користувачі = автентифікація в адмінці Payload (єдиний механізм auth у проєкті). */
export const Users: CollectionConfig = {
  slug: "users",
  labels: {
    singular: "Користувач",
    plural: "Користувачі",
  },
  auth: true,
  admin: {
    useAsTitle: "email",
  },
  fields: [],
};
