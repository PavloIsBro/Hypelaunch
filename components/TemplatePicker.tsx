import { LANDING_TEMPLATES, type LandingTemplateId } from "@/lib/templates";

type TemplatePickerProps = {
  selectedId: LandingTemplateId;
  onSelect: (id: LandingTemplateId) => void;
  disabled?: boolean;
};

export function TemplatePicker({ selectedId, onSelect, disabled }: TemplatePickerProps) {
  return (
    <div className="space-y-3">
      <div>
        <h3 className="text-sm font-semibold text-white">Landing template</h3>
        <p className="mt-0.5 text-xs text-zinc-500">Choose a layout for your Extra landing preview</p>
      </div>
      <div className="grid gap-3 sm:grid-cols-2">
        {LANDING_TEMPLATES.map((template) => {
          const selected = template.id === selectedId;
          return (
            <button
              key={template.id}
              type="button"
              disabled={disabled}
              onClick={() => onSelect(template.id)}
              className={[
                "rounded-xl border p-4 text-left transition",
                selected
                  ? "border-violet-400/50 bg-violet-500/10 shadow-[0_0_24px_-12px_rgba(167,139,250,0.55)]"
                  : "border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.04]",
                disabled ? "cursor-not-allowed opacity-50" : "",
              ].join(" ")}
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-sm font-semibold text-white">{template.name}</p>
                {selected ? (
                  <span className="rounded-full border border-violet-400/30 bg-violet-500/15 px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider text-violet-200">
                    Selected
                  </span>
                ) : null}
              </div>
              <p className="mt-1.5 text-xs leading-relaxed text-zinc-500">{template.description}</p>
            </button>
          );
        })}
      </div>
    </div>
  );
}
