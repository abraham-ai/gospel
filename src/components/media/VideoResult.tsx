type VideoResultProps = {
  resultUrl: string;
  className?: string;
};

const VideoResult = ({ resultUrl, className }: VideoResultProps) => {
  return (
    <div className={`video-container ${className}`}>
      <center>
      <video
        src={resultUrl}
        autoPlay={true}
        muted={true}
        loop={true}
        controls={true}
        style={{ objectFit: "contain", height: "100vh", margin: "0 auto" }}
      />
      </center>
    </div>
  );
};

export default VideoResult;
