!function (a, b, c, d) {
    "use strict";
    function e(a, b, c) {
        return setTimeout(k(a, c), b)
    }

    function f(a, b, c) {
        return Array.isArray(a) ? (g(a, c[b], c), !0) : !1
    }

    function g(a, b, c) {
        var e;
        if (a)if (a.forEach)a.forEach(b, c); else if (a.length !== d)for (e = 0; e < a.length;)b.call(c, a[e], e, a), e++; else for (e in a)a.hasOwnProperty(e) && b.call(c, a[e], e, a)
    }

    function h(a, b, c) {
        for (var e = Object.keys(b), f = 0; f < e.length;)(!c || c && a[e[f]] === d) && (a[e[f]] = b[e[f]]), f++;
        return a
    }

    function i(a, b) {
        return h(a, b, !0)
    }

    function j(a, b, c) {
        var d, e = b.prototype;
        d = a.prototype = Object.create(e), d.constructor = a, d._super = e, c && h(d, c)
    }

    function k(a, b) {
        return function () {
            return a.apply(b, arguments)
        }
    }

    function l(a, b) {
        return typeof a == kb ? a.apply(b ? b[0] || d : d, b) : a
    }

    function m(a, b) {
        return a === d ? b : a
    }

    function n(a, b, c) {
        g(r(b), function (b) {
            a.addEventListener(b, c, !1)
        })
    }

    function o(a, b, c) {
        g(r(b), function (b) {
            a.removeEventListener(b, c, !1)
        })
    }

    function p(a, b) {
        for (; a;) {
            if (a == b)return!0;
            a = a.parentNode
        }
        return!1
    }

    function q(a, b) {
        return a.indexOf(b) > -1
    }

    function r(a) {
        return a.trim().split(/\s+/g)
    }

    function s(a, b, c) {
        if (a.indexOf && !c)return a.indexOf(b);
        for (var d = 0; d < a.length;) {
            if (c && a[d][c] == b || !c && a[d] === b)return d;
            d++
        }
        return-1
    }

    function t(a) {
        return Array.prototype.slice.call(a, 0)
    }

    function u(a, b, c) {
        for (var d = [], e = [], f = 0; f < a.length;) {
            var g = b ? a[f][b] : a[f];
            s(e, g) < 0 && d.push(a[f]), e[f] = g, f++
        }
        return c && (d = b ? d.sort(function (a, c) {
            return a[b] > c[b]
        }) : d.sort()), d
    }

    function v(a, b) {
        for (var c, e, f = b[0].toUpperCase() + b.slice(1), g = 0; g < ib.length;) {
            if (c = ib[g], e = c ? c + f : b, e in a)return e;
            g++
        }
        return d
    }

    function w() {
        return ob++
    }

    function x(a) {
        var b = a.ownerDocument;
        return b.defaultView || b.parentWindow
    }

    function y(a, b) {
        var c = this;
        this.manager = a, this.callback = b, this.element = a.element, this.target = a.options.inputTarget, this.domHandler = function (b) {
            l(a.options.enable, [a]) && c.handler(b)
        }, this.init()
    }

    function z(a) {
        var b, c = a.options.inputClass;
        return new (b = c ? c : rb ? N : sb ? Q : qb ? S : M)(a, A)
    }

    function A(a, b, c) {
        var d = c.pointers.length, e = c.changedPointers.length, f = b & yb && d - e === 0, g = b & (Ab | Bb) && d - e === 0;
        c.isFirst = !!f, c.isFinal = !!g, f && (a.session = {}), c.eventType = b, B(a, c), a.emit("hammer.input", c), a.recognize(c), a.session.prevInput = c
    }

    function B(a, b) {
        var c = a.session, d = b.pointers, e = d.length;
        c.firstInput || (c.firstInput = E(b)), e > 1 && !c.firstMultiple ? c.firstMultiple = E(b) : 1 === e && (c.firstMultiple = !1);
        var f = c.firstInput, g = c.firstMultiple, h = g ? g.center : f.center, i = b.center = F(d);
        b.timeStamp = nb(), b.deltaTime = b.timeStamp - f.timeStamp, b.angle = J(h, i), b.distance = I(h, i), C(c, b), b.offsetDirection = H(b.deltaX, b.deltaY), b.scale = g ? L(g.pointers, d) : 1, b.rotation = g ? K(g.pointers, d) : 0, D(c, b);
        var j = a.element;
        p(b.srcEvent.target, j) && (j = b.srcEvent.target), b.target = j
    }

    function C(a, b) {
        var c = b.center, d = a.offsetDelta || {}, e = a.prevDelta || {}, f = a.prevInput || {};
        (b.eventType === yb || f.eventType === Ab) && (e = a.prevDelta = {x: f.deltaX || 0, y: f.deltaY || 0}, d = a.offsetDelta = {x: c.x, y: c.y}), b.deltaX = e.x + (c.x - d.x), b.deltaY = e.y + (c.y - d.y)
    }

    function D(a, b) {
        var c, e, f, g, h = a.lastInterval || b, i = b.timeStamp - h.timeStamp;
        if (b.eventType != Bb && (i > xb || h.velocity === d)) {
            var j = h.deltaX - b.deltaX, k = h.deltaY - b.deltaY, l = G(i, j, k);
            e = l.x, f = l.y, c = mb(l.x) > mb(l.y) ? l.x : l.y, g = H(j, k), a.lastInterval = b
        } else c = h.velocity, e = h.velocityX, f = h.velocityY, g = h.direction;
        b.velocity = c, b.velocityX = e, b.velocityY = f, b.direction = g
    }

    function E(a) {
        for (var b = [], c = 0; c < a.pointers.length;)b[c] = {clientX: lb(a.pointers[c].clientX), clientY: lb(a.pointers[c].clientY)}, c++;
        return{timeStamp: nb(), pointers: b, center: F(b), deltaX: a.deltaX, deltaY: a.deltaY}
    }

    function F(a) {
        var b = a.length;
        if (1 === b)return{x: lb(a[0].clientX), y: lb(a[0].clientY)};
        for (var c = 0, d = 0, e = 0; b > e;)c += a[e].clientX, d += a[e].clientY, e++;
        return{x: lb(c / b), y: lb(d / b)}
    }

    function G(a, b, c) {
        return{x: b / a || 0, y: c / a || 0}
    }

    function H(a, b) {
        return a === b ? Cb : mb(a) >= mb(b) ? a > 0 ? Db : Eb : b > 0 ? Fb : Gb
    }

    function I(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return Math.sqrt(d * d + e * e)
    }

    function J(a, b, c) {
        c || (c = Kb);
        var d = b[c[0]] - a[c[0]], e = b[c[1]] - a[c[1]];
        return 180 * Math.atan2(e, d) / Math.PI
    }

    function K(a, b) {
        return J(b[1], b[0], Lb) - J(a[1], a[0], Lb)
    }

    function L(a, b) {
        return I(b[0], b[1], Lb) / I(a[0], a[1], Lb)
    }

    function M() {
        this.evEl = Nb, this.evWin = Ob, this.allow = !0, this.pressed = !1, y.apply(this, arguments)
    }

    function N() {
        this.evEl = Rb, this.evWin = Sb, y.apply(this, arguments), this.store = this.manager.session.pointerEvents = []
    }

    function O() {
        this.evTarget = Ub, this.evWin = Vb, this.started = !1, y.apply(this, arguments)
    }

    function P(a, b) {
        var c = t(a.touches), d = t(a.changedTouches);
        return b & (Ab | Bb) && (c = u(c.concat(d), "identifier", !0)), [c, d]
    }

    function Q() {
        this.evTarget = Xb, this.targetIds = {}, y.apply(this, arguments)
    }

    function R(a, b) {
        var c = t(a.touches), d = this.targetIds;
        if (b & (yb | zb) && 1 === c.length)return d[c[0].identifier] = !0, [c, c];
        var e, f, g = t(a.changedTouches), h = [], i = this.target;
        if (f = c.filter(function (a) {
            return p(a.target, i)
        }), b === yb)for (e = 0; e < f.length;)d[f[e].identifier] = !0, e++;
        for (e = 0; e < g.length;)d[g[e].identifier] && h.push(g[e]), b & (Ab | Bb) && delete d[g[e].identifier], e++;
        return h.length ? [u(f.concat(h), "identifier", !0), h] : void 0
    }

    function S() {
        y.apply(this, arguments);
        var a = k(this.handler, this);
        this.touch = new Q(this.manager, a), this.mouse = new M(this.manager, a)
    }

    function T(a, b) {
        this.manager = a, this.set(b)
    }

    function U(a) {
        if (q(a, bc))return bc;
        var b = q(a, cc), c = q(a, dc);
        return b && c ? cc + " " + dc : b || c ? b ? cc : dc : q(a, ac) ? ac : _b
    }

    function V(a) {
        this.id = w(), this.manager = null, this.options = i(a || {}, this.defaults), this.options.enable = m(this.options.enable, !0), this.state = ec, this.simultaneous = {}, this.requireFail = []
    }

    function W(a) {
        return a & jc ? "cancel" : a & hc ? "end" : a & gc ? "move" : a & fc ? "start" : ""
    }

    function X(a) {
        return a == Gb ? "down" : a == Fb ? "up" : a == Db ? "left" : a == Eb ? "right" : ""
    }

    function Y(a, b) {
        var c = b.manager;
        return c ? c.get(a) : a
    }

    function Z() {
        V.apply(this, arguments)
    }

    function $() {
        Z.apply(this, arguments), this.pX = null, this.pY = null
    }

    function _() {
        Z.apply(this, arguments)
    }

    function ab() {
        V.apply(this, arguments), this._timer = null, this._input = null
    }

    function bb() {
        Z.apply(this, arguments)
    }

    function cb() {
        Z.apply(this, arguments)
    }

    function db() {
        V.apply(this, arguments), this.pTime = !1, this.pCenter = !1, this._timer = null, this._input = null, this.count = 0
    }

    function eb(a, b) {
        return b = b || {}, b.recognizers = m(b.recognizers, eb.defaults.preset), new fb(a, b)
    }

    function fb(a, b) {
        b = b || {}, this.options = i(b, eb.defaults), this.options.inputTarget = this.options.inputTarget || a, this.handlers = {}, this.session = {}, this.recognizers = [], this.element = a, this.input = z(this), this.touchAction = new T(this, this.options.touchAction), gb(this, !0), g(b.recognizers, function (a) {
            var b = this.add(new a[0](a[1]));
            a[2] && b.recognizeWith(a[2]), a[3] && b.requireFailure(a[3])
        }, this)
    }

    function gb(a, b) {
        var c = a.element;
        g(a.options.cssProps, function (a, d) {
            c.style[v(c.style, d)] = b ? a : ""
        })
    }

    function hb(a, c) {
        var d = b.createEvent("Event");
        d.initEvent(a, !0, !0), d.gesture = c, c.target.dispatchEvent(d)
    }

    var ib = ["", "webkit", "moz", "MS", "ms", "o"], jb = b.createElement("div"), kb = "function", lb = Math.round, mb = Math.abs, nb = Date.now, ob = 1, pb = /mobile|tablet|ip(ad|hone|od)|android/i, qb = "ontouchstart"in a, rb = v(a, "PointerEvent") !== d, sb = qb && pb.test(navigator.userAgent), tb = "touch", ub = "pen", vb = "mouse", wb = "kinect", xb = 25, yb = 1, zb = 2, Ab = 4, Bb = 8, Cb = 1, Db = 2, Eb = 4, Fb = 8, Gb = 16, Hb = Db | Eb, Ib = Fb | Gb, Jb = Hb | Ib, Kb = ["x", "y"], Lb = ["clientX", "clientY"];
    y.prototype = {handler: function () {
    }, init: function () {
        this.evEl && n(this.element, this.evEl, this.domHandler), this.evTarget && n(this.target, this.evTarget, this.domHandler), this.evWin && n(x(this.element), this.evWin, this.domHandler)
    }, destroy: function () {
        this.evEl && o(this.element, this.evEl, this.domHandler), this.evTarget && o(this.target, this.evTarget, this.domHandler), this.evWin && o(x(this.element), this.evWin, this.domHandler)
    }};
    var Mb = {mousedown: yb, mousemove: zb, mouseup: Ab}, Nb = "mousedown", Ob = "mousemove mouseup";
    j(M, y, {handler: function (a) {
        var b = Mb[a.type];
        b & yb && 0 === a.button && (this.pressed = !0), b & zb && 1 !== a.which && (b = Ab), this.pressed && this.allow && (b & Ab && (this.pressed = !1), this.callback(this.manager, b, {pointers: [a], changedPointers: [a], pointerType: vb, srcEvent: a}))
    }});
    var Pb = {pointerdown: yb, pointermove: zb, pointerup: Ab, pointercancel: Bb, pointerout: Bb}, Qb = {2: tb, 3: ub, 4: vb, 5: wb}, Rb = "pointerdown", Sb = "pointermove pointerup pointercancel";
    a.MSPointerEvent && (Rb = "MSPointerDown", Sb = "MSPointerMove MSPointerUp MSPointerCancel"), j(N, y, {handler: function (a) {
        var b = this.store, c = !1, d = a.type.toLowerCase().replace("ms", ""), e = Pb[d], f = Qb[a.pointerType] || a.pointerType, g = f == tb, h = s(b, a.pointerId, "pointerId");
        e & yb && (0 === a.button || g) ? 0 > h && (b.push(a), h = b.length - 1) : e & (Ab | Bb) && (c = !0), 0 > h || (b[h] = a, this.callback(this.manager, e, {pointers: b, changedPointers: [a], pointerType: f, srcEvent: a}), c && b.splice(h, 1))
    }});
    var Tb = {touchstart: yb, touchmove: zb, touchend: Ab, touchcancel: Bb}, Ub = "touchstart", Vb = "touchstart touchmove touchend touchcancel";
    j(O, y, {handler: function (a) {
        var b = Tb[a.type];
        if (b === yb && (this.started = !0), this.started) {
            var c = P.call(this, a, b);
            b & (Ab | Bb) && c[0].length - c[1].length === 0 && (this.started = !1), this.callback(this.manager, b, {pointers: c[0], changedPointers: c[1], pointerType: tb, srcEvent: a})
        }
    }});
    var Wb = {touchstart: yb, touchmove: zb, touchend: Ab, touchcancel: Bb}, Xb = "touchstart touchmove touchend touchcancel";
    j(Q, y, {handler: function (a) {
        var b = Wb[a.type], c = R.call(this, a, b);
        c && this.callback(this.manager, b, {pointers: c[0], changedPointers: c[1], pointerType: tb, srcEvent: a})
    }}), j(S, y, {handler: function (a, b, c) {
        var d = c.pointerType == tb, e = c.pointerType == vb;
        if (d)this.mouse.allow = !1; else if (e && !this.mouse.allow)return;
        b & (Ab | Bb) && (this.mouse.allow = !0), this.callback(a, b, c)
    }, destroy: function () {
        this.touch.destroy(), this.mouse.destroy()
    }});
    var Yb = v(jb.style, "touchAction"), Zb = Yb !== d, $b = "compute", _b = "auto", ac = "manipulation", bc = "none", cc = "pan-x", dc = "pan-y";
    T.prototype = {set: function (a) {
        a == $b && (a = this.compute()), Zb && (this.manager.element.style[Yb] = a), this.actions = a.toLowerCase().trim()
    }, update: function () {
        this.set(this.manager.options.touchAction)
    }, compute: function () {
        var a = [];
        return g(this.manager.recognizers, function (b) {
            l(b.options.enable, [b]) && (a = a.concat(b.getTouchAction()))
        }), U(a.join(" "))
    }, preventDefaults: function (a) {
        if (!Zb) {
            var b = a.srcEvent, c = a.offsetDirection;
            if (this.manager.session.prevented)return void b.preventDefault();
            var d = this.actions, e = q(d, bc), f = q(d, dc), g = q(d, cc);
            return e || f && c & Hb || g && c & Ib ? this.preventSrc(b) : void 0
        }
    }, preventSrc: function (a) {
        this.manager.session.prevented = !0, a.preventDefault()
    }};
    var ec = 1, fc = 2, gc = 4, hc = 8, ic = hc, jc = 16, kc = 32;
    V.prototype = {defaults: {}, set: function (a) {
        return h(this.options, a), this.manager && this.manager.touchAction.update(), this
    }, recognizeWith: function (a) {
        if (f(a, "recognizeWith", this))return this;
        var b = this.simultaneous;
        return a = Y(a, this), b[a.id] || (b[a.id] = a, a.recognizeWith(this)), this
    }, dropRecognizeWith: function (a) {
        return f(a, "dropRecognizeWith", this) ? this : (a = Y(a, this), delete this.simultaneous[a.id], this)
    }, requireFailure: function (a) {
        if (f(a, "requireFailure", this))return this;
        var b = this.requireFail;
        return a = Y(a, this), -1 === s(b, a) && (b.push(a), a.requireFailure(this)), this
    }, dropRequireFailure: function (a) {
        if (f(a, "dropRequireFailure", this))return this;
        a = Y(a, this);
        var b = s(this.requireFail, a);
        return b > -1 && this.requireFail.splice(b, 1), this
    }, hasRequireFailures: function () {
        return this.requireFail.length > 0
    }, canRecognizeWith: function (a) {
        return!!this.simultaneous[a.id]
    }, emit: function (a) {
        function b(b) {
            c.manager.emit(c.options.event + (b ? W(d) : ""), a)
        }

        var c = this, d = this.state;
        hc > d && b(!0), b(), d >= hc && b(!0)
    }, tryEmit: function (a) {
        return this.canEmit() ? this.emit(a) : void(this.state = kc)
    }, canEmit: function () {
        for (var a = 0; a < this.requireFail.length;) {
            if (!(this.requireFail[a].state & (kc | ec)))return!1;
            a++
        }
        return!0
    }, recognize: function (a) {
        var b = h({}, a);
        return l(this.options.enable, [this, b]) ? (this.state & (ic | jc | kc) && (this.state = ec), this.state = this.process(b), void(this.state & (fc | gc | hc | jc) && this.tryEmit(b))) : (this.reset(), void(this.state = kc))
    }, process: function () {
    }, getTouchAction: function () {
    }, reset: function () {
    }}, j(Z, V, {defaults: {pointers: 1}, attrTest: function (a) {
        var b = this.options.pointers;
        return 0 === b || a.pointers.length === b
    }, process: function (a) {
        var b = this.state, c = a.eventType, d = b & (fc | gc), e = this.attrTest(a);
        return d && (c & Bb || !e) ? b | jc : d || e ? c & Ab ? b | hc : b & fc ? b | gc : fc : kc
    }}), j($, Z, {defaults: {event: "pan", threshold: 10, pointers: 1, direction: Jb}, getTouchAction: function () {
        var a = this.options.direction, b = [];
        return a & Hb && b.push(dc), a & Ib && b.push(cc), b
    }, directionTest: function (a) {
        var b = this.options, c = !0, d = a.distance, e = a.direction, f = a.deltaX, g = a.deltaY;
        return e & b.direction || (b.direction & Hb ? (e = 0 === f ? Cb : 0 > f ? Db : Eb, c = f != this.pX, d = Math.abs(a.deltaX)) : (e = 0 === g ? Cb : 0 > g ? Fb : Gb, c = g != this.pY, d = Math.abs(a.deltaY))), a.direction = e, c && d > b.threshold && e & b.direction
    }, attrTest: function (a) {
        return Z.prototype.attrTest.call(this, a) && (this.state & fc || !(this.state & fc) && this.directionTest(a))
    }, emit: function (a) {
        this.pX = a.deltaX, this.pY = a.deltaY;
        var b = X(a.direction);
        b && this.manager.emit(this.options.event + b, a), this._super.emit.call(this, a)
    }}), j(_, Z, {defaults: {event: "pinch", threshold: 0, pointers: 2}, getTouchAction: function () {
        return[bc]
    }, attrTest: function (a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.scale - 1) > this.options.threshold || this.state & fc)
    }, emit: function (a) {
        if (this._super.emit.call(this, a), 1 !== a.scale) {
            var b = a.scale < 1 ? "in" : "out";
            this.manager.emit(this.options.event + b, a)
        }
    }}), j(ab, V, {defaults: {event: "press", pointers: 1, time: 500, threshold: 5}, getTouchAction: function () {
        return[_b]
    }, process: function (a) {
        var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime > b.time;
        if (this._input = a, !d || !c || a.eventType & (Ab | Bb) && !f)this.reset(); else if (a.eventType & yb)this.reset(), this._timer = e(function () {
            this.state = ic, this.tryEmit()
        }, b.time, this); else if (a.eventType & Ab)return ic;
        return kc
    }, reset: function () {
        clearTimeout(this._timer)
    }, emit: function (a) {
        this.state === ic && (a && a.eventType & Ab ? this.manager.emit(this.options.event + "up", a) : (this._input.timeStamp = nb(), this.manager.emit(this.options.event, this._input)))
    }}), j(bb, Z, {defaults: {event: "rotate", threshold: 0, pointers: 2}, getTouchAction: function () {
        return[bc]
    }, attrTest: function (a) {
        return this._super.attrTest.call(this, a) && (Math.abs(a.rotation) > this.options.threshold || this.state & fc)
    }}), j(cb, Z, {defaults: {event: "swipe", threshold: 10, velocity: .65, direction: Hb | Ib, pointers: 1}, getTouchAction: function () {
        return $.prototype.getTouchAction.call(this)
    }, attrTest: function (a) {
        var b, c = this.options.direction;
        return c & (Hb | Ib) ? b = a.velocity : c & Hb ? b = a.velocityX : c & Ib && (b = a.velocityY), this._super.attrTest.call(this, a) && c & a.direction && a.distance > this.options.threshold && mb(b) > this.options.velocity && a.eventType & Ab
    }, emit: function (a) {
        var b = X(a.direction);
        b && this.manager.emit(this.options.event + b, a), this.manager.emit(this.options.event, a)
    }}), j(db, V, {defaults: {event: "tap", pointers: 1, taps: 1, interval: 300, time: 250, threshold: 2, posThreshold: 10}, getTouchAction: function () {
        return[ac]
    }, process: function (a) {
        var b = this.options, c = a.pointers.length === b.pointers, d = a.distance < b.threshold, f = a.deltaTime < b.time;
        if (this.reset(), a.eventType & yb && 0 === this.count)return this.failTimeout();
        if (d && f && c) {
            if (a.eventType != Ab)return this.failTimeout();
            var g = this.pTime ? a.timeStamp - this.pTime < b.interval : !0, h = !this.pCenter || I(this.pCenter, a.center) < b.posThreshold;
            this.pTime = a.timeStamp, this.pCenter = a.center, h && g ? this.count += 1 : this.count = 1, this._input = a;
            var i = this.count % b.taps;
            if (0 === i)return this.hasRequireFailures() ? (this._timer = e(function () {
                this.state = ic, this.tryEmit()
            }, b.interval, this), fc) : ic
        }
        return kc
    }, failTimeout: function () {
        return this._timer = e(function () {
            this.state = kc
        }, this.options.interval, this), kc
    }, reset: function () {
        clearTimeout(this._timer)
    }, emit: function () {
        this.state == ic && (this._input.tapCount = this.count, this.manager.emit(this.options.event, this._input))
    }}), eb.VERSION = "2.0.4", eb.defaults = {domEvents: !1, touchAction: $b, enable: !0, inputTarget: null, inputClass: null, preset: [
        [bb, {enable: !1}],
        [_, {enable: !1}, ["rotate"]],
        [cb, {direction: Hb}],
        [$, {direction: Hb}, ["swipe"]],
        [db],
        [db, {event: "doubletap", taps: 2}, ["tap"]],
        [ab]
    ], cssProps: {userSelect: "none", touchSelect: "none", touchCallout: "none", contentZooming: "none", userDrag: "none", tapHighlightColor: "rgba(0,0,0,0)"}};
    var lc = 1, mc = 2;
    fb.prototype = {set: function (a) {
        return h(this.options, a), a.touchAction && this.touchAction.update(), a.inputTarget && (this.input.destroy(), this.input.target = a.inputTarget, this.input.init()), this
    }, stop: function (a) {
        this.session.stopped = a ? mc : lc
    }, recognize: function (a) {
        var b = this.session;
        if (!b.stopped) {
            this.touchAction.preventDefaults(a);
            var c, d = this.recognizers, e = b.curRecognizer;
            (!e || e && e.state & ic) && (e = b.curRecognizer = null);
            for (var f = 0; f < d.length;)c = d[f], b.stopped === mc || e && c != e && !c.canRecognizeWith(e) ? c.reset() : c.recognize(a), !e && c.state & (fc | gc | hc) && (e = b.curRecognizer = c), f++
        }
    }, get: function (a) {
        if (a instanceof V)return a;
        for (var b = this.recognizers, c = 0; c < b.length; c++)if (b[c].options.event == a)return b[c];
        return null
    }, add: function (a) {
        if (f(a, "add", this))return this;
        var b = this.get(a.options.event);
        return b && this.remove(b), this.recognizers.push(a), a.manager = this, this.touchAction.update(), a
    }, remove: function (a) {
        if (f(a, "remove", this))return this;
        var b = this.recognizers;
        return a = this.get(a), b.splice(s(b, a), 1), this.touchAction.update(), this
    }, on: function (a, b) {
        var c = this.handlers;
        return g(r(a), function (a) {
            c[a] = c[a] || [], c[a].push(b)
        }), this
    }, off: function (a, b) {
        var c = this.handlers;
        return g(r(a), function (a) {
            b ? c[a].splice(s(c[a], b), 1) : delete c[a]
        }), this
    }, emit: function (a, b) {
        this.options.domEvents && hb(a, b);
        var c = this.handlers[a] && this.handlers[a].slice();
        if (c && c.length) {
            b.type = a, b.preventDefault = function () {
                b.srcEvent.preventDefault()
            };
            for (var d = 0; d < c.length;)c[d](b), d++
        }
    }, destroy: function () {
        this.element && gb(this, !1), this.handlers = {}, this.session = {}, this.input.destroy(), this.element = null
    }}, h(eb, {INPUT_START: yb, INPUT_MOVE: zb, INPUT_END: Ab, INPUT_CANCEL: Bb, STATE_POSSIBLE: ec, STATE_BEGAN: fc, STATE_CHANGED: gc, STATE_ENDED: hc, STATE_RECOGNIZED: ic, STATE_CANCELLED: jc, STATE_FAILED: kc, DIRECTION_NONE: Cb, DIRECTION_LEFT: Db, DIRECTION_RIGHT: Eb, DIRECTION_UP: Fb, DIRECTION_DOWN: Gb, DIRECTION_HORIZONTAL: Hb, DIRECTION_VERTICAL: Ib, DIRECTION_ALL: Jb, Manager: fb, Input: y, TouchAction: T, TouchInput: Q, MouseInput: M, PointerEventInput: N, TouchMouseInput: S, SingleTouchInput: O, Recognizer: V, AttrRecognizer: Z, Tap: db, Pan: $, Swipe: cb, Pinch: _, Rotate: bb, Press: ab, on: n, off: o, each: g, merge: i, extend: h, inherit: j, bindFn: k, prefixed: v}), typeof define == kb && define.amd ? define(function () {
        return eb
    }) : "undefined" != typeof module && module.exports ? module.exports = eb : a[c] = eb
}(window, document, "Hammer");
(function (h, k, p) {
    'use strict';
    h = ["$aria", function (c) {
        return function (e, f, a) {
            c.config("tabindex") && !f.attr("tabindex") && f.attr("tabindex", 0)
        }
    }];
    k.module("ngAria", ["ng"]).provider("$aria", function () {
        function c(a) {
            return a.replace(/-./g, function (b, a) {
                return b[1].toUpperCase()
            })
        }

        function e(a, b, g) {
            var d = c(b);
            return function (c, e, l) {
                f[d] && !l[d] && c.$watch(l[a], function (a) {
                    g && (a = !a);
                    e.attr(b, a)
                })
            }
        }

        var f = {ariaHidden: !0, ariaChecked: !0, ariaDisabled: !0, ariaRequired: !0, ariaInvalid: !0, ariaMultiline: !0, ariaValue: !0, tabindex: !0};
        this.config = function (a) {
            f = k.extend(f, a)
        };
        this.$get = function () {
            return{config: function (a) {
                return f[c(a)]
            }, $$watchExpr: e}
        }
    }).directive("ngShow", ["$aria", function (c) {
        return c.$$watchExpr("ngShow", "aria-hidden", !0)
    }]).directive("ngHide", ["$aria", function (c) {
        return c.$$watchExpr("ngHide", "aria-hidden", !1)
    }]).directive("ngModel", ["$aria", function (c) {
        function e(a, b) {
            return c.config(a) && !b.attr(a)
        }

        function f(a, b) {
            var c = a.type, d = a.role;
            return"checkbox" === (c || d) || "menuitemcheckbox" === d ? "checkbox" : "radio" === (c || d) || "menuitemradio" === d ? "radio" : "range" === c || "progressbar" === d || "slider" === d ? "range" : "textbox" === (c || d) || "TEXTAREA" === b[0].nodeName ? "multiline" : ""
        }

        return{restrict: "A", require: "?ngModel", link: function (a, b, g, d) {
            function h() {
                return d.$modelValue
            }

            function k() {
                return m ? (m = !1, function (a) {
                    a = a === g.value;
                    b.attr("aria-checked", a);
                    b.attr("tabindex", 0 - !a)
                }) : function (a) {
                    b.attr("aria-checked", a === g.value)
                }
            }

            function l(a) {
                b.attr("aria-checked", !!a)
            }

            var n = f(g, b), m = e("tabindex", b);
            switch (n) {
                case"radio":
                case"checkbox":
                    e("aria-checked", b) && a.$watch(h, "radio" === n ? k() : l);
                    break;
                case"range":
                    c.config("ariaValue") && (g.min && !b.attr("aria-valuemin") && b.attr("aria-valuemin", g.min), g.max && !b.attr("aria-valuemax") && b.attr("aria-valuemax", g.max), b.attr("aria-valuenow") || a.$watch(h, function (a) {
                        b.attr("aria-valuenow", a)
                    }));
                    break;
                case"multiline":
                    e("aria-multiline", b) && b.attr("aria-multiline", !0)
            }
            m && b.attr("tabindex", 0);
            d.$validators.required && e("aria-required", b) && a.$watch(function () {
                return d.$error.required
            }, function (a) {
                b.attr("aria-required", !!a)
            });
            e("aria-invalid", b) && a.$watch(function () {
                return d.$invalid
            }, function (a) {
                b.attr("aria-invalid", !!a)
            })
        }}
    }]).directive("ngDisabled", ["$aria", function (c) {
        return c.$$watchExpr("ngDisabled", "aria-disabled")
    }]).directive("ngClick", h).directive("ngDblclick", h)
})(window, window.angular);
!function () {
    angular.module("ngMaterial", ["ng", "ngAnimate", "ngAria", "material.core", "material.decorators", "material.animations", "material.components.bottomSheet", "material.components.button", "material.components.card", "material.components.checkbox", "material.components.content", "material.components.dialog", "material.components.divider", "material.components.icon", "material.components.list", "material.components.progressCircular", "material.components.progressLinear", "material.components.radioButton", "material.components.sidenav", "material.components.slider", "material.components.sticky", "material.components.subheader", "material.components.swipe", "material.components.switch", "material.components.tabs", "material.components.textField", "material.components.toast", "material.components.toolbar", "material.components.tooltip", "material.components.whiteframe", "material.services.aria", "material.services.attrBind", "material.services.compiler", "material.services.interimElement", "material.services.registry"])
}(), function () {
    angular.module("material.core", []).run(function () {
        if ("undefined" == typeof Hammer)throw new Error("ngMaterial requires HammerJS to be preloaded.")
    })
}(), function () {
    angular.module("material.core").constant("$mdConstant", {KEY_CODE: {ENTER: 13, ESCAPE: 27, SPACE: 32, LEFT_ARROW: 37, UP_ARROW: 38, RIGHT_ARROW: 39, DOWN_ARROW: 40}})
}(), function () {
    angular.module("material.core").factory("$mdUtil", function () {
        function e(e, t) {
            function n() {
                return[].concat($)
            }

            function i() {
                return $.length
            }

            function r(e) {
                return $.length && e > -1 && e < $.length
            }

            function a(e) {
                return e ? r(d(e) + 1) : !1
            }

            function o(e) {
                return e ? r(d(e) - 1) : !1
            }

            function c(e) {
                return r(e) ? $[e] : null
            }

            function l(e, t) {
                return $.filter(function (n) {
                    return n[e] === t
                })
            }

            function s(e, t) {
                return e ? (angular.isNumber(t) || (t = $.length), $.splice(t, 0, e), d(e)) : -1
            }

            function u(e) {
                m(e) && $.splice(d(e), 1)
            }

            function d(e) {
                return $.indexOf(e)
            }

            function m(e) {
                return e && d(e) > -1
            }

            function f(e, n) {
                if (n = n || h, m(e)) {
                    var i = d(e) + 1, a = r(i) ? $[i] : t ? v() : null;
                    return n(a) ? a : f(a, n)
                }
                return null
            }

            function p(e, n) {
                if (n = n || h, m(e)) {
                    var i = d(e) - 1, a = r(i) ? $[i] : t ? g() : null;
                    return n(a) ? a : p(a, n)
                }
                return null
            }

            function v() {
                return $.length ? $[0] : null
            }

            function g() {
                return $.length ? $[$.length - 1] : null
            }

            var h = function () {
                return!0
            };
            t = !!t;
            var $ = e || [];
            return{items: n, count: i, inRange: r, contains: m, indexOf: d, itemAt: c, findBy: l, add: s, remove: u, first: v, last: g, next: f, previous: p, hasPrevious: o, hasNext: a}
        }

        var t, n = /([\:\-\_]+(.))/g, i = ["0", "0", "0"];
        return t = {now: window.performance ? angular.bind(window.performance, window.performance.now) : Date.now, ancestorHasAttribute: function (e, t, n) {
            n = n || 4;
            for (var i = e; n-- && i.length;) {
                if (i[0].hasAttribute && i[0].hasAttribute(t))return!0;
                i = i.parent()
            }
            return!1
        }, isParentDisabled: function (e, n) {
            return t.ancestorHasAttribute(e, "disabled", n)
        }, elementIsSibling: function (e, t) {
            return e.parent().length && e.parent()[0] === t.parent()[0]
        }, camelCase: function (e) {
            return e.replace(n, function (e, t, n, i) {
                return i ? n.toUpperCase() : n
            })
        }, stringFromTextBody: function (e, t) {
            var n = e.trim();
            return n.split(/\s+/).length > t && (n = e.split(/\s+/).slice(1, t + 1).join(" ") + "..."), n
        }, iterator: e, debounce: function (e, t, n) {
            var i;
            return function () {
                var r = this, a = arguments;
                clearTimeout(i), i = setTimeout(function () {
                    i = null, n || e.apply(r, a)
                }, t), n && !i && e.apply(r, a)
            }
        }, throttle: function (e, n) {
            var i;
            return function () {
                var r = this, a = arguments, o = t.now();
                (!i || i - o > n) && (e.apply(r, a), i = o)
            }
        }, wrap: function (e, t, n) {
            e.hasOwnProperty(0) && (e = e[0]);
            var i = document.createElement(t);
            return i.className += n, i.appendChild(e.parentNode.replaceChild(i, e)), angular.element(i)
        }, nextUid: function () {
            for (var e, t = i.length; t;) {
                if (t--, e = i[t].charCodeAt(0), 57 == e)return i[t] = "A", i.join("");
                if (90 != e)return i[t] = String.fromCharCode(e + 1), i.join("");
                i[t] = "0"
            }
            return i.unshift("0"), i.join("")
        }, disconnectScope: function (e) {
            if (e && e.$root !== e && !e.$$destroyed) {
                var t = e.$parent;
                e.$$disconnected = !0, t.$$childHead === e && (t.$$childHead = e.$$nextSibling), t.$$childTail === e && (t.$$childTail = e.$$prevSibling), e.$$prevSibling && (e.$$prevSibling.$$nextSibling = e.$$nextSibling), e.$$nextSibling && (e.$$nextSibling.$$prevSibling = e.$$prevSibling), e.$$nextSibling = e.$$prevSibling = null
            }
        }, reconnectScope: function (e) {
            if (e && e.$root !== e && e.$$disconnected) {
                var t = e, n = t.$parent;
                t.$$disconnected = !1, t.$$prevSibling = n.$$childTail, n.$$childHead ? (n.$$childTail.$$nextSibling = t, n.$$childTail = t) : n.$$childHead = n.$$childTail = t
            }
        }}
    }), angular.element.prototype.focus = angular.element.prototype.focus || function () {
        return this.length && this[0].focus(), this
    }, angular.element.prototype.blur = angular.element.prototype.blur || function () {
        return this.length && this[0].blur(), this
    }
}(), function () {
    angular.module("material.decorators", []).config(["$provide", function (e) {
        function t(e) {
            return e.debounce = function (t) {
                var n, i, r, a;
                return function () {
                    n = arguments, a = this, r = t, i || (i = !0, e(function () {
                        r.apply(a, n), i = !1
                    }))
                }
            }, e
        }

        e.decorator("$$rAF", ["$delegate", "$rootScope", t])
    }])
}(), function () {
    function e(e, t, n, i) {
        function r(e) {
            return l ? "webkit" + e.charAt(0).toUpperCase() + e.substring(1) : e
        }

        function a(e, n, r) {
            function a(t) {
                t.target === e[0] && (e.off(c.TRANSITIONEND_EVENT, a), l.resolve())
            }

            var l = i.defer();
            n.append(e);
            var s;
            if (r) {
                var u = r[0].getBoundingClientRect();
                s = o(u.left - e[0].offsetWidth, u.top - e[0].offsetHeight, 0) + " scale(0.2)"
            } else s = "translate3d(0,100%,0) scale(0.5)";
            return e.css(c.TRANSFORM, s).css("opacity", 0), t(function () {
                t(function () {
                    e.addClass("active").css(c.TRANSFORM, "").css("opacity", "").on(c.TRANSITIONEND_EVENT, a)
                })
            }), l.promise
        }

        function o(e, t, n) {
            return"translate3d(" + Math.floor(e) + "px," + Math.floor(t) + "px," + Math.floor(n) + "px)"
        }

        var c, l = /webkit/i.test(n.vendorPrefix);
        return c = {popIn: a, TRANSITIONEND_EVENT: "transitionend" + (l ? " webkitTransitionEnd" : ""), ANIMATIONEND_EVENT: "animationend" + (l ? " webkitAnimationEnd" : ""), TRANSFORM: r("transform"), TRANSITION: r("transition"), TRANSITION_DURATION: r("transitionDuration"), ANIMATION_PLAY_STATE: r("animationPlayState"), ANIMATION_DURATION: r("animationDuration"), ANIMATION_NAME: r("animationName"), ANIMATION_TIMING: r("animationTimingFunction"), ANIMATION_DIRECTION: r("animationDirection")}
    }

    angular.module("material.animations", ["material.core"]).service("$mdEffects", ["$rootElement", "$$rAF", "$sniffer", "$q", e])
}(), function () {
    function e(e) {
        return function (t, n, i) {
            "checkbox" == i.inkRipple ? e.attachCheckboxBehavior(n) : e.attachButtonBehavior(n)
        }
    }

    function t(e, t, n, i) {
        function r(e) {
            return o(e, {mousedown: !0, center: !1, animationDuration: 350, mousedownPauseTime: 175, animationName: "inkRippleButton", animationTimingFunction: "linear"})
        }

        function a(e) {
            return o(e, {mousedown: !0, center: !0, animationDuration: 300, mousedownPauseTime: 180, animationName: "inkRippleCheckbox", animationTimingFunction: "linear"})
        }

        function o(t, r) {
            function a() {
                return!t[0].hasAttribute("disabled")
            }

            function o(i, a, o) {
                var c = angular.element('<div class="md-ripple">').css(n.ANIMATION_DURATION, r.animationDuration + "ms").css(n.ANIMATION_NAME, r.animationName).css(n.ANIMATION_TIMING, r.animationTimingFunction).on(n.ANIMATIONEND_EVENT, function () {
                    c.remove()
                });
                s || (s = angular.element('<div class="md-ripple-container">'), t.append(s)), s.append(c);
                var d = s.prop("offsetWidth");
                if (r.center)i = d / 2, a = s.prop("offsetHeight") / 2; else if (o) {
                    var m = u.getBoundingClientRect();
                    i -= m.left, a -= m.top
                }
                l && (a += l.$element.prop("scrollTop"));
                var f = {"background-color": e.getComputedStyle(c[0]).color || e.getComputedStyle(u).color, "border-radius": d / 2 + "px", left: i - d / 2 + "px", width: d + "px", top: a - d / 2 + "px", height: d + "px"};
                return f[n.ANIMATION_DURATION] = r.fadeoutDuration + "ms", c.css(f), c
            }

            function c(e) {
                e.eventType === Hammer.INPUT_START && e.isFirst && a() ? (f = o(e.center.x, e.center.y, !0), m = i(function () {
                    f && f.css(n.ANIMATION_PLAY_STATE, "paused")
                }, r.mousedownPauseTime, !1), f.on("$destroy", function () {
                    f = null
                })) : e.eventType === Hammer.INPUT_END && e.isFinal && (i.cancel(m), f && f.css(n.ANIMATION_PLAY_STATE, ""))
            }

            if (t.controller("noink"))return angular.noop;
            var l = t.controller("mdContent");
            r = angular.extend({mousedown: !0, hover: !0, focus: !0, center: !1, animationDuration: 300, mousedownPauseTime: 150, animationName: "", animationTimingFunction: "linear"}, r || {});
            var s, u = t[0], d = new Hammer(u);
            return r.mousedown && d.on("hammer.input", c), function () {
                d.destroy(), s && s.remove()
            };
            var m, f
        }

        return{attachButtonBehavior: r, attachCheckboxBehavior: a, attach: o}
    }

    angular.module("material.animations").directive("inkRipple", ["$mdInkRipple", e]).factory("$mdInkRipple", ["$window", "$$rAF", "$mdEffects", "$timeout", "$mdUtil", t])
}(), function () {
    function e() {
        return function () {
            return{controller: angular.noop}
        }
    }

    angular.module("material.animations").directive({noink: e(), nobar: e(), nostretch: e()})
}(), function () {
    function e() {
        return{restrict: "E"}
    }

    function t(e, t, n, i) {
        function r(e, n, r) {
            c = angular.element('<md-backdrop class="opaque ng-enter">'), c.on("click touchstart", function () {
                i(l.cancel)
            }), t.enter(c, r.parent, null);
            var a = new o(n);
            return r.bottomSheet = a, r.targetEvent && angular.element(r.targetEvent.target).blur(), t.enter(a.element, r.parent)
        }

        function a(e, n, i) {
            var r = i.bottomSheet;
            return t.leave(c), t.leave(r.element).then(function () {
                r.cleanup(), i.targetEvent && angular.element(i.targetEvent.target).focus()
            })
        }

        function o(e) {
            function t(t) {
                t.preventDefault(), p = t.target, u = o(t), f = e.css(n.TRANSITION_DURATION), e.css(n.TRANSITION_DURATION, "0s")
            }

            function r(t) {
                e.css(n.TRANSITION_DURATION, f);
                var r = o(t);
                Math.abs(r - u) < 5 && t.target == p ? angular.element(t.target).triggerHandler("click") : m > h ? i(l.cancel) : c(void 0)
            }

            function a(e) {
                var t = o(e), n = t - u;
                m = t - d, d = t, n = s(n), c(n + v)
            }

            function o(e) {
                var t = e.touches && e.touches.length ? e.touches[0] : e.changedTouches[0];
                return t.clientY
            }

            function c(t) {
                null === t || void 0 === t ? e.css(n.TRANSFORM, "") : e.css(n.TRANSFORM, "translate3d(0, " + t + "px, 0)")
            }

            function s(e) {
                if (0 > e && -v + g > e) {
                    e = -e;
                    var t = v - g;
                    e = Math.max(-v, -Math.min(v - 5, t + g * (e - t) / v) - e / 50)
                }
                return e
            }

            var u, d, m, f, p, v = 80, g = 20, h = 10;
            return e = e.eq(0), e.on("touchstart", t), e.on("touchmove", a), e.on("touchend", r), {element: e, cleanup: function () {
                e.off("touchstart", t), e.off("touchmove", a), e.off("touchend", r)
            }}
        }

        var c, l;
        return l = e({targetEvent: null, onShow: r, onRemove: a})
    }

    angular.module("material.components.bottomSheet", ["material.services.interimElement"]).directive("mdBottomSheet", [e]).factory("$mdBottomSheet", ["$$interimElement", "$animate", "$mdEffects", "$timeout", "$$rAF", t])
}(), function () {
    function e(e, t, n, i) {
        e[0];
        return{restrict: "E", compile: function (e, r) {
            var a, o;
            return r.ngHref || r.href ? (a = angular.element("<a>"), o = ["ng-href", "href", "rel", "target"]) : (a = angular.element("<button>"), o = ["type", "disabled", "ng-disabled", "form"]), angular.forEach(o, function (e) {
                var t = i.camelCase(e);
                r.hasOwnProperty(t) && a.attr(e, r[t])
            }), a.addClass("md-button-inner").append(e.contents()).on("focus", function () {
                e.addClass("focus")
            }).on("blur", function () {
                e.removeClass("focus")
            }), e.append(a).attr("tabIndex", -1).on("focus", function () {
                a.focus()
            }), function (e, i) {
                n.expect(i, "aria-label", i.text()), t.attachButtonBehavior(i)
            }
        }}
    }

    angular.module("material.components.button", ["material.core", "material.animations", "material.services.aria"])
        .directive("mdButton", ["ngHrefDirective", "$mdInkRipple", "$mdAria", "$mdUtil", e])
}(), function () {
    function e() {
        return{restrict: "E", link: function () {
        }}
    }

    angular.module("material.components.card", []).directive("mdCard", [e])
}(), function () {
    function e(e, t, n, i) {
        function r(e, t) {
            return t.type = "checkbox", t.tabIndex = 0, e.attr("role", t.type), n.expect(e, "aria-label", e.text()), function (e, t, n, r) {
                function c(e) {
                    e.which === i.KEY_CODE.SPACE && (e.preventDefault(), l(e))
                }

                function l(n) {
                    t[0].hasAttribute("disabled") || e.$apply(function () {
                        u = !u, r.$setViewValue(u, n && n.type), r.$render()
                    })
                }

                function s() {
                    u = r.$viewValue, u ? t.addClass(o) : t.removeClass(o)
                }

                var u = !1;
                r = r || {$setViewValue: function (e) {
                    this.$viewValue = e
                }, $parsers: [], $formatters: []}, a.link.pre(e, {on: angular.noop, 0: {}}, n, [r]), t.on("click", l), t.on("keypress", c), r.$render = s
            }
        }

        var a = e[0], o = "md-checked";
        return{restrict: "E", transclude: !0, require: "?ngModel", template: '<div class="md-container" ink-ripple="checkbox"><div class="md-icon"></div></div><div ng-transclude class="md-label"></div>', compile: r}
    }

    angular.module("material.components.checkbox", ["material.core", "material.animations", "material.services.aria"]).directive("mdCheckbox", ["inputDirective", "$mdInkRipple", "$mdAria", "$mdConstant", e])
}(), function () {
    function e() {
        function e(e, t) {
            this.$scope = e, this.$element = t
        }

        return{restrict: "E", controller: ["$scope", "$element", e], link: function (e, t) {
            e.$broadcast("$mdContentLoaded", t)
        }}
    }

    angular.module("material.components.content", ["material.services.registry"]).directive("mdContent", [e])
}(), function () {
    function e(e) {
        return{restrict: "E", link: function (t, n) {
            e(function () {
                var e = n[0].querySelector(".dialog-content");
                e && e.scrollHeight > e.clientHeight && n.addClass("dialog-content-overflow")
            })
        }}
    }

    function t(e, t, n, i, r, a, o, c) {
        function l(r, a, o) {
            function l() {
                var e = a[0].querySelector(".dialog-close");
                if (!e) {
                    var t = a[0].querySelectorAll(".dialog-actions button");
                    e = t[t.length - 1]
                }
                return angular.element(e)
            }

            o.parent = angular.element(o.parent), o.popInTarget = angular.element((o.targetEvent || {}).target);
            var s = l();
            if (u(a.find("md-dialog")), o.hasBackdrop) {
                var m = angular.element('<md-backdrop class="opaque ng-enter">');
                i.enter(m, o.parent, null), o.backdrop = m
            }
            return n.popIn(a, o.parent, o.popInTarget.length && o.popInTarget).then(function () {
                o.escapeToClose && (o.rootElementKeyupCallback = function (t) {
                    t.keyCode === c.KEY_CODE.ESCAPE && e(d.cancel)
                }, t.on("keyup", o.rootElementKeyupCallback)), o.clickOutsideToClose && (o.dialogClickOutsideCallback = function (t) {
                    t.target === a[0] && e(d.cancel)
                }, a.on("click", o.dialogClickOutsideCallback)), s.focus()
            })
        }

        function s(e, n, r) {
            return r.backdrop && (i.leave(r.backdrop), n.data("backdrop", void 0)), r.escapeToClose && t.off("keyup", r.rootElementKeyupCallback), r.clickOutsideToClose && n.off("click", r.dialogClickOutsideCallback), i.leave(n).then(function () {
                n.remove(), r.popInTarget && r.popInTarget.focus()
            })
        }

        function u(e) {
            e.attr({role: "dialog"});
            var t = e.find(".dialog-content");
            0 === t.length && (t = e);
            var n = o.stringFromTextBody(t.text(), 3);
            r.expect(e, "aria-label", n)
        }

        var d;
        return d = a({hasBackdrop: !0, isolateScope: !0, onShow: l, onRemove: s, clickOutsideToClose: !0, escapeToClose: !0, targetEvent: null, transformTemplate: function (e) {
            return'<div class="md-dialog-container">' + e + "</div>"
        }})
    }

    angular.module("material.components.dialog", ["material.core", "material.animations", "material.services.compiler", "material.services.aria", "material.services.interimElement"]).directive("mdDialog", ["$$rAF", e]).factory("$mdDialog", ["$timeout", "$rootElement", "$mdEffects", "$animate", "$mdAria", "$$interimElement", "$mdUtil", "$mdConstant", t])
}(), function () {
    function e() {
    }

    function t() {
        return{restrict: "E", controller: [e]}
    }

    angular.module("material.components.divider", ["material.animations", "material.services.aria"]).directive("mdDivider", t)
}(), function () {
    function e() {
        return{restrict: "E", template: '<object class="md-icon"></object>', compile: function (e, t) {
            var n = angular.element(e[0].children[0]);
            angular.isDefined(t.icon) && n.attr("data", t.icon)
        }}
    }

    angular.module("material.components.icon", []).directive("mdIcon", [e])
}(), function () {
    function e() {
        return{restrict: "E", link: function (e, t) {
            t.attr({role: "list"})
        }}
    }

    function t() {
        return{restrict: "E", link: function (e, t) {
            t.attr({role: "listitem"})
        }}
    }

    angular.module("material.components.list", []).directive("mdList", [e]).directive("mdItem", [t])
}(), function () {
    function e(e, t) {
        function n(e) {
            return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), i
        }

        function i(e, n, i) {
            var c, l, s, u, d = n[0], m = d.querySelectorAll(".fill, .mask.full"), f = d.querySelectorAll(".fill.fix"), p = i.diameter || 48, v = p / 48;
            d.style[t.TRANSFORM] = "scale(" + v.toString() + ")", i.$observe("value", function (e) {
                for (l = r(e), s = a[l], u = o[l], n.attr("aria-valuenow", l), c = 0; c < m.length; c++)m[c].style[t.TRANSFORM] = s;
                for (c = 0; c < f.length; c++)f[c].style[t.TRANSFORM] = u
            })
        }

        function r(e) {
            return e > 100 ? 100 : 0 > e ? 0 : Math.ceil(e || 0)
        }

        for (var a = new Array(101), o = new Array(101), c = 0; 101 > c; c++) {
            var l = c / 100, s = Math.floor(180 * l);
            a[c] = "rotate(" + s.toString() + "deg)", o[c] = "rotate(" + (2 * s).toString() + "deg)"
        }
        return{restrict: "E", template: '<div class="wrapper1"><div class="wrapper2"><div class="circle"><div class="mask full"><div class="fill"></div></div><div class="mask half"><div class="fill"></div><div class="fill fix"></div></div><div class="shadow"></div></div><div class="inset"></div></div></div>', compile: n}
    }

    angular.module("material.components.progressCircular", ["material.animations", "material.services.aria"]).directive("mdProgressCircular", ["$$rAF", "$mdEffects", e])
}(), function () {
    function e(e, n) {
        function i(e) {
            return e.attr("aria-valuemin", 0), e.attr("aria-valuemax", 100), e.attr("role", "progressbar"), r
        }

        function r(i, r, o) {
            var c = r[0].querySelector(".bar1").style, l = r[0].querySelector(".bar2").style, s = angular.element(r[0].querySelector(".container"));
            o.$observe("value", function (e) {
                if ("query" != o.mode) {
                    var i = a(e);
                    r.attr("aria-valuenow", i), l[n.TRANSFORM] = t[i]
                }
            }), o.$observe("secondaryvalue", function (e) {
                c[n.TRANSFORM] = t[a(e)]
            }), e(function () {
                s.addClass("ready")
            })
        }

        function a(e) {
            return e > 100 ? 100 : 0 > e ? 0 : Math.ceil(e || 0)
        }

        return{restrict: "E", template: '<div class="container"><div class="dashed"></div><div class="bar bar1"></div><div class="bar bar2"></div></div>', compile: i}
    }

    angular.module("material.components.progressLinear", ["material.animations", "material.services.aria"]).directive("mdProgressLinear", ["$$rAF", "$mdEffects", e]);
    var t = function () {
        function e(e) {
            var t = e / 100, n = (e - 100) / 2;
            return"translateX(" + n.toString() + "%) scale(" + t.toString() + ", 1)"
        }

        for (var t = new Array(101), n = 0; 101 > n; n++)t[n] = e(n);
        return t
    }()
}(), function () {
    function e(e, t) {
        function n(e, n, i, r) {
            function a(e) {
                e.which === t.KEY_CODE.LEFT_ARROW ? (e.preventDefault(), o.selectPrevious()) : e.which === t.KEY_CODE.RIGHT_ARROW && (e.preventDefault(), o.selectNext())
            }

            var o = r[0], c = r[1] || {$setViewValue: angular.noop};
            o.init(c), n.attr({role: "radiogroup", tabIndex: "0"}).on("keydown", a)
        }

        function i(e) {
            this._radioButtonRenderFns = [], this.$element = e
        }

        function r() {
            return{init: function (e) {
                this._ngModelCtrl = e, this._ngModelCtrl.$render = angular.bind(this, this.render)
            }, add: function (e) {
                this._radioButtonRenderFns.push(e)
            }, remove: function (e) {
                var t = this._radioButtonRenderFns.indexOf(e);
                -1 !== t && this._radioButtonRenderFns.splice(t, 1)
            }, render: function () {
                this._radioButtonRenderFns.forEach(function (e) {
                    e()
                })
            }, setViewValue: function (e, t) {
                this._ngModelCtrl.$setViewValue(e, t), this.render()
            }, getViewValue: function () {
                return this._ngModelCtrl.$viewValue
            }, selectNext: function () {
                return a(this.$element, 1)
            }, selectPrevious: function () {
                return a(this.$element, -1)
            }, setActiveDescendant: function (e) {
                this.$element.attr("aria-activedescendant", e)
            }}
        }

        function a(t, n) {
            var i = e.iterator(Array.prototype.slice.call(t[0].querySelectorAll("md-radio-button")), !0);
            if (i.count()) {
                var r = t[0].querySelector("md-radio-button.md-checked"), a = i[0 > n ? "previous" : "next"](r) || i.first();
                angular.element(a).triggerHandler("click")
            }
        }

        return i.prototype = r(), {restrict: "E", controller: ["$element", i], require: ["mdRadioGroup", "?ngModel"], link: n}
    }

    function t(e, t) {
        function n(n, r, a, o) {
            function c(e) {
                r[0].hasAttribute("disabled") || n.$apply(function () {
                    o.setViewValue(a.value, e && e.type)
                })
            }

            function l() {
                var e = o.getViewValue() === a.value;
                e !== u && (u = e, r.attr("aria-checked", e), e ? (r.addClass(i), o.setActiveDescendant(r.attr("id"))) : r.removeClass(i))
            }

            function s(n, i) {
                function r() {
                    return a.id || "radio_" + t.nextUid()
                }

                i.ariaId = r(), n.attr({id: i.ariaId, role: "radio", "aria-checked": "false"}), e.expect(n, "aria-label", n.text())
            }

            var u;
            s(r, n), o.add(l), a.$observe("value", l), r.on("click", c).on("$destroy", function () {
                o.remove(l)
            })
        }

        var i = "md-checked";
        return{restrict: "E", require: "^mdRadioGroup", transclude: !0, template: '<div class="md-container" ink-ripple="checkbox"><div class="md-off"></div><div class="md-on"></div></div><div ng-transclude class="md-label"></div>', link: n}
    }

    angular.module("material.components.radioButton", ["material.core", "material.animations", "material.services.aria"]).directive("mdRadioGroup", ["$mdUtil", "$mdConstant", e]).directive("mdRadioButton", ["$mdAria", "$mdUtil", t])
}(), function () {
    function e(e, t, n, i, r, a) {
        a.register(this, n.componentId), this.isOpen = function () {
            return!!e.isOpen
        }, this.toggle = function () {
            e.isOpen = !e.isOpen
        }, this.open = function () {
            e.isOpen = !0
        }, this.close = function () {
            e.isOpen = !1
        }
    }

    function t(e) {
        return function (t) {
            var n = e.get(t);
            return n || e.notFoundError(t), {isOpen: function () {
                return n ? n.isOpen() : void 0
            }, toggle: function () {
                n && n.toggle()
            }, open: function () {
                n && n.open()
            }, close: function () {
                n && n.close()
            }}
        }
    }

    function n(e, t, n, i) {
        function r(e) {
            return e.addClass("closed"), a
        }

        function a(r, a, o, c) {
            function l(e) {
                var t = a.parent();
                e ? (a.removeClass("closed"), t.append(m), m.on("click", d), t.on("keydown", u)) : (m.remove(), m.off("click", d), t.off("keydown", u)), n(function () {
                    a.toggleClass("open", !!r.isOpen)
                })
            }

            function s(e) {
                e.target !== a[0] || r.isOpen || a.addClass("closed")
            }

            function u(e) {
                e.which === i.KEY_CODE.ESCAPE && (d(), e.preventDefault(), e.stopPropagation())
            }

            function d() {
                l(!1), e(function () {
                    c.close()
                })
            }

            var m = angular.element('<md-backdrop class="md-sidenav-backdrop">');
            r.$watch("isOpen", l), a.on(t.TRANSITIONEND_EVENT, s)
        }

        return{restrict: "E", scope: {}, controller: "$mdSidenavController", compile: r}
    }

    angular.module("material.components.sidenav", ["material.core", "material.services.registry", "material.animations"]).factory("$mdSidenav", ["$mdComponentRegistry", t]).directive("mdSidenav", ["$timeout", "$mdEffects", "$$rAF", "$mdConstant", n]).controller("$mdSidenavController", ["$scope", "$element", "$attrs", "$timeout", "$mdSidenav", "$mdComponentRegistry", e])
}(), function () {
    function e() {
        function e(e, t, n, i) {
            var r = i[0] || {$setViewValue: function (e) {
                this.$viewValue = e, this.$viewChangeListeners.forEach(function (e) {
                    e()
                })
            }, $parsers: [], $formatters: [], $viewChangeListeners: []}, a = i[1];
            a.init(r)
        }

        return{scope: {}, require: ["?ngModel", "mdSlider"], controller: ["$scope", "$element", "$attrs", "$$rAF", "$window", "$mdEffects", "$mdAria", "$mdUtil", "$mdConstant", t], template: '<div class="slider-track-container"><div class="slider-track"></div><div class="slider-track slider-track-fill"></div><div class="slider-track-ticks"></div></div><div class="slider-thumb-container"><div class="slider-thumb"></div><div class="slider-focus-thumb"></div><div class="slider-focus-ring"></div><div class="slider-sign"><span class="slider-thumb-text" ng-bind="modelValue"></span></div><div class="slider-disabled-thumb"></div></div>', link: e}
    }

    function t(e, t, n, i, r, a, o, c, l) {
        this.init = function (s) {
            function u() {
                g(), w(), v()
            }

            function d(e) {
                B = parseFloat(e), t.attr("aria-valuemin", e)
            }

            function m(e) {
                U = parseFloat(e), t.attr("aria-valuemax", e)
            }

            function f(e) {
                L = parseFloat(e), v()
            }

            function p(e) {
                t.attr("aria-disabled", !!e)
            }

            function v() {
                if (angular.isDefined(n.discrete)) {
                    var e = Math.floor((U - B) / L);
                    W || (W = angular.element('<canvas style="position:absolute;">'), Y = W[0].getContext("2d"), Y.fillStyle = "black", P.append(W));
                    var t = h();
                    W[0].width = t.width, W[0].height = t.height;
                    for (var i, r = 0; e >= r; r++)i = Math.floor(t.width * (r / e)), Y.fillRect(i - 1, 0, 2, t.height)
                }
            }

            function g() {
                K = _[0].getBoundingClientRect()
            }

            function h() {
                return z(), K
            }

            function $(n) {
                if (!t[0].hasAttribute("disabled")) {
                    var i;
                    n.which === l.KEY_CODE.LEFT_ARROW ? i = -L : n.which === l.KEY_CODE.RIGHT_ARROW && (i = L), i && ((n.metaKey || n.ctrlKey || n.altKey) && (i *= 4), n.preventDefault(), n.stopPropagation(), e.$evalAsync(function () {
                        b(s.$viewValue + i)
                    }))
                }
            }

            function b(e) {
                s.$setViewValue(T(A(e)))
            }

            function w() {
                var n = (s.$viewValue - B) / (U - B);
                e.modelValue = s.$viewValue, t.attr("aria-valuenow", s.$viewValue), y(n)
            }

            function T(e) {
                return angular.isNumber(e) ? Math.max(B, Math.min(U, e)) : void 0
            }

            function A(e) {
                return angular.isNumber(e) ? Math.round(e / L) * L : void 0
            }

            function y(e) {
                F.css("width", 100 * e + "%"), M.css(a.TRANSFORM, "translate3d(" + h().width * e + "px,0,0)"), t.toggleClass("slider-min", 0 === e)
            }

            function x(e) {
                G || e.eventType !== Hammer.INPUT_START || t[0].hasAttribute("disabled") ? G && e.eventType === Hammer.INPUT_END && (G && j && S(e), G = !1, t.removeClass("panning active")) : (G = !0, t.addClass("active"), t[0].focus(), g(), E(e), e.srcEvent.stopPropagation())
            }

            function C() {
                G && t.addClass("panning")
            }

            function E(e) {
                G && (j ? R(e.center.x) : k(e.center.x), e.preventDefault(), e.srcEvent.stopPropagation())
            }

            function S(e) {
                if (j && !t[0].hasAttribute("disabled")) {
                    var n = I(N(e.center.x)), r = T(A(n));
                    y(O(r)), i(function () {
                        b(r)
                    }), e.preventDefault(), e.srcEvent.stopPropagation()
                }
            }

            function k(t) {
                e.$evalAsync(function () {
                    b(I(N(t)))
                })
            }

            function R(e) {
                y(N(e))
            }

            function N(e) {
                return Math.max(0, Math.min(1, (e - K.left) / K.width))
            }

            function I(e) {
                return B + e * (U - B)
            }

            function O(e) {
                return(e - B) / (U - B)
            }

            var D = angular.element(t[0].querySelector(".slider-thumb")), M = D.parent(), _ = angular.element(t[0].querySelector(".slider-track-container")), F = angular.element(t[0].querySelector(".slider-track-fill")), P = angular.element(t[0].querySelector(".slider-track-ticks"));
            n.min ? n.$observe("min", d) : d(0), n.max ? n.$observe("max", m) : m(100), n.step ? n.$observe("step", f) : f(1);
            var H = angular.noop;
            n.ngDisabled ? H = e.$parent.$watch(n.ngDisabled, p) : p(!!n.disabled), o.expect(t, "aria-label"), t.attr("tabIndex", 0), t.attr("role", "slider"), t.on("keydown", $);
            var V = new Hammer(t[0], {recognizers: [
                [Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]
            ]});
            V.on("hammer.input", x), V.on("panstart", C), V.on("pan", E), V.on("panend", S), setTimeout(u);
            var q = i.debounce(u);
            angular.element(r).on("resize", q), e.$on("$destroy", function () {
                angular.element(r).off("resize", q), V.destroy(), H()
            }), s.$render = w, s.$viewChangeListeners.push(w), s.$formatters.push(T), s.$formatters.push(A);
            var B, U, L, W, Y, K = {}, z = c.throttle(g, 5e3);
            g();
            var G = !1, j = angular.isDefined(n.discrete);
            this._onInput = x, this._onPanStart = C, this._onPan = E
        }
    }

    angular.module("material.components.slider", ["material.core", "material.animations", "material.services.aria"]).directive("mdSlider", [e])
}(), function () {
    function e(e, t, n, i, r) {
        function a(e) {
            function n(e, t) {
                t.addClass("md-sticky-clone");
                var n = {element: e, clone: t};
                return f.items.push(n), d.parent().prepend(n.clone), m(), function () {
                    f.items.forEach(function (t, n) {
                        t.element[0] === e[0] && (f.items.splice(n, 1), t.clone.remove())
                    }), m()
                }
            }

            function r() {
                d[0].getBoundingClientRect();
                f.items.forEach(a), f.items = f.items.sort(function (e, t) {
                    return e.top < t.top ? -1 : 1
                });
                for (var e, t = d.prop("scrollTop"), n = f.items.length - 1; n >= 0; n--)if (t > f.items[n].top) {
                    e = f.items[n];
                    break
                }
                l(e)
            }

            function a(e) {
                var t = e.element[0];
                for (e.top = 0, e.left = 0; t && t !== d[0];)e.top += t.offsetTop, e.left += t.offsetLeft, t = t.offsetParent;
                e.height = e.element.prop("offsetHeight")
            }

            function o() {
                var e = d.prop("scrollTop"), t = e > (o.prevScrollTop || 0);
                o.prevScrollTop = e, 0 === e ? l(null) : t && f.next ? f.next.top - e <= 0 ? l(f.next) : f.current && (f.next.top - e <= f.next.height ? u(f.current, f.next.top - f.next.height - e) : u(f.current, null)) : !t && f.current && (e < f.current.top && l(f.prev), f.current && f.next && (e >= f.next.top - f.current.height ? u(f.current, f.next.top - e - f.current.height) : u(f.current, null)))
            }

            function l(e) {
                if (f.current !== e) {
                    f.current && (u(f.current, null), s(f.current, null)), e && s(e, "active"), f.current = e;
                    var t = f.items.indexOf(e);
                    f.next = f.items[t + 1], f.prev = f.items[t - 1], s(f.next, "next"), s(f.prev, "prev")
                }
            }

            function s(e, t) {
                e && e.state !== t && (e.state && (e.clone.attr("sticky-prev-state", e.state), e.element.attr("sticky-prev-state", e.state)), e.clone.attr("sticky-state", t), e.element.attr("sticky-state", t), e.state = t)
            }

            function u(e, n) {
                e && (null === n || void 0 === n ? e.translateY && (e.translateY = null, e.clone.css(t.TRANSFORM, "")) : (e.translateY = n, e.clone.css(t.TRANSFORM, "translate3d(" + e.left + "px," + n + "px,0)")))
            }

            var d = e.$element, m = i.debounce(r);
            c(d), d.on("$scrollstart", m), d.on("$scroll", o);
            var f;
            return f = {prev: null, current: null, next: null, items: [], add: n, refreshElements: r}
        }

        function o() {
            var t, n = angular.element("<div>");
            e[0].body.appendChild(n[0]);
            for (var i = ["sticky", "-webkit-sticky"], r = 0; r < i.length; ++r)if (n.css({position: i[r], top: 0, "z-index": 2}), n.css("position") == i[r]) {
                t = i[r];
                break
            }
            return n.remove(), t
        }

        function c(e) {
            function t() {
                +r.now() - a > o ? (n = !1, e.triggerHandler("$scrollend")) : (e.triggerHandler("$scroll"), i(t))
            }

            var n, a, o = 200;
            e.on("scroll touchmove", function () {
                n || (n = !0, i(t), e.triggerHandler("$scrollstart")), e.triggerHandler("$scroll"), a = +r.now()
            })
        }

        var l = o();
        return function (e, t, n) {
            var i = t.controller("mdContent");
            if (i)if (l)t.css({position: l, top: 0, "z-index": 2}); else {
                var r = i.$element.data("$$sticky");
                r || (r = a(i), i.$element.data("$$sticky", r));
                var o = r.add(t, n || t.clone());
                e.$on("$destroy", o)
            }
        }
    }

    angular.module("material.components.sticky", ["material.core", "material.components.content", "material.decorators", "material.animations"]).factory("$mdSticky", ["$document", "$mdEffects", "$compile", "$$rAF", "$mdUtil", e])
}(), function () {
    function e(e, t) {
        return{restrict: "E", replace: !0, transclude: !0, template: '<h2 class="md-subheader"><span class="md-subheader-content"></span></h2>', compile: function (n, i, r) {
            var a = n[0].outerHTML;
            return function (n, i) {
                function o(e) {
                    return angular.element(e[0].querySelector(".md-subheader-content"))
                }

                r(n, function (e) {
                    o(i).append(e)
                }), r(n, function (r) {
                    var c = t(angular.element(a))(n);
                    o(c).append(r), e(n, i, c)
                })
            }
        }}
    }

    angular.module("material.components.subheader", ["material.components.sticky"]).directive("mdSubheader", ["$mdSticky", "$compile", e])
}(), function () {
    !function () {
        function e(e, t, n) {
            return function (i, r, a) {
                var o = n.toLowerCase(), c = "md" + n, l = e(a[c]) || angular.noop, s = t(i, o), u = function (e) {
                    l(i, e)
                };
                s(r, function (e) {
                    e.type == o && u()
                })
            }
        }

        angular.module("material.components.swipe", ["ng"]).factory("$mdSwipe", function () {
            return function (e, t) {
                return t || (t = "swipeleft swiperight"), function (n, i, r) {
                    function a(t) {
                        t.srcEvent.stopPropagation(), angular.isFunction(i) && e.$apply(function () {
                            i(t)
                        })
                    }

                    function o() {
                        return l.on(t, a), function () {
                            l.off(t)
                        }
                    }

                    function c(e, t) {
                        var n = t.indexOf("pan") > -1, i = t.indexOf("swipe") > -1;
                        return n && e.push([Hammer.Pan, {direction: Hammer.DIRECTION_HORIZONTAL}]), i && e.push([Hammer.Swipe, {direction: Hammer.DIRECTION_HORIZONTAL}]), e
                    }

                    var l = new Hammer(n[0], {recognizers: c([], t)});
                    return r || o(), e.$on("$destroy", function () {
                        l.destroy()
                    }), o
                }
            }
        }).directive("mdSwipeLeft", ["$parse", "$mdSwipe", function (t, n) {
            return{restrict: "A", link: e(t, n, "SwipeLeft")}
        }]).directive("mdSwipeRight", ["$parse", "$mdSwipe", function (t, n) {
            return{restrict: "A", link: e(t, n, "SwipeRight")}
        }])
    }()
}(), function () {
    function e(e, t) {
        function n(e, t) {
            var n = angular.element(e[0].querySelector(".md-switch-thumb"));
            n.attr("disabled", t.disabled), n.attr("ngDisabled", t.ngDisabled);
            var r = i.compile(n, t);
            return function (e, t, n, i) {
                var a = angular.element(t[0].querySelector(".md-switch-thumb"));
                return r(e, a, n, i)
            }
        }

        var i = e[0], r = t[0];
        return{restrict: "E", transclude: !0, template: '<div class="md-switch-bar"></div><div class="md-switch-thumb">' + r.template + "</div>", require: "?ngModel", compile: n}
    }

    angular.module("material.components.switch", ["material.components.checkbox", "material.components.radioButton"]).directive("mdSwitch", ["mdCheckboxDirective", "mdRadioButtonDirective", e])
}(), function () {
    angular.module("material.components.tabs", ["material.core", "material.animations", "material.components.swipe"])
}(), function () {
    function e() {
        return{restrict: "E", replace: !0, scope: {fid: "@?", value: "=ngModel"}, compile: function () {
            return{pre: function (e, t, n) {
                angular.isDefined(n.disabled) && (t.attr("disabled", !0), e.isDisabled = !0), e.label = n.label || "", e.fid = e.fid || e.label, t.attr("type", n.type || "text"), t.attr("class", n.class)
            }}
        }, template: '<md-input-group ng-disabled="isDisabled"> <label for="{{fid}}">{{label}}</label> <md-input id="{{fid}}" ng-model="value"></md-input-group>'}
    }

    function t() {
        return{restrict: "CE", controller: ["$element", function (e) {
            this.setFocused = function (t) {
                e.toggleClass("md-input-focused", !!t)
            }, this.setHasValue = function (t) {
                e.toggleClass("md-input-has-value", !!t)
            }
        }]}
    }

    function n(e) {
        return{restrict: "E", replace: !0, template: "<input >", require: ["^?mdInputGroup", "?ngModel"], link: function (t, n, i, r) {
            var a = r[0], o = r[1];
            if (a) {
                var c = e.isParentDisabled(n);
                n.attr("tabindex", c ? -1 : 0), n.attr("type", i.type || n.parent().attr("type") || "text"), o && o.$formatters.push(function (e) {
                    return a.setHasValue(angular.isDefined(e) && null !== e), e
                }), n.on("input", function () {
                    var e = n.val();
                    a.setHasValue(angular.isDefined(e) && null !== e)
                }), n.on("focus", function () {
                    a.setFocused(!0)
                }), n.on("blur", function () {
                    a.setFocused(!1)
                }), t.$on("$destroy", function () {
                    a.setFocused(!1), a.setHasValue(!1)
                })
            }
        }}
    }

    angular.module("material.components.textField", ["material.core"]).directive("mdInputGroup", [t]).directive("mdInput", ["$mdUtil", n]).directive("mdTextFloat", [e])
}(), function () {
    function e() {
        return{restrict: "E"}
    }

    function t(e, t, n, i) {
        function r(t, r, a) {
            r.addClass(a.position), a.parent.addClass(o(a.position));
            var c = i(t, "swipeleft swiperight");
            return a.detachSwipe = c(r, function (t) {
                r.addClass(t.type), e(l.hide)
            }), n.enter(r, a.parent)
        }

        function a(e, t, i) {
            return i.detachSwipe(), i.parent.removeClass(o(i.position)), n.leave(t)
        }

        function o(e) {
            return"md-toast-open-" + (e.indexOf("top") > -1 ? "top" : "bottom")
        }

        var c = {onShow: r, onRemove: a, position: "bottom left", hideDelay: 3e3}, l = t(c);
        return l
    }

    angular.module("material.components.toast", ["material.services.interimElement", "material.components.swipe"]).directive("mdToast", [e]).factory("$mdToast", ["$timeout", "$$interimElement", "$animate", "$mdSwipe", t])
}(), function () {
    function e(e, t, n) {
        return{restrict: "E", controller: angular.noop, link: function (i, r, a) {
            function o() {
                function o(t, i) {
                    n.elementIsSibling(r, i) && (u && u.off("scroll", p), i.on("scroll", p), i.attr("scroll-shrink", "true"), u = i, e(c))
                }

                function c() {
                    s = r.prop("offsetHeight"), u.css("margin-top", -s * f + "px"), l()
                }

                function l(e) {
                    var n = e ? e.target.scrollTop : m;
                    v(), d = Math.min(s / f, Math.max(0, d + n - m)), r.css(t.TRANSFORM, "translate3d(0," + -d * f + "px,0)"), u.css(t.TRANSFORM, "translate3d(0," + (s - d) * f + "px,0)"), m = n
                }

                var s, u, d = 0, m = 0, f = a.shrinkSpeedFactor || .5, p = e.debounce(l), v = n.debounce(c, 5e3);
                i.$on("$mdContentLoaded", o)
            }

            angular.isDefined(a.scrollShrink) && o()
        }}
    }

    angular.module("material.components.toolbar", ["material.core", "material.components.content", "material.animations"]).directive("mdToolbar", ["$$rAF", "$mdEffects", "$mdUtil", e])
}(), function () {
    function e(e, t, n, i, r) {
        function a(i, a, s, u) {
            function d() {
                i.visible && v()
            }

            function m(t) {
                m.value = !!t, m.queued || (t ? (m.queued = !0, e(function () {
                    i.visible = m.value, m.queued = !1
                }, o)) : e(function () {
                    i.visible = !1
                }))
            }

            function f() {
                a.removeClass("tooltip-hide"), g.attr("aria-describedby", a.attr("id")), l.append(a), n(function () {
                    n(function () {
                        v(), i.visible && a.addClass("tooltip-show")
                    })
                })
            }

            function p() {
                a.removeClass("tooltip-show").addClass("tooltip-hide"), g.removeAttr("aria-describedby"), e(function () {
                    i.visible || a.detach()
                }, 200, !1)
            }

            function v() {
                var e = a[0].getBoundingClientRect(), n = g[0].getBoundingClientRect();
                u && (n.top += u.$element.prop("scrollTop"), n.left += u.$element.prop("scrollLeft"));
                var i = "bottom", r = {left: n.left + n.width / 2 - e.width / 2, top: n.top + n.height};
                r.left = Math.min(r.left, t.innerWidth - e.width - c), r.left = Math.max(r.left, c), r.top + e.height > t.innerHeight && (r.top = n.top - e.height, i = "top"), a.css({top: r.top + "px", left: r.left + "px"}), a.attr("width-32", Math.ceil(e.width / 32)), a.attr("tooltip-direction", i)
            }

            var g = a.parent();
            a.detach(), a.attr("role", "tooltip"), a.attr("id", s.id || "tooltip_" + r.nextUid()), g.on("focus mouseenter touchstart", function () {
                m(!0)
            }), g.on("blur mouseleave touchend touchcancel", function () {
                document.activeElement !== g[0] && m(!1)
            }), i.$watch("visible", function (e) {
                e ? f() : p()
            });
            var h = n.debounce(d);
            angular.element(t).on("resize", h), i.$on("$destroy", function () {
                i.visible = !1, a.remove(), angular.element(t).off("resize", h)
            })
        }

        var o = 400, c = 8, l = angular.element(document.body);
        return{restrict: "E", transclude: !0, require: "^?mdContent", template: '<div class="tooltip-background"></div><div class="tooltip-content" ng-transclude></div>', scope: {visible: "=?"}, link: a}
    }

    angular.module("material.components.tooltip", ["material.core"]).directive("mdTooltip", ["$timeout", "$window", "$$rAF", "$document", "$mdUtil", e])
}(), function () {
    angular.module("material.components.whiteframe", [])
}(), function () {
    function e() {
        function e(e, t, n) {
            var i = e[0];
            if (!i.hasAttribute(t)) {
                var r = angular.isDefined(n);
                r && (n = String(n).trim(), e.attr(t, n))
            }
        }

        return{expect: e}
    }

    angular.module("material.services.aria", []).service("$mdAria", ["$log", e])
}(), function () {
    function e(e, t) {
        var n = /^\s*([@=&])(\??)\s*(\w*)\s*$/;
        return function (i, r, a, o) {
            function c(e, t, n) {
                if (!angular.isDefined(r[e])) {
                    var a = o && o.hasOwnProperty(t);
                    return i[t] = a ? o[t] : n, !0
                }
                return!1
            }

            angular.forEach(a || {}, function (a, o) {
                var l, s, u = a.match(n) || [], d = u[3] || o, m = u[1];
                switch (m) {
                    case"@":
                        r.$observe(d, function (e) {
                            i[o] = e
                        }), r.$$observers[d].$$scope = i, c(d, o) || (i[o] = t(r[d])(i));
                        break;
                    case"=":
                        c(d, o) || (i[o] = "" === r[d] ? !0 : i.$eval(r[d]), s = i.$watch(r[d], function (e) {
                            i[o] = e
                        }), i.$on("$destroy", s));
                        break;
                    case"&":
                        if (!c(d, o, angular.noop)) {
                            if (r[d] && r[d].match(RegExp(o + "(.*?)")))throw new Error('& expression binding "' + o + '" looks like it will recursively call "' + r[d] + '" and cause a stack overflow! Please choose a different scopeName.');
                            l = e(r[d]), i[o] = function (e) {
                                return l(i, e)
                            }
                        }
                }
            })
        }
    }

    angular.module("material.services.attrBind", []).factory("$attrBind", ["$parse", "$interpolate", e])
}(), function () {
    function e(e, t, n, i, r, a) {
        this.compile = function (o) {
            var c = o.templateUrl, l = o.template || "", s = o.controller, u = o.controllerAs, d = o.resolve || {}, m = o.locals || {}, f = o.transformTemplate || angular.identity;
            return angular.forEach(d, function (e, t) {
                d[t] = angular.isString(e) ? n.get(e) : n.invoke(e)
            }), angular.extend(d, m), d.$template = c ? t.get(c, {cache: a}).then(function (e) {
                return e.data
            }) : e.when(l), e.all(d).then(function (e) {
                var t = f(e.$template), n = angular.element("<div>").html(t).contents(), a = i(n);
                return{locals: e, element: n, link: function (t) {
                    if (e.$scope = t, s) {
                        var i = r(s, e);
                        n.data("$ngControllerController", i), n.children().data("$ngControllerController", i), u && (t[u] = i)
                    }
                    return a(t)
                }}
            })
        }
    }

    angular.module("material.services.compiler", []).service("$mdCompiler", ["$q", "$http", "$injector", "$compile", "$controller", "$templateCache", e])
}(), function () {
    function e(e, t, n, i, r, a) {
        return function (o) {
            function c(e) {
                d.length && m.hide();
                var t = new u(e);
                return d.push(t), t.show().then(function () {
                    return t.deferred.promise
                })
            }

            function l(e) {
                var t = d.shift();
                t && t.remove().then(function () {
                    t.deferred.resolve(e)
                })
            }

            function s(e) {
                var t = d.shift();
                t && t.remove().then(function () {
                    t.deferred.reject(e)
                })
            }

            function u(r) {
                var c, l, s;
                return r = r || {}, r = angular.extend({scope: r.scope || t.$new(r.isolateScope)}, o, r), c = {options: r, deferred: e.defer(), show: function () {
                    return a.compile(r).then(function (t) {
                        function a() {
                            r.hideDelay && (l = n(m.hide, r.hideDelay))
                        }

                        r.parent || (r.parent = i.find("body"), r.parent.length || (r.parent = i)), s = t.link(r.scope);
                        var o = r.onShow(r.scope, s, r);
                        return e.when(o).then(a)
                    })
                }, cancelTimeout: function () {
                    l && (n.cancel(l), l = void 0)
                }, remove: function () {
                    c.cancelTimeout();
                    var t = r.onRemove(r.scope, s, r);
                    return e.when(t).then(function () {
                        r.scope.$destroy()
                    })
                }}
            }

            var d = [];
            o = angular.extend({onShow: function (e, t, n) {
                return r.enter(t, n.parent)
            }, onRemove: function (e, t) {
                return r.leave(t)
            }}, o || {});
            var m;
            return m = {show: c, hide: l, cancel: s}
        }
    }

    angular.module("material.services.interimElement", ["material.services.compiler"]).factory("$$interimElement", ["$q", "$rootScope", "$timeout", "$rootElement", "$animate", "$mdCompiler", e])
}(), function () {
    function e(e) {
        var t = [];
        return{notFoundError: function (t) {
            e.error("No instance found for handle", t)
        }, getInstances: function () {
            return t
        }, get: function (e) {
            var n, i, r;
            for (n = 0, i = t.length; i > n; n++)if (r = t[n], r.$$mdHandle === e)return r;
            return null
        }, register: function (e, n) {
            return e.$$mdHandle = n, t.push(e), function () {
                var n = t.indexOf(e);
                -1 !== n && t.splice(n, 1)
            }
        }}
    }

    angular.module("material.services.registry", []).factory("$mdComponentRegistry", ["$log", e])
}(), function () {
    function e(e, t, n, i) {
        function r(r, a, o, c) {
            function l() {
                m(), i(m, 100, !1)
            }

            function s() {
                var t = d.selected() && d.selected().element;
                if (!t || d.count() < 2)a.css({display: "none", width: "0px"}); else {
                    var n = t.prop("offsetWidth"), i = t.prop("offsetLeft") + (d.$$pagingOffset || 0);
                    a.css({display: n > 0 ? "block" : "none", width: n + "px"}), a.css(e.TRANSFORM, "translate3d(" + i + "px,0,0)")
                }
            }

            var u = c[0], d = c[1];
            if (!u) {
                var m = n.debounce(s);
                r.$watch(d.selected, s), r.$on("$mdTabsChanged", m), r.$on("$mdTabsPaginationChanged", m), angular.element(t).on("resize", l), r.$on("$destroy", function () {
                    angular.element(t).off("resize", l)
                })
            }
        }

        return{restrict: "E", require: ["^?nobar", "^mdTabs"], link: r}
    }

    angular.module("material.components.tabs").directive("mdTabsInkBar", ["$mdEffects", "$window", "$$rAF", "$timeout", e])
}(), function () {
    function e(e, t, n, i, r) {
        function a(a, l, s, u) {
            function d(e) {
                if (b.active) {
                    var t = angular.element(e.target).controller("mdTab"), n = g(t);
                    n !== b.page && (t.element.blur(), h(n).then(function () {
                        t.element.focus()
                    }))
                }
            }

            function m(e) {
                if (e)if (b.active) {
                    var t = g(e);
                    h(t)
                } else w()
            }

            function f(e) {
                var t, n = b.page + e;
                if (!u.selected() || g(u.selected()) !== n) {
                    var i;
                    0 > e ? (i = (n + 1) * b.itemsPerPage, t = u.previous(u.itemAt(i))) : (i = n * b.itemsPerPage - 1, t = u.next(u.itemAt(i)))
                }
                h(n).then(function () {
                    t && t.element.focus()
                }), t && u.select(t)
            }

            function p() {
                var e = l.find("md-tab"), t = l.parent().prop("clientWidth") - c, n = t && o * u.count() > t, i = n !== b.active;
                if (b.active = n, n) {
                    b.pagesCount = Math.ceil(o * u.count() / t), b.itemsPerPage = Math.max(1, Math.floor(u.count() / b.pagesCount)), b.tabWidth = t / b.itemsPerPage, $.css("width", b.tabWidth * u.count() + "px"), e.css("width", b.tabWidth + "px");
                    var a = g(u.selected());
                    h(a)
                } else i && r(function () {
                    $.css("width", ""), e.css("width", ""), v(0), b.page = -1
                })
            }

            function v(t) {
                function n(t) {
                    t.target === $[0] && ($.off(e.TRANSITIONEND_EVENT, n), r.resolve())
                }

                if (u.pagingOffset === t)return i.when();
                var r = i.defer();
                return u.$$pagingOffset = t, $.css(e.TRANSFORM, "translate3d(" + t + "px,0,0)"), $.on(e.TRANSITIONEND_EVENT, n), r.promise
            }

            function g(e) {
                var t = u.indexOf(e);
                return-1 === t ? 0 : Math.floor(t / b.itemsPerPage)
            }

            function h(e) {
                if (e !== b.page) {
                    var t = b.pagesCount;
                    return 0 > e && (e = 0), e > t && (e = t), b.hasPrev = e > 0, b.hasNext = (e + 1) * b.itemsPerPage < u.count(), b.page = e, r(function () {
                        a.$broadcast("$mdTabsPaginationChanged")
                    }), v(-e * b.itemsPerPage * b.tabWidth)
                }
            }

            var $ = l.children(), b = a.pagination = {page: -1, active: !1, clickNext: function () {
                f(1)
            }, clickPrevious: function () {
                f(-1)
            }};
            p();
            var w = n.debounce(p);
            a.$on("$mdTabsChanged", w), angular.element(t).on("resize", w), $.on("focusin", d), a.$on("$destroy", function () {
                angular.element(t).off("resize", w), $.off("focusin", d)
            }), a.$watch(u.selected, m)
        }

        var o = 96, c = 64;
        return{restrict: "A", require: "^mdTabs", link: a}
    }

    angular.module("material.components.tabs").directive("mdTabsPagination", ["$mdEffects", "$window", "$$rAF", "$$q", "$timeout", e])
}(), function () {
    function e(e, t, n, i, r, a) {
        function o() {
            return t[0].hasAttribute("disabled")
        }

        function c(t) {
            d.content.length && (d.contentContainer.append(d.content), d.contentScope = e.$parent.$new(), t.append(d.contentContainer), n(d.contentContainer)(d.contentScope), a.disconnectScope(d.contentScope), f = v(d.contentContainer, function (e) {
                d.$$onSwipe(e.type)
            }, !0))
        }

        function l() {
            i.leave(d.contentContainer).then(function () {
                d.contentScope && d.contentScope.$destroy(), d.contentScope = null
            })
        }

        function s() {
            a.reconnectScope(d.contentScope), m = f(), t.addClass("active"), t.attr("aria-selected", !0), t.attr("tabIndex", 0), i.removeClass(d.contentContainer, "ng-hide"), e.onSelect()
        }

        function u() {
            a.disconnectScope(d.contentScope), m(), t.removeClass("active"), t.attr("aria-selected", !1), t.attr("tabIndex", -1), i.addClass(d.contentContainer, "ng-hide"), e.onDeselect()
        }

        var d = this, m = angular.noop, f = function () {
            return m
        }, p = "swipeleft swiperight", v = r(e, p);
        d.$$onSwipe = angular.noop, d.contentContainer = angular.element('<div class="tab-content ng-hide">'), d.element = t, d.isDisabled = o, d.onAdd = c, d.onRemove = l, d.onSelect = s, d.onDeselect = u
    }

    angular.module("material.components.tabs").controller("$mdTab", ["$scope", "$element", "$compile", "$animate", "$mdSwipe", "$mdUtil", e])
}(), function () {
    function e(e, t, n, i, r) {
        function a(a, o) {
            var c = a.find("md-tab-label");
            c.length ? c.remove() : c = angular.isDefined(o.label) ? angular.element("<md-tab-label>").html(o.label) : angular.element("<md-tab-label>").append(a.contents().remove());
            var l = a.contents().remove();
            return function (a, o, s, u) {
                function d() {
                    var e = c.clone();
                    o.append(e), t(e)(a.$parent), $.content = l.clone()
                }

                function m() {
                    a.$apply(function () {
                        b.select($), $.element.focus()
                    })
                }

                function f(e) {
                    if (e.which == r.KEY_CODE.SPACE)o.triggerHandler("click"), e.preventDefault(); else if (e.which === r.KEY_CODE.LEFT_ARROW) {
                        var t = b.previous($);
                        t && t.element.focus()
                    } else if (e.which === r.KEY_CODE.RIGHT_ARROW) {
                        var n = b.next($);
                        n && n.element.focus()
                    }
                }

                function p() {
                    a.$watch("$parent.$index", function (e) {
                        b.move($, e)
                    })
                }

                function v() {
                    function e(e) {
                        var t = b.selected() === $;
                        e && !t ? b.select($) : !e && t && b.deselect($)
                    }

                    var t = a.$parent.$watch("!!(" + s.active + ")", e);
                    a.$on("$destroy", t)
                }

                function g() {
                    function e(e) {
                        o.attr("aria-disabled", e);
                        var t = b.selected() === $;
                        t && e && b.select(b.next() || b.previous())
                    }

                    a.$watch($.isDisabled, e)
                }

                function h() {
                    var e = s.id || i.nextUid(), t = "content_" + e;
                    o.attr({id: e, role: "tabItemCtrl", tabIndex: "-1", "aria-controls": t}), $.contentContainer.attr({id: t, role: "tabpanel", "aria-labelledby": e}), n.expect(o, "aria-label", o.text())
                }

                var $ = u[0], b = u[1];
                d();
                var w = e.attachButtonBehavior(o);
                b.add($), a.$on("$destroy", function () {
                    w(), b.remove($)
                }), angular.isDefined(s.ngClick) || o.on("click", m), o.on("keydown", f), angular.isNumber(a.$parent.$index) && p(), angular.isDefined(s.active) && v(), g(), h()
            }
        }

        return{restrict: "E", require: ["mdTab", "^mdTabs"], controller: "$mdTab", scope: {onSelect: "&", onDeselect: "&", label: "@"}, compile: a}
    }

    angular.module("material.components.tabs").directive("mdTab", ["$mdInkRipple", "$compile", "$mdAria", "$mdUtil", "$mdConstant", e])
}(), function () {
    function e(e, t, n) {
        function i() {
            return p.itemAt(e.selectedIndex)
        }

        function r(t, n) {
            f.add(t, n), t.onAdd(p.contentArea), t.$$onSwipe = m, (-1 === e.selectedIndex || e.selectedIndex === p.indexOf(t)) && p.select(t), e.$broadcast("$mdTabsChanged")
        }

        function a(t, n) {
            f.contains(t) && (n || p.selected() === t && (f.count() > 1 ? p.select(p.previous() || p.next()) : p.deselect(t)), f.remove(t), t.onRemove(), e.$broadcast("$mdTabsChanged"))
        }

        function o(t, n) {
            var i = p.selected() === t;
            f.remove(t), f.add(t, n), i && p.select(t), e.$broadcast("$mdTabsChanged")
        }

        function c(t) {
            !t || t.isSelected || t.isDisabled() || f.contains(t) && (p.deselect(p.selected()), e.selectedIndex = p.indexOf(t), t.isSelected = !0, t.onSelect())
        }

        function l(t) {
            t && t.isSelected && f.contains(t) && (e.selectedIndex = -1, t.isSelected = !1, t.onDeselect())
        }

        function s(e, t) {
            return f.next(e || p.selected(), t || d)
        }

        function u(e, t) {
            return f.previous(e || p.selected(), t || d)
        }

        function d(e) {
            return e && !e.isDisabled()
        }

        function m(e) {
            if (p.selected())switch (e) {
                case"swiperight":
                case"panright":
                    p.select(p.previous());
                    break;
                case"swipeleft":
                case"panleft":
                    p.select(p.next())
            }
        }

        var f = n.iterator([], !1), p = this;
        p.element = t, p.contentArea = angular.element(t[0].querySelector(".tabs-content")), p.inRange = f.inRange, p.indexOf = f.indexOf, p.itemAt = f.itemAt, p.count = f.count, p.selected = i, p.add = r, p.remove = a, p.move = o, p.select = c, p.deselect = l, p.next = s, p.previous = u, p.swipe = m, e.$on("$destroy", function () {
            p.deselect(p.selected());
            for (var e = f.count() - 1; e >= 0; e--)p.remove(f[e], !0)
        })
    }

    angular.module("material.components.tabs").controller("$mdTabs", ["$scope", "$element", "$mdUtil", e])
}(), function () {
    function e() {
        function e(e, t, n, i) {
            function r() {
                t.attr({role: "tablist"})
            }

            function a() {
                e.$watch("selectedIndex", function (e, t) {
                    if (i.deselect(i.itemAt(t)), i.inRange(e)) {
                        var n = i.itemAt(e);
                        n && n.isDisabled() && (n = e > t ? i.next(n) : i.previous(n)), i.select(n)
                    }
                })
            }

            r(), a()
        }

        return{restrict: "E", controller: "$mdTabs", require: "mdTabs", transclude: !0, scope: {selectedIndex: "=?selected"}, template: '<section class="tabs-header" ng-class="{\'tab-paginating\': pagination.active}"><div class="tab-paginator prev" ng-if="pagination.active && pagination.hasPrev" ng-click="pagination.clickPrevious()"></div><div class="tabs-header-items-container" md-tabs-pagination><div class="tabs-header-items" ng-transclude></div><md-tabs-ink-bar></md-tabs-ink-bar></div><div class="tab-paginator next" ng-if="pagination.active && pagination.hasNext" ng-click="pagination.clickNext()"></div></section><section class="tabs-content"></section>', link: e}
    }

    angular.module("material.components.tabs").directive("mdTabs", ["$parse", e])
}();