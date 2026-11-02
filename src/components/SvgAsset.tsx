import { useId } from 'react';

const sources = import.meta.glob<string>('../assets/figma/*.svg', {
  query: '?raw',
  import: 'default',
  eager: true,
});

// Only local, checked-in Figma exports are rendered. Shapes and root dimensions stay intact.
const colors: Record<string, string> = {
  '#182116': '--semantic-color-color-text-primary',
  '#3d4737': '--semantic-color-color-text-secondary',
  '#56604f': '--semantic-color-color-text-tertiary',
  '#fdb347': '--semantic-color-color-brand-primary-main',
  '#ffe8ab': '--semantic-color-color-brand-primary-sub',
  '#7ad2a6': '--semantic-color-color-brand-secondary-main',
  '#044823': '--semantic-color-color-brand-secondary-sub',
  '#ffffff': '--primitives-color-white',
  '#000000': '--primitives-color-black',
};

const assets = Object.fromEntries(
  Object.entries(sources).map(([path, svg]) => [
    path.split('/').at(-1),
    svg
      .replace(/#[\da-f]{6}\b/gi, (color) => {
        const token = colors[color.toLowerCase()];
        return token ? `var(${token})` : color;
      })
      .replace(/(fill|stroke)="(white|black)"/g, '$1="var(--primitives-color-$2)"'),
  ]),
);

export function SvgAsset({
  file,
  alt = '',
  className = '',
}: {
  file: string;
  alt?: string;
  className?: string;
}) {
  const instanceId = useId().replace(/:/g, '');
  const source = assets[file];
  if (!source) throw new Error(`Missing local SVG asset: ${file}`);
  // SVG exports reuse IDs; namespace each instance to keep masks and references local.
  const markup = source
    .replace(/\bid="([^"]+)"/g, `id="${instanceId}-$1"`)
    .replace(/url\(#([^)]+)\)/g, `url(#${instanceId}-$1)`)
    .replace(/((?:xlink:)?href)="#([^"]+)"/g, `$1="#${instanceId}-$2"`);
  return (
    <span
      className={`svg-asset ${className}`}
      role={alt ? 'img' : undefined}
      aria-label={alt || undefined}
      aria-hidden={alt ? undefined : true}
      dangerouslySetInnerHTML={{ __html: markup }}
    />
  );
}
