import SignInForm from '../components/login/SignIn-Form';
import { createAdmin } from '@/prisma/seed';

createAdmin().catch((e) => {
  console.error(`error: ${e.message}`)
})

const Home = () => {
  return ( 
    <main className="h-screen flex bg-zinc-50">
        <section className="lg:w-[50%] mobile:hidden h-screen p-5 flex items-center justify-center">
          anything here
        </section>
        <section className="bg-zinc-950 lg:w-[50%] w-full h-screen p-5 flex items-center justify-center lg:rounded-tl-[10%]  lg:rounded-bl-[10%] text-zinc-50">
          <SignInForm />
        </section>
    </main>
   );
}
 
export default Home;