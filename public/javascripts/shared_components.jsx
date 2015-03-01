var NewArticleButton =  React.createClass({
  handleSubmit: function(event){
    event.preventDefault();
    window.location.replace('/new_article');
  },

  render: function() {
    return (
        <button className="new_article_button" onClick={this.handleSubmit}>
          Create new article~
        </button>
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
        <button className="home_button" onClick={this.handleSubmit}>
          Go Home!
        </button>
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

    return (
        <form class="searchbar" onSubmit={this.handleSubmit}>
          <input id="search" type="text" ref="search"></input>
          <select id="grade" ref="grade">
              <option id="freshmen">freshmen</option>
              <option id="sophomore">sophomore</option>
              <option id="junior">junior</option>
              <option id="senior">senior</option>
          </select>
          <input id="submit_button" className="button" type="submit" value="GO!"></input>
        </form>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    return (
      <div className="toolbar">
          <Searchbar />
            <NewArticleButton />
            <HomeButton />
      </div>
    );
  }
});

var EditForm = React.createClass({
  handleSubmit: function() {
    event.preventDefault();
      var name = this.props.Name;
      console.log(name);
      //var collection = this.refs.collection.getDOMNode().value.trim();
      var description = this.refs.description.getDOMNode().value.trim();
      var this_component = this;
      if (!name || !description) {
        this_component.setState({error_message: "Don't leave the name or description boxes blank!"});
        return;
      }
      $.post("/edit_article", {name:name, description:description}) //no collection
          .done(
              function(data, status){
                  console.log(data);
                  if (!data.error_message){
                      console.log('Posted!');
                      window.location.replace('/view_article/' + data.name);
                  } else {
                      this_component.setState({error_message: data.error_message});
                  }
              })
          .error(
              function(data, status) {
                  console.log("status", status);
                  console.log("error", data);
              });
  },

  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          Name: <br></br>       
          {this.props.Name}
          <br></br>
          Description
          <textarea className="newDescription" ref="description" defaultValue={this.props.Description}>
          </textarea>
          <br />
          <input id="EditForm_submit_button" className="button" type="submit" value="Submit your edition"></input>
        </form>
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

  handleClick: function() {
    this.setState({ showForm:true });
  },

  getInitialState: function() {
    return {data: [], showForm:false};
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
        <button refs="Edit" onClick={this.handleClick}>
          edit description
        </button>
        { this.state.showForm ? <EditForm Name={this.state.data.name} Description={this.state.data.description} /> : null }
        {this.state.data.error_message}
      </div>
    );
  }
});
