var CollectionList = React.createClass({
  loadCollectionsFromServer: function() {
    var this_component = this;
    $.get('/get_all_collection_names')
        .done(
          function(data, status) {
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
    return {data: [] };
  },
  componentDidMount: function() {
      this.loadCollectionsFromServer();
      //setInterval(this.loadCollectionsFromServer, 2000); //refresh the collection list every 2000 milliseconds.
  },
  render: function() {
      console.log(this.state.data);
      console.log('hello');
      var collection_list = this.state.data.map(function(collection) {
        return <option id={collection}>{collection}</option>
      });
      return <select id="collection" ref="collection">
                <option id=""></option>
                {collection_list}
             </select>
  }
});

var NewArticleButton =  React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    window.location.replace('/new_article');
  },

  render: function() {
    return (
      <div className="new_article_button">
        <button onClick={this.handleSubmit}>
          Create new article~
        </button>
      </div>
    );
  }
});

var HomeButton =  React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    window.location.replace('/');
  },

  render: function() {
    return (
      <div className="home_button">
        <button onClick={this.handleSubmit}>
          Go Home!
        </button>
      </div>
    );
  }
});

var Searchbar = React.createClass({
  handleSubmit: function(event){
      event.preventDefault();
      var search = this.refs.search.getDOMNode().value.trim();
      window.location.replace('/search_results/' + search);
  },
  render: function() {

    var style = {};

    return (
      <div className="searchbar" style={style}>
        <form onSubmit={this.handleSubmit}>
          <input id="search" type="text" ref="search"></input>
          <input id="submit_button" className="button" type="submit" value="GO!"></input>
        </form>
      </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {

    var style = {
      backgroundColor: 'black',
      height: 40
    };

    return (
      <div className="toolbar" style={style}>
        <Searchbar />
        <NewArticleButton />
        <HomeButton />
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
