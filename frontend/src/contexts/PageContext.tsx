import { createContext } from "react";
import type { Page } from "../types/Pages";

export type PageContextType = {
  currentPage: Page;
  setCurrentPage: (page: Page) => void;
};

export const PageContext = createContext<PageContextType | undefined>(undefined);
