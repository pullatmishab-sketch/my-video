import {
  Audio,
  CalculateMetadataFunction,
  Composition,
  staticFile,
} from "remotion";

type Props = {
  text: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {
    durationInFrames: 180,
    fps: 30,
    width: 1080,
    height: 1920,
  };
};

export const MyComposition = () => {
  return (
    <Composition
      id="MyComp"
      component={MyComponent}
      durationInFrames={180}
      fps={30}
      width={1080}
      height={1920}
      defaultProps={{
        text: "Test Reel",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = ({ text }) => {
  return (
    <div
      style={{
        width: "100%",
        height: "100%",
        backgroundColor: "#2B0000",
        color: "#F2E8D8",
        fontFamily: "Georgia, 'Times New Roman', serif",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
        boxSizing: "border-box",
        paddingTop: 600,
        paddingLeft: 135,
        paddingRight: 100,
      }}
    >
      <Audio
        src={staticFile("audio.mp3")}
        volume={1}
      />

      <div
        style={{
          fontSize: 34,
          lineHeight: 1.45,
          whiteSpace: "pre-wrap",
          maxWidth: 810,
        }}
      >
        {text}
      </div>
    </div>
  );
};