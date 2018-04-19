import React, {Component, Fragment} from 'react'
import {all} from '../data/queries'
import {ListGroup, ListGroupItem} from 'react-bootstrap'

class QueryList extends Component {
  constructor (props) {
    super(props)

    this.state = {
      queries: []
    }

    this.handleListItemClick = this.handleListItemClick.bind(this)
  }

  async componentDidMount () {
    try {
      const queries = await all()
      this.setState({queries})
    } catch (error) {
      console.warn('Error getting all queries', error)
    }
  }

  handleListItemClick (e) {
    const {onSelect} = this.props
    onSelect && onSelect(e.target.value)
  }

  render () {
    const {queries} = this.state
    return (
      <Fragment>
        <h4>Select a query</h4>
        <ListGroup style={{overflow: 'auto', maxHeight: '400px'}}>
          {queries.map(query => <ListGroupItem key={query.display} value={query.source} onClick={this.handleListItemClick}>{query.display}</ListGroupItem>)}
        </ListGroup>
      </Fragment>
    )
  }
}

export default QueryList
