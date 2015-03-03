var NewArticleForm = React.createClass({
    getInitialState: function() {
      return {
        myFileName: "",
        myFileHandle: {},
        selected_file: 'No file selected!'
      };
    },

    handleChange: function(e) {
      var reader = new FileReader();
      var file = e.target.files[0];

      reader.onload = function(upload) {
        this.setState({
          selected_file: file,
          data_uri: upload.target.result
        });
      }.bind(this);

      reader.readAsDataURL(file);
    },

    handleSubmit: function(event){
        event.preventDefault();
        if (!this.state.data_uri) {
          image="../images/default.jpg";
        } else {
          var image = this.state.data_uri;
        }
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
            <form className="newArticleForm" onSubmit={this.handleSubmit}>
                <div id="title_enter_div">
                    <input id="title_enter" type="text" ref="name" placeholder="Enter title here!"></input> 
                    <span id="collection_select"> Collection (Optional) <CollectionList ref="collection" /> </span>
                </div>
                <hr></hr>
                <div id="text_area_div">
                    <textarea id="new_article_description" ref="description" placeholder="Enter description here!"></textarea> <br></br>
                </div>
                <div id="image_upload_div" className="button">
                    <span>Upload Image</span>
                    <input id="image_upload_button" ref="image_upload" type="file" onChange={this.handleChange} />
                </div>
                <span>{this.state.selected_file}</span>
                <div id="article_submit_button_div">
                    <input id="article_submit_button" className="button" type="submit" value="Submit new article!"></input>
                </div>
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
