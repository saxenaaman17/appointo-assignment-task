export interface BandProps {
  id: number;
  width: number;
  height: number;
  alignment: string;
  backgroundColor: string;
}

const Band = ({ id, width, height, alignment, backgroundColor }: BandProps) => {
  return (
    <div
      style={{
        width: `${width}px`,
        height: `${height}px`,
        backgroundColor,
        ...(alignment === "left" ? { left: 0 } : { right: 0 }),
        transform: "rotate(-5deg)",
        position: "absolute",
        top: `${
          alignment === "left"
            ? `${732 + (id - 1) * height}px`
            : `${509 + (id - 1) * height}px`
        }`,
      }}
    />
  );
};

export default Band;
