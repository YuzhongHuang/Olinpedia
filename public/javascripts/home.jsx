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
  handleClick: function() {
    if (!this.state.showForm){
        this.setState({ showForm:true, showContent:false });
    } else {
        this.setState({ showForm:false, showContent:true });
    }
  },
  getInitialState: function() {
    return {data: [], showForm:false, showContent:true};
  },
  componentDidMount: function() {
      this.loadRandomArticleFromServer();
      setInterval(this.loadSameArticleFromServer, 2000); //refresh the article every 2000 milliseconds.
  },
  render: function() {
    return (
      <div id="article" className="article">
        <div id="title_and_edit">
            <h1 id="article_title">
              {this.state.data.name}
            </h1>
            <div className="edit_button">
                <button refs="Edit" className="button" onClick={this.handleClick}>
                    Edit
                </button>
            </div>
        </div>
        <hr></hr>
        { this.state.showContent ?
                <div>
                    <span className="description">
                        {this.state.data.description}
                    </span>
                    <img src={this.state.data.image} className="profile_image" alt="picture" height="200" width="200" />
                </div>
        :null }
        { this.state.showForm ? <EditForm Name={this.state.data.name} Description={this.state.data.description} Image={this.state.data.image} /> : null }
        {this.state.data.error_message}
      </div>
    );
  }
});

var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <Toolbar />
            <h3 id="homepage_message"> A Beautiful Random Person! </h3>
            <RandomArticle />
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
