import Logo from "../icons/Logo";

const Login = () => {
  return (
    <div className="min-h-screen bg-gray-100 flex flex-col items-center justify-center">
      <div className="text-center mb-8">
        <div className="w-12 h-12 bg-indigo-50 rounded-xl flex items-center justify-center mx-auto mb-3">
          <Logo />
        </div>
        <h1 className="text-3xl font-medium">
          Note<span className="text-indigo-500">Base</span>
        </h1>
        <p className="text-sm text-gray-400 mt-1">Revisit your saved links</p>
      </div>

      {/* Card */}
      <div className="bg-white rounded-2xl border border-gray-200 p-8 w-full max-w-sm">
        <p className="text-lg font-medium mb-6">Welcome back</p>

        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 mb-3 bg-gray-50 focus-within:border-indigo-400 focus-within:bg-white">
          <inputBox
            ref={usernameRef}
            type="text"
            placeholder="Username"
            className="w-full h-11 bg-transparent outline-none text-sm"
          />
        </div>

        <div className="flex items-center gap-2 border border-gray-200 rounded-xl px-3 mb-4 bg-gray-50 focus-within:border-indigo-400 focus-within:bg-white">
          <input
            ref={passwordRef}
            type="password"
            placeholder="Password"
            className="w-full h-11 bg-transparent outline-none text-sm"
          />
        </div>

        <button
          //   onClick={handleLogin}
          className="w-full h-12 bg-indigo-500 hover:bg-indigo-600 text-white rounded-xl font-medium text-sm transition-colors"
        >
          Login
        </button>

        <p className="text-center text-sm text-gray-400 mt-4">
          Don't have an account?{" "}
          <a href="/signup" className="text-indigo-500 font-medium">
            SignUp
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;
