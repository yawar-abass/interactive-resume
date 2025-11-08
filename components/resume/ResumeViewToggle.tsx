import { Button } from "@/components/ui/button";
import { ResumeView } from "@/lib/types";

export default function ResumeViewToggle({
  view,
  setView,
}: {
  view: ResumeView;
  setView: (mode: ResumeView) => void;
}) {
  const modes: ResumeView[] = ["cards", "timeline", "table"];
  return (
    <div className="flex items-center justify-end bg-white/10 backdrop-blur-xl border border-gray-700/40 rounded-xl p-1">
      {modes.map((mode) => (
        <Button
          key={mode}
          variant="ghost"
          aria-pressed={view === mode}
          onClick={() => setView(mode)}
          className={`rounded-lg px-4 capitalize ${
            view === mode
              ? "bg-linear-to-r from-indigo-500 to-purple-600 text-white"
              : "text-gray-300 hover:bg-white/10"
          }`}
        >
          {mode}
        </Button>
      ))}
    </div>
  );
}
