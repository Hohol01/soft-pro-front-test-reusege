import type {Component} from "vue";

export interface MenuItemType {
    id: string;
    label: string;
    icon: Component;
    href: string;
    badge?: string;
    active?: boolean;
    children?: MenuItemType[];
}
