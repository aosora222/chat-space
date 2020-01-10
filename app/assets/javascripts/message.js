$(function(){ 
  function buildHTML(message){
   if ( message.image ) {
     var html =
      `<div class="chat-main__message__list">
        <div class="chat-main__message__list__info">
          <div class="chat-main__message__list__info__name">
            ${message.user_nickname}
          </div>
          <div class="chat-main__message__list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message__list__comment">
            <p class="chat-main__message__list__comment__content">
            ${message.content}
            </p>
            <img class="lower-message__image" src="${message.image}"></img>
        </div>
      </div>`
     return html;
   } else {
     var html =
      `<div class="chat-main__message__list">
        <div class="chat-main__message__list__info">
          <div class="chat-main__message__list__info__name">
            ${message.user_nickname}
          </div>
          <div class="chat-main__message__list__info__date">
            ${message.created_at}
          </div>
        </div>
        <div class="chat-main__message__list__comment">
            <p class="chat-main__message__list__comment__content">
            ${message.content}
            </p>
        </div>
      </div>`
     return html;
   };
 }
$('#new_message').on('submit', function(e){
 e.preventDefault();
 var formData = new FormData(this);
 var url = $(this).attr('action');
 $.ajax({
   url: url,
   type: "POST",
   data: formData,
   dataType: 'json',
   processData: false,
   contentType: false
 })
  .done(function(data){
    var html = buildHTML(data);
    $('.chat-main__message').append(html);
    $('.chat-main__message').animate({ scrollTop: $('.chat-main__message')[0].scrollHeight});
    $('#message_content').val('')
    $('#message_image').val('')
    $('form')[0].reset();
    $('.form__submit').prop('disabled', false);
  })
  .fail(function() {
    alert("メッセージ送信に失敗しました");
});
})
});