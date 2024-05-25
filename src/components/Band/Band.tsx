export interface BandProps {
  width: number | string;
  height: number | string;
  alignment: string;
  backgroundColor: string;
  top: number | string;
}

const Band = ({
  width,
  height,
  alignment,
  backgroundColor,
  top,
}: BandProps) => {
  return (
    <div
      style={{
        width: typeof width === "string" ? width : `${width}px`,
        height: typeof height === "string" ? height : `${height}px`,
        backgroundColor,
        transform: "skew(-5deg, -5deg)",
        position: "absolute",
        top: typeof top === "string" ? top : `${top}px`,
        ...(alignment === "left" ? { left: 0 } : { right: 0 }),
      }}
    />
  );
};

export default Band;
