import {
    Card,
    CardHeader,
    Heading,
    CardBody,
    CardFooter,
    Button,
    Text,
    Box,
    Flex,
} from '@chakra-ui/react'
import { reviewListType } from '../../utils/types'
import { StarIcon } from '@chakra-ui/icons'
export default function ReviewCard(props: reviewListType) {
    return (
        <Card boxShadow={'none'}>
            <CardHeader>
                <Heading size="md">{props.author}</Heading>
            </CardHeader>
            <CardBody pt={0}>
                <Flex gridGap={'4'}>
                    <Box
                        display={'inline-flex'}
                        alignItems={'center'}
                        h="fit-content"
                        background={'#26a541'}
                        w="auto"
                        color="white"
                        py="1"
                        px={'2'}
                        borderRadius={'30px'}
                        fontSize={'14px'}
                    >
                        {props.rating}
                        <StarIcon ml="8px" display={'inline-block'} />
                    </Box>
                    <Box>
                        <Heading size="md" mb={'1'}>
                            {props.title}
                        </Heading>
                        <Text maxW={'500px'}>{props.description}</Text>
                    </Box>
                </Flex>
            </CardBody>
            {/* <CardFooter>
                <Button colorScheme="blue">View here</Button>
            </CardFooter> */}
        </Card>
    )
}
