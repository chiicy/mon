var Internal = /** @class */ (function () {
    function Internal() {
    }
    Internal.prototype.listen = function (listener) {
        var _listener = listener;
        _listener._next = listener.next;
        this._il = _listener;
    };
    Internal.prototype.emit = function () {
        this._il._next();
    };
    return Internal;
}());
var listener = {
    next: function () { console.log('next0'); }
};
var internal = new Internal();
internal.listen(listener);
listener.next = function () { return console.log('next1'); };
internal.emit();
