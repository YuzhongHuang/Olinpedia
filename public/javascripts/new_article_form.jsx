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
var CollectionList = React.createClass({
  loadCollectionsFromServer: function() {
    var this_component = this;
    $.get('get_all_collection_names')
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
    return {data: [] };
  },
  componentDidMount: function() {
      this.loadCollectionsFromServer();
      //setInterval(this.loadCollectionsFromServer, 2000); //refresh the collection list every 2000 milliseconds.
  },
  render: function() {
      console.log(this.state.data);
      var collection_list = this.state.data.map(function(collection) {
        console.log(collection);
        return <option id={collection}>{collection}</option>
      });
      return <select id="collection" ref="collection">
                <option id=""></option>
                {collection_list}
             </select>
  }
});

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
            Article title 
            <form className="newArticleForm" onSubmit={this.handleSubmit}>
                <input id="name" type="text" ref="name"></input>
                    <CollectionList ref="collection" />
                Article description
                <textarea id="description" ref="description"></textarea>
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
            <NewArticleForm />
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
