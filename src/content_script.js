var translate = function(text, callback) {
    /*
     * curl -i "http://fanyi.baidu.com/transapi" -d "from=en&to=zh&query=apple
     */
    var xhr = new XMLHttpRequest();
    xhr.open('POST', 'http://fanyi.baidu.com/transapi', true);
    xhr.onloadend = function() {
        var resp = JSON.parse(this.responseText);
        callback(getMeaning(resp));
    };
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded; charset=UTF-8');
    xhr.send('from=en&to=zh&query=' + encodeURIComponent(text));
}
, getMeaning = function(raw) {
    return raw.data.map(function(item) {
        return item.dst;
    });
}
, display = function(meanings, x, y) {
    var ui = document.createElement('div');
    ui.textContent = meanings;
    ui.classList.add('meaning-ui');
    ui.style.top = y + 'px';
    ui.style.left = x + 'px';
    document.body.appendChild(ui);
    setTimeout(function() {
        document.body.removeChild(ui);
    }, 2000);
};
document.addEventListener('mouseup', function(e) {
    var selectedText = getSelection().toString();
    if (selectedText) {
        translate(selectedText, function(result) {
            display(result, e.pageX, e.pageY);
        });
    }
});
