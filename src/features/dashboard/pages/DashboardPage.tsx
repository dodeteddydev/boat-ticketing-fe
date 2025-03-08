import { Button } from "../../../components/global/Button";
import { useGlobalContext } from "../../../context/useGlobalContext";

export const DashboardPage = () => {
  const { setUserAuthority } = useGlobalContext();

  return (
    <div className="h-full flex flex-col justify-center items-center">
      <p>DashboardPage</p>
      <Button
        className="w-24"
        text="Logout"
        onClick={() => setUserAuthority("unauthorized")}
      />
    </div>
  );
};
