import SignInForm from '../components/login/SignIn-Form';
const Home = () => {
  return ( 
    <main className="h-screen flex bg-zinc-50">
        <section className="lg:w-[50%] h-screen p-5 flex items-center justify-center">
          anything here
        </section>
        <section className="bg-zinc-950 lg:w-[50%] sm:w-full h-screen p-5 flex items-center justify-center text-zinc-50">
          <SignInForm />
        </section>
    </main>
   );
}
 
export default Home;