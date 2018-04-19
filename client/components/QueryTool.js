import React, {Component} from 'react'
import { Grid, Row, Col, Button, Glyphicon } from 'react-bootstrap'
import QueryEditor from './QueryEditor'
import QueryList from './QueryList'
import QueryResults from './QueryResults'

const MARGIN_TOP = {marginTop: '10px'}

export default class QueryTool extends Component {
  constructor () {
    super()

    this.handleQuerySelect = this.handleQuerySelect.bind(this)
    this.setQueryEditorRef = this.setQueryEditorRef.bind(this)
    this.handleSearch = this.handleSearch.bind(this)
    this.setQueryResultsRef = this.setQueryResultsRef.bind(this)
  }

  async handleQuerySelect (source) {
    this.queryEditor.loadQuery(source)
  }

  setQueryEditorRef (element) {
    this.queryEditor = element
  }

  setQueryResultsRef (element) {
    this.queryResults = element
  }

  handleSearch () {
    const value = this.queryEditor.value
    this.queryResults.loadResults(value)
  }

  render () {
    return (
      <div className='pull-left'>
        <h1 style={{marginLeft: '10px'}}>Elastic Search Demo</h1>
        <Grid className='pull-left'>
          <Row className='show-grid' style={MARGIN_TOP}>
            <Col xs={12} md={3}>
              <QueryList onSelect={this.handleQuerySelect} />
            </Col>
            <Col xs={6} md={9}>
              <QueryEditor ref={this.setQueryEditorRef} />
            </Col>
          </Row>
          <Row className='show-grid' style={MARGIN_TOP}>
            <Col md={3}>
              <Button bsStyle='info' onClick={this.handleSearch}><Glyphicon glyph='play' /> Search</Button>
            </Col>
          </Row>
          <Row className='show-grid' style={MARGIN_TOP}>
            <Col md={12}>
              <QueryResults ref={this.setQueryResultsRef} />
            </Col>
          </Row>
        </Grid>
      </div>
    )
  }
}
