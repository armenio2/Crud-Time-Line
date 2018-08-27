window.onload = function () {
    getApiPost()
}
//axios.defaults.baseURL = "https://jsonplaceholder.typicode.com";   ---- melhor forma de se usar axios via documentation
var api = "https://jsonplaceholder.typicode.com/posts"
function getApiPost(){

    axios.get(api)
        .then(function (response) {
            // handle success
            createArray(response.data)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function createArray(arrayPost){
    arrayPost.forEach(element => {
        createPost(element)
    });
}

function createPost(element) {
    var template = `<div  class=\"card text-white bg-dark mb-3\"  id=\"post-${element.id}\"  style=\"width: 18rem; margin-top: 25px;\"  ><img class=\"card-img-top\" src=\"images/01.jpg\"alt=\"Card image cap\"><div class=\"card-body\"><h5 class=\"card-title\">${element.title}</h5><p class=\"card-text\">${element.body}</p></div><div class=\"card-body\"><button type=\"button\" onclick=\"getApiComments(${element.id})\" class=\"btn btn-outline-primary\">Comments</button></div></div>`

    var contentExistent = document.getElementById("contentMiddle").innerHTML
    document.getElementById("contentMiddle").innerHTML = contentExistent + template
}

function createComments(postId,element){

    var contentId =  "post-"+postId
    var contentIdExistent = document.getElementById(contentId).innerHTML
    var template = `<div class=\"card text-white bg-secondary mb-3\" style=\"max-width: 18rem;\"><div class=\"card-header\">${element.name}</div><div class=\"card-body\"><h5 class=\"card-title\">${element.email}</h5><p class=\"card-text\">${element.body}</p></div></div>`
    document.getElementById(contentId).innerHTML = contentIdExistent + template
}

function getApiComments(element){

    console.log(element+"id element get api comments")


    axios.get(api+"/"+element+"/comments")
        .then(function (response) {
            // handle success
            createComentsArray(response.data,element)
        })
        .catch(function (error) {
            // handle error
            console.log(error);
        })
        .then(function () {
            // always executed
        });
}

function createComentsArray(arrayComments,postId){
    arrayComments.forEach(element => {
        createComments(postId,element)
    });
}