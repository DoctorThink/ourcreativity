
import { LucideIcon } from "lucide-react";

export interface NavItem {
  name: string;
  path: string;
  icon: LucideIcon;
  type: 'main' | 'info' | 'cta';
  description?: string;
  external?: boolean;
  url?: string;
  action?: string;
}
