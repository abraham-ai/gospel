import { Image } from "antd";

const ImageResult = ({
  resultUrl,
  width = undefined,
  height = undefined,
}: {
  resultUrl: string;
  width?: number;
  height?: number;
}) => {
  return (
    <Image
      src={resultUrl}
      width={width}
      height={height}
      alt="result"
      fallback="placeholder.png"
      preview={false}
    />
  );
};

export default ImageResult;
