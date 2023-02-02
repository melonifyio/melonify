function urlify(text: string, title?: string, color?: string) {
  var urlRegex = /(https?:\/\/[^\s]+)/g;
  return text.replace(urlRegex, function (url) {
    return (
      '<a href="' +
        url +
        '" target="_blank" style="color: ' +
        color +
        '; ">' +
        title || url + "</a>"
    );
  });
}

export default urlify;
