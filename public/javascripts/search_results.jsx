var Wiki = React.createClass({
  search: function() {
    var this_component = this;
    $.get('/search_article/' + this.props.search)
        .done(
          function(results) {
            if (results.article_names) {
              console.log(results.article_names);
              this_component.setState({results: results.article_names});
            } else {
              this_component.setState({results: [], message: 'No results found!'});
              console.log('no result here!');
            }
          }
        )
        .error(
          function(xhr, status, err) {
              console.error(this_component.props.url, status, err.toString());
          }
        );
  },
  getInitialState: function() {
    return {results: []};
  },
  componentDidMount: function() {
      this.search();
  },
  render: function() {
    var results = this.state.results.map(function(result){
        var url = '/view_article/'+result;
        return <div className="result"> <a href={url} className="result_link">{result}</a> </div>
    });
    return (
        <div className="wiki">
            <Toolbar />
            <div id="article">
                <div id="search_results">
                    {results}
                </div>
            </div>
            <div id="error_message">
                {this.state.message}
            </div>
        </div>
    );
  }
});

var search = document.getElementById('search').innerHTML;

React.render(
  <Wiki search={search}/>,
  document.getElementById('content')
);
