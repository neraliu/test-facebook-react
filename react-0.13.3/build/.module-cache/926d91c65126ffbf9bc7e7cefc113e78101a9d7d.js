/*
| Context                       | Contextual Filtering  |
---------------------------------------------------------
| HTML                          | Yes                   |
| Comment                       | Compliation error	|
| Attr Name                     | Compliation error	|

| Double Quoted Attr Value      | Yes			|
| Single Quoted Attr Value      | Yes			|
| UnQuoted Attr Value           | Yes			|
| Note: https://facebook.github.io/react/docs/tags-and-attributes.html

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
        React.createElement(Comment, {author: comment.author, data1: comment.data1, data2: comment.data2, data3: comment.data3, data4: comment.data4}, 
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
        React.createElement("div", null, this.props.data1), 

        React.createElement("div", {className: "{this.props.data2}"}, this.props.data2), 
        React.createElement("div", {className: "{this.props.data2}"}, this.props.data2), 
        React.createElement("div", {className: this.props.data2}, this.props.data2), 

        React.createElement("div", null, React.createElement("a", {href: this.props.data3}, this.props.data3)), 
        React.createElement("div", null, React.createElement("a", {href: "javascript:alert('{this.props.data4}');"}, this.props.data4)), 
        React.createElement("div", null, React.createElement("a", {href: "javascript:alert({this.props.data4});"}, this.props.data4))

      )
    );
  }
});

/* 
result: the attribute name within the JSX has its own defined name!
for example <div class="{this.props.data}"> does not take effect,
instead you need to use this <div className="{this.props.data}">.
*/

var data = [
  {author: "Pete Hunt", text: "This is one comment",
    data1: ">< '\"&",
    data2: ">< '\"&",
    data3: "javascript:alert(0);",
    data4: ");alert(0);//",
  },
];

React.render(
  React.createElement(CommentBox, {data: data}),
  document.getElementById('content')
);
