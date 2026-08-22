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

export interface NavLeaf {
  id: string;
  label: string;
  icon: LucideIcon;
}

export interface NavGroup {
  id: string;
  label: string;
  icon: LucideIcon;
  children: { id: string; label: string }[];
}

export type NavEntry = NavLeaf | NavGroup;

export function isNavGroup(entry: NavEntry): entry is NavGroup {
  return "children" in entry;
}

// This is the config-driven half of the demo: the headless Menu.* components
// only ever see JSX, but nothing stops a consumer from mapping data into that
// JSX — this array is what gets turned into <Menu.Item>/<Menu.Group> below.
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
  { id: "/reports", label: "Reports", icon: BarChart3 },
  { id: "/tender", label: "Tender", icon: Percent },
  { id: "/settings", label: "Settings", icon: Settings },
  { id: "/knowledge-base", label: "Knowledge Base", icon: HelpCircle },
];
