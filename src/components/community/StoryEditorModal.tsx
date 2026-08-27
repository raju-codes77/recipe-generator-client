import React, { useEffect, useRef, useState } from "react";
import { AnimatePresence, motion } from "motion/react";
import { Crop, Eraser, Pencil, RotateCcw, Send, Type, X } from "lucide-react";

type EditorTool = "crop" | "draw" | "text";
type ImageFit = "cover" | "contain";
type TextStyle = "transparent" | "background" | "outline";
type FontStyle = "classic" | "strong" | "elegant" | "playful";

interface Point {
  x: number;
  y: number;
}

interface Stroke {
  color: string;
  size: number;
  points: Point[];
}

interface StoryEditorModalProps {
  file: File | null;
  isOpen: boolean;
  onClose: () => void;
  onShare: (file: File, caption: string) => Promise<void>;
}

const STORY_WIDTH = 1080;
const STORY_HEIGHT = 1920;
const PREVIEW_WIDTH = 540;
const PREVIEW_HEIGHT = 960;
const PENCIL_CURSOR =
  'url("data:image/svg+xml,%3Csvg xmlns=%27http://www.w3.org/2000/svg%27 width=%2728%27 height=%2728%27 viewBox=%270 0 24 24%27 fill=%27none%27 stroke=%27%232F8F46%27 stroke-width=%272%27 stroke-linecap=%27round%27 stroke-linejoin=%27round%27%3E%3Cpath d=%27M12 20h9%27/%3E%3Cpath d=%27M16.5 3.5a2.1 2.1 0 0 1 3 3L7 19l-4 1 1-4Z%27/%3E%3C/svg%3E") 3 24, pointer';
const FONT_STYLES: Record<FontStyle, { label: string; family: string; weight: number }> = {
  classic: { label: "Classic", family: "Arial, sans-serif", weight: 800 },
  strong: { label: "Strong", family: "Impact, Arial Black, sans-serif", weight: 900 },
  elegant: { label: "Elegant", family: "Georgia, serif", weight: 700 },
  playful: { label: "Playful", family: "Trebuchet MS, Arial, sans-serif", weight: 800 },
};

function drawStory(
  context: CanvasRenderingContext2D,
  width: number,
  height: number,
  image: HTMLImageElement,
  imageFit: ImageFit,
  frameBackground: string,
  zoom: number,
  pan: Point,
  strokes: Stroke[],
  text: string,
  textColor: string,
  textPoint: Point,
  textStyle: TextStyle,
  textBackdropColor: string,
  fontStyle: FontStyle,
) {
  context.clearRect(0, 0, width, height);
  context.fillStyle = frameBackground === "blur" ? "#111827" : frameBackground;
  context.fillRect(0, 0, width, height);

  const baseScale = (imageFit === "cover" ? Math.max : Math.min)(
    width / image.naturalWidth,
    height / image.naturalHeight,
  );
  const imageScale = baseScale * zoom;
  const imageWidth = image.naturalWidth * imageScale;
  const imageHeight = image.naturalHeight * imageScale;
  const imageX = (width - imageWidth) / 2 + pan.x * width;
  const imageY = (height - imageHeight) / 2 + pan.y * height;
  if (imageFit === "contain" && frameBackground === "blur") {
    const blurScale = Math.max(width / image.naturalWidth, height / image.naturalHeight);
    const blurWidth = image.naturalWidth * blurScale;
    const blurHeight = image.naturalHeight * blurScale;
    context.save();
    context.filter = `blur(${Math.max(18, width * 0.04)}px)`;
    context.drawImage(image, (width - blurWidth) / 2, (height - blurHeight) / 2, blurWidth, blurHeight);
    context.restore();
    context.fillStyle = "rgba(0, 0, 0, 0.25)";
    context.fillRect(0, 0, width, height);
  }
  context.drawImage(image, imageX, imageY, imageWidth, imageHeight);

  context.lineCap = "round";
  context.lineJoin = "round";
  strokes.forEach((stroke) => {
    if (stroke.points.length < 2) return;
    context.beginPath();
    context.strokeStyle = stroke.color;
    context.lineWidth = stroke.size * (width / PREVIEW_WIDTH);
    context.moveTo(stroke.points[0].x * width, stroke.points[0].y * height);
    stroke.points.slice(1).forEach((point) => context.lineTo(point.x * width, point.y * height));
    context.stroke();
  });

  const trimmedText = text.trim();
  if (!trimmedText) return;

  const fontSize = Math.round(width * 0.07);
  const selectedFont = FONT_STYLES[fontStyle];
  context.font = `${selectedFont.weight} ${fontSize}px ${selectedFont.family}`;
  context.textAlign = "center";
  context.textBaseline = "middle";
  const maxLineWidth = width * 0.8;
  const words = trimmedText.split(/\s+/);
  const lines: string[] = [];
  let line = "";
  words.forEach((word) => {
    const nextLine = line ? `${line} ${word}` : word;
    if (context.measureText(nextLine).width > maxLineWidth && line) {
      lines.push(line);
      line = word;
      return;
    }
    line = nextLine;
  });
  if (line) lines.push(line);

  const lineHeight = fontSize * 1.16;
  const startY = height * textPoint.y - ((lines.length - 1) * lineHeight) / 2;
  const widestLine = Math.max(...lines.map((currentLine) => context.measureText(currentLine).width));
  const blockHeight = lines.length * lineHeight;
  const textX = width * textPoint.x;
  const horizontalPadding = width * 0.035;
  const verticalPadding = width * 0.02;
  if (textStyle === "background") {
    context.fillStyle = textBackdropColor;
    context.globalAlpha = 0.86;
    context.beginPath();
    context.roundRect(
      textX - widestLine / 2 - horizontalPadding,
      startY - lineHeight / 2 - verticalPadding,
      widestLine + horizontalPadding * 2,
      blockHeight + verticalPadding * 2,
      width * 0.02,
    );
    context.fill();
    context.globalAlpha = 1;
  }
  context.lineWidth = textStyle === "outline" ? Math.max(5, width * 0.012) : Math.max(4, width * 0.008);
  context.strokeStyle = textStyle === "outline" ? textBackdropColor : "rgba(0, 0, 0, 0.55)";
  context.fillStyle = textColor;
  lines.forEach((currentLine, index) => {
    const y = startY + index * lineHeight;
    context.strokeText(currentLine, textX, y);
    context.fillText(currentLine, textX, y);
  });
}

export const StoryEditorModal: React.FC<StoryEditorModalProps> = ({ file, isOpen, onClose, onShare }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const imageRef = useRef<HTMLImageElement | null>(null);
  const dragStartRef = useRef<Point | null>(null);
  const isDraggingTextRef = useRef(false);
  const [imageReady, setImageReady] = useState(false);
  const [tool, setTool] = useState<EditorTool>("crop");
  const [imageFit, setImageFit] = useState<ImageFit>("cover");
  const [frameBackground, setFrameBackground] = useState("#111827");
  const [zoom, setZoom] = useState(1);
  const [pan, setPan] = useState<Point>({ x: 0, y: 0 });
  const [strokes, setStrokes] = useState<Stroke[]>([]);
  const [brushColor, setBrushColor] = useState("#ffffff");
  const [brushSize, setBrushSize] = useState(5);
  const [storyText, setStoryText] = useState("");
  const [textColor, setTextColor] = useState("#ffffff");
  const [textPoint, setTextPoint] = useState<Point>({ x: 0.5, y: 0.82 });
  const [textStyle, setTextStyle] = useState<TextStyle>("transparent");
  const [textBackdropColor, setTextBackdropColor] = useState("#2563eb");
  const [fontStyle, setFontStyle] = useState<FontStyle>("classic");
  const [isSharing, setIsSharing] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!file) return;
    const objectUrl = URL.createObjectURL(file);
    const image = new Image();
    image.onload = () => {
      imageRef.current = image;
      setImageFit(image.naturalWidth > image.naturalHeight ? "contain" : "cover");
      setImageReady(true);
    };
    image.onerror = () => setError("This image could not be opened. Please choose another image.");
    image.src = objectUrl;

    return () => {
      URL.revokeObjectURL(objectUrl);
      imageRef.current = null;
      setImageReady(false);
    };
  }, [file]);

  useEffect(() => {
    if (!isOpen || !canvasRef.current || !imageRef.current || !imageReady) return;
    const context = canvasRef.current.getContext("2d");
    if (!context) return;
    drawStory(
      context,
      PREVIEW_WIDTH,
      PREVIEW_HEIGHT,
      imageRef.current,
      imageFit,
      frameBackground,
      zoom,
      pan,
      strokes,
      storyText,
      textColor,
      textPoint,
      textStyle,
      textBackdropColor,
      fontStyle,
    );
  }, [
    fontStyle,
    frameBackground,
    imageFit,
    imageReady,
    isOpen,
    pan,
    storyText,
    strokes,
    textBackdropColor,
    textColor,
    textPoint,
    textStyle,
    zoom,
  ]);

  useEffect(() => {
    if (!isOpen) return;
    setTool("crop");
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setStrokes([]);
    setStoryText("");
    setTextPoint({ x: 0.5, y: 0.82 });
    setTextStyle("transparent");
    setTextBackdropColor("#2563eb");
    setFontStyle("classic");
    setError(null);
  }, [file, isOpen]);

  const getPoint = (event: React.PointerEvent<HTMLCanvasElement>): Point => {
    const bounds = event.currentTarget.getBoundingClientRect();
    return {
      x: Math.min(1, Math.max(0, (event.clientX - bounds.left) / bounds.width)),
      y: Math.min(1, Math.max(0, (event.clientY - bounds.top) / bounds.height)),
    };
  };

  const handlePointerDown = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!imageReady) return;
    event.currentTarget.setPointerCapture(event.pointerId);
    const point = getPoint(event);
    if (tool === "draw") {
      setStrokes((current) => [...current, { color: brushColor, size: brushSize, points: [point] }]);
      return;
    }
    if (tool === "text" && storyText.trim()) {
      isDraggingTextRef.current = true;
      setTextPoint(point);
      return;
    }
    dragStartRef.current = point;
  };

  const handlePointerMove = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (!event.currentTarget.hasPointerCapture(event.pointerId)) return;
    const point = getPoint(event);
    if (tool === "draw") {
      setStrokes((current) => {
        if (!current.length) return current;
        const updated = [...current];
        updated[updated.length - 1] = {
          ...updated[updated.length - 1],
          points: [...updated[updated.length - 1].points, point],
        };
        return updated;
      });
      return;
    }
    if (tool === "text" && isDraggingTextRef.current) {
      setTextPoint(point);
      return;
    }
    if (!dragStartRef.current) return;
    const previousPoint = dragStartRef.current;
    setPan((current) => ({
      x: Math.min(0.5, Math.max(-0.5, current.x + point.x - previousPoint.x)),
      y: Math.min(0.5, Math.max(-0.5, current.y + point.y - previousPoint.y)),
    }));
    dragStartRef.current = point;
  };

  const handlePointerUp = (event: React.PointerEvent<HTMLCanvasElement>) => {
    if (event.currentTarget.hasPointerCapture(event.pointerId))
      event.currentTarget.releasePointerCapture(event.pointerId);
    dragStartRef.current = null;
    isDraggingTextRef.current = false;
  };

  const resetEditor = () => {
    setZoom(1);
    setPan({ x: 0, y: 0 });
    setImageFit(
      imageRef.current && imageRef.current.naturalWidth > imageRef.current.naturalHeight ? "contain" : "cover",
    );
    setFrameBackground("#111827");
    setStrokes([]);
    setStoryText("");
    setTextPoint({ x: 0.5, y: 0.82 });
    setTextStyle("transparent");
    setTextBackdropColor("#2563eb");
    setFontStyle("classic");
  };

  const handleShare = async () => {
    if (!file || !imageRef.current) return;
    setError(null);
    setIsSharing(true);
    try {
      const outputCanvas = document.createElement("canvas");
      outputCanvas.width = STORY_WIDTH;
      outputCanvas.height = STORY_HEIGHT;
      const context = outputCanvas.getContext("2d");
      if (!context) throw new Error("Unable to prepare the story image.");
      drawStory(
        context,
        STORY_WIDTH,
        STORY_HEIGHT,
        imageRef.current,
        imageFit,
        frameBackground,
        zoom,
        pan,
        strokes,
        storyText,
        textColor,
        textPoint,
        textStyle,
        textBackdropColor,
        fontStyle,
      );
      const outputBlob = await new Promise<Blob>((resolve, reject) => {
        outputCanvas.toBlob(
          (blob) => (blob ? resolve(blob) : reject(new Error("Unable to create the edited image."))),
          "image/jpeg",
          0.88,
        );
      });
      if (outputBlob.size > 6 * 1024 * 1024)
        throw new Error("The edited image is too large. Try a smaller photo or less drawing.");
      const editedFile = new File([outputBlob], `${file.name.replace(/\.[^.]+$/, "") || "foodcanvas-story"}.jpg`, {
        type: "image/jpeg",
      });
      await onShare(editedFile, storyText.trim() || "Shared a kitchen story");
      onClose();
    } catch (shareError) {
      setError(shareError instanceof Error ? shareError.message : "Unable to share this story.");
    } finally {
      setIsSharing(false);
    }
  };

  return (
    <AnimatePresence>
      {isOpen && file && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-60 flex items-center justify-center bg-black/75 p-3 backdrop-blur-sm sm:p-6"
          role="dialog"
          aria-modal="true"
          aria-label="Edit your Community story"
        >
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.98 }}
            className="flex max-h-[94vh] w-full max-w-5xl flex-col overflow-hidden rounded-3xl border border-emerald-200 bg-white shadow-2xl dark:border-emerald-900/60 dark:bg-[#121212]"
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4 dark:border-neutral-800 sm:px-6">
              <div>
                <p className="text-sm font-extrabold text-neutral-900 dark:text-white">Create your story</p>
                <p className="mt-0.5 text-xs text-neutral-500 dark:text-neutral-400">
                  Crop, draw, and add a message before you share.
                </p>
              </div>
              <button
                onClick={onClose}
                disabled={isSharing}
                className="rounded-full p-2 text-neutral-500 transition hover:bg-neutral-100 dark:hover:bg-neutral-800"
                aria-label="Cancel story editing"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="grid min-h-0 flex-1 gap-5 overflow-y-auto p-4 sm:p-6 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div className="flex min-h-[420px] items-center justify-center rounded-2xl bg-neutral-950 p-3 sm:p-5">
                <canvas
                  ref={canvasRef}
                  width={PREVIEW_WIDTH}
                  height={PREVIEW_HEIGHT}
                  onPointerDown={handlePointerDown}
                  onPointerMove={handlePointerMove}
                  onPointerUp={handlePointerUp}
                  onPointerCancel={handlePointerUp}
                  style={{ cursor: tool === "draw" ? PENCIL_CURSOR : tool === "text" ? "move" : "grab" }}
                  className="max-h-[62vh] w-auto max-w-full touch-none rounded-xl shadow-2xl"
                />
              </div>

              <div className="space-y-4">
                <div className="grid grid-cols-3 gap-2 rounded-2xl bg-neutral-100 p-1.5 dark:bg-neutral-900">
                  <button
                    onClick={() => setTool("crop")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${tool === "crop" ? "bg-white text-[#176B35] shadow-sm dark:bg-[#242424] dark:text-[#B7E35F]" : "text-neutral-500 dark:text-neutral-400"}`}
                  >
                    <Crop className="h-4 w-4" /> Crop
                  </button>
                  <button
                    onClick={() => setTool("draw")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${tool === "draw" ? "bg-white text-[#176B35] shadow-sm dark:bg-[#242424] dark:text-[#B7E35F]" : "text-neutral-500 dark:text-neutral-400"}`}
                  >
                    <Pencil className="h-4 w-4" /> Draw
                  </button>
                  <button
                    onClick={() => setTool("text")}
                    className={`flex items-center justify-center gap-2 rounded-xl px-3 py-2 text-xs font-bold transition ${tool === "text" ? "bg-white text-[#176B35] shadow-sm dark:bg-[#242424] dark:text-[#B7E35F]" : "text-neutral-500 dark:text-neutral-400"}`}
                  >
                    <Type className="h-4 w-4" /> Text
                  </button>
                </div>

                {tool === "crop" ? (
                  <div className="rounded-2xl border border-slate-200 p-4 dark:border-neutral-800">
                    <div className="flex items-center justify-between text-xs font-bold text-neutral-700 dark:text-neutral-200">
                      <span>{imageFit === "contain" ? "Fit and position" : "Crop and position"}</span>
                      <span>{Math.round(zoom * 100)}%</span>
                    </div>
                    <input
                      aria-label="Crop zoom"
                      type="range"
                      min="1"
                      max="2.4"
                      step="0.05"
                      value={zoom}
                      onChange={(event) => setZoom(Number(event.target.value))}
                      className="mt-3 w-full accent-[#2F8F46]"
                    />
                    <div className="mt-3 grid grid-cols-2 gap-2">
                      <button
                        onClick={() => setImageFit("contain")}
                        className={`rounded-lg px-2 py-2 text-[11px] font-bold transition ${imageFit === "contain" ? "bg-[#EAF7E8] text-[#176B35] dark:bg-emerald-950/60 dark:text-[#B7E35F]" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"}`}
                      >
                        Show full image
                      </button>
                      <button
                        onClick={() => setImageFit("cover")}
                        className={`rounded-lg px-2 py-2 text-[11px] font-bold transition ${imageFit === "cover" ? "bg-[#EAF7E8] text-[#176B35] dark:bg-emerald-950/60 dark:text-[#B7E35F]" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"}`}
                      >
                        Fill story frame
                      </button>
                    </div>
                    {imageFit === "contain" && (
                      <div className="mt-3">
                        <p className="text-[11px] font-bold text-neutral-600 dark:text-neutral-300">Frame background</p>
                        <div className="mt-2 flex flex-wrap gap-2">
                          {[
                            ["blur", "Blur"],
                            ["#111827", "Black"],
                            ["#ffffff", "White"],
                            ["#176B35", "Green"],
                          ].map(([value, label]) => (
                            <button
                              key={value}
                              onClick={() => setFrameBackground(value)}
                              className={`rounded-full px-3 py-1.5 text-[10px] font-bold transition ${frameBackground === value ? "bg-[#2F8F46] text-white" : "border border-slate-200 text-neutral-600 dark:border-neutral-700 dark:text-neutral-300"}`}
                            >
                              {label}
                            </button>
                          ))}
                        </div>
                      </div>
                    )}
                    <p className="mt-3 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      Landscape photos use “Show full image” by default. Drag the photo to position it.
                    </p>
                  </div>
                ) : tool === "draw" ? (
                  <div className="rounded-2xl border border-slate-200 p-4 dark:border-neutral-800">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-neutral-700 dark:text-neutral-200">Brush</span>
                      <button
                        onClick={() => setStrokes([])}
                        className="inline-flex items-center gap-1 text-[11px] font-bold text-rose-600 hover:underline"
                      >
                        <Eraser className="h-3.5 w-3.5" /> Clear
                      </button>
                    </div>
                    <div className="mt-3 flex items-center gap-3">
                      <input
                        aria-label="Brush color"
                        type="color"
                        value={brushColor}
                        onChange={(event) => setBrushColor(event.target.value)}
                        className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                      />
                      <input
                        aria-label="Brush size"
                        type="range"
                        min="2"
                        max="18"
                        value={brushSize}
                        onChange={(event) => setBrushSize(Number(event.target.value))}
                        className="flex-1 accent-[#2F8F46]"
                      />
                    </div>
                  </div>
                ) : null}

                {tool === "text" ? (
                  <div className="rounded-2xl border border-slate-200 p-4 dark:border-neutral-800">
                    <div className="flex items-center gap-2 text-xs font-bold text-neutral-700 dark:text-neutral-200">
                      <Type className="h-4 w-4 text-[#2F8F46]" /> Add and move text
                    </div>
                    <textarea
                      value={storyText}
                      onChange={(event) => setStoryText(event.target.value.slice(0, 120))}
                      placeholder="Write something about your dish..."
                      rows={3}
                      className="mt-3 w-full resize-none rounded-xl border border-slate-200 bg-neutral-50 p-3 text-xs text-neutral-900 outline-none focus:border-[#2F8F46] dark:border-neutral-700 dark:bg-neutral-900 dark:text-white"
                    />
                    <div className="mt-3 flex items-center justify-between gap-2">
                      <span className="text-[11px] font-bold text-neutral-500 dark:text-neutral-400">Text colour</span>
                      <input
                        aria-label="Text color"
                        type="color"
                        value={textColor}
                        onChange={(event) => setTextColor(event.target.value)}
                        className="h-8 w-10 cursor-pointer rounded border-0 bg-transparent"
                      />
                    </div>
                    <p className="mt-3 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">Font style</p>
                    <div className="mt-2 grid grid-cols-2 gap-2">
                      {(Object.entries(FONT_STYLES) as [FontStyle, (typeof FONT_STYLES)[FontStyle]][]).map(
                        ([value, style]) => (
                          <button
                            key={value}
                            onClick={() => setFontStyle(value)}
                            className={`rounded-lg px-2 py-2 text-[10px] font-bold transition ${fontStyle === value ? "bg-[#2F8F46] text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"}`}
                            style={{ fontFamily: style.family }}
                          >
                            {style.label}
                          </button>
                        ),
                      )}
                    </div>
                    <p className="mt-3 text-[11px] font-bold text-neutral-600 dark:text-neutral-300">Text style</p>
                    <div className="mt-2 grid grid-cols-3 gap-2">
                      {(
                        [
                          ["transparent", "Clear"],
                          ["background", "Box"],
                          ["outline", "Outline"],
                        ] as const
                      ).map(([value, label]) => (
                        <button
                          key={value}
                          onClick={() => setTextStyle(value)}
                          className={`rounded-lg px-2 py-2 text-[10px] font-bold transition ${textStyle === value ? "bg-[#2F8F46] text-white" : "bg-neutral-100 text-neutral-500 dark:bg-neutral-900 dark:text-neutral-400"}`}
                        >
                          {label}
                        </button>
                      ))}
                    </div>
                    <div className="mt-3 flex flex-wrap gap-2">
                      {["#ffffff", "#2563eb", "#2F8F46", "#FF9F43", "#111827"].map((color) => (
                        <button
                          key={color}
                          onClick={() => setTextBackdropColor(color)}
                          aria-label={`Use ${color} for the text background or border`}
                          className={`h-7 w-7 rounded-full border-2 transition ${textBackdropColor === color ? "border-[#2F8F46] scale-110" : "border-transparent"}`}
                          style={{ backgroundColor: color }}
                        />
                      ))}
                    </div>
                    <p className="mt-3 text-[11px] leading-relaxed text-neutral-500 dark:text-neutral-400">
                      Drag anywhere on the story preview to position the text exactly where you want it.
                    </p>
                  </div>
                ) : (
                  <div className="rounded-2xl border border-dashed border-slate-200 px-4 py-3 text-[11px] text-neutral-500 dark:border-neutral-800 dark:text-neutral-400">
                    Choose <span className="font-bold text-[#2F8F46] dark:text-[#B7E35F]">Text</span> to add a caption,
                    choose a background or outline, and move it on the image.
                  </div>
                )}

                <button
                  onClick={resetEditor}
                  disabled={isSharing}
                  className="flex w-full items-center justify-center gap-2 rounded-xl border border-slate-200 px-4 py-2.5 text-xs font-bold text-neutral-600 transition hover:bg-neutral-50 dark:border-neutral-700 dark:text-neutral-300 dark:hover:bg-neutral-900"
                >
                  <RotateCcw className="h-4 w-4" /> Reset edits
                </button>
                {error && (
                  <p className="rounded-xl bg-rose-50 px-3 py-2 text-xs font-semibold text-rose-600 dark:bg-rose-950/30 dark:text-rose-300">
                    {error}
                  </p>
                )}
              </div>
            </div>

            <div className="flex items-center justify-between gap-3 border-t border-slate-100 px-5 py-4 dark:border-neutral-800 sm:px-6">
              <button
                onClick={onClose}
                disabled={isSharing}
                className="rounded-xl px-4 py-2.5 text-xs font-bold text-neutral-600 transition hover:bg-neutral-100 dark:text-neutral-300 dark:hover:bg-neutral-800"
              >
                Cancel
              </button>
              <button
                onClick={() => void handleShare()}
                disabled={!imageReady || isSharing}
                className="inline-flex items-center gap-2 rounded-xl bg-[#2F8F46] px-5 py-2.5 text-xs font-bold text-white shadow-md shadow-emerald-800/15 transition hover:bg-[#176B35] disabled:cursor-not-allowed disabled:opacity-50"
              >
                <Send className="h-4 w-4" />
                {isSharing ? "Preparing story..." : "Share story"}
              </button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
