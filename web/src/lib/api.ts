// Client gọi API thuê xe (PHP). Dev: Vite proxy "/api" -> http://localhost:8000
const BASE = "/api";

export interface ApiUser {
  maNguoiDung: string;
  fullName: string;
  phone: string;
  email: string;
  idNumber: string;
  driverLicense: string;
  role: "khach" | "admin";
}

export interface Service {
  id: string;
  name: string;
  price: number;
  description: string;
}

export interface OrderService {
  madv: string;
  ten: string;
  soLuong: number;
  gia: number;
}

export interface OrderCustomer {
  fullName: string;
  idNumber?: string;
  phone?: string;
  email: string;
  address?: string;
  driverLicense?: string;
}

export interface CreateOrderInput {
  carId: string;
  customer: OrderCustomer;
  startDate?: string;
  rentDays?: number;
  rentTotal?: number;
  deposit?: number;
  contractNo?: string;
  paymentMethod?: string;
  paid?: boolean;
  services?: { madv: string; soLuong?: number }[];
}

export interface RentalOrder {
  maDatXe: string;
  maXe: string;
  tenXe: string;
  hinhAnh: string | null;
  loaiXe: string;
  mau: string;
  trangThai: string;
  ngayNhan: string;
  ngayTra: string;
  ngayTaoDon: string;
  tongTien: number;
  pttt: string | null;
  trangThaiThanhToan: string | null;
  soTienTra: number | null;
  thoiGianThanhToan: string | null;
  services: OrderService[];
}

export interface AdminOrder extends RentalOrder {
  maNguoiDung: string;
  hoTen: string;
  email: string;
  sdt: string;
}

export interface AdminCar {
  maXe: string;
  tenXe: string;
  loaiXe: string;
  phanLoai: "oto" | "xemay";
  mau: string;
  bienSo: string;
  odo: number;
  trangThai: string;
  giaNgay: number;
  datCoc: number;
  hinhAnh: string | null;
  moTa: string | null;
  soDon: number;
}

export interface CarInput {
  maXe?: string;
  tenXe: string;
  loaiXe: string;
  phanLoai?: "oto" | "xemay";
  mau: string;
  bienSo: string;
  odo?: number;
  trangThai?: string;
  giaNgay: number;
  datCoc?: number;
  hinhAnh?: string;
  moTa?: string;
}

export interface AdminPayment {
  maThanhToan: string;
  maDatXe: string;
  pttt: string;
  maGiaoDich: string | null;
  trangThai: string;
  soTien: number;
  thoiGian: string | null;
  hoTen: string;
  tenXe: string;
}

async function req<T>(path: string, init?: RequestInit): Promise<T> {
  let adminEmail = "";
  try {
    adminEmail = JSON.parse(localStorage.getItem("ktshowroom_user") || "{}")?.email || "";
  } catch {
    /* ignore */
  }
  const res = await fetch(BASE + path, {
    headers: {
      "Content-Type": "application/json",
      ...(adminEmail ? { "X-User-Email": adminEmail } : {}),
    },
    ...init,
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error((data as any)?.error || `Lỗi API (${res.status})`);
  return data as T;
}

// ---- Tài khoản ----
export function authLogin(email: string, password: string) {
  return req<{ user: ApiUser }>("/auth/login", {
    method: "POST",
    body: JSON.stringify({ email, password }),
  });
}

export function authRegister(input: {
  fullName: string;
  email: string;
  password?: string;
  phone?: string;
  idNumber?: string;
  driverLicense?: string;
}) {
  return req<{ user: ApiUser }>("/auth/register", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

// ---- Danh mục ----
export function getServices() {
  return req<{ services: Service[] }>("/services");
}

// ---- Đơn thuê (khách) ----
export function createOrder(input: CreateOrderInput) {
  return req<{
    ok: boolean;
    maDatXe: string;
    trangThai: string;
    tienThue: number;
    tienDichVu: number;
    tongTien: number;
    datCoc: number;
    services: OrderService[];
  }>("/orders", { method: "POST", body: JSON.stringify(input) });
}

export function getOrders(email: string) {
  return req<{ orders: RentalOrder[] }>(`/orders?email=${encodeURIComponent(email)}`);
}

export function cancelOrder(maDatXe: string, email: string) {
  return req<{ ok: boolean; maDatXe: string; trangThai: string }>("/orders/cancel", {
    method: "POST",
    body: JSON.stringify({ maDatXe, email }),
  });
}

// ---- Quản trị ----
export function adminGetOrders() {
  return req<{ orders: AdminOrder[] }>("/admin/orders");
}

export function adminSetOrderStatus(maDatXe: string, trangThai: string) {
  return req<{ ok: boolean }>("/admin/orders/status", {
    method: "POST",
    body: JSON.stringify({ maDatXe, trangThai }),
  });
}

export function adminGetCars() {
  return req<{ cars: AdminCar[] }>("/admin/cars");
}

export function adminSetCarStatus(maXe: string, trangThai: string) {
  return req<{ ok: boolean }>("/admin/cars/status", {
    method: "POST",
    body: JSON.stringify({ maXe, trangThai }),
  });
}

export function adminSaveCar(input: CarInput) {
  return req<{ ok: boolean; maXe: string; created: boolean }>("/admin/cars/save", {
    method: "POST",
    body: JSON.stringify(input),
  });
}

export function adminDeleteCar(maXe: string) {
  return req<{ ok: boolean; maXe: string; deleted: boolean }>("/admin/cars/delete", {
    method: "POST",
    body: JSON.stringify({ maXe }),
  });
}

export function adminGetPayments() {
  return req<{ payments: AdminPayment[] }>("/admin/payments");
}
