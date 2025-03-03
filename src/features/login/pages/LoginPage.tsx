export const LoginPage = () => {
  return (
    <div>
      <p>LoginPage</p>
      <button
        className="bg-purple-500"
        onClick={() => localStorage.setItem("token", "ada-token")}
      >
        ADD TOKEN
      </button>
    </div>
  );
};
