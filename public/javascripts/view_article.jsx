Article = require('./shared_components.jsx').Article;
Toolbar = require('./shared_components.jsx').Toolbar;
Searchbar = require('./shared_components.jsx').Searchbar;

var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <Toolbar />
            <Article url={this.props.url} />
        </div>
    );
  }
});

React.render(
  <Wiki url="" />,
  document.getElementById('content')
);
