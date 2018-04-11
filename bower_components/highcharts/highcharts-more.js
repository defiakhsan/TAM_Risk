/*
 Highcharts JS v6.0.7 (2018-02-16)

 (c) 2009-2016 Torstein Honsi

 License: www.highcharts.com/license
*/
(function (w) { "object" === typeof module && module.exports ? module.exports = w : w(Highcharts) })(function (w) {
    (function (a) {
        var r = a.deg2rad, v = a.isNumber, t = a.pick, n = a.relativeLength; a.CenteredSeriesMixin = {
            getCenter: function () {
                var a = this.options, e = this.chart, h = 2 * (a.slicedOffset || 0), b = e.plotWidth - 2 * h, e = e.plotHeight - 2 * h, c = a.center, c = [t(c[0], "50%"), t(c[1], "50%"), a.size || "100%", a.innerSize || 0], f = Math.min(b, e), k, g; for (k = 0; 4 > k; ++k)g = c[k], a = 2 > k || 2 === k && /%$/.test(g), c[k] = n(g, [b, e, f, c[2]][k]) + (a ? h : 0); c[3] > c[2] && (c[3] = c[2]);
                return c
            }, getStartAndEndRadians: function (a, e) { a = v(a) ? a : 0; e = v(e) && e > a && 360 > e - a ? e : a + 360; return { start: r * (a + -90), end: r * (e + -90) } }
        }
    })(w); (function (a) {
        function r(a, b) { this.init(a, b) } var v = a.CenteredSeriesMixin, t = a.each, n = a.extend, p = a.merge, e = a.splat; n(r.prototype, {
            coll: "pane", init: function (a, b) { this.chart = b; this.background = []; b.pane.push(this); this.setOptions(a) }, setOptions: function (a) { this.options = p(this.defaultOptions, this.chart.angular ? { background: {} } : void 0, a) }, render: function () {
                var a = this.options, b =
                    this.options.background, c = this.chart.renderer; this.group || (this.group = c.g("pane-group").attr({ zIndex: a.zIndex || 0 }).add()); this.updateCenter(); if (b) for (b = e(b), a = Math.max(b.length, this.background.length || 0), c = 0; c < a; c++)b[c] && this.axis ? this.renderBackground(p(this.defaultBackgroundOptions, b[c]), c) : this.background[c] && (this.background[c] = this.background[c].destroy(), this.background.splice(c, 1))
            }, renderBackground: function (a, b) {
                var c = "animate"; this.background[b] || (this.background[b] = this.chart.renderer.path().add(this.group),
                    c = "attr"); this.background[b][c]({ d: this.axis.getPlotBandPath(a.from, a.to, a) }).attr({ fill: a.backgroundColor, stroke: a.borderColor, "stroke-width": a.borderWidth, "class": "highcharts-pane " + (a.className || "") })
            }, defaultOptions: { center: ["50%", "50%"], size: "85%", startAngle: 0 }, defaultBackgroundOptions: { shape: "circle", borderWidth: 1, borderColor: "#cccccc", backgroundColor: { linearGradient: { x1: 0, y1: 0, x2: 0, y2: 1 }, stops: [[0, "#ffffff"], [1, "#e6e6e6"]] }, from: -Number.MAX_VALUE, innerRadius: 0, to: Number.MAX_VALUE, outerRadius: "105%" },
            updateCenter: function (a) { this.center = (a || this.axis || {}).center = v.getCenter.call(this) }, update: function (a, b) { p(!0, this.options, a); this.setOptions(this.options); this.render(); t(this.chart.axes, function (c) { c.pane === this && (c.pane = null, c.update({}, b)) }, this) }
        }); a.Pane = r
    })(w); (function (a) {
        var r = a.each, v = a.extend, t = a.map, n = a.merge, p = a.noop, e = a.pick, h = a.pInt, b = a.wrap, c, f, k = a.Axis.prototype, g = a.Tick.prototype; a.radialAxisExtended || (a.radialAxisExtended = !0, c = {
            getOffset: p, redraw: function () { this.isDirty = !1 },
            render: function () { this.isDirty = !1 }, setScale: p, setCategories: p, setTitle: p
        }, f = {
            defaultRadialGaugeOptions: { labels: { align: "center", x: 0, y: null }, minorGridLineWidth: 0, minorTickInterval: "auto", minorTickLength: 10, minorTickPosition: "inside", minorTickWidth: 1, tickLength: 10, tickPosition: "inside", tickWidth: 2, title: { rotation: 0 }, zIndex: 2 }, defaultRadialXOptions: { gridLineWidth: 1, labels: { align: null, distance: 15, x: 0, y: null, style: { textOverflow: "none" } }, maxPadding: 0, minPadding: 0, showLastLabel: !1, tickLength: 0 }, defaultRadialYOptions: {
                gridLineInterpolation: "circle",
                labels: { align: "right", x: -3, y: -2 }, showLastLabel: !1, title: { x: 4, text: null, rotation: 90 }
            }, setOptions: function (b) { b = this.options = n(this.defaultOptions, this.defaultRadialOptions, b); b.plotBands || (b.plotBands = []) }, getOffset: function () { k.getOffset.call(this); this.chart.axisOffset[this.side] = 0 }, getLinePath: function (b, c) {
                b = this.center; var d = this.chart, a = e(c, b[2] / 2 - this.offset); this.isCircular || void 0 !== c ? (c = this.chart.renderer.symbols.arc(this.left + b[0], this.top + b[1], a, a, {
                    start: this.startAngleRad, end: this.endAngleRad,
                    open: !0, innerR: 0
                }), c.xBounds = [this.left + b[0]], c.yBounds = [this.top + b[1] - a]) : (c = this.postTranslate(this.angleRad, a), c = ["M", b[0] + d.plotLeft, b[1] + d.plotTop, "L", c.x, c.y]); return c
            }, setAxisTranslation: function () { k.setAxisTranslation.call(this); this.center && (this.transA = this.isCircular ? (this.endAngleRad - this.startAngleRad) / (this.max - this.min || 1) : this.center[2] / 2 / (this.max - this.min || 1), this.minPixelPadding = this.isXAxis ? this.transA * this.minPointOffset : 0) }, beforeSetTickPositions: function () {
                if (this.autoConnect =
                    this.isCircular && void 0 === e(this.userMax, this.options.max) && this.endAngleRad - this.startAngleRad === 2 * Math.PI) this.max += this.categories && 1 || this.pointRange || this.closestPointRange || 0
            }, setAxisSize: function () { k.setAxisSize.call(this); this.isRadial && (this.pane.updateCenter(this), this.isCircular && (this.sector = this.endAngleRad - this.startAngleRad), this.len = this.width = this.height = this.center[2] * e(this.sector, 1) / 2) }, getPosition: function (b, c) {
                return this.postTranslate(this.isCircular ? this.translate(b) : this.angleRad,
                    e(this.isCircular ? c : this.translate(b), this.center[2] / 2) - this.offset)
            }, postTranslate: function (b, c) { var d = this.chart, a = this.center; b = this.startAngleRad + b; return { x: d.plotLeft + a[0] + Math.cos(b) * c, y: d.plotTop + a[1] + Math.sin(b) * c } }, getPlotBandPath: function (b, c, a) {
                var d = this.center, f = this.startAngleRad, g = d[2] / 2, m = [e(a.outerRadius, "100%"), a.innerRadius, e(a.thickness, 10)], k = Math.min(this.offset, 0), u = /%$/, p, y = this.isCircular; "polygon" === this.options.gridLineInterpolation ? d = this.getPlotLinePath(b).concat(this.getPlotLinePath(c,
                    !0)) : (b = Math.max(b, this.min), c = Math.min(c, this.max), y || (m[0] = this.translate(b), m[1] = this.translate(c)), m = t(m, function (b) { u.test(b) && (b = h(b, 10) * g / 100); return b }), "circle" !== a.shape && y ? (b = f + this.translate(b), c = f + this.translate(c)) : (b = -Math.PI / 2, c = 1.5 * Math.PI, p = !0), m[0] -= k, m[2] -= k, d = this.chart.renderer.symbols.arc(this.left + d[0], this.top + d[1], m[0], m[0], { start: Math.min(b, c), end: Math.max(b, c), innerR: e(m[1], m[0] - m[2]), open: p })); return d
            }, getPlotLinePath: function (b, c) {
                var d = this, a = d.center, f = d.chart, g = d.getPosition(b),
                m, k, e; d.isCircular ? e = ["M", a[0] + f.plotLeft, a[1] + f.plotTop, "L", g.x, g.y] : "circle" === d.options.gridLineInterpolation ? (b = d.translate(b)) && (e = d.getLinePath(0, b)) : (r(f.xAxis, function (b) { b.pane === d.pane && (m = b) }), e = [], b = d.translate(b), a = m.tickPositions, m.autoConnect && (a = a.concat([a[0]])), c && (a = [].concat(a).reverse()), r(a, function (c, d) { k = m.getPosition(c, b); e.push(d ? "L" : "M", k.x, k.y) })); return e
            }, getTitlePosition: function () {
                var b = this.center, c = this.chart, a = this.options.title; return {
                    x: c.plotLeft + b[0] + (a.x || 0),
                    y: c.plotTop + b[1] - { high: .5, middle: .25, low: 0 }[a.align] * b[2] + (a.y || 0)
                }
            }
        }, b(k, "init", function (b, a, g) {
            var d = a.angular, m = a.polar, k = g.isX, u = d && k, x, p = a.options, h = g.pane || 0, y = this.pane = a.pane && a.pane[h], h = y && y.options; if (d) { if (v(this, u ? c : f), x = !k) this.defaultRadialOptions = this.defaultRadialGaugeOptions } else m && (v(this, f), this.defaultRadialOptions = (x = k) ? this.defaultRadialXOptions : n(this.defaultYAxisOptions, this.defaultRadialYOptions)); d || m ? (this.isRadial = !0, a.inverted = !1, p.chart.zoomType = null) : this.isRadial =
                !1; y && x && (y.axis = this); b.call(this, a, g); !u && y && (d || m) && (b = this.options, this.angleRad = (b.angle || 0) * Math.PI / 180, this.startAngleRad = (h.startAngle - 90) * Math.PI / 180, this.endAngleRad = (e(h.endAngle, h.startAngle + 360) - 90) * Math.PI / 180, this.offset = b.offset || 0, this.isCircular = x)
        }), b(k, "autoLabelAlign", function (b) { if (!this.isRadial) return b.apply(this, [].slice.call(arguments, 1)) }), b(g, "getPosition", function (b, c, a, g, f) { var d = this.axis; return d.getPosition ? d.getPosition(a) : b.call(this, c, a, g, f) }), b(g, "getLabelPosition",
            function (b, c, a, g, f, k, p, x, h) {
                var d = this.axis, m = k.y, l = 20, u = k.align, q = (d.translate(this.pos) + d.startAngleRad + Math.PI / 2) / Math.PI * 180 % 360; d.isRadial ? (b = d.getPosition(this.pos, d.center[2] / 2 + e(k.distance, -25)), "auto" === k.rotation ? g.attr({ rotation: q }) : null === m && (m = d.chart.renderer.fontMetrics(g.styles.fontSize).b - g.getBBox().height / 2), null === u && (d.isCircular ? (this.label.getBBox().width > d.len * d.tickInterval / (d.max - d.min) && (l = 0), u = q > l && q < 180 - l ? "left" : q > 180 + l && q < 360 - l ? "right" : "center") : u = "center", g.attr({ align: u })),
                    b.x += k.x, b.y += m) : b = b.call(this, c, a, g, f, k, p, x, h); return b
            }), b(g, "getMarkPath", function (b, c, a, g, f, k, e) { var d = this.axis; d.isRadial ? (b = d.getPosition(this.pos, d.center[2] / 2 + g), c = ["M", c, a, "L", b.x, b.y]) : c = b.call(this, c, a, g, f, k, e); return c }))
    })(w); (function (a) {
        var r = a.each, v = a.pick, t = a.defined, n = a.seriesType, p = a.seriesTypes, e = a.Series.prototype, h = a.Point.prototype; n("arearange", "area", {
            lineWidth: 1, threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{series.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' },
            trackByArea: !0, dataLabels: { align: null, verticalAlign: null, xLow: 0, xHigh: 0, yLow: 0, yHigh: 0 }
        }, {
            pointArrayMap: ["low", "high"], dataLabelCollections: ["dataLabel", "dataLabelUpper"], toYData: function (b) { return [b.low, b.high] }, pointValKey: "low", deferTranslatePolar: !0, highToXY: function (b) { var c = this.chart, a = this.xAxis.postTranslate(b.rectPlotX, this.yAxis.len - b.plotHigh); b.plotHighX = a.x - c.plotLeft; b.plotHigh = a.y - c.plotTop; b.plotLowX = b.plotX }, translate: function () {
                var b = this, c = b.yAxis, a = !!b.modifyValue; p.area.prototype.translate.apply(b);
                r(b.points, function (f) { var g = f.low, d = f.high, m = f.plotY; null === d || null === g ? (f.isNull = !0, f.plotY = null) : (f.plotLow = m, f.plotHigh = c.translate(a ? b.modifyValue(d, f) : d, 0, 1, 0, 1), a && (f.yBottom = f.plotHigh)) }); this.chart.polar && r(this.points, function (c) { b.highToXY(c); c.tooltipPos = [(c.plotHighX + c.plotLowX) / 2, (c.plotHigh + c.plotLow) / 2] })
            }, getGraphPath: function (b) {
                var c = [], a = [], k, g = p.area.prototype.getGraphPath, d, m, u; u = this.options; var l = this.chart.polar && !1 !== u.connectEnds, q = u.connectNulls, e = u.step; b = b || this.points;
                for (k = b.length; k--;)d = b[k], d.isNull || l || q || b[k + 1] && !b[k + 1].isNull || a.push({ plotX: d.plotX, plotY: d.plotY, doCurve: !1 }), m = { polarPlotY: d.polarPlotY, rectPlotX: d.rectPlotX, yBottom: d.yBottom, plotX: v(d.plotHighX, d.plotX), plotY: d.plotHigh, isNull: d.isNull }, a.push(m), c.push(m), d.isNull || l || q || b[k - 1] && !b[k - 1].isNull || a.push({ plotX: d.plotX, plotY: d.plotY, doCurve: !1 }); b = g.call(this, b); e && (!0 === e && (e = "left"), u.step = { left: "right", center: "center", right: "left" }[e]); c = g.call(this, c); a = g.call(this, a); u.step = e; u = [].concat(b,
                    c); this.chart.polar || "M" !== a[0] || (a[0] = "L"); this.graphPath = u; this.areaPath = b.concat(a); u.isArea = !0; u.xMap = b.xMap; this.areaPath.xMap = b.xMap; return u
            }, drawDataLabels: function () {
                var b = this.data, c = b.length, a, k = [], g = this.options.dataLabels, d = g.align, m = g.verticalAlign, u = g.inside, l, q, z = this.chart.inverted; if (g.enabled || this._hasPointLabels) {
                    for (a = c; a--;)if (l = b[a]) q = u ? l.plotHigh < l.plotLow : l.plotHigh > l.plotLow, l.y = l.high, l._plotY = l.plotY, l.plotY = l.plotHigh, k[a] = l.dataLabel, l.dataLabel = l.dataLabelUpper, l.below =
                        q, z ? d || (g.align = q ? "right" : "left") : m || (g.verticalAlign = q ? "top" : "bottom"), g.x = g.xHigh, g.y = g.yHigh; e.drawDataLabels && e.drawDataLabels.apply(this, arguments); for (a = c; a--;)if (l = b[a]) q = u ? l.plotHigh < l.plotLow : l.plotHigh > l.plotLow, l.dataLabelUpper = l.dataLabel, l.dataLabel = k[a], l.y = l.low, l.plotY = l._plotY, l.below = !q, z ? d || (g.align = q ? "left" : "right") : m || (g.verticalAlign = q ? "bottom" : "top"), g.x = g.xLow, g.y = g.yLow; e.drawDataLabels && e.drawDataLabels.apply(this, arguments)
                } g.align = d; g.verticalAlign = m
            }, alignDataLabel: function () {
                p.column.prototype.alignDataLabel.apply(this,
                    arguments)
            }, drawPoints: function () {
                var b = this.points.length, c, a; e.drawPoints.apply(this, arguments); for (a = 0; a < b;)c = this.points[a], c.lowerGraphic = c.graphic, c.graphic = c.upperGraphic, c._plotY = c.plotY, c._plotX = c.plotX, c.plotY = c.plotHigh, t(c.plotHighX) && (c.plotX = c.plotHighX), c._isInside = c.isInside, this.chart.polar || (c.isInside = c.isTopInside = void 0 !== c.plotY && 0 <= c.plotY && c.plotY <= this.yAxis.len && 0 <= c.plotX && c.plotX <= this.xAxis.len), a++; e.drawPoints.apply(this, arguments); for (a = 0; a < b;)c = this.points[a], c.upperGraphic =
                    c.graphic, c.graphic = c.lowerGraphic, c.isInside = c._isInside, c.plotY = c._plotY, c.plotX = c._plotX, a++
            }, setStackedPoints: a.noop
            }, {
                setState: function () {
                    var b = this.state, c = this.series, a = c.chart.polar; t(this.plotHigh) || (this.plotHigh = c.yAxis.toPixels(this.high, !0)); t(this.plotLow) || (this.plotLow = this.plotY = c.yAxis.toPixels(this.low, !0)); c.stateMarkerGraphic && (c.lowerStateMarkerGraphic = c.stateMarkerGraphic, c.stateMarkerGraphic = c.upperStateMarkerGraphic); this.graphic = this.upperGraphic; this.plotY = this.plotHigh;
                    a && (this.plotX = this.plotHighX); h.setState.apply(this, arguments); this.state = b; this.plotY = this.plotLow; this.graphic = this.lowerGraphic; a && (this.plotX = this.plotLowX); c.stateMarkerGraphic && (c.upperStateMarkerGraphic = c.stateMarkerGraphic, c.stateMarkerGraphic = c.lowerStateMarkerGraphic, c.lowerStateMarkerGraphic = void 0); h.setState.apply(this, arguments)
                }, haloPath: function () {
                    var b = this.series.chart.polar, c = []; this.plotY = this.plotLow; b && (this.plotX = this.plotLowX); this.isInside && (c = h.haloPath.apply(this, arguments));
                    this.plotY = this.plotHigh; b && (this.plotX = this.plotHighX); this.isTopInside && (c = c.concat(h.haloPath.apply(this, arguments))); return c
                }, destroyElements: function () { r(["lowerGraphic", "upperGraphic"], function (b) { this[b] && (this[b] = this[b].destroy()) }, this); this.graphic = null; return h.destroyElements.apply(this, arguments) }
            })
    })(w); (function (a) { var r = a.seriesType; r("areasplinerange", "arearange", null, { getPointSpline: a.seriesTypes.spline.prototype.getPointSpline }) })(w); (function (a) {
        var r = a.defaultPlotOptions, v =
            a.each, t = a.merge, n = a.noop, p = a.pick, e = a.seriesType, h = a.seriesTypes.column.prototype; e("columnrange", "arearange", t(r.column, r.arearange, { pointRange: null, marker: null, states: { hover: { halo: !1 } } }), {
                translate: function () {
                    var b = this, c = b.yAxis, a = b.xAxis, k = a.startAngleRad, g, d = b.chart, m = b.xAxis.isRadial, u = Math.max(d.chartWidth, d.chartHeight) + 999, l; h.translate.apply(b); v(b.points, function (f) {
                        var q = f.shapeArgs, e = b.options.minPointLength, h, n; f.plotHigh = l = Math.min(Math.max(-u, c.translate(f.high, 0, 1, 0, 1)), u); f.plotLow =
                            Math.min(Math.max(-u, f.plotY), u); n = l; h = p(f.rectPlotY, f.plotY) - l; Math.abs(h) < e ? (e -= h, h += e, n -= e / 2) : 0 > h && (h *= -1, n -= h); m ? (g = f.barX + k, f.shapeType = "path", f.shapeArgs = { d: b.polarArc(n + h, n, g, g + f.pointWidth) }) : (q.height = h, q.y = n, f.tooltipPos = d.inverted ? [c.len + c.pos - d.plotLeft - n - h / 2, a.len + a.pos - d.plotTop - q.x - q.width / 2, h] : [a.left - d.plotLeft + q.x + q.width / 2, c.pos - d.plotTop + n + h / 2, h])
                    })
                }, directTouch: !0, trackerGroups: ["group", "dataLabelsGroup"], drawGraph: n, getSymbol: n, crispCol: h.crispCol, drawPoints: h.drawPoints, drawTracker: h.drawTracker,
                getColumnMetrics: h.getColumnMetrics, pointAttribs: h.pointAttribs, animate: function () { return h.animate.apply(this, arguments) }, polarArc: function () { return h.polarArc.apply(this, arguments) }, translate3dPoints: function () { return h.translate3dPoints.apply(this, arguments) }, translate3dShapes: function () { return h.translate3dShapes.apply(this, arguments) }
            }, { setState: h.pointClass.prototype.setState })
    })(w); (function (a) {
        var r = a.each, v = a.isNumber, t = a.merge, n = a.pick, p = a.pInt, e = a.Series, h = a.seriesType, b = a.TrackerMixin;
        h("gauge", "line", { dataLabels: { enabled: !0, defer: !1, y: 15, borderRadius: 3, crop: !1, verticalAlign: "top", zIndex: 2, borderWidth: 1, borderColor: "#cccccc" }, dial: {}, pivot: {}, tooltip: { headerFormat: "" }, showInLegend: !1 }, {
            angular: !0, directTouch: !0, drawGraph: a.noop, fixedBox: !0, forceDL: !0, noSharedTooltip: !0, trackerGroups: ["group", "dataLabelsGroup"], translate: function () {
                var b = this.yAxis, a = this.options, k = b.center; this.generatePoints(); r(this.points, function (c) {
                    var d = t(a.dial, c.dial), g = p(n(d.radius, 80)) * k[2] / 200, f = p(n(d.baseLength,
                        70)) * g / 100, l = p(n(d.rearLength, 10)) * g / 100, q = d.baseWidth || 3, e = d.topWidth || 1, h = a.overshoot, x = b.startAngleRad + b.translate(c.y, null, null, null, !0); v(h) ? (h = h / 180 * Math.PI, x = Math.max(b.startAngleRad - h, Math.min(b.endAngleRad + h, x))) : !1 === a.wrap && (x = Math.max(b.startAngleRad, Math.min(b.endAngleRad, x))); x = 180 * x / Math.PI; c.shapeType = "path"; c.shapeArgs = { d: d.path || ["M", -l, -q / 2, "L", f, -q / 2, g, -e / 2, g, e / 2, f, q / 2, -l, q / 2, "z"], translateX: k[0], translateY: k[1], rotation: x }; c.plotX = k[0]; c.plotY = k[1]
                })
            }, drawPoints: function () {
                var b =
                    this, a = b.yAxis.center, k = b.pivot, g = b.options, d = g.pivot, m = b.chart.renderer; r(b.points, function (c) { var a = c.graphic, d = c.shapeArgs, f = d.d, k = t(g.dial, c.dial); a ? (a.animate(d), d.d = f) : (c.graphic = m[c.shapeType](d).attr({ rotation: d.rotation, zIndex: 1 }).addClass("highcharts-dial").add(b.group), c.graphic.attr({ stroke: k.borderColor || "none", "stroke-width": k.borderWidth || 0, fill: k.backgroundColor || "#000000" })) }); k ? k.animate({ translateX: a[0], translateY: a[1] }) : (b.pivot = m.circle(0, 0, n(d.radius, 5)).attr({ zIndex: 2 }).addClass("highcharts-pivot").translate(a[0],
                        a[1]).add(b.group), b.pivot.attr({ "stroke-width": d.borderWidth || 0, stroke: d.borderColor || "#cccccc", fill: d.backgroundColor || "#000000" }))
            }, animate: function (b) { var c = this; b || (r(c.points, function (b) { var a = b.graphic; a && (a.attr({ rotation: 180 * c.yAxis.startAngleRad / Math.PI }), a.animate({ rotation: b.shapeArgs.rotation }, c.options.animation)) }), c.animate = null) }, render: function () {
            this.group = this.plotGroup("group", "series", this.visible ? "visible" : "hidden", this.options.zIndex, this.chart.seriesGroup); e.prototype.render.call(this);
                this.group.clip(this.chart.clipRect)
            }, setData: function (b, a) { e.prototype.setData.call(this, b, !1); this.processData(); this.generatePoints(); n(a, !0) && this.chart.redraw() }, drawTracker: b && b.drawTrackerPoint
        }, { setState: function (b) { this.state = b } })
    })(w); (function (a) {
        var r = a.each, v = a.noop, t = a.pick, n = a.seriesType, p = a.seriesTypes; n("boxplot", "column", {
            threshold: null, tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e \x3cb\x3e {series.name}\x3c/b\x3e\x3cbr/\x3eMaximum: {point.high}\x3cbr/\x3eUpper quartile: {point.q3}\x3cbr/\x3eMedian: {point.median}\x3cbr/\x3eLower quartile: {point.q1}\x3cbr/\x3eMinimum: {point.low}\x3cbr/\x3e' },
            whiskerLength: "50%", fillColor: "#ffffff", lineWidth: 1, medianWidth: 2, whiskerWidth: 2
        }, {
            pointArrayMap: ["low", "q1", "median", "q3", "high"], toYData: function (a) { return [a.low, a.q1, a.median, a.q3, a.high] }, pointValKey: "high", pointAttribs: function () { return {} }, drawDataLabels: v, translate: function () { var a = this.yAxis, h = this.pointArrayMap; p.column.prototype.translate.apply(this); r(this.points, function (b) { r(h, function (c) { null !== b[c] && (b[c + "Plot"] = a.translate(b[c], 0, 1, 0, 1)) }) }) }, drawPoints: function () {
                var a = this, h = a.options,
                b = a.chart.renderer, c, f, k, g, d, m, u = 0, l, q, p, n, x = !1 !== a.doQuartiles, v, B = a.options.whiskerLength; r(a.points, function (e) {
                    var z = e.graphic, r = z ? "animate" : "attr", J = e.shapeArgs, w = {}, y = {}, H = {}, I = {}, C = e.color || a.color; void 0 !== e.plotY && (l = J.width, q = Math.floor(J.x), p = q + l, n = Math.round(l / 2), c = Math.floor(x ? e.q1Plot : e.lowPlot), f = Math.floor(x ? e.q3Plot : e.lowPlot), k = Math.floor(e.highPlot), g = Math.floor(e.lowPlot), z || (e.graphic = z = b.g("point").add(a.group), e.stem = b.path().addClass("highcharts-boxplot-stem").add(z), B && (e.whiskers =
                        b.path().addClass("highcharts-boxplot-whisker").add(z)), x && (e.box = b.path(void 0).addClass("highcharts-boxplot-box").add(z)), e.medianShape = b.path(void 0).addClass("highcharts-boxplot-median").add(z)), y.stroke = e.stemColor || h.stemColor || C, y["stroke-width"] = t(e.stemWidth, h.stemWidth, h.lineWidth), y.dashstyle = e.stemDashStyle || h.stemDashStyle, e.stem.attr(y), B && (H.stroke = e.whiskerColor || h.whiskerColor || C, H["stroke-width"] = t(e.whiskerWidth, h.whiskerWidth, h.lineWidth), e.whiskers.attr(H)), x && (w.fill = e.fillColor ||
                            h.fillColor || C, w.stroke = h.lineColor || C, w["stroke-width"] = h.lineWidth || 0, e.box.attr(w)), I.stroke = e.medianColor || h.medianColor || C, I["stroke-width"] = t(e.medianWidth, h.medianWidth, h.lineWidth), e.medianShape.attr(I), m = e.stem.strokeWidth() % 2 / 2, u = q + n + m, e.stem[r]({ d: ["M", u, f, "L", u, k, "M", u, c, "L", u, g] }), x && (m = e.box.strokeWidth() % 2 / 2, c = Math.floor(c) + m, f = Math.floor(f) + m, q += m, p += m, e.box[r]({ d: ["M", q, f, "L", q, c, "L", p, c, "L", p, f, "L", q, f, "z"] })), B && (m = e.whiskers.strokeWidth() % 2 / 2, k += m, g += m, v = /%$/.test(B) ? n * parseFloat(B) /
                                100 : B / 2, e.whiskers[r]({ d: ["M", u - v, k, "L", u + v, k, "M", u - v, g, "L", u + v, g] })), d = Math.round(e.medianPlot), m = e.medianShape.strokeWidth() % 2 / 2, d += m, e.medianShape[r]({ d: ["M", q, d, "L", p, d] }))
                })
            }, setStackedPoints: v
            })
    })(w); (function (a) {
        var r = a.each, v = a.noop, t = a.seriesType, n = a.seriesTypes; t("errorbar", "boxplot", {
            color: "#000000", grouping: !1, linkedTo: ":previous", tooltip: { pointFormat: '\x3cspan style\x3d"color:{point.color}"\x3e\u25cf\x3c/span\x3e {series.name}: \x3cb\x3e{point.low}\x3c/b\x3e - \x3cb\x3e{point.high}\x3c/b\x3e\x3cbr/\x3e' },
            whiskerWidth: null
        }, { type: "errorbar", pointArrayMap: ["low", "high"], toYData: function (a) { return [a.low, a.high] }, pointValKey: "high", doQuartiles: !1, drawDataLabels: n.arearange ? function () { var a = this.pointValKey; n.arearange.prototype.drawDataLabels.call(this); r(this.data, function (e) { e.y = e[a] }) } : v, getColumnMetrics: function () { return this.linkedParent && this.linkedParent.columnMetrics || n.column.prototype.getColumnMetrics.call(this) } })
    })(w); (function (a) {
        var r = a.correctFloat, v = a.isNumber, t = a.pick, n = a.Point, p = a.Series,
        e = a.seriesType, h = a.seriesTypes; e("waterfall", "column", { dataLabels: { inside: !0 }, lineWidth: 1, lineColor: "#333333", dashStyle: "dot", borderColor: "#333333", states: { hover: { lineWidthPlus: 0 } } }, {
            pointValKey: "y", translate: function () {
                var b = this.options, a = this.yAxis, f, k, g, d, m, e, l, q, p, n, x = t(b.minPointLength, 5), v = x / 2, w = b.threshold, y = b.stacking, A; h.column.prototype.translate.apply(this); q = p = w; k = this.points; f = 0; for (b = k.length; f < b; f++)g = k[f], l = this.processedYData[f], d = g.shapeArgs, m = y && a.stacks[(this.negStacks && l < w ? "-" :
                    "") + this.stackKey], A = this.getStackIndicator(A, g.x, this.index), n = t(m && m[g.x].points[A.key], [0, l]), g.isSum ? g.y = r(l) : g.isIntermediateSum && (g.y = r(l - p)), e = Math.max(q, q + g.y) + n[0], d.y = a.translate(e, 0, 1, 0, 1), g.isSum ? (d.y = a.translate(n[1], 0, 1, 0, 1), d.height = Math.min(a.translate(n[0], 0, 1, 0, 1), a.len) - d.y) : g.isIntermediateSum ? (d.y = a.translate(n[1], 0, 1, 0, 1), d.height = Math.min(a.translate(p, 0, 1, 0, 1), a.len) - d.y, p = n[1]) : (d.height = 0 < l ? a.translate(q, 0, 1, 0, 1) - d.y : a.translate(q, 0, 1, 0, 1) - a.translate(q - l, 0, 1, 0, 1), q += m &&
                        m[g.x] ? m[g.x].total : l), 0 > d.height && (d.y += d.height, d.height *= -1), g.plotY = d.y = Math.round(d.y) - this.borderWidth % 2 / 2, d.height = Math.max(Math.round(d.height), .001), g.yBottom = d.y + d.height, d.height <= x && !g.isNull ? (d.height = x, d.y -= v, g.plotY = d.y, g.minPointLengthOffset = 0 > g.y ? -v : v) : g.minPointLengthOffset = 0, d = g.plotY + (g.negative ? d.height : 0), this.chart.inverted ? g.tooltipPos[0] = a.len - d : g.tooltipPos[1] = d
            }, processData: function (b) {
                var a = this.yData, f = this.options.data, k, g = a.length, d, m, e, l, q, h; m = d = e = l = this.options.threshold ||
                    0; for (h = 0; h < g; h++)q = a[h], k = f && f[h] ? f[h] : {}, "sum" === q || k.isSum ? a[h] = r(m) : "intermediateSum" === q || k.isIntermediateSum ? a[h] = r(d) : (m += q, d += q), e = Math.min(m, e), l = Math.max(m, l); p.prototype.processData.call(this, b); this.options.stacking || (this.dataMin = e, this.dataMax = l)
            }, toYData: function (b) { return b.isSum ? 0 === b.x ? null : "sum" : b.isIntermediateSum ? 0 === b.x ? null : "intermediateSum" : b.y }, pointAttribs: function (b, a) {
                var c = this.options.upColor; c && !b.options.color && (b.color = 0 < b.y ? c : null); b = h.column.prototype.pointAttribs.call(this,
                    b, a); delete b.dashstyle; return b
            }, getGraphPath: function () { return ["M", 0, 0] }, getCrispPath: function () { var b = this.data, a = b.length, f = this.graph.strokeWidth() + this.borderWidth, f = Math.round(f) % 2 / 2, k = this.xAxis.reversed, g = this.yAxis.reversed, d = [], m, e, l; for (l = 1; l < a; l++) { e = b[l].shapeArgs; m = b[l - 1].shapeArgs; e = ["M", m.x + (k ? 0 : m.width), m.y + b[l - 1].minPointLengthOffset + f, "L", e.x + (k ? m.width : 0), m.y + b[l - 1].minPointLengthOffset + f]; if (0 > b[l - 1].y && !g || 0 < b[l - 1].y && g) e[2] += m.height, e[5] += m.height; d = d.concat(e) } return d },
            drawGraph: function () { p.prototype.drawGraph.call(this); this.graph.attr({ d: this.getCrispPath() }) }, setStackedPoints: function () { var b = this.options, a, f; p.prototype.setStackedPoints.apply(this, arguments); a = this.stackedYData ? this.stackedYData.length : 0; for (f = 1; f < a; f++)b.data[f].isSum || b.data[f].isIntermediateSum || (this.stackedYData[f] += this.stackedYData[f - 1]) }, getExtremes: function () { if (this.options.stacking) return p.prototype.getExtremes.apply(this, arguments) }
        }, {
            getClassName: function () {
                var b = n.prototype.getClassName.call(this);
                this.isSum ? b += " highcharts-sum" : this.isIntermediateSum && (b += " highcharts-intermediate-sum"); return b
            }, isValid: function () { return v(this.y, !0) || this.isSum || this.isIntermediateSum }
            })
    })(w); (function (a) {
        var r = a.Series, v = a.seriesType, t = a.seriesTypes; v("polygon", "scatter", { marker: { enabled: !1, states: { hover: { enabled: !1 } } }, stickyTracking: !1, tooltip: { followPointer: !0, pointFormat: "" }, trackByArea: !0 }, {
            type: "polygon", getGraphPath: function () {
                for (var a = r.prototype.getGraphPath.call(this), p = a.length + 1; p--;)(p === a.length ||
                    "M" === a[p]) && 0 < p && a.splice(p, 0, "z"); return this.areaPath = a
            }, drawGraph: function () { this.options.fillColor = this.color; t.area.prototype.drawGraph.call(this) }, drawLegendSymbol: a.LegendSymbolMixin.drawRectangle, drawTracker: r.prototype.drawTracker, setStackedPoints: a.noop
        })
    })(w); (function (a) {
        var r = a.arrayMax, v = a.arrayMin, t = a.Axis, n = a.color, p = a.each, e = a.isNumber, h = a.noop, b = a.pick, c = a.pInt, f = a.Point, k = a.Series, g = a.seriesType, d = a.seriesTypes; g("bubble", "scatter", {
            dataLabels: {
                formatter: function () { return this.point.z },
                inside: !0, verticalAlign: "middle"
            }, marker: { lineColor: null, lineWidth: 1, fillOpacity: .5, radius: null, states: { hover: { radiusPlus: 0 } }, symbol: "circle" }, minSize: 8, maxSize: "20%", softThreshold: !1, states: { hover: { halo: { size: 5 } } }, tooltip: { pointFormat: "({point.x}, {point.y}), Size: {point.z}" }, turboThreshold: 0, zThreshold: 0, zoneAxis: "z"
        }, {
            pointArrayMap: ["y", "z"], parallelArrays: ["x", "y", "z"], trackerGroups: ["group", "dataLabelsGroup"], specialGroup: "group", bubblePadding: !0, zoneAxis: "z", directTouch: !0, pointAttribs: function (b,
                a) { var c = this.options.marker.fillOpacity; b = k.prototype.pointAttribs.call(this, b, a); 1 !== c && (b.fill = n(b.fill).setOpacity(c).get("rgba")); return b }, getRadii: function (b, a, c, d) { var g, k, f, e = this.zData, m = [], l = this.options, h = "width" !== l.sizeBy, q = l.zThreshold, u = a - b; k = 0; for (g = e.length; k < g; k++)f = e[k], l.sizeByAbsoluteValue && null !== f && (f = Math.abs(f - q), a = Math.max(a - q, Math.abs(b - q)), b = 0), null === f ? f = null : f < b ? f = c / 2 - 1 : (f = 0 < u ? (f - b) / u : .5, h && 0 <= f && (f = Math.sqrt(f)), f = Math.ceil(c + f * (d - c)) / 2), m.push(f); this.radii = m }, animate: function (b) {
                    var a =
                        this.options.animation; b || (p(this.points, function (b) { var c = b.graphic, d; c && c.width && (d = { x: c.x, y: c.y, width: c.width, height: c.height }, c.attr({ x: b.plotX, y: b.plotY, width: 1, height: 1 }), c.animate(d, a)) }), this.animate = null)
                }, translate: function () {
                    var b, c = this.data, g, f, k = this.radii; d.scatter.prototype.translate.call(this); for (b = c.length; b--;)g = c[b], f = k ? k[b] : 0, e(f) && f >= this.minPxSize / 2 ? (g.marker = a.extend(g.marker, { radius: f, width: 2 * f, height: 2 * f }), g.dlBox = { x: g.plotX - f, y: g.plotY - f, width: 2 * f, height: 2 * f }) : g.shapeArgs =
                        g.plotY = g.dlBox = void 0
                }, alignDataLabel: d.column.prototype.alignDataLabel, buildKDTree: h, applyZones: h
            }, { haloPath: function (b) { return f.prototype.haloPath.call(this, 0 === b ? 0 : (this.marker ? this.marker.radius || 0 : 0) + b) }, ttBelow: !1 }); t.prototype.beforePadding = function () {
                var a = this, d = this.len, g = this.chart, f = 0, k = d, h = this.isXAxis, n = h ? "xData" : "yData", t = this.min, w = {}, y = Math.min(g.plotWidth, g.plotHeight), A = Number.MAX_VALUE, E = -Number.MAX_VALUE, F = this.max - t, D = d / F, G = []; p(this.series, function (d) {
                    var f = d.options; !d.bubblePadding ||
                        !d.visible && g.options.chart.ignoreHiddenSeries || (a.allowZoomOutside = !0, G.push(d), h && (p(["minSize", "maxSize"], function (b) { var a = f[b], d = /%$/.test(a), a = c(a); w[b] = d ? y * a / 100 : a }), d.minPxSize = w.minSize, d.maxPxSize = Math.max(w.maxSize, w.minSize), d = d.zData, d.length && (A = b(f.zMin, Math.min(A, Math.max(v(d), !1 === f.displayNegative ? f.zThreshold : -Number.MAX_VALUE))), E = b(f.zMax, Math.max(E, r(d))))))
                }); p(G, function (b) {
                    var c = b[n], d = c.length, g; h && b.getRadii(A, E, b.minPxSize, b.maxPxSize); if (0 < F) for (; d--;)e(c[d]) && a.dataMin <=
                        c[d] && c[d] <= a.dataMax && (g = b.radii[d], f = Math.min((c[d] - t) * D - g, f), k = Math.max((c[d] - t) * D + g, k))
                }); G.length && 0 < F && !this.isLog && (k -= d, D *= (d + f - k) / d, p([["min", "userMin", f], ["max", "userMax", k]], function (c) { void 0 === b(a.options[c[0]], a[c[1]]) && (a[c[0]] += c[2] / D) }))
            }
    })(w); (function (a) {
        var r = a.each, v = a.pick, t = a.seriesTypes, n = a.wrap, p = a.Series.prototype, e = a.Pointer.prototype; if (!a.polarExtended) {
        a.polarExtended = !0; p.searchPointByAngle = function (b) {
            var a = this.chart, f = this.xAxis.pane.center; return this.searchKDTree({
                clientX: 180 +
                    -180 / Math.PI * Math.atan2(b.chartX - f[0] - a.plotLeft, b.chartY - f[1] - a.plotTop)
            })
        }; p.getConnectors = function (b, a, f, k) {
            var c, d, e, h, l, p, n, r; d = k ? 1 : 0; c = 0 <= a && a <= b.length - 1 ? a : 0 > a ? b.length - 1 + a : 0; a = 0 > c - 1 ? b.length - (1 + d) : c - 1; d = c + 1 > b.length - 1 ? d : c + 1; e = b[a]; d = b[d]; h = e.plotX; e = e.plotY; l = d.plotX; p = d.plotY; d = b[c].plotX; c = b[c].plotY; h = (1.5 * d + h) / 2.5; e = (1.5 * c + e) / 2.5; l = (1.5 * d + l) / 2.5; n = (1.5 * c + p) / 2.5; p = Math.sqrt(Math.pow(h - d, 2) + Math.pow(e - c, 2)); r = Math.sqrt(Math.pow(l - d, 2) + Math.pow(n - c, 2)); h = Math.atan2(e - c, h - d); n = Math.PI / 2 + (h +
                Math.atan2(n - c, l - d)) / 2; Math.abs(h - n) > Math.PI / 2 && (n -= Math.PI); h = d + Math.cos(n) * p; e = c + Math.sin(n) * p; l = d + Math.cos(Math.PI + n) * r; n = c + Math.sin(Math.PI + n) * r; d = { rightContX: l, rightContY: n, leftContX: h, leftContY: e, plotX: d, plotY: c }; f && (d.prevPointCont = this.getConnectors(b, a, !1, k)); return d
        }; n(p, "buildKDTree", function (b) { this.chart.polar && (this.kdByAngle ? this.searchPoint = this.searchPointByAngle : this.options.findNearestPointBy = "xy"); b.apply(this) }); p.toXY = function (b) {
            var a, f = this.chart, k = b.plotX; a = b.plotY; b.rectPlotX =
                k; b.rectPlotY = a; a = this.xAxis.postTranslate(b.plotX, this.yAxis.len - a); b.plotX = b.polarPlotX = a.x - f.plotLeft; b.plotY = b.polarPlotY = a.y - f.plotTop; this.kdByAngle ? (f = (k / Math.PI * 180 + this.xAxis.pane.options.startAngle) % 360, 0 > f && (f += 360), b.clientX = f) : b.clientX = b.plotX
        }; t.spline && (n(t.spline.prototype, "getPointSpline", function (b, a, f, k) {
            this.chart.polar ? k ? (b = this.getConnectors(a, k, !0, this.connectEnds), b = ["C", b.prevPointCont.rightContX, b.prevPointCont.rightContY, b.leftContX, b.leftContY, b.plotX, b.plotY]) : b = ["M",
                f.plotX, f.plotY] : b = b.call(this, a, f, k); return b
        }), t.areasplinerange && (t.areasplinerange.prototype.getPointSpline = t.spline.prototype.getPointSpline)); a.addEvent(p, "afterTranslate", function () {
            var b = this.chart, c, f; if (b.polar) {
            this.kdByAngle = b.tooltip && b.tooltip.shared; if (!this.preventPostTranslate) for (c = this.points, f = c.length; f--;)this.toXY(c[f]); this.hasClipCircleSetter || (this.hasClipCircleSetter = !!a.addEvent(this, "afterRender", function () {
                var c; b.polar && (c = this.yAxis.center, this.group.clip(b.renderer.clipCircle(c[0],
                    c[1], c[2] / 2)), this.setClip = a.noop)
            }))
            }
        }); n(p, "getGraphPath", function (b, a) { var c = this, e, g, d; if (this.chart.polar) { a = a || this.points; for (e = 0; e < a.length; e++)if (!a[e].isNull) { g = e; break } !1 !== this.options.connectEnds && void 0 !== g && (this.connectEnds = !0, a.splice(a.length, 0, a[g]), d = !0); r(a, function (b) { void 0 === b.polarPlotY && c.toXY(b) }) } e = b.apply(this, [].slice.call(arguments, 1)); d && a.pop(); return e }); var h = function (b, a) {
            var c = this.chart, e = this.options.animation, g = this.group, d = this.markerGroup, h = this.xAxis.center,
            n = c.plotLeft, l = c.plotTop; c.polar ? c.renderer.isSVG && (!0 === e && (e = {}), a ? (b = { translateX: h[0] + n, translateY: h[1] + l, scaleX: .001, scaleY: .001 }, g.attr(b), d && d.attr(b)) : (b = { translateX: n, translateY: l, scaleX: 1, scaleY: 1 }, g.animate(b, e), d && d.animate(b, e), this.animate = null)) : b.call(this, a)
        }; n(p, "animate", h); t.column && (t = t.column.prototype, t.polarArc = function (b, a, f, e) { var c = this.xAxis.center, d = this.yAxis.len; return this.chart.renderer.symbols.arc(c[0], c[1], d - a, null, { start: f, end: e, innerR: d - v(b, d) }) }, n(t, "animate",
            h), n(t, "translate", function (a) { var b = this.xAxis, f = b.startAngleRad, e, g, d; this.preventPostTranslate = !0; a.call(this); if (b.isRadial) for (e = this.points, d = e.length; d--;)g = e[d], a = g.barX + f, g.shapeType = "path", g.shapeArgs = { d: this.polarArc(g.yBottom, g.plotY, a, a + g.pointWidth) }, this.toXY(g), g.tooltipPos = [g.plotX, g.plotY], g.ttBelow = g.plotY > b.center[1] }), n(t, "alignDataLabel", function (a, c, f, e, g, d) {
                this.chart.polar ? (a = c.rectPlotX / Math.PI * 180, null === e.align && (e.align = 20 < a && 160 > a ? "left" : 200 < a && 340 > a ? "right" : "center"),
                    null === e.verticalAlign && (e.verticalAlign = 45 > a || 315 < a ? "bottom" : 135 < a && 225 > a ? "top" : "middle"), p.alignDataLabel.call(this, c, f, e, g, d)) : a.call(this, c, f, e, g, d)
            })); n(e, "getCoordinates", function (a, c) { var b = this.chart, e = { xAxis: [], yAxis: [] }; b.polar ? r(b.axes, function (a) { var d = a.isXAxis, f = a.center, g = c.chartX - f[0] - b.plotLeft, f = c.chartY - f[1] - b.plotTop; e[d ? "xAxis" : "yAxis"].push({ axis: a, value: a.translate(d ? Math.PI - Math.atan2(g, f) : Math.sqrt(Math.pow(g, 2) + Math.pow(f, 2)), !0) }) }) : e = a.call(this, c); return e }); a.SVGRenderer.prototype.clipCircle =
                function (b, c, e) { var f = a.uniqueKey(), g = this.createElement("clipPath").attr({ id: f }).add(this.defs); b = this.circle(b, c, e).add(g); b.id = f; b.clipPath = g; return b }; a.addEvent(a.Chart.prototype, "beforeGetAxes", function () { this.pane || (this.pane = []); r(a.splat(this.options.pane), function (b) { new a.Pane(b, this) }, this) }); a.addEvent(a.Chart.prototype, "afterDrawChartBox", function () { r(this.pane, function (a) { a.render() }) }); n(a.Chart.prototype, "get", function (b, c) {
                    return a.find(this.pane, function (a) {
                        return a.options.id ===
                            c
                    }) || b.call(this, c)
                })
        }
    })(w)
});