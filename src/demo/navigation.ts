import {
  Archive,
  BarChart3,
  CheckSquare,
  CreditCard,
  HelpCircle,
  Percent,
  Settings,
  ShoppingCart,
  Ticket,
  TrendingUp,
  Users,
  type LucideIcon,
} from "lucide-react";

export type Role = "admin" | "manager";

export interface NavLeaf {
  id: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
}

export interface NavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  roles?: Role[];
  children: { id: string; label: string }[];
}

export type NavEntry = NavLeaf | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

export const navigation: NavEntry[] = [
  { id: "/trends", label: "Trends", icon: TrendingUp },
  { id: "/tasks", label: "Tasks", icon: CheckSquare },
  { id: "/tickets", label: "Tickets", icon: Ticket },
  { id: "/payments", label: "Payments", icon: CreditCard },
  {
    id: "clients",
    label: "Clients",
    icon: Users,
    children: [
      { id: "/clients/list", label: "List" },
      { id: "/clients/reviews", label: "Reviews" },
      { id: "/clients/notifications", label: "Notifications" },
    ],
  },
  {
    id: "inventory",
    label: "Inventory",
    icon: Archive,
    children: [
      { id: "/inventory/products", label: "Products" },
      { id: "/inventory/orders", label: "Orders" },
      { id: "/inventory/suppliers", label: "Suppliers" },
    ],
  },
  { id: "/shop", label: "Shop", icon: ShoppingCart },
  { id: "/reports", label: "Reports", icon: BarChart3, roles: ["admin"] },
  { id: "/tender", label: "Tender", icon: Percent, roles: ["admin"] },
  { id: "/settings", label: "Settings", icon: Settings, roles: ["admin"] },
  { id: "/knowledge-base", label: "Knowledge Base", icon: HelpCircle },
];

export function navigationForRole(role: Role): NavEntry[] {
  return navigation.filter((entry) => !entry.roles || entry.roles.includes(role));
}

export function findNavLabel(id: string | undefined): string {
  if (!id) return "";
  for (const entry of navigation) {
    if (entry.id === id) return entry.label;
    if (isNavGroup(entry)) {
      const child = entry.children.find((c) => c.id === id);
      if (child) return `${entry.label} / ${child.label}`;
    }
  }
  return id;
}

export function getRoutableIds(entries: NavEntry[]): string[] {
  return entries.flatMap((entry) => (isNavGroup(entry) ? entry.children.map((child) => child.id) : [entry.id]));
}
