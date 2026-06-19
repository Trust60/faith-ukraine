import type { NextConfig } from "next";
import { withPayload } from "@payloadcms/next/withPayload";

// Хост Supabase Storage беремо з S3_PUBLIC_URL — без хардкоду project-ref.
const supabaseStorageHost = process.env.S3_PUBLIC_URL
  ? new URL(process.env.S3_PUBLIC_URL).hostname
  : undefined;

const nextConfig: NextConfig = {
  images: {
    // Next 16 за замовчуванням дозволяє лише quality 75 — додаємо 90
    // для шовкового тла футера (плавний градієнт без бендингу).
    qualities: [75, 90],
    // Дозволяємо next/image оптимізувати фото товарів з публічного бакета Supabase.
    remotePatterns: supabaseStorageHost
      ? [
          {
            protocol: "https",
            hostname: supabaseStorageHost,
            pathname: "/storage/v1/object/public/**",
          },
        ]
      : [],
  },
};

export default withPayload(nextConfig);
