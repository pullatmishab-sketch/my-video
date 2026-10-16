
import {
  Audio,
  CalculateMetadataFunction,
  Composition,
  staticFile,
} from "remotion";

type Props = {
  text: string;
  reelId: string;
};

const calculateMetadata: CalculateMetadataFunction<Props> = () => ({
  durationInFrames: 180,
  fps: 30,
  width: 1080,
  height: 1920,
});

// Detect Urdu / Arabic-script characters
const isUrdu = (text: string) =>
  /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);

export const MyComposition = () => (
  <Composition
    id="MyComp"
    component={MyComponent}
    durationInFrames={180}
    fps={30}
    width={1080}
    height={1920}
    defaultProps={{
      text: "Test Reel",
      reelId: "REEL-001",
    }}
    calculateMetadata={calculateMetadata}
  />
);

export const MyComponent: React.FC<Props> = ({ text }) => {
  const urdu = isUrdu(text);

  return (
    <>
      <style>
        {`
          @font-face {
            font-family: "Noto Nastaliq Urdu";
            src: url("${staticFile(
              "fonts/NotoNastaliqUrdu-Regular.ttf"
            )}") format("truetype");
            font-weight: 400;
            font-style: normal;
          }
        `}
      </style>

      <div
        style={{
          width: "100%",
          height: "100%",
          backgroundColor: "#2B0000",
          color: "#E7C7C6",
          fontFamily: urdu
            ? '"Noto Nastaliq Urdu", serif'
            : "Georgia, 'Times New Roman', serif",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          boxSizing: "border-box",
          paddingLeft: 100,
          paddingRight: 100,
          direction: urdu ? "rtl" : "ltr",
        }}
      >
        <Audio
          src={staticFile("audio/background.mp3")}
          volume={1}
        />

        <div
          style={{
            fontSize: urdu ? 38 : 34,
            lineHeight: urdu ? 1.8 : 1.45,
            whiteSpace: "pre-wrap",
            width: "100%",
            maxWidth: 850,
            textAlign: "center",
            direction: urdu ? "rtl" : "ltr",
            unicodeBidi: "plaintext",
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
};
