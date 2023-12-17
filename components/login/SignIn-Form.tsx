import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";

const SignInForm = () => {
  return (
    <Card className="w-[350px]">
      <CardHeader className="items-center justify-center">
        <CardTitle >Sign-In title here</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input
                type="email"
                label="E-mail"
                forElement="email"
                placeholder="enter your email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input type="password" forElement="password" label="Senha" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md   ">
          Entrar
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignInForm;
