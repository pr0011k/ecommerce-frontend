import {
    Flex,
    Heading,
} from '@chakra-ui/react'
import './style.css';

import { SearchIcon } from '@chakra-ui/icons'
export default function Header() {
    return (
        <Flex py={6} align={'center'} position="static" bg="#ffffff" pos="relative">
            <Heading
                    as="h2"
                    fontSize={{ base: '20px', md: '24px', lg: '28px' }}
                    mr={2}
                >
                    E-Commerce
            </Heading>
        </Flex>
    )
}
