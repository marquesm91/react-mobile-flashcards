import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Deck } from '../../components';
import { Button, Container, HeaderText, HeaderButton, Text, Input } from './styles';
import { colors } from '../../utils';
import { createDeck, selectDeck } from '../../redux/actions';

class DeckAdd extends Component {
  static navigationOptions = ({ navigation }) => ({
    title: (
      <HeaderText color={colors.primary}>
        Deck Add
      </HeaderText>
    ),
    headerLeft: (
      <HeaderButton left onPress={() => navigation.goBack()}>
        <Text>Back</Text>
      </HeaderButton>
    ),
  });

  state = {
    title: '',
  }

  createDeckHandler = async () => {
    const { title } = this.state;

    if (title) {
      await this.props.createDeck(title);
      this.props.selectDeck(title);
      this.props.navigation.navigate('DeckDetail');
    }
  }

  render() {
    const { title } = this.state;

    return (
      <Container>
        <Input
          onChangeText={title => this.setState({ title })}
          value={title}
        />
        <Button onPress={this.createDeckHandler}>
          <Text>Create Deck</Text>
        </Button>
      </Container>
    );
  }
}

const mapDispatchToProps = dispatch => ({
  createDeck: title => dispatch(createDeck(title)),
  selectDeck: title => dispatch(selectDeck(title)),
});

export default connect(null, mapDispatchToProps)(DeckAdd);
