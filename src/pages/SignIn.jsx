const SignIn = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-green-50">
      <div className="bg-white p-8 rounded-xl shadow-lg border border-green-100">
        <h1 className="text-2xl font-bold text-green-800 mb-4 text-center">Sign In to HealthDish</h1>
        <input type="email" placeholder="Email" className="w-full p-2 mb-3 border rounded border-green-200 focus:outline-green-500" />
        <input type="password" placeholder="Password" className="w-full p-2 mb-4 border rounded border-green-200 focus:outline-green-500" />
        <button className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700">Login</button>
      </div>
    </div>
  );
};

export default SignIn;