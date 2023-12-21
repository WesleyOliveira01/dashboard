import Button from "@/components/ui/Button";
import Container from "@/components/ui/Container";
import { BadgeX } from "lucide-react";

const Plans = () => {
  return (
    <Container>
      <ul>
        <li>
          <section className="shadow-md p-2 rounded-md flex items-center gap-1">
            <ul className="flex justify-evenly text-sm">
              <li> Nome do plano</li>
              <li> descricao do plano</li>
              <li> valor do plano</li>
            </ul>
            <Button>
              <BadgeX size={20} color="red" />
            </Button>
          </section>
        </li>
      </ul>
    </Container>
  );
};

export default Plans;
