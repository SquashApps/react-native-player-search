import React, { Component } from 'React';
import {Container, Button, Item, Form, Header, Content, List, ListItem,Left, Body, Right,Thumbnail, Text, Picker } from 'native-base';
import store from '../../store'

class PlayerList extends Component {
    constructor(props) {
        super(props);
        this.state = {
          filterByGender: [],
          filterBySkill:[],
        }
    }

    componentWillMount() {
        const { Players } = store;
        this.setState(() => ({
            filterByGender: this.filterByGender(Players),
            filterBySkill: this.filterBySkill(Players),
          }))
    }

    renderList = () => {
        return store.Players.map((player, index) => {
            return (
                <ListItem avatar>
                <Left>
                  <Text>{index+1}</Text>
                </Left>
                <Body>
                  <Text>{player.name}</Text>
                  <Text note>{player.sex}</Text>
                </Body>
                <Right>
                  <Text note>{player.skill}</Text>
                </Right>
              </ListItem>
            )
          })
    }

    filterByGender = (Players) => {
        return Players.reduce((acc,player)=>{
            /**
             * Grouping male and female using reduce
             */
            player.sex === 'Male' ? acc.male.push(value): acc.female.push(value);
            return acc;
          },{'male':[],'female':[]})
          
    }

    filterBySkill = (Players) => {
        // function to separate skill levels.
      return Players.reduce((acc,player)=>{
        /**
         * Grouping expert, intermediate and beginner using reduce method
         */
        player.skill === "Expert" ?player.expert.push(value)
        :player.skill === "Intermediate" ? acc.intermediate.push(value): acc.beginner.push(value);
        return acc;
      },{'expert':[],'intermediate':[], 'beginner':[]})
    }
    onValueChange2(value) {
        this.setState({
          selected2: value
        });
      }
      
    render(){
        return(
        <Container>
            <Header><Text style={{ color: 'white', marginTop: 15 }}>Tennis Stars</Text></Header>
            <View>
             <Text>Filter</Text>
             <Text>Gender</Text>
             <Button rounded  onPress={() => this.filter('Male')}>
              <Text>Male</Text>
             </Button>
             <Button rounded  onPress={() => this.filter('Female')}>
              <Text>Female</Text>
             </Button>
             <Text>Skill</Text>
             <Button rounded  onPress={() => this.filter('Expert')}>
              <Text>Expert</Text>
             </Button>
             <Button rounded  onPress={() => this.filter('Intermediate')}>
              <Text>Intermediate</Text>
             </Button>
             <Button rounded  onPress={() => this.filter('Beginner')}>
              <Text>Beginner</Text>
             </Button>
            </View>
            <Content>
            <List>
            {this.renderList()}
            </List>   
        </Content>
        </Container>
       
        )
    }
}

export default PlayerList;