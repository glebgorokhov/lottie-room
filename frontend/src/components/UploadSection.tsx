import Button from "./Button.tsx";

export default function UploadSection() {
  return (
    <div className="">
      <div>
        <h1 className="text-8xl font-semibold text-t-text">
          Free playground for your animations
        </h1>
        <p className="text-xl mt-5">
          Upload your JSON file, play with settings and discuss the changes with
          the team
        </p>
        <Button
          type="button"
          title="Upload the animation JSON"
          roundedClass="rounded-xl"
          className="mt-6"
          themeClass="theme-brand-tint hover:theme-brand"
          size={12}
          preIcon="ri:upload-line"
        />
      </div>
    </div>
  );
}
