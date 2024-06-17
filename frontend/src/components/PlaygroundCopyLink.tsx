import { Icon } from "@iconify/react";
import clsx from "clsx";
import { useState } from "react";
import { CopyToClipboard } from "react-copy-to-clipboard";

export default function PlaygroundCopyLink() {
  const [copied, setCopied] = useState(false);

  return (
    <CopyToClipboard text={location.href} onCopy={() => setCopied(true)}>
      <div
        className={clsx(
          "flex items-center gap-1.5 mt-1 -mb-1 transition-[color] cursor-pointer",
          {
            "theme-success text-t-bg hover:theme-success-tint": copied,
            "hover:text-t-text": !copied,
          }
        )}
      >
        <Icon icon={copied ? "ri:check-line" : "ri:link"} className="w-4 h-4" />
        <span>{copied ? "Link copied!" : "Copy link"}</span>
      </div>
    </CopyToClipboard>
  );
}
