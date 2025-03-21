import { ReactNode, TdHTMLAttributes, ThHTMLAttributes } from "react";

export const Table = ({ children }: { children: ReactNode }) => {
  return (
    <table className="min-w-full bg-white border border-gray-200 shadow-md rounded-lg">
      <>{children}</>
    </table>
  );
};

export const THead = ({ children }: { children: ReactNode }) => {
  return (
    <thead>
      <tr className="bg-gray-100">
        <>{children}</>
      </tr>
    </thead>
  );
};

export const TBody = ({ children }: { children: ReactNode }) => {
  return (
    <thead>
      <>{children}</>
    </thead>
  );
};

export const Th = ({ ...props }: ThHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <th
      {...props}
      className={`py-3 px-6 text-left border-b ${props.className}`}
    >
      {props.children}
    </th>
  );
};

export const Td = ({ ...props }: TdHTMLAttributes<HTMLTableCellElement>) => {
  return (
    <td {...props} className={`py-3 px-6 ${props.className}`}>
      {props.children}
    </td>
  );
};
