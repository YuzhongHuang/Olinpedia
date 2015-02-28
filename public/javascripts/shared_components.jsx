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
      var name = this.refs.search.getDOMNode().value.trim();
      var grade = this.refs.grade.getDOMNode().value.trim();
      $.post("/search_article", {name:name, grade:grade})
          .done(
              function(data, status){
                  console.log('Posted!');
                  window.location.replace('/view_article/' + data.name);
              })
          .error(
              function(data, status) {
                  console.log("status", status);
                  console.log("error", data);
              });
  },
  render: function() {

    var style = {};

    return (
      <div className="searchbar" style={style}>
        <form onSubmit={this.handleSubmit}>
          <input id="search" type="text" ref="search"></input>
          <select id="grade" ref="grade">
              <option id="freshmen">freshmen</option>
              <option id="sophomore">sophomore</option>
              <option id="junior">junior</option>
              <option id="senior">senior</option>
          </select>
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
