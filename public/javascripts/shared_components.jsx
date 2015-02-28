var Searchbar = React.createClass({
  render: function() {
    return (
      <div className="searchbar">
        "I am a search bar!"
      </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    return (
      <div className="toolbar">
        "I am a tool bar holding a search bar!
        <Searchbar />
      </div>
    );
  }
});

var Article = React.createClass({
  loadArticleFromServer: function() {
    var this_component = this;
    console.log(this.props.url);
    $.get(this.props.url)
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
      this.loadArticleFromServer();
      setInterval(this.loadArticleFromServer, 2000); //refresh the article every 2000 milliseconds.
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
        {this.state.data.error_message}
      </div>
    );
  }
});

var Collection = React.createClass({
  loadCollectionFromServer: function() {
    var this_component = this;
    console.log(this.props.url);
    $.get(this.props.url)
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
    return {data:{articles:[]} };
  },
  componentDidMount: function() {
      this.loadCollectionFromServer();
      setInterval(this.loadCollectionFromServer, 2000); //refresh the article every 2000 milliseconds.
  },
  render: function() {
    console.log(this.state.data.articles[0]);
    var articles = this.state.data.articles.map(function(article){
        var url = '/view_article/'+article.name;
        return (<div className="article" id={article._id}>
                    <a href={url}>{article.name}</a>
                </div>
        );
    });
    return (
      <div className="collection">
        <h2 className="name">
          {this.state.data.name}
        </h2>
        {articles}
      </div>
    );
  }
});
