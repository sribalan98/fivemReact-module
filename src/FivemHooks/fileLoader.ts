import { useState, useEffect } from "react";
import { isEnvBrowser } from "./misc";
import type { FiveMWindow } from "./FiveMType";

export async function LoadJsonFile<T = unknown>(path: string): Promise<T> {
  try {
    
    const getParentResourceName = (window as FiveMWindow).GetParentResourceName;
    const resourceName = getParentResourceName
      ? getParentResourceName()
      : "cr-policeDispatchMDT";

      const uiPath = process.env.NODE_ENV === 'development' ? `/${path}` : `nui://${resourceName}/${path}`
    const finalPath = isEnvBrowser() 
      ? `./${path}` 
      : uiPath;
    const response = await fetch(finalPath, {
      method: "GET",
      headers: {
        "Content-Type": "application/json; charset=UTF-8",
      },
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return response.json();
  } catch (error) {
    console.error("Error loading JSON file:", error);
    throw error;
  }
}

export function useJsonFile<T>(path: string) {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<Error | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    let isMounted = true;

    const loadData = async () => {
      try {
        const result = await LoadJsonFile<T>(path);
        if (isMounted) {
          setData(result);
          setError(null);
        }
      } catch (err) {
        if (isMounted) {
          setError(
            err instanceof Error ? err : new Error("Failed to load JSON file")
          );
          setData(null);
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadData();

    return () => {
      isMounted = false;
    };
  }, [path]);

  return { data, error, isLoading };
}
