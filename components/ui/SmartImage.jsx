import Image from "next/image";
/**
 * Thin wrapper over next/image. Vector placeholders (.svg) skip the optimiser,
 * which would otherwise refuse them; real photographs are resized and served as
 * AVIF/WebP automatically. Below-the-fold images lazy-load by default.
 */
export function SmartImage({ asset, fill, sizes, priority, className, quality = 75 }) {
  const unoptimized = asset.src.endsWith(".svg");
  return fill ? (
    <Image
      src={asset.src}
      alt={asset.alt}
      fill
      sizes={sizes ?? "100vw"}
      priority={priority}
      quality={quality}
      unoptimized={unoptimized}
      className={className}
    />
  ) : (
    <Image
      src={asset.src}
      alt={asset.alt}
      width={asset.width}
      height={asset.height}
      sizes={sizes}
      priority={priority}
      quality={quality}
      unoptimized={unoptimized}
      className={className}
    />
  );
}
