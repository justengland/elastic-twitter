import React, {Component, Fragment} from 'react'
import { ListGroup, ListGroupItem, Grid, Row, Col } from 'react-bootstrap'
import * as queries from '../data/queries'
import ErrorAlert from './ErrorAlert'

export default class QueryList extends Component {
  constructor () {
    super()

    this.state = {results: []}
    this.handleErrorClose = this.handleErrorClose.bind(this)
  }

  async loadResults (query) {
    try {
      this.setState({results: [], errorText: null})
      const data = await queries.exec(query)
      if (data) this.setState({results: data.hits.hits})
      else this.setState({errorText: JSON.stringify(data)})
      // .hits.hits["0"]._score
      console.log('Data: ', data)
    } catch (error) {
      console.warn('Error with query: ', error.name)
      this.setState({errorText: error.message, errorTitle: error.name})
    }
  }

  flattenList (list) {
    if (Array.isArray(list) && list.length > 0) {
      return list.join(' ')
    }
  }

  handleErrorClose () {
    this.setState({errorText: null})
  }

  renderResult (result) {
    const {_id, _score, _source} = result
    const {mentions, user, hashTags, postDate, message, rank, retweet } = _source
    const favoriteCount = _source.favorite_count
    return (
      <ListGroupItem key={_id}>
        <Row className='show-grid'>
          <Col md={9}>
            <h4>{user}</h4>
            <p>{message}</p>
            <div>Tweet Date: {postDate}</div>
            <div>hashTags: {this.flattenList(hashTags)}</div>
            <div>mentions: {this.flattenList(mentions)}</div>
          </Col>
          <Col md={3}>
            <h5>Scoring:</h5>
            <div>favorite count: {favoriteCount}</div>
            <div>retweet: {retweet}</div>
            <div>rank: {rank}</div>
            <div>score: {_score}</div>
          </Col>
        </Row>
      </ListGroupItem>
    )
  }

  render () {
    const {errorTitle, errorText} = this.state
    if (errorText) {
      return (
        <ErrorAlert errorText={errorText} errorTitle={errorTitle} onClose={this.handleErrorClose} />
      )
    } else {
      return (
        <Fragment>
          <h3>Results</h3>
          <ListGroup className='list-group'>
            {this.state.results.map(result => this.renderResult(result))}
          </ListGroup>
        </Fragment>
      )
    }
  }
}

/*

<ul id="results" className="list-group">
      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@freakdiscgolfco</h3>
          <h5 className="id">user id: 986673177446232000</h5>
          <p className="message">If you’re an #Iowan who loves #discgolf then check us out! userid: 986673177446232000</p><span className="tags">hashTags: #Iowan,#discgolf</span><span className="mentions"></span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">1</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@APEREZ1316</h3>
          <h5 className="id">user id: 986673320073441300</h5>
          <p className="message">RT @JColeNC: KOD   4/20   Cover and back https://t.co/2iUaKrI42F userid: 986673320073441300</p><span className="tags"></span><span className="mentions">mentions: @JColeNC</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">3</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@CCCTransformers</h3>
          <h5 className="id">user id: 986673374561632300</h5>
          <p className="message">RT @geoffhinkins: Interesting and something we've successfully put into practice with @CCCTransformers - with 'mentors', not 'managers'. Ou… userid: 986673374561632300</p><span className="tags"></span><span className="mentions">mentions: @geoffhinkins,@CCCTransformers</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">3</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@blistermary1</h3>
          <h5 className="id">user id: 986673437514051600</h5>
          <p className="message">@TWEETORACLE Yeee oo sky is our starting point userid: 986673437514051600</p><span className="tags"></span><span className="mentions">mentions: @TWEETORACLE</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">2</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@Rocket68401769</h3>
          <h5 className="id">user id: 986673412327333900</h5>
          <p className="message">RT @SenSanders: Cardi B is right. If we are really going to make America great we need to strengthen Social Security so that seniors are ab… userid: 986673412327333900</p><span className="tags"></span><span className="mentions">mentions: @SenSanders</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">1</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@masuma_amanat</h3>
          <h5 className="id">user id: 986673500420223000</h5>
          <p className="message">RT @HarlowCollege: Congratulations to Fashion student Masuma who won 2nd place in the national Wool4School England challenge with her fabul… userid: 986673500420223000</p><span className="tags"></span><span className="mentions">mentions: @HarlowCollege</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">2</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@NaughtyKitten5</h3>
          <h5 className="id">user id: 986673596893294600</h5>
          <p className="message">RT @Daddylittlehore: I need to be fucked and cum... now!! userid: 986673596893294600</p><span className="tags"></span><span className="mentions">mentions: @Daddylittlehore</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">2</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@shannonmarczak7</h3>
          <h5 className="id">user id: 986673919833837600</h5>
          <p className="message">RT @AmbroseWWEChamp: Imagine Dean Ambrose Returns At #WWEGRR at number 50th winning it then face Brock Lesnar at Money In The Bank Or Summe… userid: 986673919833837600</p><span className="tags">hashTags: #WWEGRR</span><span className="mentions">mentions: @AmbroseWWEChamp</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">4</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@hitlerthehater</h3>
          <h5 className="id">user id: 986674062444253200</h5>
          <p className="message">My first and best accomplishment was being able to kill more than 6 million Jews.....oh well

- Connor userid: 986674062444253200</p><span className="tags"></span><span className="mentions"></span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">4</div>
          <div className="favorite">0</div>
        </div>
      </li>

      <li className="list-group-item row">
        <div className="col-md-4">
          <h3 className="user">@andrea_dorma</h3>
          <h5 className="id">user id: 986674188260986900</h5>
          <p className="message">I have pre-saved @liampayne &amp;amp; @JBALVIN’s new track, Familiar! #FAMILIARFIRSTLISTEN https://t.co/kpjgoRHpBZ userid: 986674188260986900</p><span className="tags">hashTags: #FAMILIARFIRSTLISTEN</span><span className="mentions">mentions: @liampayne,@JBALVIN</span>
        </div>
        <div className="col-md-4">
          <div className="score">score: 1</div>
          <div className="coordinates"></div>
          <div className="sort"></div>
          <div className="retweet">0</div>
          <div className="rank">2</div>
          <div className="favorite">0</div>
        </div>
      </li>
    </ul>
 */
