import Container from '@/components/ui/Container';


const UserDetails = async ({params}:{params:{id:string}}) => {
    const id = params.id;

    return ( 
        <Container>
            <p>id do usuario: {id}</p>
        </Container>
     );
}
 
export default UserDetails;