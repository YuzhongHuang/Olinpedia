var $form = $("#new_article_form");

var onSuccess = function(data, status){
    console.log('Posted!');
    window.location.replace('/view/' + data.name);
}

var onError = function(data, status) {
    console.log("status", status);
    console.log("error", data);
}

$form.submit(function(event) {
    console.log($form.serialize());
    event.preventDefault();
    $.post("new_article", $form.serialize())
        .done(onSuccess)
        .error(onError);
});
