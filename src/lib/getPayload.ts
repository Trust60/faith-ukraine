import config from "@payload-config";
import { getPayload } from "payload";

/**
 * Клієнт Payload Local API для серверних компонентів / скриптів.
 * `getPayload` сам кешує інстанс, тож окремий кеш не потрібен.
 */
export const getPayloadClient = async () => getPayload({ config });
