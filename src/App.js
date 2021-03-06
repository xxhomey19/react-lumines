import React, { Component } from 'react';
import { connect } from 'react-redux';
import { withRouter } from 'react-router';
import { compose, graphql } from 'react-apollo';
import gql from 'graphql-tag';
import { Route } from 'react-router-dom';
import styled from 'styled-components';
import Game from './containers/Game';
import Replay from './containers/Replay';
import Menu from './components/Menu';
import Refresh from './components/Refresh';
import { pause } from './actions';
import { gameStates, keys } from './constants';

const Container = styled.div`
  width: 100%;
  height: 100%;
`;

const Blur = styled.div`
  width: 100%;
  height: 100%;
  filter: blur(3px);
`;

class App extends Component {
  componentDidMount() {
    window.addEventListener('keydown', this.handleKeyDown);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyDown);
  }

  handleKeyDown = e => {
    const { gameState, dispatch } = this.props;
    if (e.keyCode === keys.ESC) {
      dispatch(pause());
    } else if (e.keyCode === keys.R) {
      if (gameState !== gameStates.FINISHED) {
        this.restart();
      }
    }
  };

  resume = () => {
    const { gameState, dispatch } = this.props;
    if (gameState === gameStates.PAUSED) {
      dispatch(pause());
    }
  };

  restart = () => {
    const { location: { pathname }, history } = this.props;
    history.replace(`/refresh${pathname}`);
  };

  quit = () => {
    this.props.history.goBack();
  };

  submit = name => {
    const { score, replay, submitRank } = this.props;
    submitRank({ name, replay, score });
  };

  render() {
    const { gameState, score, location, data } = this.props;
    return (
      <Container>
        <Route path="/game" component={Game} />
        <Route path="/replay/:id" component={Replay} />
        <Route
          path="/"
          children={({ location }) =>
            data &&
            !data.loading &&
            (location.pathname === '/' || location.pathname === '/rank') ? (
              <Blur>
                <Replay match={{ params: { id: data.allRanks[0].id } }} />
              </Blur>
            ) : null
          }
        />
        <Menu
          gameState={gameState}
          score={score}
          resume={this.resume}
          restart={this.restart}
          quit={this.quit}
          submit={this.submit}
        />
        <Route
          path="/refresh"
          render={() => <Refresh path={location.pathname} />}
        />
      </Container>
    );
  }
}

const mapStateToProps = state => state;

const rankOneReplayQuery = gql`
  query rankOneReplay {
    allRanks(orderBy: score_DESC, first: 1) {
      id
      name
      replay
      score
    }
  }
`;

const submitRankMutation = gql`
  mutation submitRank($name: String!, $replay: String!, $score: Int!) {
    createRank(name: $name, replay: $replay, score: $score) {
      id
    }
  }
`;

export default compose(
  withRouter,
  connect(mapStateToProps),
  graphql(rankOneReplayQuery),
  graphql(submitRankMutation, {
    props: ({ mutate }) => ({
      submitRank: ({ name, replay, score }) =>
        mutate({ variables: { name, replay, score } }),
    }),
  }),
)(App);
