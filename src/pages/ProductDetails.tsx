import {
    Box,
    Button,
    Flex,
    Grid,
    GridItem,
    Heading,
    Image,
    SimpleGrid,
    Text,
} from '@chakra-ui/react'
import * as CONSTANT from '../utils/constants';
import { useEffect, useState } from 'react'
import { ChevronLeftIcon } from '@chakra-ui/icons'
import ky from 'ky'
import { productType, reviewListType } from '../utils/types'
import ReviewCard from '../components/ReviewCard/ReviewCard'
import { useNavigate } from 'react-router-dom'
import { ReviewDetail, ProductDetail } from '../utils/api'
import '../App.css';
export default function ProductDetails() {
    const navigate = useNavigate()
    const [product, setProduct] = useState<productType>()
    const [reviewList, setReviewList] = useState<reviewListType[]>([])
    useEffect(() => {
        getProductDetails()
    }, [])
    const getProductDetails = async () => {
        const search = window.location.search
        const paramsList = new URLSearchParams(search)
        const productId = paramsList.get('id')
        const productName = paramsList.get('name')
        const reviewResponse = await ReviewDetail(productId)
        const productResponse = await ProductDetail(productName)

        if (productResponse && reviewResponse) {
            setProduct(productResponse[0])
            setReviewList(reviewResponse)
        }
    }
    return (
        <Box px={{ base: 0, md: '6' }}>
            <Flex p={6}>
                <Heading
                    as="h2"
                    fontSize={'28px'}
                    cursor={CONSTANT.POINTER}
                    onClick={() => {
                        navigate('/')
                    }}
                >
                    <Flex align={'center'}>
                        <ChevronLeftIcon />
                        Home
                    </Flex>
                </Heading>
            </Flex>
            <Flex
                className="detail-bg"
                w={CONSTANT.FULL_WIDTH}
            >
                <Box
                    bg="white"
                    px={8}
                    py={1}
                    mx="auto"
                >
                    <SimpleGrid
                        alignItems="center"
                        columns={{
                            base: 1,
                            md: 2,
                        }}
                        flexDirection={{ base: 'column', lg: 'column-reverse' }}
                        spacingY={{
                            base: 10,
                            md: 32,
                        }}
                        spacingX={{
                            base: 10,
                            md: 24,
                        }}
                    >
                        <Box
                            order={{
                                base: 'initial',
                                md: 2,
                            }}
                        >
                            <Heading
                                as="h2"
                                mb={4}
                                fontSize={{
                                    base: '2xl',
                                    md: '4xl',
                                }}
                                fontWeight="extrabold"
                                letterSpacing="tight"
                                textAlign={{
                                    base: 'center',
                                    md: 'left',
                                }}
                                color="gray.900"
                                lineHeight={{
                                    md: 'shorter',
                                }}
                            >
                                {product?.name}
                            </Heading>
                            <Text
                                mb={5}
                                textAlign={{
                                    base: 'center',
                                    sm: 'left',
                                }}
                                color="gray.600"
                                fontSize={{
                                    md: 'lg',
                                }}
                            >
                                {product?.description}
                            </Text>
                            <Button
                                w={{
                                    base: CONSTANT.FULL_WIDTH,
                                    sm: 'auto',
                                }}
                                size="lg"
                                bg="gray.900"
                                _hover={{
                                    bg: 'gray.700',
                                }}
                                color="gray.100"
                                as="a"
                            >
                                Buy now
                            </Button>
                        </Box>
                        <Box w={CONSTANT.FULL_WIDTH} h={CONSTANT.FULL_WIDTH} bg="gray.200">
                            <Image src={product?.image} />
                        </Box>
                    </SimpleGrid>
                </Box>
            </Flex>
            <Box>
                <Heading as="h2" my={6} px={8}>
                    Ratings and Reviews
                </Heading>
                <Grid
                    templateColumns={{
                        base: 'repeat(1, 1fr)',
                        lg: 'repeat(2, 1fr)',
                    }}
                    gap={6}
                >
                    {reviewList.map((item, idx) => (
                        <GridItem key={idx} className="review-list">
                            <ReviewCard
                                author={item.author}
                                date={item.date}
                                description={item.description}
                                productId={item.productId}
                                rating={item.rating}
                                title={item.title}
                                _id={item._id}
                            />
                        </GridItem>
                    ))}
                </Grid>
            </Box>
        </Box>
    )
}
