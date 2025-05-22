import { type Context, useContext } from "react";
import VisibilityCtx from "./VisibilityContext";
import type { VisibilityProviderValue } from "./FiveMType";

export const useVisibility = () =>
  useContext<VisibilityProviderValue>(
    VisibilityCtx as Context<VisibilityProviderValue>
  );
