import { useNavigate } from "react-router-dom";

export function Home() {
  const navigate = useNavigate();

  const handleClickSignUp = () => navigate('/sign-up');

  return (
    <section className="m-auto text-center">
      <p className="text-5xl m-8">Welcome to our event platform!</p>
      <button className="outline-none border-2 border-green-400 border-opacity-50 text-green-400 rounded-md p-1 px-4 mx-1 bg-white bg-opacity-5 hover:border-opacity-100 focus:border-opacity-100">
        Login</button>
      <button onClick={handleClickSignUp}
        className="outline-none border-2 border-yellow-400 border-opacity-50 text-yellow-400 rounded-md p-1 px-4 mx-1 bg-white bg-opacity-5 hover:border-opacity-100 focus:border-opacity-100">
        Sign-up</button>
    </section>
  )
}
