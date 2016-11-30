function consultasRequest(handleData,request) {
  $.ajax({
    url:"http://localhost:8012/elreach/php/classes/index.php",
    type: 'POST',
    data: {consulta: request, id: user_id},  
    success:function(data) {
      handleData(jQuery.parseJSON(data)); 
    }
  });
}