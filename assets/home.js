$('document').ready(function () {

  //creating Post



  let createPost = function () {
    let newPostForm = $('#new-post-form');
    newPostForm.submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/post/create',
        data: newPostForm.serialize(),
        success: function (data) {
          let newPost = newPostDom(data.data);
          $('#post-content>ul').prepend(newPost);
          deletePost($(' .delete-post-button', newPost));
          createComment($(' .new-comments', newPost));
          if (newPost)
            notynotification("Post Published");
        },
        error: function (err) {
          notynotification("Sign-in to make any action");
        }
      })
    });
  }
  let newPostDom = function (post) {
    if (!post) {
      notynotification("Post can't be Empty");
      return;
    }
    return $(`<li id="post-${post.post._id}" style="background-color:rgb(247, 247, 247); width: 700px;">
          <span>${post.post.content}</span>
            <large><a class="delete-post-button" href="/post/Delete/?id=${post.post._id}&user=${post.post.user}">Delete</a></large>
          <br>
          <span style="font-size: 18px; color: black;">Author:- <a href="/users/profile/${post.post.user}">${post.user.name}</a></span>
          <p><strong>Answers :</strong></p>
          <div class="post-comments-list">
           <ul id="post-comment-${post.post._id}">
           </ul>
          <div>
          <div class="post-comments">
            <form action="/comments/create" method="post" class="new-comments">
            <textarea name="content" cols="30" rows="3" placeholder="Add Your Answer.."></textarea>
             <input type="hidden" name="post" value=${post.post._id}>
             <input type="submit" value="Add">
            </form>
          </div>
      </li> 
      `)
  }

  createPost();


  // deleting Post


  let deletePost = function (del) {
    $(del).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(del).prop('href'),
        success: function (data) {
          $(`#post-${data.data}`).hide(1000);
          notynotification("Post deleted");
        },
        error: function (err) {
          console.log(err);
          notynotification("post can't be deleted");
        }
      })
    })

  }
  let a = $('a.delete-post-button');
  Array.from(a).forEach(function (del_butt) {
    deletePost(del_butt);
  })



  // noty notification



  function notynotification(message) {
    new Noty({
      theme: 'relax',
      text: message,
      type: 'success',
      layout: 'topRight',
      timeout: 1500
    }).show();
  }




  //creating comments



  let createComment = function (comment) {
    $(comment).submit(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'post',
        url: '/comments/create',
        data: $(comment).serialize(),
        success: function (data) {
          let newCommentElement = newCommentDom(data);
          update_btn($(' .upvote-button',newCommentElement));

          let post_id = `post-comment-${data.data.post._id}`;
          $(`#${post_id}`).prepend(newCommentElement);
          deleteComment($(' .delete-comment', newCommentElement));
          let x = `empty-${data.data.post._id}`;
          $(`#${x}`).hide();
          notynotification("Comment Added");
        },
        error: function (err) {
           notynotification(`Answers can't be Empty`);
        }
      })
    })
  }
  let all_newComment = $('.new-comments');
  Array.from(all_newComment).forEach(function (c) {
    createComment(c);
  });


  let newCommentDom = function (data) {
    return $(`<li id="comment-${data.data.comment._id}">
          ${data.data.comment.content}
           <br>
          <large> <a class="upvote-button" href="/like/toggle/?id=${data.data.comment._id}"><i class="fas fa-thumbs-up">Upvote</i></a> </large>
           <span class="count${data.data.comment._id}">0</span>
            <small><a style="text-decoration: none; font-size:16px;" href="/comments/destroy/${data.data.comment._id}" class="delete-comment">&emsp;&nbsp;<i class="fa-solid fa-trash-can">Delete</i></a></small>
             <br>
              <small> created by:- <a href="/users/profile/${data.data.user._id}">${data.data.user.name}</a></small>
     </li>`);
  }


// deleting comments


  let deleteComment = function (comment) {
    $(comment).click(function (e) {
      e.preventDefault();
      $.ajax({
        type: 'get',
        url: $(comment).prop('href'),
        success: function (data) {
          $(`#comment-${data.comment._id}`).hide(1000);
          notynotification("Comment deleted");
        },
        error: function (err) {
          console.log(err);
        }
      })
    });
  }
  Array.from($('.delete-comment')).forEach(function (c) {
    deleteComment(c);
  })

// upvoting an answer
   let update_btn = function(btn){
       $(btn).click(function(e)
       {
          e.preventDefault();
          $.ajax({
             type:'get',
             url:$(btn).prop('href'),
             success:function(data){
                  let likecount=$(`.count${data.comment}`);
                   likecount[0].textContent=data.like_count;
                 notynotification(data.message);
             },
             error:function(err)
             { 
                notynotification("error happened");
             }
          })
       });
   }
    Array.from($('.upvote-button')).forEach(function(u_btn){
         update_btn(u_btn);
    });
   
});