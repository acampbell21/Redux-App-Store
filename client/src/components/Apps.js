import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import {
  Container,
  Grid,
  Header,
  Card,
  Image,
  Dropdown,
  Divider,
  Button,
} from 'semantic-ui-react';

class Apps extends Component {
  state = { category: [] };

  categoryOptions = () => {
    return this.props.categories.map( (category, index) => {
      return { key: index, text: category, value: category }
    })
  }

  apps = () => {
    const { apps } = this.props;
    const { category } = this.state;
    let visible = apps;
    if(category)
      visible = apps.filter( app => app.category === category)


    return visible.map( app => {
      return(
        <Grid.Column computer={4} mobile={16} tablet={16}>
          <Card style={styles.appCard}>
            <Image size='tiny' src={app.logo} />
            <Card.Content>
              <Card.Header>{app.name}</Card.Header>
              <Card.Meta>
                <span>Author: {app.author}</span>
                <span>Category: {app.category}</span>
              </Card.Meta>
              <Card.Description style={styles.appDescription}>{app.description}</Card.Description>
            </Card.Content>
            <Card.Content extra>
              <Link to={`/apps/${app.id}`}>View App</Link>
            </Card.Content>
          </Card>
        </Grid.Column>
      )
    })
  }

  clearFilter = () => {
    this.setState({ category: '' });
  }


  render() {
    let { category } = this.state;
    return(
      <Container>
        <Header as='h3' textAlign='center'>Apps</Header>
        <Dropdown
          placeholder='Filter Apps By Category'
          fluid
          selection
          options={this.categoryOptions()}
          value={category}
          onChange={ (e, data) => this.setState({ category: data.value })}
        />
        { category && <Button fluid basic onClick={this.clearFilter} >Clear Filter</Button> }
        <Grid columns={16}>
          <Grid.Row>
            { this.apps() }
          </Grid.Row>
        </Grid>
      </Container>
    )
  }
}

const styles = {
  appDescription: {
    height: '100px',
    overflowY: 'scroll',
  },
  appCard: {
    height: '300px',
    marginBottom: '10px'
  },
}

const mapStateToProps = (state) => {
  const apps = state.apps;
  const categories = [ ...new Set(apps.map(app => app.category))]
  return { apps, categories };
}

export default connect(mapStateToProps)(Apps);
