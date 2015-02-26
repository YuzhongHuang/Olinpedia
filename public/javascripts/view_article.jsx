var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <Toolbar />
            <Article url={this.props.url} />
        </div>
    );
  }
});

var initialName = document.getElementById('initial-name').innerHTML;
var initialUrl = '/get_article/'+initialName
console.log(initialUrl);

React.render(
  <Wiki url={initialUrl} />,
  document.getElementById('content')
);
