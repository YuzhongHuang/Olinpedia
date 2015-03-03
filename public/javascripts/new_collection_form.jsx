var NewCollectionForm = React.createClass({
    handleSubmit: function(event){
        event.preventDefault();
        var name = this.refs.name.getDOMNode().value.trim();
        if (!name ) {
          //self.state.error_message to indicate something to user?
          return;
        }
        $.post("new_collection", {name:name, articles:[]})
            .done(
                function(data, status){
                    console.log('Posted!');
                    window.location.replace('/view_collection/' + data.name);
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
            <form className="newCollectionForm name title" onSubmit={this.handleSubmit}>
                <input id="new_collection_name" type="text" ref="name" placeholder=" Collection Name"></input>
                <br></br>
                <br></br>
                <input id="Collection_submit_button" className="button" type="submit" value="Create new Collection!"></input>
            </form>
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
                <NewCollectionForm />
            </div>
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
