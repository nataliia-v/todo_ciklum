!(function(e) {
  var t = {};
  function n(r) {
    if (t[r]) return t[r].exports;
    var o = (t[r] = { i: r, l: !1, exports: {} });
    return e[r].call(o.exports, o, o.exports, n), (o.l = !0), o.exports;
  }
  (n.m = e),
    (n.c = t),
    (n.d = function(e, t, r) {
      n.o(e, t) || Object.defineProperty(e, t, { enumerable: !0, get: r });
    }),
    (n.r = function(e) {
      'undefined' != typeof Symbol &&
        Symbol.toStringTag &&
        Object.defineProperty(e, Symbol.toStringTag, { value: 'Module' }),
        Object.defineProperty(e, '__esModule', { value: !0 });
    }),
    (n.t = function(e, t) {
      if ((1 & t && (e = n(e)), 8 & t)) return e;
      if (4 & t && 'object' == typeof e && e && e.__esModule) return e;
      var r = Object.create(null);
      if (
        (n.r(r),
        Object.defineProperty(r, 'default', { enumerable: !0, value: e }),
        2 & t && 'string' != typeof e)
      )
        for (var o in e)
          n.d(
            r,
            o,
            function(t) {
              return e[t];
            }.bind(null, o),
          );
      return r;
    }),
    (n.n = function(e) {
      var t =
        e && e.__esModule
          ? function() {
              return e.default;
            }
          : function() {
              return e;
            };
      return n.d(t, 'a', t), t;
    }),
    (n.o = function(e, t) {
      return Object.prototype.hasOwnProperty.call(e, t);
    }),
    (n.p = ''),
    n((n.s = 0));
})([
  function(e, t, n) {
    'use strict';
    n.r(t);
    var r = function(e, t) {
        var n = document.createElement('ul');
        n.className = t;
        var r = '';
        return (
          e.forEach(function(e) {
            r += '<li>'.concat(e, '</li>');
          }),
          (n.innerHTML = r),
          n
        );
      },
      o = ['All', 'Open', 'Done'],
      a = ['All', 'High', 'Normal', 'Low'],
      i = function(e, t, n) {
        var r = document.createElement('select');
        (r.className = t), (r.id = n);
        var o = '';
        return (
          e.forEach(function(e) {
            o += '<option>'.concat(e, '</option>');
          }),
          (r.innerHTML = o),
          r
        );
      };
    function l(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function c(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var d = function(e) {
        for (
          var t = document.querySelectorAll('.done-btn'),
            n = JSON.parse(localStorage.getItem('todos')),
            r = 0;
          r < t.length;
          r += 1
        )
          t[r].addEventListener('click', function(t) {
            for (var r = t.target.parentElement.parentElement.id, o = 0; o < n.length; o += 1)
              n[o].id === r && (n[o].status = !0);
            localStorage.setItem('todos', JSON.stringify(n)), e();
          });
      },
      s = function(e) {
        for (var t = document.querySelectorAll('.delete-btn'), n = 0; n < t.length; n += 1)
          t[n].addEventListener('click', function(t) {
            for (
              var n = t.target.parentElement.parentElement.id,
                r = JSON.parse(localStorage.getItem('todos')),
                o = 0;
              o < r.length;
              o += 1
            )
              r[o].id === n && r.splice(o, 1);
            localStorage.setItem('todos', JSON.stringify(r)), e();
          });
      };
    n(1), n(6);
    function u(e, t) {
      var n = Object.keys(e);
      if (Object.getOwnPropertySymbols) {
        var r = Object.getOwnPropertySymbols(e);
        t &&
          (r = r.filter(function(t) {
            return Object.getOwnPropertyDescriptor(e, t).enumerable;
          })),
          n.push.apply(n, r);
      }
      return n;
    }
    function p(e, t, n) {
      return (
        t in e
          ? Object.defineProperty(e, t, {
              value: n,
              enumerable: !0,
              configurable: !0,
              writable: !0,
            })
          : (e[t] = n),
        e
      );
    }
    var m = function(e) {
        for (
          var t = document.querySelectorAll('.edit-btn'),
            n = JSON.parse(localStorage.getItem('todos')),
            r = function(r) {
              t[r].addEventListener('click', function(o) {
                t[r].innerHTML = 'save changes';
                var a = o.target.parentElement.parentElement.id,
                  i = o.target.parentElement.parentElement,
                  l = '',
                  c = '',
                  d = '',
                  s = '',
                  m = i.childNodes;
                m.forEach(function(e) {
                  switch (e.className) {
                    case 'edit-title-todo':
                      l = e;
                      break;
                    case 'title-todo':
                      c = e;
                      break;
                    case 'edit-description-todo':
                      d = e;
                      break;
                    case 'description-todo':
                      s = e;
                      break;
                    default:
                      return m;
                  }
                  return !0;
                }),
                  (c.style.display = 'none'),
                  (l.style.display = 'block'),
                  (s.style.display = 'none'),
                  (d.style.display = 'block'),
                  l.setAttribute('value', c.textContent),
                  d.setAttribute('value', s.textContent),
                  t[r].addEventListener('click', function() {
                    var t = n.find(function(e) {
                      return e.id === a;
                    });
                    (t.title = l.value), (t.description = d.value);
                    var r = n.map(function(e) {
                      return e.id === a
                        ? (function(e) {
                            for (var t = 1; t < arguments.length; t++) {
                              var n = null != arguments[t] ? arguments[t] : {};
                              t % 2
                                ? u(n, !0).forEach(function(t) {
                                    p(e, t, n[t]);
                                  })
                                : Object.getOwnPropertyDescriptors
                                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                                : u(n).forEach(function(t) {
                                    Object.defineProperty(
                                      e,
                                      t,
                                      Object.getOwnPropertyDescriptor(n, t),
                                    );
                                  });
                            }
                            return e;
                          })({}, e, { title: l.value, description: d.value })
                        : e;
                    });
                    localStorage.setItem('todos', JSON.stringify(r)), e();
                  });
              });
            },
            o = 0;
          o < t.length;
          o += 1
        )
          r(o);
      },
      f = function(e) {
        var t = JSON.parse(localStorage.getItem('todos')),
          n = document.getElementById('todos-table-container'),
          r = document.getElementById('tableBody');
        n.removeChild(r);
        var o = document.createElement('ul');
        (o.id = 'tableBody'),
          n.appendChild(o),
          t &&
            e.forEach(function(e) {
              var t = document.createElement('li'),
                n = document.createElement('h3'),
                r = document.createElement('div'),
                a = document.createElement('span'),
                i = document.createElement('div'),
                l = document.createElement('span'),
                c = document.createElement('span'),
                d = document.createElement('input'),
                s = document.createElement('input'),
                u = document.createElement('div');
              if (
                ((t.id = e.id),
                (u.className = 'container'),
                (c.className = 'dots-btn'),
                (l.className = 'btns-wrap'),
                (i.className = 'status-btn'),
                (t.className = 'todoItem'),
                (n.className = 'title-todo'),
                (d.className = 'edit-title-todo'),
                (s.className = 'edit-description-todo'),
                (r.className = 'description-todo'),
                (a.className = 'priority'),
                (c.innerHTML = '...'),
                (n.innerHTML = e.title),
                (r.innerHTML = e.description),
                (a.innerHTML = e.priority),
                (d.style.display = 'none'),
                (s.style.display = 'none'),
                e.status)
              ) {
                t.className = 'todoItem done';
                var p = document.createElement('div');
                (p.className = 'icon-wrap'),
                  (p.innerHTML = '<i class="far fa-check-square"></i>'),
                  t.appendChild(p);
              }
              u.appendChild(a),
                u.appendChild(c),
                t.appendChild(n),
                t.appendChild(d),
                t.appendChild(s),
                t.appendChild(r),
                t.appendChild(i),
                t.appendChild(u),
                t.appendChild(l),
                o.appendChild(t);
            });
      };
    n.d(t, 'default', function() {
      return C;
    });
    var y = r(['TODOList'], 'header'),
      v = r(['Nataliia Verbenska'], 'footer'),
      b = document.getElementById('myModal'),
      g = document.getElementById('container');
    g.appendChild(y),
      g.appendChild(
        (function() {
          var e = document.createElement('div');
          e.id = 'todos-table-container';
          var t,
            n,
            r,
            l = document.createElement('div');
          return (
            (l.className = 'filters-container'),
            l.appendChild(
              (((t = document.createElement('div')).innerHTML =
                '<input type="text" id="search" placeholder="search by title">'),
              t),
            ),
            l.appendChild(i(o, 'status-filter', 'status')),
            l.appendChild(i(a, 'priority-filter', 'priority')),
            l.appendChild(
              (((n = document.createElement('button')).id = 'addNewTodo'),
              (n.type = 'submit'),
              (n.innerHTML = 'Create'),
              n),
            ),
            e.appendChild(l),
            e.appendChild((((r = document.createElement('span')).id = 'tableBody'), r)),
            e
          );
        })(),
      ),
      g.appendChild(
        (function() {
          var e = document.getElementById('addNewTodo'),
            t = document.createElement('div');
          (t.className = 'modal'), (t.id = 'myModal');
          var n = document.createElement('div');
          return (
            (n.className = 'modal-content'),
            t.appendChild(n),
            n.appendChild(
              (function() {
                var e = document.createElement('form');
                (e.className = 'disable-modal'), (e.id = 'newTodoItem');
                var t = document.createElement('div');
                (t.innerHTML =
                  '<label for="title">Title:</label>\n<input id="title" type="text" placeholder="Title" class="cms-table-column">'),
                  e.appendChild(t);
                var n = document.createElement('div');
                (n.innerHTML =
                  '<label for="description">Description:</label>\n<input type="text" id="description" placeholder="Description" class="cms-table-column">'),
                  e.appendChild(n);
                var r = document.createElement('div');
                (r.innerHTML =
                  '<label for="priority">Priority:</label>\n    <select id="priority" required class="options">\n        <option>High</option>\n        <option>Normal</option>\n        <option>Low</option>\n    </select>'),
                  e.appendChild(r);
                var o = document.createElement('div');
                return (
                  (o.className = 'form-btns-wrap'),
                  (o.innerHTML =
                    '<button id="cancelModalBtn">Cancel</button> <button id="submitModalBtn">Save</button>'),
                  e.appendChild(o),
                  e
                );
              })(),
            ),
            e.addEventListener('click', function() {
              t.style.display = 'block';
            }),
            window.addEventListener('click', function(e) {
              e.target === t && (t.style.display = 'none');
            }),
            t
          );
        })(),
      ),
      g.appendChild(v);
    var h, E, O, S, N;
    function C() {
      var e = JSON.parse(localStorage.getItem('todos')),
        t = JSON.parse(localStorage.getItem('filters')) || {},
        n = Object.keys(t).filter(function(e) {
          return t[e];
        }),
        r = Object.values(t).some(Boolean)
          ? e.filter(function(e) {
              return n.every(function(n) {
                switch (n) {
                  case 'search':
                    return new RegExp(t.search, 'i').test(e.title);
                  case 'status':
                    if ('All' === t.status) return !0;
                    if ('Open' === t.status) return !1 === e.status;
                    if ('Done' === t.status) return !0 === e.status;
                    break;
                  case 'priority':
                    return 'All' === t.priority || e.priority === t.priority;
                  default:
                    return !0;
                }
              });
            })
          : e;
      f(r);
      for (
        var o = document.querySelectorAll('.dots-btn'),
          a = document.querySelectorAll('.btns-wrap'),
          i = function(e) {
            o[e].addEventListener('click', function() {
              o[e].innerHTML = 'close';
              var t = document.createElement('div'),
                n = document.createElement('div'),
                r = document.createElement('div');
              (t.className = 'done-btn'),
                (n.className = 'edit-btn'),
                (r.className = 'delete-btn'),
                (t.innerHTML = 'done'),
                (n.innerHTML = 'edit'),
                (r.innerHTML = 'delete'),
                a[e].appendChild(t),
                a[e].appendChild(n),
                a[e].appendChild(r),
                o[e].addEventListener('click', function() {
                  (a[e].style.display = 'none'), (o[e].innerHTML = '...'), C();
                }),
                s(C),
                d(C),
                m(C);
            });
          },
          l = 0;
        l < o.length;
        l += 1
      )
        i(l);
    }
    localStorage.removeItem('filters'),
      document.getElementById('cancelModalBtn').addEventListener('click', function() {
        b.style.display = 'none';
      }),
      document.getElementById('submitModalBtn').addEventListener('click', function() {
        return (function(e) {
          var t = document.getElementById('title').value,
            n = document.getElementById('description').value,
            r = document.querySelector('.options'),
            o = Array.from(r),
            a = {
              title: t,
              description: n,
              priority: '',
              id: 'f'.concat((+new Date()).toString(16)),
              status: !1,
            };
          if (
            (o.forEach(function(e) {
              !0 === e.selected && (a.priority = e.value);
            }),
            null === localStorage.getItem('todos'))
          ) {
            var i = [];
            i.push(a), localStorage.setItem('todos', JSON.stringify(i));
          } else {
            var l = JSON.parse(localStorage.getItem('todos'));
            l.push(a), localStorage.setItem('todos', JSON.stringify(l));
          }
          document.getElementById('newTodoItem').reset(), e();
        })(C);
      }),
      C(),
      (h = C),
      (E = document.getElementById('search')),
      (O = document.getElementById('priority')),
      (S = document.getElementById('status')),
      (N = function(e) {
        var t = e.target.id,
          n = e.target.value,
          r = (function(e) {
            for (var t = 1; t < arguments.length; t++) {
              var n = null != arguments[t] ? arguments[t] : {};
              t % 2
                ? l(n, !0).forEach(function(t) {
                    c(e, t, n[t]);
                  })
                : Object.getOwnPropertyDescriptors
                ? Object.defineProperties(e, Object.getOwnPropertyDescriptors(n))
                : l(n).forEach(function(t) {
                    Object.defineProperty(e, t, Object.getOwnPropertyDescriptor(n, t));
                  });
            }
            return e;
          })({}, JSON.parse(localStorage.getItem('filters')), c({}, t, n));
        localStorage.setItem('filters', JSON.stringify(r)), h();
      }),
      [E, O, S].forEach(function(e) {
        'search' === e.id ? e.addEventListener('input', N) : e.addEventListener('change', N);
      });
  },
  function(e, t) {},
  ,
  ,
  ,
  ,
  function(e, t) {},
]);
