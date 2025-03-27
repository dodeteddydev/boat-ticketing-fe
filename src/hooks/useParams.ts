/* eslint-disable @typescript-eslint/no-explicit-any */
import { useSearchParams } from "react-router";

export const useParams = <
  T extends Record<string, string | number | boolean>
>() => {
  const [searchParams, setSearchParams] = useSearchParams();

  const getParams = (): T => {
    const obj = {} as T;
    for (const [key, value] of searchParams.entries()) {
      if (value.trim() === "") {
        obj[key as keyof T] = undefined as any;
      } else if (!isNaN(Number(value))) {
        obj[key as keyof T] = Number(value) as any;
      } else {
        obj[key as keyof T] = value as any;
      }
    }
    return obj;
  };

  const updateParams = (newParams: Partial<T>) => {
    const updatedParams = new URLSearchParams(searchParams);

    Object.entries(newParams).forEach(([key, value]) => {
      if (value === undefined || value === null || value === "") {
        updatedParams.delete(key);
      } else {
        updatedParams.set(key, String(value));
      }
    });

    setSearchParams(updatedParams);
  };

  return [getParams(), updateParams] as const;
};
