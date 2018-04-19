import React from 'react'
import {shallow} from 'enzyme'
import ErrorAlert from '../../../client/components/ErrorAlert.js'
import toJson from 'enzyme-to-json'

describe('ErrorAlert Tests', () => {
  it('It renders', () => {
    const wrapper = shallow(<ErrorAlert errorText='foo' />)
    expect(toJson(wrapper)).not.toBeFalsy()
  })

  it('It hides', () => {
    const wrapper = shallow(<ErrorAlert />)
    expect(toJson(wrapper)).toBeFalsy()
  })
})
