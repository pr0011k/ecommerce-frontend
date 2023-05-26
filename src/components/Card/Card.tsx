import {
    CardBody,
    Stack,
    Heading,
    Divider,
    CardFooter,
    Button,
    Card as ChakraCard,
    Image,
    Text,
} from '@chakra-ui/react'
import { useNavigate } from 'react-router-dom'
import { productType } from '../../utils/types'

export default function Card(props: productType) {
    const { description, image, name, price, _id } = props
    const navigate = useNavigate()
    const handleClick = () => {
        navigate(`/details?id=${_id}&&name=${name}`)
    }
    return (
        <ChakraCard maxW="sm">
            <CardBody>
                <Image
                    src={image}
                    borderRadius="lg"
                    width="340px"
                    height="200px"
                    objectFit={'cover'}
                />
                <Stack mt="6" spacing="3">
                    <Heading size="md">{name}</Heading>
                    <Text noOfLines={3}>{description}</Text>
                    <Text color="blue.600" fontSize="2xl">
                        ₹{price}
                    </Text>
                </Stack>
            </CardBody>
            <Divider />
            <CardFooter>
                <Button

                    w={{
                        base: 'full',
                        md: 'auto',
                    }}
                    size="lg"
                    bg="gray.900"
                    _hover={{
                        bg: 'gray.700',
                    }}
                    color="gray.100"
                    as="a"
                    cursor={'pointer'}
                    onClick={handleClick}
                >
                    View Details
                </Button>
            </CardFooter>
        </ChakraCard>
    )
}
