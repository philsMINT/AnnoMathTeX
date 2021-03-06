/*
Contains functionality for sending a request to Django and receiving recommendations.
 */


$(document).ready(function () {
    $('#post-form').on('submit', function(event){
        event.preventDefault();
        create_post();
  });


    // AJAX for posting
  var fileNameDict = {'f': fileName};
  /*function create_post() {

  console.log(annotations);
  let data_dict = { the_post : $('#post-text').val(),
                    //'csrfmiddlewaretoken': '{{ csrf_token }}',
                    'csrfmiddlewaretoken': getCookie("csrftoken"),
                    'action': 'saveSession',
                    'annotations': $.param(replaceAllEqualsPlusAnn(annotations)),
                    'fileName': $.param(fileNameDict),
                    //'manualRecommendations': $.param(manualRecommendations)
                    'manualRecommendations': $.param(replaceAllEqualsPlusManualRecommendations(manualRecommendations))
                    };

  $.ajax({
      url : "file_upload/", // the endpoint
      type : "POST", // http method
      data : data_dict, // data sent with the post request

      //successful response
      success : function(json) {
          $('#post-text').val(''); // remove the value from the input
      },

      //non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>");
          console.log(xhr.status + ": " + xhr.responseText);
      }
  });
    }*/


  function create_post() {


      let data_dict = {
                    'action': 'saveSession',
                    'annotations': $.param(replaceAllEqualsPlusAnn(annotations)),
                    'fileName': $.param(fileNameDict),
                    'manualRecommendations': $.param(replaceAllEqualsPlusManualRecommendations(manualRecommendations))
                    };


      $.ajax({
        headers: {
            'Content-Type':'application/json',
            'X-CSRFToken': getCookie('csrftoken')
        },
        url: 'file_upload/',
        type: 'POST',
        action: 'test',
        //data: JSON.stringify(data_dict),
        //data: JSON.stringify({'test': annotations, 'test2': manualRecommendations, 'test3': fileNameDict, 'test4': 'saveSession'}),
        data: JSON.stringify({
                    'action': 'saveSession',
                    'annotations': annotations,
                    'fileName': fileNameDict,
                    'manualRecommendations': manualRecommendations
                    }),
        success: function(data) {
            alert('success!')
        },
        error: function(){
            alert('fail')
        }

    });
  }

});



function getRecommendations(content, mathEnv, tokenType, tokenUniqueId) {
    console.log('in getRec');
    console.log(annotations);
    let data_dict = { the_post : $("#" + tokenUniqueId).val(),
          'csrfmiddlewaretoken': getCookie("csrftoken"),
          'searchString': content,
          'tokenType': tokenType,
          'mathEnv': mathEnv,
          'uniqueId': tokenUniqueId
          };


    $.ajax({
      url : "file_upload/", // the endpoint
      type : "POST", // http method
      data : data_dict, // data sent with the post request

      //successful response
      success : function(json) {
          $("#" + tokenUniqueId).val(''); // remove the value from the input
          console.log('in success');
          return json;
      },

      //non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>");
          console.log(xhr.status + ": " + xhr.responseText);
      }
    });
}



function getWikipediaArticle(name) {

    console.log('IN WIKIPEDIA ARTICLE');

    let data_dict = { the_post : $("#" + tokenUniqueId).val(),
          'csrfmiddlewaretoken': getCookie("csrftoken"),
          'action': 'getRenderedWikipediaArticle',
          'wikipediaArticleName': name
          };


    $.ajax({
      //url : '/annotation_template_tmp.html/', // the endpoint
      url : '/test_template.html',
      type : "POST", // http method
      data : data_dict, // data sent with the post request

      //successful response
      success : function(json) {
          $("#" + tokenUniqueId).val(''); // remove the value from the input
          //console.log('in success');
          //return json;
          console.log(json);
          //renderWikipediaArticle(json);
      },

      //non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>");
          console.log(xhr.status + ": " + xhr.responseText);
      }
    });
}



function checkManualRecommendationQID(name) {

    let data_dict = {
          'csrfmiddlewaretoken': getCookie("csrftoken"),
          'action': 'checkManualRecommendationQID',
          'name': name,
          'isFormula': isFormula
          };


    $.ajax({
      //url : '/annotation_template_tmp.html/', // the endpoint
      url : '/',
      type : "POST", // http method
      data : data_dict, // data sent with the post request

      //successful response
      success : function(json) {
          addNoMatchToAnnotations(json);
      },

      //non-successful response
      error : function(xhr,errmsg,err) {
          $('#results').html("<div class='alert-box alert radius' data-alert>error: "+errmsg+
              " <a href='#' class='close'>&times;</a></div>");
          console.log(xhr.status + ": " + xhr.responseText);
      }
    });
}



