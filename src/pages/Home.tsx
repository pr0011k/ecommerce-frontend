import Card from '../components/Card/Card'
import {
    Box,
    Flex,
    Grid,
    GridItem,
    Input,
    InputGroup,
    InputLeftElement,
} from '@chakra-ui/react'
import * as CONSTANT from '../utils/constants'
import { useEffect, useState, useRef } from 'react'
import ky from 'ky'
import { filterDataType, productType } from '../utils/types'
import { SearchIcon } from '@chakra-ui/icons'
import Filter from '../components/Filter/Filter'
import axios from 'axios'
import { BASEURL } from '../utils/api'
import Header from '../components/Header/Header'
import Dropdown from '../components/dropdown/Dropdown'
import {getallProductsApi} from '../utils/api'
export default function Home() {
    const [products, setProducts] = useState<productType[]>([])
    const [mainArray, setMainArray] = useState<productType[]>([])
    const [filterData, setFilterData] = useState<filterDataType>()
    const [filterResult, setFilterResult] = useState({})
    const inpref = useRef<HTMLInputElement>(null)
    useEffect(() => {
        getProducts()
    }, [])
    const getProducts = async () => {
        const response = await getallProductsApi()
        if (response) {
            setProducts(response)
            setMainArray(response)
            let brands: string[] = []
            let colors: string[] = []
            let materials: string[] = []
            let sizes: string[] = []
            for (let index = 0; index < response.length; index++) {
                const element = response[index]
                if (!brands.includes(element.brand)) {
                    brands.push(element.brand)
                }
                if (!colors.includes(element.color)) {
                    colors.push(element.color)
                }
                if (!materials.includes(element.material)) {
                    materials.push(element.material)
                }
                if (!sizes.includes(element.size)) {
                    sizes.push(element.size)
                }
            }
            const obj = {
                brands: brands,
                colors: colors,
                materials: materials,
                sizes: sizes,
            }
            setFilterData(obj)
        }
    }
    const handleKeyUp = () => {
        if (inpref.current) {
            const currentInp = inpref.current
            if (currentInp.value == '') {
                getProducts()
            }
            if (currentInp.value.length >= 2) {
                const searchedData = mainArray.filter((el) => {
                    return el.name
                        .toLowerCase()
                        .includes(currentInp.value.toLowerCase())
                })
                setProducts(searchedData)
            }
        }
    }
    const handleDropdownChange = (e: { target: { value: string } }) => {
        const selectedValue = e.target.value
        if (selectedValue == '') {
            getProducts()
        } else {
            const searchedData = mainArray.filter((el) => {
                return el.category
                    .toLowerCase()
                    .includes(selectedValue.toLowerCase())
            })
            setProducts(searchedData)
        }
    }

    let obj = {}
    async function handleFilterChange<Type>(title: Type, value: Type | Type[]) {
        if (title == CONSTANT.COLORS) {
            obj = { ...obj, filterColor: value }
        }
        if (title == CONSTANT.BRANDS) {
            obj = { ...obj, filterBrand: value }
        }
        if (title == CONSTANT.MATERIALS) {
            obj = { ...obj, filterMaterial: value }
        }
        if (title == CONSTANT.SIZES) {
            obj = { ...obj, filterSize: value }
        }

        const res = await axios.get(`${BASEURL}/products`, {data : JSON.stringify(obj)})

        return res;
    }
    return (
        <Box px={{ base: 0, md: '6' }}>
            <Flex
                p={6}
                align={'center'}
                flexWrap={{ base: 'wrap', md: 'nowrap' }}
            >
                <Header />
                <Flex mt={{ base: 2, md: 0 }} gridGap={2}>
                    <Dropdown HandleDropdownChange = {handleDropdownChange} />
                    <InputGroup w={'fit-content'}>
                        <InputLeftElement pointerEvents="none">
                            <SearchIcon color="gray.300" />
                        </InputLeftElement>
                        <Input
                            ref={inpref}
                            onKeyUp={handleKeyUp}
                            type="tel"
                            placeholder={CONSTANT.SEARCH_PLACEHOLDER}
                        />
                    </InputGroup>
                </Flex>
            </Flex>
            {/* <Flex justifyContent={'end'} py="6">
                {filterData && (
                    <Filter
                        brands={filterData.brands}
                        colors={filterData.colors}
                        materials={filterData.materials}
                        sizes={filterData.sizes}
                        handleFilterChange={handleFilterChange}
                    />
                )}
            </Flex> */}
            <Grid
                templateColumns={{
                    base: 'repeat(1, 1fr)',
                    md: 'repeat(2, 1fr)',
                    lg: 'repeat(4, 1fr)',
                }}
                gap={6}
            >
                {products.map((product, i) => (
                    <GridItem
                        display={'flex'}
                        justifyContent={'center'}
                        key={product._id}
                        justifyItems={'center'}
                    >
                        <Card
                            availability={product.availability}
                            brand={product.brand}
                            categoryId={product.categoryId}
                            color={product.color}
                            description={product.description}
                            dimensions={product.dimensions}
                            image={product.image}
                            launchDate={product.launchDate}
                            material={product.material}
                            name={product.name}
                            price={product.price}
                            size={product.size}
                            weight={product.weight}
                            _id={product._id}
                            category={product.category}
                        />
                    </GridItem>
                ))}
            </Grid>
        </Box>
    )
}
