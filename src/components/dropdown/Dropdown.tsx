import React from 'react'
import {Select} from '@chakra-ui/react'
import * as CONSTANT from '../../utils/constants'

function Dropdown(props:any) {
  return (
    <Select
        placeholder="All"
        onChange={props.HandleDropdownChange}
        w="auto"
        _focusVisible={{}}
    >
        <option value="electronics">{CONSTANT.ELECTRONICS}</option>
        <option value="clothing">{CONSTANT.CLOTHING}</option>
        <option value="home appliances">{CONSTANT.HOME_APPLIANCE}</option>
    </Select>
  )
}

export default Dropdown