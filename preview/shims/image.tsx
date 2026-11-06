import { imgmap } from "../imgmap";
export default function Image({ src, alt, fill, sizes, priority, className, style, width, height, ...rest }: any) {
  const s = imgmap[src] ?? src;
  const st = fill ? { position: "absolute", inset: 0, width: "100%", height: "100%", ...style } : style;
  return <img src={s} alt={alt} className={className} style={st} width={fill ? undefined : width} height={fill ? undefined : height} loading={priority ? "eager" : "lazy"} {...rest} />;
}
