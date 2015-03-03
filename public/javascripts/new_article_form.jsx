var NewArticleForm = React.createClass({
    getInitialState: function() {
      return {};
    },
    handleSubmit: function(event){
        event.preventDefault();
        var name = this.refs.name.getDOMNode().value.trim();
        var collection = this.refs.collection.getDOMNode().value.trim();
        var description = this.refs.description.getDOMNode().value.trim();
        var this_component = this;
        if (!name || !description) {
          this_component.setState({error_message: "Don't leave the name or description boxes blank!"});
          return;
        }
        $.post("new_article", {name:name, collection:collection, description:description})
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
      return(
        <div>
            <form className="newArticleForm" onSubmit={this.handleSubmit}>
                Title <br></br>
                <input id="name" type="text" ref="name"></input> <br></br>
                Collection (Optional)
                <CollectionList ref="collection" /> <br></br>
                Description
                <textarea id="description" ref="description"></textarea> <br></br>
                <p> image </p>
                <input id="article_submit_button" className="button" type="submit" value="Submit new article!"></input>
            </form>
            <div id="error_message">{this.state.error_message}</div>
        </div>
      );
    }
});

var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <Toolbar />
            <div id="article">
                <NewArticleForm />
            </div>
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
