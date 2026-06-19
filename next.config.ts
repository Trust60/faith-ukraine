import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

const nextConfig: NextConfig = {
  images: {
    // Next 16 за замовчуванням дозволяє лише quality 75 — додаємо 90
    // для шовкового тла футера (плавний градієнт без бендингу).
    qualities: [75, 90],
    // Коли фото товарів переїдуть у Supabase Storage — додати сюди
    // remotePatterns з хостом бакета (напр. <project>.supabase.co).
  },
};

export default withPayload(nextConfig);
