import { createContext, useCallback, useContext, useEffect, useState, ReactNode } from "react";
import { cars as staticCars, fetchCars } from "../data/cars";

interface CarsContextValue {
  cars: any[];
  loading: boolean;
  reload: () => void;
}

const CarsContext = createContext<CarsContextValue>({
  cars: staticCars,
  loading: false,
  reload: () => {},
});

export function CarsProvider({ children }: { children: ReactNode }) {
  // Khởi tạo bằng dữ liệu tĩnh để trang hiển thị ngay, rồi thay bằng dữ liệu CSDL.
  const [list, setList] = useState<any[]>(staticCars);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(() => {
    setLoading(true);
    fetchCars()
      .then((merged) => setList(merged))
      .finally(() => setLoading(false));
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  return (
    <CarsContext.Provider value={{ cars: list, loading, reload }}>
      {children}
    </CarsContext.Provider>
  );
}

export function useCars() {
  return useContext(CarsContext);
}
