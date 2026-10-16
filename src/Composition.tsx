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

const calculateMetadata: CalculateMetadataFunction<Props> = () => {
  return {
    durationInFrames: 180,
    fps: 30,
    width: 1080,
    height: 1920,
  };
};

// Available background music
const musicTracks = [
  "bg1.mp3",
  "bg2.mp3",
  "bg3.mp3",
  "bg4.mp3",
  "bg5.mp3",
  "bg7.mp3",
  "bg8.mp3",
];

// Choose music based on Reel ID
const getMusicTrack = (reelId: string) => {
  // Extract number from IDs like REEL-001, REEL-002
  const match = reelId.match(/\d+/);

  if (match) {
    const numericId = parseInt(match[0], 10);

    const index = (numericId - 1) % musicTracks.length;

    return musicTracks[index];
  }

  return musicTracks[0];
};

// Detect Urdu / Arabic-script characters
const isUrdu = (text: string) => {
  return /[\u0600-\u06FF\u0750-\u077F\u08A0-\u08FF]/.test(text);
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
        reelId: "REEL-001",
      }}
      calculateMetadata={calculateMetadata}
    />
  );
};

export const MyComponent: React.FC<Props> = ({
  text,
  reelId,
}) => {
  const musicTrack = getMusicTrack(reelId);

  const urdu = isUrdu(text);

  return (
    <>
      {/* Load Urdu font */}
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

          // Automatic font
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

          // Automatic RTL/LTR
          direction: urdu ? "rtl" : "ltr",
        }}
      >
        <Audio
          src={staticFile(`audio/${musicTrack}`)}
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

            // Better Urdu rendering
            unicodeBidi: "plaintext",
          }}
        >
          {text}
        </div>
      </div>
    </>
  );
};