import { ChevronDownIcon } from '@chakra-ui/icons'
import {
    Box,
    Button,
    Heading,
    Menu,
    MenuButton,
    MenuDivider,
    MenuItemOption,
    MenuList,
    MenuOptionGroup,
    VStack,
} from '@chakra-ui/react'
import React, { useState } from 'react'
import { filterDataType } from '../../utils/types'

type filterProps = filterDataType & {
    handleFilterChange: (title: string, value: string | string[]) => void
}
export default function Filter(props: filterProps) {
    const { brands, sizes, colors, materials, handleFilterChange } = props
    const filterObject = [
        {
            title: 'Brands',
            value: brands,
        },
        {
            title: 'Colors',
            value: colors,
        },
        {
            title: 'Materials',
            value: materials,
        },
        {
            title: 'Sizes',
            value: sizes,
        },
    ]
    return (
        <Menu closeOnSelect={false}>
            <MenuButton as={Button} colorScheme="teal">
                Filter <ChevronDownIcon />
            </MenuButton>
            <MenuList minWidth="240px">
                {filterObject.map((mainItem, idx) => (
                    <MenuOptionGroup
                        title={mainItem.title}
                        type="checkbox"
                        key={idx}
                        onChange={(value) => {
                            handleFilterChange(mainItem.title, value)
                        }}
                    >
                        {mainItem.value.map((item, idx) => (
                            <MenuItemOption
                                key={idx}
                                value={item.toLowerCase()}
                            >
                                {item}
                            </MenuItemOption>
                        ))}
                    </MenuOptionGroup>
                ))}
            </MenuList>
        </Menu>
    )
}
