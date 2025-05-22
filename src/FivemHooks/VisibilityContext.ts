import { createContext } from "react";
import type { VisibilityProviderValue } from "./FiveMType";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

export default VisibilityCtx;
