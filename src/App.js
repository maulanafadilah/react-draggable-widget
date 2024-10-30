import "./styles.css";
import { useState, useRef, useEffect } from "react";
import Draggable from "react-draggable";
import ScaleLoader from "react-spinners/ScaleLoader";

export default function App() {
  const [widgetState, setWidgetState] = useState("idle");
  const widgetRef = useRef(null);
  const [position, setPosition] = useState({ x: 0, y: 50 });
  const [isRightSide, setIsRightSide] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const updateSide = (x) => {
    const threshold = window.innerWidth / 2;
    setIsRightSide(x > threshold);
  };

  // Handle drag event to update position
  const handleDrag = (e, ui) => {
    const newX = position.x + ui.deltaX;
    const newY = position.y + ui.deltaY;
    setPosition({ x: newX, y: newY });
    updateSide(newX);
  };

  // Handle stop event to snap to sides if needed
  const handleStop = (e, ui) => {
    const newX = position.x + ui.deltaX;
    updateSide(newX);
    // Optional: Snap to left or right side after dragging
    const snapThreshold = window.innerWidth / 2;
    if (newX > snapThreshold) {
      setPosition({ x: window.innerWidth - 5, y: position.y });
      setIsRightSide(true);
    } else {
      setPosition({ x: 0, y: position.y });
      setIsRightSide(false);
    }
  };

  // Update side on window resize
  useEffect(() => {
    const handleResize = () => {
      updateSide(position.x);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [position.x]);

  return (
    // Widget component
    <div id="mg-content-wrapper-extension">
      <Draggable
        axis="both"
        handle="#handle-icon"
        defaultPosition={{ x: 0, y: 50 }}
        position={position}
        onDrag={handleDrag}
        onStop={handleStop}
        grid={[25, 25]}
        scale={1}
      >
        <div
          ref={widgetRef}
          id="floating-icon"
          className={`side-widget-container ${
            widgetState === "loading" ? "loading" : ""
          } ${isRightSide ? "right-side" : "left-side"} ${
            isHovered ? "hovered" : ""
          }`}
          style={{
            zIndex: 9999,
            borderTopLeftRadius: isRightSide ? 100 : 10,
            borderTopRightRadius: isRightSide ? 10 : 100,
          }}
        >
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            style={{
              alignSelf: "flex-start",
              marginRight: isRightSide ? 0 : 5,
              marginLeft: isRightSide ? 5 : 0,
            }}
            id="handle-icon"
          >
            <path
              d="M17.5401 8.81063C19.1748 8.81063 20.5001 7.48539 20.5001 5.85062C20.5001 4.21586 19.1748 2.89062 17.5401 2.89062C15.9053 2.89062 14.5801 4.21586 14.5801 5.85062C14.5801 7.48539 15.9053 8.81063 17.5401 8.81063Z"
              fill="#292D32"
            />
            <path
              d="M6.46 8.81063C8.09476 8.81063 9.42 7.48539 9.42 5.85062C9.42 4.21586 8.09476 2.89062 6.46 2.89062C4.82524 2.89062 3.5 4.21586 3.5 5.85062C3.5 7.48539 4.82524 8.81063 6.46 8.81063Z"
              fill="#292D32"
            />
            <path
              d="M17.5401 21.1114C19.1748 21.1114 20.5001 19.7862 20.5001 18.1514C20.5001 16.5166 19.1748 15.1914 17.5401 15.1914C15.9053 15.1914 14.5801 16.5166 14.5801 18.1514C14.5801 19.7862 15.9053 21.1114 17.5401 21.1114Z"
              fill="#292D32"
            />
            <path
              d="M6.46 21.1114C8.09476 21.1114 9.42 19.7862 9.42 18.1514C9.42 16.5166 8.09476 15.1914 6.46 15.1914C4.82524 15.1914 3.5 16.5166 3.5 18.1514C3.5 19.7862 4.82524 21.1114 6.46 21.1114Z"
              fill="#292D32"
            />
          </svg>

          <div
            id="widget-body"
            style={{
              display: "flex",
              flexDirection: `${isRightSide ? "row-reverse" : "row"}`,
              justifyContent: "center",
              alignItems: "center",
            }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <svg
              width="49"
              height="48"
              viewBox="0 0 49 48"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              id="mg-icon"
            >
              <path
                d="M0 24C0 10.7452 10.888 0 24.1429 0C37.3977 0 48.2857 10.7452 48.2857 24C48.2857 37.2548 37.3977 48 24.1429 48C10.888 48 0 37.2548 0 24Z"
                fill="#5521B5"
              />
              <g clipPath="url(#clip0_3347_305)">
                <path
                  d="M39.3116 21.7889L32.0584 12.8963C31.5148 12.2299 30.7519 11.9074 29.9889 12.0232C28.2291 12.2904 26.193 12.4436 24.0219 12.4436C21.8508 12.4436 19.8148 12.2905 18.0549 12.0232C17.2919 11.9074 16.529 12.2299 15.9854 12.8963L8.73231 21.7889C7.7572 22.9844 7.7572 24.9229 8.73231 26.1185L15.9855 35.0111C16.529 35.6775 17.292 36 18.0549 35.8842C19.8148 35.6169 21.8508 35.4637 24.022 35.4637C26.1931 35.4637 28.2291 35.6169 29.989 35.8842C30.7519 36 31.5149 35.6775 32.0584 35.0111L39.3116 26.1185C40.2867 24.9229 40.2867 22.9844 39.3116 21.7889ZM24.022 30.8811C14.8986 30.8811 12.6169 29.4966 12.6169 23.9537C12.6169 18.4107 14.8985 17.0263 24.0219 17.0263C33.1453 17.0263 35.427 18.4108 35.427 23.9537C35.427 29.4967 33.1453 30.8811 24.022 30.8811Z"
                  fill="white"
                />
                <path
                  d="M18.8721 20.5332H17.6942C17.5476 20.5332 17.4287 20.6789 17.4287 20.8587V27.0486C17.4287 27.2283 17.5476 27.3741 17.6942 27.3741H18.8721C19.0187 27.3741 19.1376 27.2283 19.1376 27.0486V20.8587C19.1376 20.6789 19.0187 20.5332 18.8721 20.5332Z"
                  fill="white"
                />
                <path
                  d="M29.7438 23.8044L31.0683 25.427C31.1721 25.5541 31.1721 25.7602 31.0684 25.8873L30.2349 26.9093C30.1312 27.0364 29.9631 27.0364 29.8594 26.9093L27.3268 23.8042C27.2232 23.6772 27.2231 23.4712 27.3267 23.3441L28.3468 22.0919L29.8594 20.2374C29.963 20.1103 30.1311 20.1103 30.2348 20.2374L31.0685 21.2595C31.1722 21.3866 31.1722 21.5927 31.0685 21.7199L29.7437 23.3441C29.64 23.4713 29.64 23.6773 29.7438 23.8044Z"
                  fill="white"
                />
              </g>
              <defs>
                <clipPath id="clip0_3347_305">
                  <rect
                    width="32.2857"
                    height="24"
                    fill="white"
                    transform="translate(8 12)"
                  />
                </clipPath>
              </defs>
            </svg>

            {widgetState !== "loading" && (
              <div className="svg-with-tooltip">
                {widgetState === "idle" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setWidgetState("bot-in-meeting");
                    }}
                  >
                    <svg
                      className="invite-bot-btn"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M31.0933 19.5797L23.2996 16.7062L20.4199 8.90625C20.1997 8.30903 19.8017 7.79368 19.2795 7.42968C18.7573 7.06567 18.1361 6.87052 17.4996 6.87052C16.8631 6.87052 16.2419 7.06567 15.7197 7.42968C15.1975 7.79368 14.7995 8.30903 14.5793 8.90625L11.7058 16.7062L3.90585 19.5797C3.30863 19.7999 2.79328 20.1979 2.42928 20.7201C2.06527 21.2423 1.87012 21.8635 1.87012 22.5C1.87012 23.1365 2.06527 23.7577 2.42928 24.2799C2.79328 24.8021 3.30863 25.2001 3.90585 25.4203L11.6996 28.2938L14.5793 36.0938C14.7995 36.691 15.1975 37.2063 15.7197 37.5703C16.2419 37.9343 16.8631 38.1295 17.4996 38.1295C18.1361 38.1295 18.7573 37.9343 19.2795 37.5703C19.8017 37.2063 20.1997 36.691 20.4199 36.0938L23.2934 28.3L31.0933 25.4203C31.6906 25.2001 32.2059 24.8021 32.5699 24.2799C32.9339 23.7577 33.1291 23.1365 33.1291 22.5C33.1291 21.8635 32.9339 21.2423 32.5699 20.7201C32.2059 20.1979 31.6906 19.7999 31.0933 19.5797ZM21.1902 25.0734C20.9357 25.1672 20.7046 25.3151 20.5128 25.5069C20.321 25.6987 20.1731 25.9299 20.0793 26.1844L17.4996 33.1688L14.9262 26.1844C14.8324 25.9299 14.6845 25.6987 14.4927 25.5069C14.3009 25.3151 14.0697 25.1672 13.8152 25.0734L6.83085 22.5L13.8152 19.9266C14.0697 19.8328 14.3009 19.6849 14.4927 19.4931C14.6845 19.3013 14.8324 19.0701 14.9262 18.8156L17.4996 11.8313L20.073 18.8156C20.1668 19.0701 20.3147 19.3013 20.5065 19.4931C20.6983 19.6849 20.9295 19.8328 21.184 19.9266L28.1684 22.5L21.1902 25.0734ZM21.8746 6.25C21.8746 5.75272 22.0721 5.27581 22.4238 4.92417C22.7754 4.57254 23.2523 4.375 23.7496 4.375H25.6246V2.5C25.6246 2.00272 25.8221 1.52581 26.1738 1.17417C26.5254 0.822544 27.0023 0.625 27.4996 0.625C27.9969 0.625 28.4738 0.822544 28.8254 1.17417C29.1771 1.52581 29.3746 2.00272 29.3746 2.5V4.375H31.2496C31.7469 4.375 32.2238 4.57254 32.5754 4.92417C32.9271 5.27581 33.1246 5.75272 33.1246 6.25C33.1246 6.74728 32.9271 7.22419 32.5754 7.57583C32.2238 7.92746 31.7469 8.125 31.2496 8.125H29.3746V10C29.3746 10.4973 29.1771 10.9742 28.8254 11.3258C28.4738 11.6775 27.9969 11.875 27.4996 11.875C27.0023 11.875 26.5254 11.6775 26.1738 11.3258C25.8221 10.9742 25.6246 10.4973 25.6246 10V8.125H23.7496C23.2523 8.125 22.7754 7.92746 22.4238 7.57583C22.0721 7.22419 21.8746 6.74728 21.8746 6.25ZM39.3746 13.75C39.3746 14.2473 39.1771 14.7242 38.8254 15.0758C38.4738 15.4275 37.9969 15.625 37.4996 15.625H36.8746V16.25C36.8746 16.7473 36.6771 17.2242 36.3254 17.5758C35.9738 17.9275 35.4969 18.125 34.9996 18.125C34.5023 18.125 34.0254 17.9275 33.6738 17.5758C33.3221 17.2242 33.1246 16.7473 33.1246 16.25V15.625H32.4996C32.0023 15.625 31.5254 15.4275 31.1738 15.0758C30.8221 14.7242 30.6246 14.2473 30.6246 13.75C30.6246 13.2527 30.8221 12.7758 31.1738 12.4242C31.5254 12.0725 32.0023 11.875 32.4996 11.875H33.1246V11.25C33.1246 10.7527 33.3221 10.2758 33.6738 9.92417C34.0254 9.57254 34.5023 9.375 34.9996 9.375C35.4969 9.375 35.9738 9.57254 36.3254 9.92417C36.6771 10.2758 36.8746 10.7527 36.8746 11.25V11.875H37.4996C37.9969 11.875 38.4738 12.0725 38.8254 12.4242C39.1771 12.7758 39.3746 13.2527 39.3746 13.75Z"
                        fill="#5521B5"
                      />
                      <path
                        d="M14.1406 19.375L6.71875 22.4219L14.1406 25.625L17.2656 33.9062L20.7812 25.625L28.5938 22.5781L20.7812 19.375L17.5 11.3281L14.1406 19.375Z"
                        fill="#5521B5"
                      />
                    </svg>
                    {/* <span className="tooltip-text">Invite Bot</span> */}
                  </div>
                )}

                {widgetState === "bot-in-meeting" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setWidgetState("bot-paused");
                    }}
                  >
                    <svg
                      className="invite-bot-btn"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M19.9499 3.33301C10.7499 3.33301 3.2832 10.7997 3.2832 19.9997C3.2832 29.1997 10.7499 36.6663 19.9499 36.6663C29.1499 36.6663 36.6165 29.1997 36.6165 19.9997C36.6165 10.7997 29.1665 3.33301 19.9499 3.33301ZM27.0499 22.0497C27.0499 24.8163 24.8165 27.0497 22.0499 27.0497H17.9499C15.1832 27.0497 12.9499 24.8163 12.9499 22.0497V17.9497C12.9499 15.183 15.1832 12.9497 17.9499 12.9497H22.0499C24.8165 12.9497 27.0499 15.183 27.0499 17.9497V22.0497Z"
                        fill="#E02424"
                      />
                    </svg>
                    {/* <span className="tooltip-text">Pause Recording</span> */}
                  </div>
                )}

                {widgetState === "bot-paused" && (
                  <div
                    style={{
                      display: "flex",
                      flexDirection: "column",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                    onClick={() => {
                      setWidgetState("idle");
                    }}
                  >
                    <svg
                      className="invite-bot-btn"
                      width="40"
                      height="40"
                      viewBox="0 0 40 40"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M20 0C8.96 0 0 8.96 0 20C0 31.04 8.96 40 20 40C31.04 40 40 31.04 40 20C40 8.96 31.04 0 20 0ZM25.32 23.46L22.76 24.94L20.2 26.42C16.9 28.32 14.2 26.76 14.2 22.96V20V17.04C14.2 13.22 16.9 11.68 20.2 13.58L22.76 15.06L25.32 16.54C28.62 18.44 28.62 21.56 25.32 23.46Z"
                        fill="#5521B5"
                      />
                    </svg>
                    {/* <span className="tooltip-text">Resume Recording</span> */}
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </Draggable>
    </div>
  );
}
