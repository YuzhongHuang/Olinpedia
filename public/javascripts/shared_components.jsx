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

var CollectionLink = React.createClass({
    handleClick: function(){
        window.location.replace(this.props.url);
    },
    render: function(){
          return <li onClick={this.handleClick}>{this.props.collection}</li>
    }
});

var DropdownCollections = React.createClass({
    //html and css from http://cssdeck.com/labs/another-simple-css3-dropdown-menu
    
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
    },
    render: function(){
        var collection_list = this.state.data.map(function(collection) {
         var url = "/view_collection/"+collection;
          var collection_link = <CollectionLink url={url} collection={collection}/>
          console.log(collection_link);
          return collection_link;
        });
        return(
            <ul>
              <li>
                 Collections
                <ul>
                  {collection_list}
                </ul>
              </li>
            </ul>);
    }
});

var Searchbar = React.createClass({
  handleSubmit: function(event){
      event.preventDefault();
      var search = this.refs.search.getDOMNode().value.trim();
      window.location.replace('/search_results/' + search);
  },
  render: function() {

    return (
        <div id="searchbar">
        <form className="searchbar" onSubmit={this.handleSubmit}>
          <input id="search_text" type="text" ref="search"></input>
          <input id="search_button" className="button" type="submit" value="Search"></input>
        </form>
        </div>
    );
  }
});

var Toolbar = React.createClass({
  render: function() {
    return (
      <div className="toolbar" id="toolbar">
          <div id="logo_container"><a href="/"><img id="logo" src="../images/olin_wiki_logo.jpg" alt="some_text"></img></a></div>
          <Searchbar />
          <div><a href="/new_article" id="new_article_link"><ul><li>New Article</li></ul></a></div>
          <div><a href="/new_collection" id="new_collection_link"><ul><li>New Collection</li></ul></a></div>
          <div><DropdownCollections/></div>
      </div>
    );
  }
});

var EditForm = React.createClass({
  getInitialState: function() {
    return {data_uri: null, data: [], error_message:''};
  },

  handleSubmit: function() {
    event.preventDefault();
    if (!this.state.data_uri) {
      var image = this.props.Image;
    } else {
      var image = this.state.data_uri;
    }

    var name = this.props.Name;
    console.log(name);
    //var collection = this.refs.collection.getDOMNode().value.trim();
    var description = this.refs.description.getDOMNode().value.trim();
    console.log(description);
    var this_component = this;
    if (!name || !description) {
      this_component.setState({error_message: "Don't leave the name or description boxes blank!"});
      return;
    }
    $.post("/edit_article", {name:name, description:description, image:image}) //no collection
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

  handleChange: function(e) {
    var reader = new FileReader();
    var file = e.target.files[0];

    reader.onload = function(upload) {
      this.setState({
        data_uri: upload.target.result
      });
    }.bind(this);

    reader.readAsDataURL(file);
  },
  render: function() {
    return (
      <div>
        <form onSubmit={this.handleSubmit}>
          <textarea id="new_article_description" className="newDescription description" ref="description" defaultValue={this.props.Description}>
          </textarea>
          <br/>
          <br/>
          image:
          <br/>
          <input id="image_upload" ref="image_upload" type="file" onChange={this.handleChange} />
          <br/>
          <br/>
          <input id="EditForm_submit_button" className="button" type="submit" value="Submit your edition"></input>
        </form>
        {this.state.error_message}
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
      this.loadArticleFromServer();
      setInterval(this.loadArticleFromServer, 2000); //refresh the article every 2000 milliseconds.
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
                    <p className="description">
                        {this.state.data.description}
                    </p>
                    <img src={this.state.data.image} alt="picture" height="200" width="200" />
                </div>
        :null }
        { this.state.showForm ? <EditForm Name={this.state.data.name} Description={this.state.data.description} Image={this.state.data.image} /> : null }
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
        return (<div className="result" id={article._id}>
                    <a href={url}>{article.name}</a>
                </div>
        );
    });
    return (
      <div className="collection">
        <h2 id="collection_name" className="name title">
          {this.state.data.name}
        </h2>
        <hr></hr>
        {articles}
      </div>
    );
  }
});
