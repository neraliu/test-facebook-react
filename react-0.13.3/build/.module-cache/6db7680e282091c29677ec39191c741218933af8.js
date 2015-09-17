/*
| Context                       | Contextual Filtering  |
---------------------------------------------------------
| HTML                          | Yes                   |
| Comment                       | Compliation error	|
| Attr Name                     | Compliation error	|

| Double Quoted Attr Value      | Place holder will be trimed out |
| Single Quoted Attr Value      | Place holder will be trimed out |
| UnQuoted Attr Value           | Place holder will be trimed out |

| Quoted Attr Value / CSS       | ?			|
| Quoted Attr Value / URI       | ?			|

| <script> tag                  | No, not executable 	|
| <style> tag                   | No			|
*/

var CommentBox = React.createClass({displayName: "CommentBox",
  render: function() {
    return (
      React.createElement("div", {className: "commentBox"}, 
        React.createElement("h1", null, "Comments"), 
        React.createElement(CommentList, {data: this.props.data}), 
        React.createElement(CommentForm, null)
      )
    );
  }
});

var CommentList = React.createClass({displayName: "CommentList",
  render: function() {
    var commentNodes = this.props.data.map(function (comment) {
      return (
        React.createElement(Comment, {author: comment.author}, 
          comment.text
        )
      );
    });
    return (
      React.createElement("div", {className: "commentList"}, 
        commentNodes
      )
    );
  }
});

var CommentForm = React.createClass({displayName: "CommentForm",
  render: function() {
    return (
      React.createElement("div", {className: "commentForm"}, 
        "Hello, world! I am a CommentForm."
      )
    );
  }
});

/* NOTE:
the double/single quote within the JSX represent a string
*/

var Comment = React.createClass({displayName: "Comment",
  render: function() {
    return (
      React.createElement("div", {className: "comment"}, 
        React.createElement("h2", {className: "commentAuthor"}, this.props.author), 
        React.createElement("div", null, this.props.data1)
      )
    );
  }
});

/* 
result of <h3 class="{this.props.author}"></h3>
	<h3 data-reactid=".0.1.0.1"></h3>
result of <h3 class='{this.props.author}'></h3>
	<h3 data-reactid=".0.1.0.1"></h3>
result of <h3 class={this.props.author}></h3>
	<h3 data-reactid=".0.1.0.1"></h3>
*/

var data = [
  {author: "Pete Hunt", text: "This is one comment",
    data1: ">< '\"&"
  },
];

React.render(
  React.createElement(CommentBox, {data: data}),
  document.getElementById('content')
);
