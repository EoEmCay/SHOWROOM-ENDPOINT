import { useEffect, useState } from "react";
import { getServices, Service } from "../lib/api";
import { formatPrice } from "../data/cars";

interface ServicePickerProps {
  selectedIds: string[];
  onChange: (ids: string[]) => void;
  onLoaded?: (services: Service[]) => void;
  compact?: boolean;
}

export default function ServicePicker({ selectedIds, onChange, onLoaded, compact }: ServicePickerProps) {
  const [services, setServices] = useState<Service[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let alive = true;
    getServices()
      .then(({ services }) => {
        if (!alive) return;
        setServices(services);
        onLoaded?.(services);
      })
      .catch((e) => alive && setError(e?.message || "Không tải được dịch vụ."))
      .finally(() => alive && setLoading(false));
    return () => {
      alive = false;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const toggle = (id: string) => {
    onChange(
      selectedIds.includes(id) ? selectedIds.filter((x) => x !== id) : [...selectedIds, id]
    );
  };

  const total = services
    .filter((s) => selectedIds.includes(s.id))
    .reduce((sum, s) => sum + s.price, 0);

  return (
    <div className="bg-white border border-gray-200 p-6">
      <div className="flex items-center justify-between mb-1">
        <h3 className="font-display text-lg font-bold text-gray-900">Dịch vụ bổ sung</h3>
        {selectedIds.length > 0 && (
          <span className="text-[#ff003c] text-sm font-semibold">
            +{formatPrice(total)} ₫
          </span>
        )}
      </div>
      <p className="text-gray-500 text-xs mb-4">Chọn thêm dịch vụ đi kèm cho chuyến thuê (không bắt buộc).</p>

      {loading ? (
        <p className="text-gray-400 text-sm py-4">Đang tải dịch vụ…</p>
      ) : error ? (
        <p className="text-red-500 text-sm py-2">{error}</p>
      ) : (
        <div className={`grid gap-2 ${compact ? "" : "sm:grid-cols-2"} max-h-72 overflow-y-auto pr-1`}>
          {services.map((s) => {
            const on = selectedIds.includes(s.id);
            return (
              <label
                key={s.id}
                className={`flex items-start gap-3 p-3 border cursor-pointer transition-colors ${
                  on ? "border-[#ff003c] bg-[#ff003c]/5" : "border-gray-200 hover:border-gray-300"
                }`}
              >
                <input
                  type="checkbox"
                  checked={on}
                  onChange={() => toggle(s.id)}
                  className="mt-0.5 w-4 h-4 accent-[#ff003c] flex-shrink-0"
                />
                <span className="flex-1 min-w-0">
                  <span className="flex justify-between gap-2">
                    <span className="text-gray-900 text-sm font-medium">{s.name}</span>
                    <span className="text-gray-700 text-sm font-semibold whitespace-nowrap">
                      {s.price > 0 ? `${formatPrice(s.price)} ₫` : "Miễn phí"}
                    </span>
                  </span>
                  <span className="block text-gray-400 text-xs mt-0.5 line-clamp-2">{s.description}</span>
                </span>
              </label>
            );
          })}
        </div>
      )}
    </div>
  );
}
