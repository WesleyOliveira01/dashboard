import Container from "@/components/ui/Container";

const Clients = () => {
  return (
    <Container>
      <ul>
        <li>
          <section className="shadow-md p-2 rounded-md flex items-center gap-1">
            <ul className="flex justify-evenly text-sm">
              <li> Nome do cliente</li>
              <li> plano escolhido</li>
              <li> endereco</li>
            </ul>
          </section>
        </li>
      </ul>
    </Container>
  );
};

export default Clients;
