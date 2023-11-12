import { PropsWithChildren, ButtonHTMLAttributes } from "react";
import Loader from "@/components/partials/Loader";

interface Props extends ButtonHTMLAttributes<HTMLButtonElement> {
  variant: "primary" | "secondary";
  fill?: boolean;
  loading?: boolean;
}

export default function Button({
  variant,
  fill,
  loading,
  children,
  ...restProps
}: PropsWithChildren<Props>) {
  return variant === "primary" ? (
    <button
      {...restProps}
      disabled={loading}
      className={`justify-center max-h-12 px-6 py-4 rounded-xl shadow-inner bg-indigo-700 items-center gap-2.5 inline-flex ${
        !loading &&
        "hover:bg-indigo-800 duration-200 transition-transform transform active:scale-95"
      } `}
    >
      {loading ? (
        <Loader size="24" />
      ) : (
        <div className="text-center text-white text-base font-semibold tracking-tight">
          {children}
        </div>
      )}
    </button>
  ) : (
    <button
      {...restProps}
      disabled={loading}
      className={`max-h-12 px-6 py-4 rounded-xl shadow-inner border-2 border-slate-800 justify-center items-center gap-2.5 inline-flex ${
        !loading &&
        "hover:bg-gray-900 duration-200 transition-transform transform active:scale-95"
      }  ${fill && "bg-gray-900"}`}
    >
      {loading ? (
        <Loader size="24" />
      ) : (
        <div className="text-center text-slate-500 text-base font-semibold tracking-tight">
          {children}
        </div>
      )}
    </button>
  );
}
