//Article, Toolbar, and Searchbar are accessible variables b/c they were created in shared_components.jsx
var RandomArticle = React.createClass({
  loadRandomArticleFromServer: function() {
    var this_component = this;
    $.get('random_article')
        .done(
          function(data) {
              this_component.setState({data: data});
          }
        )
        .error(
          function(xhr, status, err) {
              console.error(this_component.props.url, status, err.toString());
          }
        );
  },
  loadSameArticleFromServer: function() {
    var this_component = this;
    console.log(this_component.state);
    console.log(this_component.state.data.name);
    $.get('/get_article/'+this_component.state.data.name)
        .done(
          function(data) {
              this_component.setState({data: data});
          }
        )
        .error(
          function(xhr, status, err) {
              console.error(this_component.props.url, status, err.toString());
          }
        );
  },
  getInitialState: function() {
    return {data: []};
  },
  componentDidMount: function() {
      this.loadRandomArticleFromServer();
      setInterval(this.loadSameArticleFromServer, 2000); //refresh the article every 2000 milliseconds.
  },
  render: function() {
    return (
      <div className="article">
        <h2 className="name">
          {this.state.data.name}
        </h2>
        <p className="description">
            {this.state.data.description}
            {this.state.data.image}
        </p>
      </div>
    );
  }
});

var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <Toolbar />
            <h1> THIS IS THE HOMEPAGE </h1>
            <RandomArticle />
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
