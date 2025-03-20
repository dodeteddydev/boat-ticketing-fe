import { ReactNode } from "react";
import errorImage from "../../assets/error.png";
import processing from "../../assets/processing.png";

type PageLayoutProps = {
  isLoading?: boolean;
  isError?: boolean;
  errorStatus?: number;
  children: ReactNode;
};

export const PageLayout = ({
  children,
  isLoading,
  isError,
  errorStatus,
}: PageLayoutProps) => {
  if (isLoading)
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <img className="h-80 w-80" src={processing} alt="processing" />
        <p className="text-3xl font-semibold">Loading...</p>
      </div>
    );

  if (isError)
    return (
      <div className="h-full flex flex-col items-center justify-center">
        <img className="h-80 w-80" src={errorImage} alt="processing" />
        <p className="text-3xl font-semibold">{errorStatus}</p>
      </div>
    );

  return (
    <section className="h-full flex flex-col">
      <>{children}</>
    </section>
  );
};
