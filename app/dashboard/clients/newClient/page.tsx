import { getAllPlans } from "@/actions/plans/planService";
import Container from "@/components/ui/Container";
import NewClientForm from "./../../../../components/newClientForm";

const NewClient = async () => {
  const plans = await getAllPlans();
  return (
    <Container>
      <NewClientForm plans={plans} />
    </Container>
  );
};

export default NewClient;
