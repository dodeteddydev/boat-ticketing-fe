export const DashboardPage = () => {
  return (
    <div>
      <p>DashboardPage</p>
      <button
        className="bg-purple-500"
        onClick={() => localStorage.removeItem("token")}
      >
        REMOVE TOKEN
      </button>
    </div>
  );
};
