import Image from "next/image";

export default function Loading() {
  return (
    <>
      <style>{`
        @keyframes fadeIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }
        @keyframes pulseFloat {
          0%, 100% {
            transform: translateY(0);
            opacity: 1;
          }
          50% {
            transform: translateY(-8px);
            opacity: 0.8;
          }
        }
        @keyframes linearRotate {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .custom-loader-fade {
          animation: fadeIn 0.3s ease-out forwards;
        }
        .custom-loader-pulse {
          animation: pulseFloat 3s ease-in-out infinite;
        }
        .custom-loader-rotate {
          animation: linearRotate 1.5s linear infinite;
        }
      `}</style>
      <div
        className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-background custom-loader-fade"
        role="status"
        aria-label="Loading"
      >
        {/* Main Illustration Container */}
        <div className="relative w-[240px] sm:w-[300px] md:w-[340px] aspect-square custom-loader-pulse">
          <Image
            src="/foodcanvas-loader2.png"
            alt="Loading FoodCanvas..."
            fill
            sizes="(max-width: 640px) 240px, (max-width: 768px) 300px, 340px"
            className="object-contain"
            priority
            style={{ clipPath: 'inset(0 0 18% 0)' }}
          />

          {/* Place the new spinner exactly in the cropped space using absolute positioning */}
          <div className="absolute bottom-[-10%] left-0 right-0 z-10 flex flex-col items-center justify-start gap-3">
            {/* Custom FoodCanvas Leaf Spinner */}
            <div className="relative w-[38px] h-[38px] custom-loader-rotate shrink-0 mt-[10px]">
              {[...Array(8)].map((_, i) => (
                <div
                  key={i}
                  className="absolute top-0 left-0 w-full h-full"
                  style={{ transform: `rotate(${i * 45}deg)` }}
                >
                  <div
                    className="mx-auto bg-[#2E5C2A]"
                    style={{
                      width: "7px",
                      height: "7px",
                      opacity: i === 0 ? 1 : Math.max(0.2, (i / 8) * 0.8 + 0.2),
                      borderRadius: "50% 0 50% 50%",
                      transform: "rotate(45deg)",
                    }}
                  />
                </div>
              ))}
            </div>

            {/* Static Loading Text */}
            <p className="text-[#6b7280] text-[13px] font-medium tracking-wide">
              Loading...
            </p>
          </div>
        </div>
      </div>
    </>
  );
}
