import { getAllPlans } from "@/actions/plans/planService";
import { PatternFormat } from "react-number-format";
import Button from "./ui/Button";
import Input from "./ui/Input";
import Select from "./ui/Select";
import { Card, CardContent, CardHeader } from "./ui/card";

const NewClientForm = async () => {
  const plans = await getAllPlans();
  return (
    <Card>
      <CardHeader>
        <h1>New client form</h1>
      </CardHeader>
      <CardContent>
        <form>
          <Input label="Nome" forElement="nome" error_message="anything" />
          <Input label="RG" forElement="rg" error_message="anything" />
          <PatternFormat
            label="CPF"
            forElement="cpf"
            error_message="anything"
            format="###.###.###-##"
            customInput={Input}
          />
          <PatternFormat
            label="Data de nascimento"
            forElement="data"
            error_message="anything"
            format="##/##/####"
            customInput={Input}
          />
          <PatternFormat
            label="Telefone"
            forElement="telefone"
            error_message="anything"
            format="(##) #####-####"
            customInput={Input}
          />
          <Input
            label="Endereço"
            forElement="endereco"
            error_message="anything"
          />
          <Input label="Numero" forElement="numero" error_message="anything" />
          <Input
            label="Complemento"
            forElement="complemento"
            error_message="anything"
          />
          <PatternFormat
            label="CEP"
            forElement="cep"
            error_message="anything"
            format="#####-###"
            customInput={Input}
          />
          <Select label="Planos" forElement="plano" error_message="anything">
            {plans.map((plan) => (
              <option key={plan.id} value={plan.name}>
                <span>{plan.name}</span>
                {plan.fidelity && <span>com fidelidade</span>}
                <span>{plan.price}</span>
              </option>
            ))}
          </Select>
          <Button type="submit">Enviar dados</Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default NewClientForm;
