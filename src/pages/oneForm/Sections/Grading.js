import { Divider, NumberInput, TextInput } from '@mantine/core'
import React, { useRef, useState } from 'react'
import { ColGrid, FormGroup, ScaleGrid } from '../../../assets/style/styled'
import PropTypes from 'prop-types'
import { isNaNToZero } from '../../../helpers/utility'

const Grading = ({ form, disableList }) => {
  const cutVariable = useRef({
    fresh_fruit: 0,
    garbage: 0,
    grading_brondolan: 0,
    janjang_kosong: 0,
    long_stalk: 0,
    restan_overnight: 0,
    overripe_brondolan: 0,
    overripe_fruit: 0,
    sand_fruit: 0,
    young_fruit: 0,
    water: 0
  })
  const [cutWeight, setCutWeight] = useState({
    fresh_fruit_kg: 0,
    garbage_kg: 0,
    grading_brondolan_kg: 0,
    janjang_kosong_kg: 0,
    long_stalk_kg: 0,
    restan_overnight_kg: 0,
    overripe_brondolan_kg: 0,
    overripe_fruit_kg: 0,
    sand_fruit_kg: 0,
    young_fruit_kg: 0,
    water_kg: 0
  })

  const getCutWeight = (val) => {
    const {
      fresh_fruit,
      garbage,
      grading_brondolan,
      janjang_kosong,
      long_stalk,
      restan_overnight,
      overripe_brondolan,
      overripe_fruit,
      sand_fruit,
      young_fruit,
      water
    } = val
    let bjr = isNaNToZero(form.values?.bjr)
    let netto = isNaNToZero(form.values?.netto_w)
    let tempRottenKg = Math.round(0.25 * ((overripe_fruit * bjr) / netto - 0.05) * netto) || 0
    let tempRottenBrondolan = Math.round((overripe_brondolan / 100) * (overripe_fruit + 0.25))
    let calculate = {
      fresh_fruit_kg: Math.round(+fresh_fruit * bjr * 0.5),
      garbage_kg: Math.round(+garbage * 2),
      grading_brondolan_kg: Math.round(0.3 * netto * (0.125 - grading_brondolan / 100)),
      janjang_kosong_kg: Math.round(+janjang_kosong * bjr),
      long_stalk_kg: Math.round(+long_stalk * bjr * 0.01),
      overripe_fruit_kg: tempRottenKg > 0 ? tempRottenKg : 0,
      restan_overnight_kg: Math.round((+restan_overnight / 100) * netto),
      overripe_brondolan_kg: tempRottenBrondolan > 0 ? tempRottenBrondolan : 0,
      water_kg: Math.round((+water / 100) * netto),
      sand_fruit_kg: Math.round(+sand_fruit * bjr * 0.7),
      young_fruit_kg: Math.round(+young_fruit * bjr * 0.5)
    }
    setCutWeight(calculate)
    let total_cut = 0
    Object.keys(calculate).map((items) => {
      return (total_cut = total_cut + calculate[items])
    })
    cutVariable.current = { ...cutVariable.current, total_cut }
    form.setFieldValue('cut', total_cut)
    form.setFieldValue('after_cut', +netto - +total_cut)
    Object.keys(calculate).map((items) => form.setFieldValue(items, calculate[items]))
  }

  const handleCalculateInput = (value, name) => {
    const num = +value
    let obj = {}
    obj[name] = num
    form.getInputProps(name).onChange(num)
    cutVariable.current = { ...cutVariable.current, ...obj }
    getCutWeight(cutVariable.current)
  }

  return (
    <ScaleGrid>
      <Divider label="Detail Grading" />
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Buah Mentah"
            placeholder="0"
            rightSection="Tdn"
            disabled={disableList.fresh_fruit}
            {...form.getInputProps('fresh_fruit')}
            onChange={(e) => handleCalculateInput(e, 'fresh_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.fresh_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Buah Busuk"
            placeholder="0"
            rightSection="Tdn"
            disabled={disableList.overripe_fruit}
            {...form.getInputProps('overripe_fruit')}
            onChange={(e) => handleCalculateInput(e, 'overripe_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.overripe_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Buah Muda"
            placeholder="0"
            rightSection="Tdn"
            disabled={disableList.young_fruit}
            {...form.getInputProps('young_fruit')}
            onChange={(e) => handleCalculateInput(e, 'young_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.young_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            name="sand_fruit"
            disabled={disableList.sand_fruit}
            min={0}
            label="Buah Pasir"
            hideControls
            rightSection="tdn"
            {...form.getInputProps('sand_fruit')}
            onChange={(e) => handleCalculateInput(e, 'sand_fruit')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.sand_fruit_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Tangkai Panjang"
            placeholder="0"
            rightSection="Tdn"
            disabled={disableList.long_stalk}
            {...form.getInputProps('long_stalk')}
            onChange={(e) => handleCalculateInput(e, 'long_stalk')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.long_stalk_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Janjang Kosong"
            placeholder="0"
            rightSection="Tdn"
            disabled={disableList.janjang_kosong}
            {...form.getInputProps('janjang_kosong')}
            onChange={(e) => handleCalculateInput(e, 'janjang_kosong')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.janjang_kosong_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            name="water"
            disabled={disableList.water}
            min={0}
            label="TBS Berair"
            hideControls
            rightSection="%"
            decimalSeparator="."
            precision={2}
            max={100}
            {...form.getInputProps('water')}
            onChange={(e) => handleCalculateInput(e, 'water')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.water_kg} />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Brondolan"
            placeholder="0"
            rightSection="%"
            disabled={disableList.grading_brondolan}
            {...form.getInputProps('grading_brondolan')}
            onChange={(e) => handleCalculateInput(e, 'grading_brondolan')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.grading_brondolan_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Brondolan Busuk"
            placeholder="0"
            rightSection="%"
            disabled={disableList.overripe_brondolan}
            {...form.getInputProps('overripe_brondolan')}
            onChange={(e) => handleCalculateInput(e, 'overripe_brondolan')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.overripe_brondolan_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Overnight/Restan"
            placeholder="0"
            rightSection="%"
            disabled={disableList.restan_overnight}
            {...form.getInputProps('restan_overnight')}
            onChange={(e) => handleCalculateInput(e, 'restan_overnight')}
          />
          <TextInput
            placeholder="0"
            disabled
            rightSection="Kg"
            value={cutWeight.restan_overnight_kg}
          />
        </FormGroup>
      </ColGrid>
      <ColGrid span={3}>
        <FormGroup>
          <NumberInput
            label="Sampah"
            placeholder="0"
            rightSection="%"
            disabled={disableList.garbage}
            {...form.getInputProps('garbage')}
            onChange={(e) => handleCalculateInput(e, 'garbage')}
          />
          <TextInput placeholder="0" disabled rightSection="Kg" value={cutWeight.garbage_kg} />
        </FormGroup>
      </ColGrid>
    </ScaleGrid>
  )
}

Grading.propTypes = {
  form: PropTypes.object,
  disableList: PropTypes.any
}

export default Grading
