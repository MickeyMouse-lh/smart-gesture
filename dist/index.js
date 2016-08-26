module.exports = function (y) {
  function x(e) {
    if (t[e])return t[e].exports;
    var n = t[e] = { exports: {}, id: e, loaded: !1 };
    return y[e].call(n.exports, n, n.exports, x), n.loaded = !0, n.exports
  }

  var t = {};
  return x.m = y, x.c = t, x.p = "/", x(0)
}([function (y, x, t) {
  y.exports = t(1)
}, function (y, x, t) {
  "use strict";
  function e(y) {
    if (y && y.__esModule)return y;
    var x = {};
    if (null != y)for (var t in y)Object.prototype.hasOwnProperty.call(y, t) && (x[t] = y[t]);
    return x["default"] = y, x
  }

  function n(y) {
    return y && y.__esModule ? y : { "default": y }
  }

  Object.defineProperty(x, "__esModule", { value: !0 });
  var r = t(2), i = n(r), o = t(37), s = n(o), u = t(44), a = n(u), c = t(45), f = n(c), l = t(49), p = t(50), h = e(p), v = new l.DollarRecognizer, d = function () {
  }, g = function () {
    function y() {
      var x = this, t = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0];
      (0, a["default"])(this, y), this.options = (0, s["default"])({
        el: document.body,
        onSwipe: d,
        onGesture: d,
        gestures: h,
        enablePath: !0,
        lineColor: "#666",
        lineWidth: 4,
        timeDelay: 600,
        triggerMouseKey: "right"
      }, t), this.enable = !0, this.path = null, this.startPos = null, this.endPos = null, this.direction = null, this.directionList = [], this.points = [], this.isMove = !1, this.Unistrokes = [], this.path = document.getElementById("path"), this._initUnistrokes(t.gestures ||
        h), this._mouseDelayTimer = null, this.options.el.addEventListener("mousedown", this._moveStart.bind(this)), this.options.el.addEventListener("mousemove", this._move.bind(this)), this.options.el.addEventListener("mouseup", this._moveEnd.bind(this)), this.options.el.addEventListener("mouseleave", this._moveEnd.bind(this)), this.options.el.addEventListener("contextmenu", function () {
        x.enable && "left" !== x.options.triggerMouseKey && event.preventDefault()
      })
    }

    return (0, f["default"])(y, [{
      key: "_addPath", value: function (y) {
        this.svg = document.createElementNS("http://www.w3.org/2000/svg", "svg"), this.path = document.createElementNS("http://www.w3.org/2000/svg", "path"), this.path.id = "path", this.svg.setAttribute("style", "position: absolute; top: 0; left: 0; background: rgba(0,0,0,.05)"), this.svg.setAttribute("width", "100%"), this.svg.setAttribute("height", "100%"), this.svg.setAttribute("fill", "none"), this.points = [], this.startPos = y, this.path.setAttribute("stroke", this.options.lineColor), this.path.setAttribute("stroke-width", this.options.lineWidth), this.path.setAttribute("d", "M " +
          y.x + " " + y.y), this.svg.appendChild(this.path), this.options.el.appendChild(this.svg)
      }
    }, {
      key: "_initUnistrokes", value: function (y) {
        var x = this;
        if (Array.isArray(y))y.forEach(function (y) {
          return x.addGesture(y)
        }); else {
          var t = (0, i["default"])(y);
          t.forEach(function (t) {
            return x.addGesture(y[t])
          })
        }
      }
    }, {
      key: "_moveStart", value: function () {
        var y = this;
        if (this.enable) {
          if ("left" === this.options.triggerMouseKey) {
            if (0 !== event.button)return
          } else if (2 !== event.button)return;
          var x = { x: event.pageX - this.options.el.offsetLeft, y: event.pageY - this.options.el.offsetTop };
          this._mouseDelayTimer = setTimeout(function () {
            y.options.enablePath && y._addPath(x), y.isMove = !0
          }, this.options.timeDelay)
        }
      }
    }, {
      key: "_move", value: function () {
        return this.isMove ? (event.preventDefault(), void this._progressSwipe(event)) : void clearTimeout(this._mouseDelayTimer)
      }
    }, {
      key: "_moveEnd", value: function () {
        if (!this.isMove)return void clearTimeout(this._mouseDelayTimer);
        if (this.directionList.length > 0 && this.options.onSwipe(this.directionList), this.points.length > 10) {
          var y = v.recognize(this.points, this.Unistrokes, !0);
          this.options.onGesture(y, this.points)
        }
        this.options.enablePath &&
        this.options.el.removeChild(this.svg), this.isMove = !1, this.endPos = null, this.directionList = [], this.points = []
      }
    }, {
      key: "_progressSwipe", value: function (y) {
        if (!this.endPos)return void(this.endPos = {
          x: y.pageX - this.options.el.offsetLeft,
          y: y.pageY - this.options.el.offsetTop
        });
        var x = y.pageX - this.options.el.offsetLeft, t = y.pageY - this.options.el.offsetTop, e = Math.abs(x -
          this.endPos.x), n = Math.abs(t - this.endPos.y);
        if (e > 5 || n > 5) {
          if (this.points.push({ x: x, y: t }), this.options.enablePath) {
            var r = this.path.getAttribute("d");
            this.path.setAttribute("d", r + " L " + x + " " + t)
          }
          if (e > 20 || n > 20) {
            var i = void 0;
            i = e > n ? x < this.endPos.x ? "L" : "R" : t < this.endPos.y ? "U" : "D";
            var o = this.directionList.length <= 0 ? "" : this.directionList[this.directionList.length - 1];
            i != o && this.directionList.push(i), this.endPos = { x: x, y: t }
          }
        }
      }
    }, {
      key: "addGesture", value: function () {
        var y = arguments.length <= 0 || void 0 === arguments[0] ? {} : arguments[0], x = y.name, t = y.points;
        if (!x || !t || !Array.isArray(t))return console.warn("invalid params. addGesture fail."), !1;
        var e = new l.Unistroke(x, t);
        this.Unistrokes.push(e)
      }
    }, {
      key: "setEnable", value: function () {
        var y = arguments.length <= 0 || void 0 === arguments[0] || arguments[0];
        this.enable = y
      }
    }]), y
  }(), b = function (y) {
    return new g(y)
  };
  x["default"] = b
}, function (y, x, t) {
  y.exports = { "default": t(3), __esModule: !0 }
}, function (y, x, t) {
  t(4), y.exports = t(24).Object.keys
}, function (y, x, t) {
  var e = t(5), n = t(7);
  t(22)("keys", function () {
    return function (y) {
      return n(e(y))
    }
  })
}, function (y, x, t) {
  var e = t(6);
  y.exports = function (y) {
    return Object(e(y))
  }
}, function (y, x) {
  y.exports = function (y) {
    if (void 0 == y)throw TypeError("Can't call method on  " + y);
    return y
  }
}, function (y, x, t) {
  var e = t(8), n = t(21);
  y.exports = Object.keys || function (y) {
      return e(y, n)
    }
}, function (y, x, t) {
  var e = t(9), n = t(10), r = t(13)(!1), i = t(17)("IE_PROTO");
  y.exports = function (y, x) {
    var t, o = n(y), s = 0, u = [];
    for (t in o)t != i && e(o, t) && u.push(t);
    for (; x.length > s;)e(o, t = x[s++]) && (~r(u, t) || u.push(t));
    return u
  }
}, function (y, x) {
  var t = {}.hasOwnProperty;
  y.exports = function (y, x) {
    return t.call(y, x)
  }
}, function (y, x, t) {
  var e = t(11), n = t(6);
  y.exports = function (y) {
    return e(n(y))
  }
}, function (y, x, t) {
  var e = t(12);
  y.exports = Object("z").propertyIsEnumerable(0) ? Object : function (y) {
    return "String" == e(y) ? y.split("") : Object(y)
  }
}, function (y, x) {
  var t = {}.toString;
  y.exports = function (y) {
    return t.call(y).slice(8, -1)
  }
}, function (y, x, t) {
  var e = t(10), n = t(14), r = t(16);
  y.exports = function (y) {
    return function (x, t, i) {
      var o, s = e(x), u = n(s.length), a = r(i, u);
      if (y && t != t) {
        for (; u > a;)if (o = s[a++], o != o)return !0
      } else for (; u > a; a++)if ((y || a in s) && s[a] === t)return y || a || 0;
      return !y && -1
    }
  }
}, function (y, x, t) {
  var e = t(15), n = Math.min;
  y.exports = function (y) {
    return y > 0 ? n(e(y), 9007199254740991) : 0
  }
}, function (y, x) {
  var t = Math.ceil, e = Math.floor;
  y.exports = function (y) {
    return isNaN(y = +y) ? 0 : (y > 0 ? e : t)(y)
  }
}, function (y, x, t) {
  var e = t(15), n = Math.max, r = Math.min;
  y.exports = function (y, x) {
    return y = e(y), y < 0 ? n(y + x, 0) : r(y, x)
  }
}, function (y, x, t) {
  var e = t(18)("keys"), n = t(20);
  y.exports = function (y) {
    return e[y] || (e[y] = n(y))
  }
}, function (y, x, t) {
  var e = t(19), n = "__core-js_shared__", r = e[n] || (e[n] = {});
  y.exports = function (y) {
    return r[y] || (r[y] = {})
  }
}, function (y, x) {
  var t = y.exports = "undefined" != typeof window && window.Math == Math ? window : "undefined" != typeof self &&
  self.Math == Math ? self : Function("return this")();
  "number" == typeof __g && (__g = t)
}, function (y, x) {
  var t = 0, e = Math.random();
  y.exports = function (y) {
    return "Symbol(".concat(void 0 === y ? "" : y, ")_", (++t + e).toString(36))
  }
}, function (y, x) {
  y.exports = "constructor,hasOwnProperty,isPrototypeOf,propertyIsEnumerable,toLocaleString,toString,valueOf".split(",")
}, function (y, x, t) {
  var e = t(23), n = t(24), r = t(33);
  y.exports = function (y, x) {
    var t = (n.Object || {})[y] || Object[y], i = {};
    i[y] = x(t), e(e.S + e.F * r(function () {
        t(1)
      }), "Object", i)
  }
}, function (y, x, t) {
  var e = t(19), n = t(24), r = t(25), i = t(27), o = "prototype", s = function (y, x, t) {
    var u, a, c, f = y & s.F, l = y & s.G, p = y & s.S, h = y & s.P, v = y & s.B, d = y & s.W, g = l ? n : n[x] ||
    (n[x] = {}), b = g[o], m = l ? e : p ? e[x] : (e[x] || {})[o];
    l && (t = x);
    for (u in t)a = !f && m && void 0 !== m[u], a && u in g ||
    (c = a ? m[u] : t[u], g[u] = l && "function" != typeof m[u] ? t[u] : v && a ? r(c, e) : d &&
    m[u] == c ? function (y) {
      var x = function (x, t, e) {
        if (this instanceof y) {
          switch (arguments.length) {
            case 0:
              return new y;
            case 1:
              return new y(x);
            case 2:
              return new y(x, t)
          }
          return new y(x, t, e)
        }
        return y.apply(this, arguments)
      };
      return x[o] = y[o], x
    }(c) : h && "function" == typeof c ? r(Function.call, c) : c, h &&
    ((g.virtual || (g.virtual = {}))[u] = c, y & s.R && b && !b[u] && i(b, u, c)))
  };
  s.F = 1, s.G = 2, s.S = 4, s.P = 8, s.B = 16, s.W = 32, s.U = 64, s.R = 128, y.exports = s
}, function (y, x) {
  var t = y.exports = { version: "2.4.0" };
  "number" == typeof __e && (__e = t)
}, function (y, x, t) {
  var e = t(26);
  y.exports = function (y, x, t) {
    if (e(y), void 0 === x)return y;
    switch (t) {
      case 1:
        return function (t) {
          return y.call(x, t)
        };
      case 2:
        return function (t, e) {
          return y.call(x, t, e)
        };
      case 3:
        return function (t, e, n) {
          return y.call(x, t, e, n)
        }
    }
    return function () {
      return y.apply(x, arguments)
    }
  }
}, function (y, x) {
  y.exports = function (y) {
    if ("function" != typeof y)throw TypeError(y + " is not a function!");
    return y
  }
}, function (y, x, t) {
  var e = t(28), n = t(36);
  y.exports = t(32) ? function (y, x, t) {
    return e.f(y, x, n(1, t))
  } : function (y, x, t) {
    return y[x] = t, y
  }
}, function (y, x, t) {
  var e = t(29), n = t(31), r = t(35), i = Object.defineProperty;
  x.f = t(32) ? Object.defineProperty : function (y, x, t) {
    if (e(y), x = r(x, !0), e(t), n)try {
      return i(y, x, t)
    } catch (o) {
    }
    if ("get" in t || "set" in t)throw TypeError("Accessors not supported!");
    return "value" in t && (y[x] = t.value), y
  }
}, function (y, x, t) {
  var e = t(30);
  y.exports = function (y) {
    if (!e(y))throw TypeError(y + " is not an object!");
    return y
  }
}, function (y, x) {
  y.exports = function (y) {
    return "object" == typeof y ? null !== y : "function" == typeof y
  }
}, function (y, x, t) {
  y.exports = !t(32) && !t(33)(function () {
      return 7 != Object.defineProperty(t(34)("div"), "a", {
          get: function () {
            return 7
          }
        }).a
    })
}, function (y, x, t) {
  y.exports = !t(33)(function () {
    return 7 != Object.defineProperty({}, "a", {
        get: function () {
          return 7
        }
      }).a
  })
}, function (y, x) {
  y.exports = function (y) {
    try {
      return !!y()
    } catch (x) {
      return !0
    }
  }
}, function (y, x, t) {
  var e = t(30), n = t(19).document, r = e(n) && e(n.createElement);
  y.exports = function (y) {
    return r ? n.createElement(y) : {}
  }
}, function (y, x, t) {
  var e = t(30);
  y.exports = function (y, x) {
    if (!e(y))return y;
    var t, n;
    if (x && "function" == typeof(t = y.toString) && !e(n = t.call(y)))return n;
    if ("function" == typeof(t = y.valueOf) && !e(n = t.call(y)))return n;
    if (!x && "function" == typeof(t = y.toString) && !e(n = t.call(y)))return n;
    throw TypeError("Can't convert object to primitive value")
  }
}, function (y, x) {
  y.exports = function (y, x) {
    return { enumerable: !(1 & y), configurable: !(2 & y), writable: !(4 & y), value: x }
  }
}, function (y, x, t) {
  "use strict";
  function e(y) {
    return y && y.__esModule ? y : { "default": y }
  }

  x.__esModule = !0;
  var n = t(38), r = e(n);
  x["default"] = r["default"] || function (y) {
      for (var x = 1; x < arguments.length; x++) {
        var t = arguments[x];
        for (var e in t)Object.prototype.hasOwnProperty.call(t, e) && (y[e] = t[e])
      }
      return y
    }
}, function (y, x, t) {
  y.exports = { "default": t(39), __esModule: !0 }
}, function (y, x, t) {
  t(40), y.exports = t(24).Object.assign
}, function (y, x, t) {
  var e = t(23);
  e(e.S + e.F, "Object", { assign: t(41) })
}, function (y, x, t) {
  "use strict";
  var e = t(7), n = t(42), r = t(43), i = t(5), o = t(11), s = Object.assign;
  y.exports = !s || t(33)(function () {
    var y = {}, x = {}, t = Symbol(), e = "abcdefghijklmnopqrst";
    return y[t] = 7, e.split("").forEach(function (y) {
      x[y] = y
    }), 7 != s({}, y)[t] || Object.keys(s({}, x)).join("") != e
  }) ? function (y, x) {
    for (var t = i(y), s = arguments.length, u = 1, a = n.f, c = r.f; s >
    u;)for (var f, l = o(arguments[u++]), p = a ? e(l).concat(a(l)) : e(l), h = p.length, v = 0; h >
    v;)c.call(l, f = p[v++]) && (t[f] = l[f]);
    return t
  } : s
}, function (y, x) {
  x.f = Object.getOwnPropertySymbols
}, function (y, x) {
  x.f = {}.propertyIsEnumerable
}, function (y, x) {
  "use strict";
  x.__esModule = !0, x["default"] = function (y, x) {
    if (!(y instanceof x))throw new TypeError("Cannot call a class as a function")
  }
}, function (y, x, t) {
  "use strict";
  function e(y) {
    return y && y.__esModule ? y : { "default": y }
  }

  x.__esModule = !0;
  var n = t(46), r = e(n);
  x["default"] = function () {
    function y(y, x) {
      for (var t = 0; t < x.length; t++) {
        var e = x[t];
        e.enumerable = e.enumerable || !1, e.configurable = !0, "value" in e &&
        (e.writable = !0), (0, r["default"])(y, e.key, e)
      }
    }

    return function (x, t, e) {
      return t && y(x.prototype, t), e && y(x, e), x
    }
  }()
}, function (y, x, t) {
  y.exports = { "default": t(47), __esModule: !0 }
}, function (y, x, t) {
  t(48);
  var e = t(24).Object;
  y.exports = function (y, x, t) {
    return e.defineProperty(y, x, t)
  }
}, function (y, x, t) {
  var e = t(23);
  e(e.S + e.F * !t(32), "Object", { defineProperty: t(28).f })
}, function (y, x) {
  y.exports = require("smart-gesture/lib/dollarOne")
}, function (y, x) {
  "use strict";
  Object.defineProperty(x, "__esModule", { value: !0 });
  var t = {
    name: "triangle",
    points: [{ x: 137, y: 139 }, { x: 135, y: 141 }, { x: 133, y: 144 }, { x: 132, y: 146 }, {
      x: 130,
      y: 149
    }, { x: 128, y: 151 }, { x: 126, y: 155 }, { x: 123, y: 160 }, { x: 120, y: 166 }, { x: 116, y: 171 }, {
      x: 112,
      y: 177
    }, { x: 107, y: 183 }, { x: 102, y: 188 }, { x: 100, y: 191 }, { x: 95, y: 195 }, { x: 90, y: 199 }, {
      x: 86,
      y: 203
    }, { x: 82, y: 206 }, { x: 80, y: 209 }, { x: 75, y: 213 }, { x: 73, y: 213 }, { x: 70, y: 216 }, {
      x: 67,
      y: 219
    }, { x: 64, y: 221 }, { x: 61, y: 223 }, { x: 60, y: 225 }, { x: 62, y: 226 }, { x: 65, y: 225 }, {
      x: 67,
      y: 226
    }, { x: 74, y: 226 }, { x: 77, y: 227 }, { x: 85, y: 229 }, { x: 91, y: 230 }, { x: 99, y: 231 }, {
      x: 108,
      y: 232
    }, { x: 116, y: 233 }, { x: 125, y: 233 }, { x: 134, y: 234 }, { x: 145, y: 233 }, { x: 153, y: 232 }, {
      x: 160,
      y: 233
    }, { x: 170, y: 234 }, { x: 177, y: 235 }, { x: 179, y: 236 }, { x: 186, y: 237 }, { x: 193, y: 238 }, {
      x: 198,
      y: 239
    }, { x: 200, y: 237 }, { x: 202, y: 239 }, { x: 204, y: 238 }, { x: 206, y: 234 }, { x: 205, y: 230 }, {
      x: 202,
      y: 222
    }, { x: 197, y: 216 }, { x: 192, y: 207 }, { x: 186, y: 198 }, { x: 179, y: 189 }, { x: 174, y: 183 }, {
      x: 170,
      y: 178
    }, { x: 164, y: 171 }, { x: 161, y: 168 }, { x: 154, y: 160 }, { x: 148, y: 155 }, { x: 143, y: 150 }, {
      x: 138,
      y: 148
    }, { x: 136, y: 148 }]
  }, e = {
    name: "x",
    points: [{ x: 87, y: 142 }, { x: 89, y: 145 }, { x: 91, y: 148 }, { x: 93, y: 151 }, { x: 96, y: 155 }, {
      x: 98,
      y: 157
    }, { x: 100, y: 160 }, { x: 102, y: 162 }, { x: 106, y: 167 }, { x: 108, y: 169 }, { x: 110, y: 171 }, {
      x: 115,
      y: 177
    }, { x: 119, y: 183 }, { x: 123, y: 189 }, { x: 127, y: 193 }, { x: 129, y: 196 }, { x: 133, y: 200 }, {
      x: 137,
      y: 206
    }, { x: 140, y: 209 }, { x: 143, y: 212 }, { x: 146, y: 215 }, { x: 151, y: 220 }, { x: 153, y: 222 }, {
      x: 155,
      y: 223
    }, { x: 157, y: 225 }, { x: 158, y: 223 }, { x: 157, y: 218 }, { x: 155, y: 211 }, { x: 154, y: 208 }, {
      x: 152,
      y: 200
    }, { x: 150, y: 189 }, { x: 148, y: 179 }, { x: 147, y: 170 }, { x: 147, y: 158 }, { x: 147, y: 148 }, {
      x: 147,
      y: 141
    }, { x: 147, y: 136 }, { x: 144, y: 135 }, { x: 142, y: 137 }, { x: 140, y: 139 }, { x: 135, y: 145 }, {
      x: 131,
      y: 152
    }, { x: 124, y: 163 }, { x: 116, y: 177 }, { x: 108, y: 191 }, { x: 100, y: 206 }, { x: 94, y: 217 }, {
      x: 91,
      y: 222
    }, { x: 89, y: 225 }, { x: 87, y: 226 }, { x: 87, y: 224 }]
  }, n = {
    name: "rectangle",
    points: [{ x: 78, y: 149 }, { x: 78, y: 153 }, { x: 78, y: 157 }, { x: 78, y: 160 }, { x: 79, y: 162 }, {
      x: 79,
      y: 164
    }, { x: 79, y: 167 }, { x: 79, y: 169 }, { x: 79, y: 173 }, { x: 79, y: 178 }, { x: 79, y: 183 }, {
      x: 80,
      y: 189
    }, { x: 80, y: 193 }, { x: 80, y: 198 }, { x: 80, y: 202 }, { x: 81, y: 208 }, { x: 81, y: 210 }, {
      x: 81,
      y: 216
    }, { x: 82, y: 222 }, { x: 82, y: 224 }, { x: 82, y: 227 }, { x: 83, y: 229 }, { x: 83, y: 231 }, {
      x: 85,
      y: 230
    }, { x: 88, y: 232 }, { x: 90, y: 233 }, { x: 92, y: 232 }, { x: 94, y: 233 }, { x: 99, y: 232 }, {
      x: 102,
      y: 233
    }, { x: 106, y: 233 }, { x: 109, y: 234 }, { x: 117, y: 235 }, { x: 123, y: 236 }, { x: 126, y: 236 }, {
      x: 135,
      y: 237
    }, { x: 142, y: 238 }, { x: 145, y: 238 }, { x: 152, y: 238 }, { x: 154, y: 239 }, { x: 165, y: 238 }, {
      x: 174,
      y: 237
    }, { x: 179, y: 236 }, { x: 186, y: 235 }, { x: 191, y: 235 }, { x: 195, y: 233 }, { x: 197, y: 233 }, {
      x: 200,
      y: 233
    }, { x: 201, y: 235 }, { x: 201, y: 233 }, { x: 199, y: 231 }, { x: 198, y: 226 }, { x: 198, y: 220 }, {
      x: 196,
      y: 207
    }, { x: 195, y: 195 }, { x: 195, y: 181 }, { x: 195, y: 173 }, { x: 195, y: 163 }, { x: 194, y: 155 }, {
      x: 192,
      y: 145
    }, { x: 192, y: 143 }, { x: 192, y: 138 }, { x: 191, y: 135 }, { x: 191, y: 133 }, { x: 191, y: 130 }, {
      x: 190,
      y: 128
    }, { x: 188, y: 129 }, { x: 186, y: 129 }, { x: 181, y: 132 }, { x: 173, y: 131 }, { x: 162, y: 131 }, {
      x: 151,
      y: 132
    }, { x: 149, y: 132 }, { x: 138, y: 132 }, { x: 136, y: 132 }, { x: 122, y: 131 }, { x: 120, y: 131 }, {
      x: 109,
      y: 130
    }, { x: 107, y: 130 }, { x: 90, y: 132 }, { x: 81, y: 133 }, { x: 76, y: 133 }]
  }, r = {
    name: "circle",
    points: [{ x: 127, y: 141 }, { x: 124, y: 140 }, { x: 120, y: 139 }, { x: 118, y: 139 }, {
      x: 116,
      y: 139
    }, { x: 111, y: 140 }, { x: 109, y: 141 }, { x: 104, y: 144 }, { x: 100, y: 147 }, { x: 96, y: 152 }, {
      x: 93,
      y: 157
    }, { x: 90, y: 163 }, { x: 87, y: 169 }, { x: 85, y: 175 }, { x: 83, y: 181 }, { x: 82, y: 190 }, {
      x: 82,
      y: 195
    }, { x: 83, y: 200 }, { x: 84, y: 205 }, { x: 88, y: 213 }, { x: 91, y: 216 }, { x: 96, y: 219 }, {
      x: 103,
      y: 222
    }, { x: 108, y: 224 }, { x: 111, y: 224 }, { x: 120, y: 224 }, { x: 133, y: 223 }, { x: 142, y: 222 }, {
      x: 152,
      y: 218
    }, { x: 160, y: 214 }, { x: 167, y: 210 }, { x: 173, y: 204 }, { x: 178, y: 198 }, { x: 179, y: 196 }, {
      x: 182,
      y: 188
    }, { x: 182, y: 177 }, { x: 178, y: 167 }, { x: 170, y: 150 }, { x: 163, y: 138 }, { x: 152, y: 130 }, {
      x: 143,
      y: 129
    }, { x: 140, y: 131 }, { x: 129, y: 136 }, { x: 126, y: 139 }]
  }, i = {
    name: "check",
    points: [{ x: 91, y: 185 }, { x: 93, y: 185 }, { x: 95, y: 185 }, { x: 97, y: 185 }, { x: 100, y: 188 }, {
      x: 102,
      y: 189
    }, { x: 104, y: 190 }, { x: 106, y: 193 }, { x: 108, y: 195 }, { x: 110, y: 198 }, { x: 112, y: 201 }, {
      x: 114,
      y: 204
    }, { x: 115, y: 207 }, { x: 117, y: 210 }, { x: 118, y: 212 }, { x: 120, y: 214 }, { x: 121, y: 217 }, {
      x: 122,
      y: 219
    }, { x: 123, y: 222 }, { x: 124, y: 224 }, { x: 126, y: 226 }, { x: 127, y: 229 }, { x: 129, y: 231 }, {
      x: 130,
      y: 233
    }, { x: 129, y: 231 }, { x: 129, y: 228 }, { x: 129, y: 226 }, { x: 129, y: 224 }, { x: 129, y: 221 }, {
      x: 129,
      y: 218
    }, { x: 129, y: 212 }, { x: 129, y: 208 }, { x: 130, y: 198 }, { x: 132, y: 189 }, { x: 134, y: 182 }, {
      x: 137,
      y: 173
    }, { x: 143, y: 164 }, { x: 147, y: 157 }, { x: 151, y: 151 }, { x: 155, y: 144 }, { x: 161, y: 137 }, {
      x: 165,
      y: 131
    }, { x: 171, y: 122 }, { x: 174, y: 118 }, { x: 176, y: 114 }, { x: 177, y: 112 }, { x: 177, y: 114 }, {
      x: 175,
      y: 116
    }, { x: 173, y: 118 }]
  }, o = {
    name: "caret",
    points: [{ x: 79, y: 245 }, { x: 79, y: 242 }, { x: 79, y: 239 }, { x: 80, y: 237 }, { x: 80, y: 234 }, {
      x: 81,
      y: 232
    }, { x: 82, y: 230 }, { x: 84, y: 224 }, { x: 86, y: 220 }, { x: 86, y: 218 }, { x: 87, y: 216 }, {
      x: 88,
      y: 213
    }, { x: 90, y: 207 }, { x: 91, y: 202 }, { x: 92, y: 200 }, { x: 93, y: 194 }, { x: 94, y: 192 }, {
      x: 96,
      y: 189
    }, { x: 97, y: 186 }, { x: 100, y: 179 }, { x: 102, y: 173 }, { x: 105, y: 165 }, { x: 107, y: 160 }, {
      x: 109,
      y: 158
    }, { x: 112, y: 151 }, { x: 115, y: 144 }, { x: 117, y: 139 }, { x: 119, y: 136 }, { x: 119, y: 134 }, {
      x: 120,
      y: 132
    }, { x: 121, y: 129 }, { x: 122, y: 127 }, { x: 124, y: 125 }, { x: 126, y: 124 }, { x: 129, y: 125 }, {
      x: 131,
      y: 127
    }, { x: 132, y: 130 }, { x: 136, y: 139 }, { x: 141, y: 154 }, { x: 145, y: 166 }, { x: 151, y: 182 }, {
      x: 156,
      y: 193
    }, { x: 157, y: 196 }, { x: 161, y: 209 }, { x: 162, y: 211 }, { x: 167, y: 223 }, { x: 169, y: 229 }, {
      x: 170,
      y: 231
    }, { x: 173, y: 237 }, { x: 176, y: 242 }, { x: 177, y: 244 }, { x: 179, y: 250 }, { x: 181, y: 255 }, {
      x: 182,
      y: 257
    }]
  }, s = {
    name: "arrow",
    points: [{ x: 68, y: 222 }, { x: 70, y: 220 }, { x: 73, y: 218 }, { x: 75, y: 217 }, { x: 77, y: 215 }, {
      x: 80,
      y: 213
    }, { x: 82, y: 212 }, { x: 84, y: 210 }, { x: 87, y: 209 }, { x: 89, y: 208 }, { x: 92, y: 206 }, {
      x: 95,
      y: 204
    }, { x: 101, y: 201 }, { x: 106, y: 198 }, { x: 112, y: 194 }, { x: 118, y: 191 }, { x: 124, y: 187 }, {
      x: 127,
      y: 186
    }, { x: 132, y: 183 }, { x: 138, y: 181 }, { x: 141, y: 180 }, { x: 146, y: 178 }, { x: 154, y: 173 }, {
      x: 159,
      y: 171
    }, { x: 161, y: 170 }, { x: 166, y: 167 }, { x: 168, y: 167 }, { x: 171, y: 166 }, { x: 174, y: 164 }, {
      x: 177,
      y: 162
    }, { x: 180, y: 160 }, { x: 182, y: 158 }, { x: 183, y: 156 }, { x: 181, y: 154 }, { x: 178, y: 153 }, {
      x: 171,
      y: 153
    }, { x: 164, y: 153 }, { x: 160, y: 153 }, { x: 150, y: 154 }, { x: 147, y: 155 }, { x: 141, y: 157 }, {
      x: 137,
      y: 158
    }, { x: 135, y: 158 }, { x: 137, y: 158 }, { x: 140, y: 157 }, { x: 143, y: 156 }, { x: 151, y: 154 }, {
      x: 160,
      y: 152
    }, { x: 170, y: 149 }, { x: 179, y: 147 }, { x: 185, y: 145 }, { x: 192, y: 144 }, { x: 196, y: 144 }, {
      x: 198,
      y: 144
    }, { x: 200, y: 144 }, { x: 201, y: 147 }, { x: 199, y: 149 }, { x: 194, y: 157 }, { x: 191, y: 160 }, {
      x: 186,
      y: 167
    }, { x: 180, y: 176 }, { x: 177, y: 179 }, { x: 171, y: 187 }, { x: 169, y: 189 }, { x: 165, y: 194 }, {
      x: 164,
      y: 196
    }]
  }, u = {
    name: "left square bracket",
    points: [{ x: 140, y: 124 }, { x: 138, y: 123 }, { x: 135, y: 122 }, { x: 133, y: 123 }, {
      x: 130,
      y: 123
    }, { x: 128, y: 124 }, { x: 125, y: 125 }, { x: 122, y: 124 }, { x: 120, y: 124 }, { x: 118, y: 124 }, {
      x: 116,
      y: 125
    }, { x: 113, y: 125 }, { x: 111, y: 125 }, { x: 108, y: 124 }, { x: 106, y: 125 }, { x: 104, y: 125 }, {
      x: 102,
      y: 124
    }, { x: 100, y: 123 }, { x: 98, y: 123 }, { x: 95, y: 124 }, { x: 93, y: 123 }, { x: 90, y: 124 }, {
      x: 88,
      y: 124
    }, { x: 85, y: 125 }, { x: 83, y: 126 }, { x: 81, y: 127 }, { x: 81, y: 129 }, { x: 82, y: 131 }, {
      x: 82,
      y: 134
    }, { x: 83, y: 138 }, { x: 84, y: 141 }, { x: 84, y: 144 }, { x: 85, y: 148 }, { x: 85, y: 151 }, {
      x: 86,
      y: 156
    }, { x: 86, y: 160 }, { x: 86, y: 164 }, { x: 86, y: 168 }, { x: 87, y: 171 }, { x: 87, y: 175 }, {
      x: 87,
      y: 179
    }, { x: 87, y: 182 }, { x: 87, y: 186 }, { x: 88, y: 188 }, { x: 88, y: 195 }, { x: 88, y: 198 }, {
      x: 88,
      y: 201
    }, { x: 88, y: 207 }, { x: 89, y: 211 }, { x: 89, y: 213 }, { x: 89, y: 217 }, { x: 89, y: 222 }, {
      x: 88,
      y: 225
    }, { x: 88, y: 229 }, { x: 88, y: 231 }, { x: 88, y: 233 }, { x: 88, y: 235 }, { x: 89, y: 237 }, {
      x: 89,
      y: 240
    }, { x: 89, y: 242 }, { x: 91, y: 241 }, { x: 94, y: 241 }, { x: 96, y: 240 }, { x: 98, y: 239 }, {
      x: 105,
      y: 240
    }, { x: 109, y: 240 }, { x: 113, y: 239 }, { x: 116, y: 240 }, { x: 121, y: 239 }, { x: 130, y: 240 }, {
      x: 136,
      y: 237
    }, { x: 139, y: 237 }, { x: 144, y: 238 }, { x: 151, y: 237 }, { x: 157, y: 236 }, { x: 159, y: 237 }]
  }, a = {
    name: "right square bracket",
    points: [{ x: 112, y: 138 }, { x: 112, y: 136 }, { x: 115, y: 136 }, { x: 118, y: 137 }, {
      x: 120,
      y: 136
    }, { x: 123, y: 136 }, { x: 125, y: 136 }, { x: 128, y: 136 }, { x: 131, y: 136 }, { x: 134, y: 135 }, {
      x: 137,
      y: 135
    }, { x: 140, y: 134 }, { x: 143, y: 133 }, { x: 145, y: 132 }, { x: 147, y: 132 }, { x: 149, y: 132 }, {
      x: 152,
      y: 132
    }, { x: 153, y: 134 }, { x: 154, y: 137 }, { x: 155, y: 141 }, { x: 156, y: 144 }, { x: 157, y: 152 }, {
      x: 158,
      y: 161
    }, { x: 160, y: 170 }, { x: 162, y: 182 }, { x: 164, y: 192 }, { x: 166, y: 200 }, { x: 167, y: 209 }, {
      x: 168,
      y: 214
    }, { x: 168, y: 216 }, { x: 169, y: 221 }, { x: 169, y: 223 }, { x: 169, y: 228 }, { x: 169, y: 231 }, {
      x: 166,
      y: 233
    }, { x: 164, y: 234 }, { x: 161, y: 235 }, { x: 155, y: 236 }, { x: 147, y: 235 }, { x: 140, y: 233 }, {
      x: 131,
      y: 233
    }, { x: 124, y: 233 }, { x: 117, y: 235 }, { x: 114, y: 238 }, { x: 112, y: 238 }]
  }, c = {
    name: "v",
    points: [{ x: 89, y: 164 }, { x: 90, y: 162 }, { x: 92, y: 162 }, { x: 94, y: 164 }, { x: 95, y: 166 }, {
      x: 96,
      y: 169
    }, { x: 97, y: 171 }, { x: 99, y: 175 }, { x: 101, y: 178 }, { x: 103, y: 182 }, { x: 106, y: 189 }, {
      x: 108,
      y: 194
    }, { x: 111, y: 199 }, { x: 114, y: 204 }, { x: 117, y: 209 }, { x: 119, y: 214 }, { x: 122, y: 218 }, {
      x: 124,
      y: 222
    }, { x: 126, y: 225 }, { x: 128, y: 228 }, { x: 130, y: 229 }, { x: 133, y: 233 }, { x: 134, y: 236 }, {
      x: 136,
      y: 239
    }, { x: 138, y: 240 }, { x: 139, y: 242 }, { x: 140, y: 244 }, { x: 142, y: 242 }, { x: 142, y: 240 }, {
      x: 142,
      y: 237
    }, { x: 143, y: 235 }, { x: 143, y: 233 }, { x: 145, y: 229 }, { x: 146, y: 226 }, { x: 148, y: 217 }, {
      x: 149,
      y: 208
    }, { x: 149, y: 205 }, { x: 151, y: 196 }, { x: 151, y: 193 }, { x: 153, y: 182 }, { x: 155, y: 172 }, {
      x: 157,
      y: 165
    }, { x: 159, y: 160 }, { x: 162, y: 155 }, { x: 164, y: 150 }, { x: 165, y: 148 }, { x: 166, y: 146 }]
  }, f = {
    name: "delete",
    points: [{ x: 123, y: 129 }, { x: 123, y: 131 }, { x: 124, y: 133 }, { x: 125, y: 136 }, {
      x: 127,
      y: 140
    }, { x: 129, y: 142 }, { x: 133, y: 148 }, { x: 137, y: 154 }, { x: 143, y: 158 }, { x: 145, y: 161 }, {
      x: 148,
      y: 164
    }, { x: 153, y: 170 }, { x: 158, y: 176 }, { x: 160, y: 178 }, { x: 164, y: 183 }, { x: 168, y: 188 }, {
      x: 171,
      y: 191
    }, { x: 175, y: 196 }, { x: 178, y: 200 }, { x: 180, y: 202 }, { x: 181, y: 205 }, { x: 184, y: 208 }, {
      x: 186,
      y: 210
    }, { x: 187, y: 213 }, { x: 188, y: 215 }, { x: 186, y: 212 }, { x: 183, y: 211 }, { x: 177, y: 208 }, {
      x: 169,
      y: 206
    }, { x: 162, y: 205 }, { x: 154, y: 207 }, { x: 145, y: 209 }, { x: 137, y: 210 }, { x: 129, y: 214 }, {
      x: 122,
      y: 217
    }, { x: 118, y: 218 }, { x: 111, y: 221 }, { x: 109, y: 222 }, { x: 110, y: 219 }, { x: 112, y: 217 }, {
      x: 118,
      y: 209
    }, { x: 120, y: 207 }, { x: 128, y: 196 }, { x: 135, y: 187 }, { x: 138, y: 183 }, { x: 148, y: 167 }, {
      x: 157,
      y: 153
    }, { x: 163, y: 145 }, { x: 165, y: 142 }, { x: 172, y: 133 }, { x: 177, y: 127 }, { x: 179, y: 127 }, {
      x: 180,
      y: 125
    }]
  }, l = {
    name: "left curly brace",
    points: [{ x: 150, y: 116 }, { x: 147, y: 117 }, { x: 145, y: 116 }, { x: 142, y: 116 }, {
      x: 139,
      y: 117
    }, { x: 136, y: 117 }, { x: 133, y: 118 }, { x: 129, y: 121 }, { x: 126, y: 122 }, { x: 123, y: 123 }, {
      x: 120,
      y: 125
    }, { x: 118, y: 127 }, { x: 115, y: 128 }, { x: 113, y: 129 }, { x: 112, y: 131 }, { x: 113, y: 134 }, {
      x: 115,
      y: 134
    }, { x: 117, y: 135 }, { x: 120, y: 135 }, { x: 123, y: 137 }, { x: 126, y: 138 }, { x: 129, y: 140 }, {
      x: 135,
      y: 143
    }, { x: 137, y: 144 }, { x: 139, y: 147 }, { x: 141, y: 149 }, { x: 140, y: 152 }, { x: 139, y: 155 }, {
      x: 134,
      y: 159
    }, { x: 131, y: 161 }, { x: 124, y: 166 }, { x: 121, y: 166 }, { x: 117, y: 166 }, { x: 114, y: 167 }, {
      x: 112,
      y: 166
    }, { x: 114, y: 164 }, { x: 116, y: 163 }, { x: 118, y: 163 }, { x: 120, y: 162 }, { x: 122, y: 163 }, {
      x: 125,
      y: 164
    }, { x: 127, y: 165 }, { x: 129, y: 166 }, { x: 130, y: 168 }, { x: 129, y: 171 }, { x: 127, y: 175 }, {
      x: 125,
      y: 179
    }, { x: 123, y: 184 }, { x: 121, y: 190 }, { x: 120, y: 194 }, { x: 119, y: 199 }, { x: 120, y: 202 }, {
      x: 123,
      y: 207
    }, { x: 127, y: 211 }, { x: 133, y: 215 }, { x: 142, y: 219 }, { x: 148, y: 220 }, { x: 151, y: 221 }]
  }, p = {
    name: "right curly brace",
    points: [{ x: 117, y: 132 }, { x: 115, y: 132 }, { x: 115, y: 129 }, { x: 117, y: 129 }, {
      x: 119,
      y: 128
    }, { x: 122, y: 127 }, { x: 125, y: 127 }, { x: 127, y: 127 }, { x: 130, y: 127 }, { x: 133, y: 129 }, {
      x: 136,
      y: 129
    }, { x: 138, y: 130 }, { x: 140, y: 131 }, { x: 143, y: 134 }, { x: 144, y: 136 }, { x: 145, y: 139 }, {
      x: 145,
      y: 142
    }, { x: 145, y: 145 }, { x: 145, y: 147 }, { x: 145, y: 149 }, { x: 144, y: 152 }, { x: 142, y: 157 }, {
      x: 141,
      y: 160
    }, { x: 139, y: 163 }, { x: 137, y: 166 }, { x: 135, y: 167 }, { x: 133, y: 169 }, { x: 131, y: 172 }, {
      x: 128,
      y: 173
    }, { x: 126, y: 176 }, { x: 125, y: 178 }, { x: 125, y: 180 }, { x: 125, y: 182 }, { x: 126, y: 184 }, {
      x: 128,
      y: 187
    }, { x: 130, y: 187 }, { x: 132, y: 188 }, { x: 135, y: 189 }, { x: 140, y: 189 }, { x: 145, y: 189 }, {
      x: 150,
      y: 187
    }, { x: 155, y: 186 }, { x: 157, y: 185 }, { x: 159, y: 184 }, { x: 156, y: 185 }, { x: 154, y: 185 }, {
      x: 149,
      y: 185
    }, { x: 145, y: 187 }, { x: 141, y: 188 }, { x: 136, y: 191 }, { x: 134, y: 191 }, { x: 131, y: 192 }, {
      x: 129,
      y: 193
    }, { x: 129, y: 195 }, { x: 129, y: 197 }, { x: 131, y: 200 }, { x: 133, y: 202 }, { x: 136, y: 206 }, {
      x: 139,
      y: 211
    }, { x: 142, y: 215 }, { x: 145, y: 220 }, { x: 147, y: 225 }, { x: 148, y: 231 }, { x: 147, y: 239 }, {
      x: 144,
      y: 244
    }, { x: 139, y: 248 }, { x: 134, y: 250 }, { x: 126, y: 253 }, { x: 119, y: 253 }, { x: 115, y: 253 }]
  }, h = {
    name: "star",
    points: [{ x: 75, y: 250 }, { x: 75, y: 247 }, { x: 77, y: 244 }, { x: 78, y: 242 }, { x: 79, y: 239 }, {
      x: 80,
      y: 237
    }, { x: 82, y: 234 }, { x: 82, y: 232 }, { x: 84, y: 229 }, { x: 85, y: 225 }, { x: 87, y: 222 }, {
      x: 88,
      y: 219
    }, { x: 89, y: 216 }, { x: 91, y: 212 }, { x: 92, y: 208 }, { x: 94, y: 204 }, { x: 95, y: 201 }, {
      x: 96,
      y: 196
    }, { x: 97, y: 194 }, { x: 98, y: 191 }, { x: 100, y: 185 }, { x: 102, y: 178 }, { x: 104, y: 173 }, {
      x: 104,
      y: 171
    }, { x: 105, y: 164 }, { x: 106, y: 158 }, { x: 107, y: 156 }, { x: 107, y: 152 }, { x: 108, y: 145 }, {
      x: 109,
      y: 141
    }, { x: 110, y: 139 }, { x: 112, y: 133 }, { x: 113, y: 131 }, { x: 116, y: 127 }, { x: 117, y: 125 }, {
      x: 119,
      y: 122
    }, { x: 121, y: 121 }, { x: 123, y: 120 }, { x: 125, y: 122 }, { x: 125, y: 125 }, { x: 127, y: 130 }, {
      x: 128,
      y: 133
    }, { x: 131, y: 143 }, { x: 136, y: 153 }, { x: 140, y: 163 }, { x: 144, y: 172 }, { x: 145, y: 175 }, {
      x: 151,
      y: 189
    }, { x: 156, y: 201 }, { x: 161, y: 213 }, { x: 166, y: 225 }, { x: 169, y: 233 }, { x: 171, y: 236 }, {
      x: 174,
      y: 243
    }, { x: 177, y: 247 }, { x: 178, y: 249 }, { x: 179, y: 251 }, { x: 180, y: 253 }, { x: 180, y: 255 }, {
      x: 179,
      y: 257
    }, { x: 177, y: 257 }, { x: 174, y: 255 }, { x: 169, y: 250 }, { x: 164, y: 247 }, { x: 160, y: 245 }, {
      x: 149,
      y: 238
    }, { x: 138, y: 230 }, { x: 127, y: 221 }, { x: 124, y: 220 }, { x: 112, y: 212 }, { x: 110, y: 210 }, {
      x: 96,
      y: 201
    }, { x: 84, y: 195 }, { x: 74, y: 190 }, { x: 64, y: 182 }, { x: 55, y: 175 }, { x: 51, y: 172 }, {
      x: 49,
      y: 170
    }, { x: 51, y: 169 }, { x: 56, y: 169 }, { x: 66, y: 169 }, { x: 78, y: 168 }, { x: 92, y: 166 }, {
      x: 107,
      y: 164
    }, { x: 123, y: 161 }, { x: 140, y: 162 }, { x: 156, y: 162 }, { x: 171, y: 160 }, { x: 173, y: 160 }, {
      x: 186,
      y: 160
    }, { x: 195, y: 160 }, { x: 198, y: 161 }, { x: 203, y: 163 }, { x: 208, y: 163 }, { x: 206, y: 164 }, {
      x: 200,
      y: 167
    }, { x: 187, y: 172 }, { x: 174, y: 179 }, { x: 172, y: 181 }, { x: 153, y: 192 }, { x: 137, y: 201 }, {
      x: 123,
      y: 211
    }, { x: 112, y: 220 }, { x: 99, y: 229 }, { x: 90, y: 237 }, { x: 80, y: 244 }, { x: 73, y: 250 }, {
      x: 69,
      y: 254
    }, { x: 69, y: 252 }]
  }, v = {
    name: "pigtail",
    points: [{ x: 81, y: 219 }, { x: 84, y: 218 }, { x: 86, y: 220 }, { x: 88, y: 220 }, { x: 90, y: 220 }, {
      x: 92,
      y: 219
    }, { x: 95, y: 220 }, { x: 97, y: 219 }, { x: 99, y: 220 }, { x: 102, y: 218 }, { x: 105, y: 217 }, {
      x: 107,
      y: 216
    }, { x: 110, y: 216 }, { x: 113, y: 214 }, { x: 116, y: 212 }, { x: 118, y: 210 }, { x: 121, y: 208 }, {
      x: 124,
      y: 205
    }, { x: 126, y: 202 }, { x: 129, y: 199 }, { x: 132, y: 196 }, { x: 136, y: 191 }, { x: 139, y: 187 }, {
      x: 142,
      y: 182
    }, { x: 144, y: 179 }, { x: 146, y: 174 }, { x: 148, y: 170 }, { x: 149, y: 168 }, { x: 151, y: 162 }, {
      x: 152,
      y: 160
    }, { x: 152, y: 157 }, { x: 152, y: 155 }, { x: 152, y: 151 }, { x: 152, y: 149 }, { x: 152, y: 146 }, {
      x: 149,
      y: 142
    }, { x: 148, y: 139 }, { x: 145, y: 137 }, { x: 141, y: 135 }, { x: 139, y: 135 }, { x: 134, y: 136 }, {
      x: 130,
      y: 140
    }, { x: 128, y: 142 }, { x: 126, y: 145 }, { x: 122, y: 150 }, { x: 119, y: 158 }, { x: 117, y: 163 }, {
      x: 115,
      y: 170
    }, { x: 114, y: 175 }, { x: 117, y: 184 }, { x: 120, y: 190 }, { x: 125, y: 199 }, { x: 129, y: 203 }, {
      x: 133,
      y: 208
    }, { x: 138, y: 213 }, { x: 145, y: 215 }, { x: 155, y: 218 }, { x: 164, y: 219 }, { x: 166, y: 219 }, {
      x: 177,
      y: 219
    }, { x: 182, y: 218 }, { x: 192, y: 216 }, { x: 196, y: 213 }, { x: 199, y: 212 }, { x: 201, y: 211 }]
  };
  x.Triangle = t, x.X = e, x.Rectangle = n, x.Circle = r, x.Check = i, x.Caret = o, x.Pigtail = v, x.Star = h, x.RightCurlyBrace = p, x.LeftCurlyBrace = l, x.Delete = f, x.V = c, x.RightSquareBracket = a, x.LeftSquareBracket = u, x.Arrow = s
}]);
