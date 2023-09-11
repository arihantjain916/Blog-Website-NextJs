"use client";

export default function Loading() {
  const style = {
    container: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      minHeight: "100vh",
    },
    jelly: {
      "-uibSize": "50px",
      "-uibSpeed": "0.9s",
      "-uibColor": "black",
      position: "relative",
      height: "calc(var(--uib-size) / 2)",
      width: "var(--uib-size)",
      filter: 'url("#uib-jelly-ooze")',
      animation: "rotate calc(var(--uib-speed) * 2) linear infinite",
    },
    jelly__before: {
      animation: "shift-left var(--uib-speed) ease infinite",
    },
    jelly__after: {
      animation: "shift-right var(--uib-speed) ease infinite",
    },
    jelly_maker: {
      width: "0",
      height: "0",
      position: "absolute",
    },
  };

  return (
    <>
      <div className={style.container}>
        <div className={style.jelly}></div>
      </div>

      <svg width="0" height="0" className={style.jelly_maker}>
        <defs>
          <filter id="uib-jelly-ooze">
            <feGaussianBlur
              in="SourceGraphic"
              stdDeviation="6.25"
              result="blur"
            />
            <feColorMatrix
              in="blur"
              mode="matrix"
              values="1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7"
              result="ooze"
            />
            <feBlend in="SourceGraphic" in2="ooze" />
          </filter>
        </defs>
      </svg>
    </>
  );
}
