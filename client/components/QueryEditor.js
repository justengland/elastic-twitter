import React, { Component, Fragment } from 'react'
import AceEditor from 'react-ace'
import Resizable from 're-resizable'
import * as queries from '../data/queries'
import 'brace/mode/json'
import 'brace/theme/monokai'

export default class QueryEditor extends Component {
  constructor () {
    super()
    this.state = {}
    this.onChange = this.onChange.bind(this)
  }

  onChange (newValue) {
    this.value = newValue
  }

  async loadQuery (source) {
    const query = await queries.get(source)
    const value = JSON.stringify(query, 0, 2)
    this.setState({value})
    this.value = value
  }

  render () {
    return (
      <Fragment>
        <h4>Edit Query</h4>
        <AceEditor
          mode='json'
          theme='monokai'
          onChange={this.onChange}
          name='query-editor'
          editorProps={{$blockScrolling: true}}
          height='400px'
          width='600px'
          value={this.state.value}
        />
      </Fragment>
    )
  }
}
