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
            Collection title 
            <form className="newCollectionForm" onSubmit={this.handleSubmit}>
                <input id="name" type="text" ref="name"></input>
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
