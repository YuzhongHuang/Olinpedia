//Toolbar = require('./shared_components.jsx').Toolbar;
//Searchbar = require('./shared_components.jsx').Searchbar;
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
    //console.log(this.state.data);
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

//var $form = $("#new_article_form");
//
//var onSuccess = function(data, status){
//    console.log('Posted!');
//    window.location.replace('/view/' + data.name);
//}
//
//var onError = function(data, status) {
//    console.log("status", status);
//    console.log("error", data);
//}
//
//$form.submit(function(event) {
//    console.log($form.serialize());
//    event.preventDefault();
//    $.post("new_article", $form.serialize())
//        .done(onSuccess)
//        .error(onError);
//});

var NewArticleForm = React.createClass({
    handleSubmit: function(e){
        e.preventDefault();
    },
    render: function() {
      return(
        <div>
            Article title 
            <form className="newArticleForm" onSubmit={this.handleSubmit}>
                <input id="name" name="name" type="text" value=""></input>
                <select id="grade" name="grade">
                    <option id="freshmen">freshmen</option>
                    <option id="sophomore">sophomore</option>
                    <option id="junior">junior</option>
                    <option id="senior">senior</option>
                </select>
            </form>
            Article description
            <textarea id="description" name="description"></textarea>
            <p> image </p>
            <input id="article_submit_button" class="button" type="submit" value="Submit new article!"></input>
        </div>
      );
    }
});

var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <NewArticleForm />
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
