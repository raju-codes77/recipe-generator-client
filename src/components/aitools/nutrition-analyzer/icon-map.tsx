import {
  Beef,
  Apple,
  Wheat,
  Leaf,
  Droplet,
  Scale,
  Sprout,
} from "lucide-react";
import type { ComponentType } from "react";

type IconName =
  | "meat"
  | "avocado"
  | "apple"
  | "seed"
  | "leaf"
  | "default"
  | "cactus"
  | "scale"
  | "droplet";

export const detectedItemIcon: Record<IconName, ComponentType<{ className?: string }>> = {
  meat: Beef,
  avocado: Sprout,
  apple: Apple,
  seed: Wheat,
  leaf: Leaf,
  default: Leaf,
  cactus: Sprout,
  scale: Scale,
  droplet: Droplet,
};

export function ItemIcon({ name, className }: { name: IconName; className?: string }) {
  const Icon = detectedItemIcon[name] ?? Leaf;
  return <Icon className={className} />;
}