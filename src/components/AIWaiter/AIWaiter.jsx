import React, { useEffect } from 'react';
import './AIWaiter.css';

const AIWaiter = () => {
  useEffect(() => {
    const host = "https://labs.heygen.com";
    const url = host + "/guest/streaming-embed?share=eyJxdWFsaXR5IjoiaGlnaCIsImF2YXRhck5hbWUiOiJBbGVzc2FuZHJhX1Byb2Zlc3Npb25hbExv%0D%0Ab2tfcHVibGljIiwicHJldmlld0ltZyI6Imh0dHBzOi8vZmlsZXMyLmhleWdlbi5haS9hdmF0YXIv%0D%0AdjMvMGQwM2I3YmUxOWFkNDcyZmFjNDE0NGNkMGQyZTgwOGRfNTU4MTAvcHJldmlld190YXJnZXQu%0D%0Ad2VicCIsIm5lZWRSZW1vdmVCYWNrZ3JvdW5kIjp0cnVlLCJrbm93bGVkZ2VCYXNlSWQiOiIyNjg0%0D%0AYTc2ZWZlMmU0M2E0YTM5MjdkNTE2NzUwYTJkMiIsInVzZXJuYW1lIjoiMTg1NjA1NWM4NzhmNDBj%0D%0AMTgyNDI3ZWM0OTU0ZWE4NGUifQ%3D%3D&inIFrame=1";
    const clientWidth = document.body.clientWidth;
    const wrapDiv = document.createElement("div");
    wrapDiv.id = "heygen-streaming-embed";
    const container = document.createElement("div");
    container.id = "heygen-streaming-container";
    const stylesheet = document.createElement("style");
    stylesheet.innerHTML = `
      #heygen-streaming-embed {
        z-index: 9999;
        position: fixed;
        right: 40px;
        bottom: 40px;
        width: 200px;
        height: 200px;
        border-radius: 50%;
        border: 2px solid #fff;
        box-shadow: 0px 8px 24px 0px rgba(0, 0, 0, 0.12);
        transition: all linear 0.1s;
        overflow: hidden;
        opacity: 0;
        visibility: hidden;
      }
      #heygen-streaming-embed.show {
        opacity: 1;
        visibility: visible;
      }
      #heygen-streaming-embed.expand {
        ${clientWidth < 540 ? "height: 266px; width: 96%; right: 50%; transform: translateX(50%);" : "height: 366px; width: calc(366px * 16 / 9);"}
        border: 0;
        border-radius: 8px;
      }
      #heygen-streaming-container {
        width: 100%;
        height: 100%;
      }
      #heygen-streaming-container iframe {
        width: 100%;
        height: 100%;
        border: 0;
      }
    `;
    const iframe = document.createElement("iframe");
    iframe.allowFullscreen = false;
    iframe.title = "Streaming Embed";
    iframe.role = "dialog";
    iframe.allow = "microphone";
    iframe.src = url;
    let visible = false;
    let initial = false;

    window.addEventListener("message", (e) => {
      if (e.origin === host && e.data && e.data.type && e.data.type === "streaming-embed") {
        if (e.data.action === "init") {
          initial = true;
          wrapDiv.classList.toggle("show", initial);
        } else if (e.data.action === "show") {
          visible = true;
          wrapDiv.classList.toggle("expand", visible);
        } else if (e.data.action === "hide") {
          visible = false;
          wrapDiv.classList.toggle("expand", visible);
        }
      }
    });

    container.appendChild(iframe);
    wrapDiv.appendChild(stylesheet);
    wrapDiv.appendChild(container);
    document.body.appendChild(wrapDiv);

    return () => {
      if (document.body.contains(wrapDiv)) {
        document.body.removeChild(wrapDiv);
      }
    };
  }, []);

  return (
    <div className="ai-waiter-container">
      <div className="ai-waiter-label">Your AI Waiter</div>
    </div>
  );
};

export default AIWaiter; 