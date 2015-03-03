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
    getInitialState: function() {
      return {
        myFileName: "",
        myFileHandle: {}
      };
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

    handleSubmit: function(event){
        event.preventDefault();

        var image = this.state.data_uri;
        console.log(typeof(image));
        var name = this.refs.name.getDOMNode().value.trim();
        var collection = this.refs.collection.getDOMNode().value.trim();
        var description = this.refs.description.getDOMNode().value.trim();
        var this_component = this;

        if (!name || !description) {
          this_component.setState({error_message: "Don't leave the name or description boxes blank!"});
          return;
        }
        $.post("new_article", {name:name, image:image, collection:collection, description:description})
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
                <input id="image_upload" ref="image_upload" type="file" onChange={this.handleChange} />
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
