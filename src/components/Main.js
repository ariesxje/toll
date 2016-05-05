import React from 'react';
import List from 'material-ui/lib/lists/list';
import ListItem from 'material-ui/lib/lists/list-item';
import {Link} from 'react-router';

class AppComponent extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const candidates = require('json!../candidates.json');
    return <List>
      {candidates.map((candidate) => {
        return (
          <ListItem>
            <Link to={`/${candidate.jobId}`}>{candidate.name}</Link>
          </ListItem>
        )
      })}
    </List>
  }
}

AppComponent.defaultProps = {
};

export default AppComponent;
