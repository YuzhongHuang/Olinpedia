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
    handleSubmit: function(event){
        event.preventDefault();
        var name = this.refs.name.getDOMNode().value.trim();
        var grade = this.refs.grade.getDOMNode().value.trim();
        var description = this.refs.description.getDOMNode().value.trim();
        if (!name || !grade || !description) {
          console.log(grade);
          console.log(description);
          return;
        }
        $.post("new_article", {name:name, grade:grade, description:description})
            .done(
                function(data, status){
                    console.log('Posted!');
                    window.location.replace('/view/' + data.name);
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
                <select id="grade" ref="grade">
                    <option id="freshmen">freshmen</option>
                    <option id="sophomore">sophomore</option>
                    <option id="junior">junior</option>
                    <option id="senior">senior</option>
                </select>
                Article description
                <textarea id="description" ref="description"></textarea>
                <p> image </p>
                <input id="article_submit_button" className="button" type="submit" value="Submit new article!"></input>
            </form>
        </div>
      );
    }
});

var Wiki = React.createClass({
  render: function() {
    return (
        <div className="wiki">
            <NewArticleForm />
        </div>
    );
  }
});

React.render(
  <Wiki />,
  document.getElementById('content')
);
