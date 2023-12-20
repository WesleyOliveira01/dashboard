import Button from "../ui/Button";
import Input from "../ui/Input";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../ui/card";
import { RadioGroup, RadioGroupItem } from "../ui/radio-group";

const SignUpForm = () => {
  return (
    <Card className="lg:w-[50%] w-[95%]">
      <CardHeader className="items-center justify-center">
        <CardTitle>Sign-up title here</CardTitle>
      </CardHeader>
      <CardContent>
        <form>
          <div className="grid w-full items-center gap-4">
            <div className="flex flex-col space-y-1.5">
              <Input label="Nome" forElement="nome" />
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input
                type="email"
                label="E-mail"
                forElement="email"
              />
            </div>
            <div className="flex flex-col space-y-1.5">
              <h1 className="font-semibold">Permissões do usuario</h1>
              <RadioGroup className="lg:flex lg:flex-row lg:justify-around lg:w-[50%]">
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="default-user" id="default-user" />
                  <label htmlFor="default-user">Usuario padrão</label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem value="admin" id="admin" />
                  <label htmlFor="admin">Administrador</label>
                </div>
              </RadioGroup>
            </div>
            <div className="flex flex-col space-y-1.5">
              <Input type="password" forElement="password" label="Senha" />
            </div>
          </div>
        </form>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button button_cn="w-full bg-zinc-950 text-zinc-50 rounded-md   ">
          Criar usuario
        </Button>
      </CardFooter>
    </Card>
  );
};

export default SignUpForm;
