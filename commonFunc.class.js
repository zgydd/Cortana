;
(function(name, context, factory) {
    // Supports UMD. AMD, CommonJS/Node.js and browser context
    if (typeof module !== "undefined" && module.exports) {
        module.exports = factory();
    } else if (typeof define === "function" && define.amd) {
        define(factory);
    } else {
        context[name] = factory();
    }
})("commonFunc", this, function() {
    'use strict';
    //A kind of convolution function used with this._convolutionBase (unused)
    var _convolutionS00 = function(matrix, row, col) {
        return (2 * (matrix[row][col - 2] + matrix[row][col - 1] + matrix[row][col] + matrix[row][col + 1] + matrix[row][col] + 2) - (matrix[row - 2][col - 2] + matrix[row - 2][col - 1] + matrix[row - 2][col] + matrix[row - 2][col + 1] + matrix[row - 2][col + 2] + matrix[row + 2][col - 2] + matrix[row + 2][col - 1] + matrix[row + 2][col] + matrix[row + 2][col + 1] + matrix[row + 2][col + 2]));
    };
    var _convolutionS45 = function(matrix, row, col) {
        return (2 * (matrix[row - 2][col + 2] + matrix[row - 1][col + 1] + matrix[row][col] + matrix[row + 1][col - 1] + matrix[row + 2][col - 2]) - (matrix[row - 2][col - 1] + matrix[row - 2][col] + matrix[row - 1][col - 2] + matrix[row - 1][col - 1] + matrix[row][col - 2] + matrix[row][col + 2] + matrix[row + 1][col + 1] + matrix[row + 1][col + 2] + matrix[row + 2][col] + matrix[row + 2][col + 1]));
    };
    var _convolutionS90 = function(matrix, row, col) {
        return (2 * (matrix[row - 2][col] + matrix[row - 1][col] + matrix[row][col] + matrix[row + 1][col] + matrix[row + 2][col]) - (matrix[row - 2][col - 2] + matrix[row - 1][col - 2] + matrix[row][col - 2] + matrix[row + 1][col - 2] + matrix[row + 2][col - 2] + matrix[row - 2][col + 2] + matrix[row - 1][col + 2] + matrix[row][col + 2] + matrix[row + 1][col + 2] + matrix[row + 2][col + 2]));
    };
    var _convolutionS135 = function(matrix, row, col) {
        return (2 * (matrix[row - 2][col - 2] + matrix[row - 1][col - 1] + matrix[row][col] + matrix[row + 1][col + 1] + matrix[row + 2][col + 2]) - (matrix[row - 2][col] + matrix[row - 2][col + 1] + matrix[row - 1][col + 1] + matrix[row - 1][col + 2] + matrix[row][col - 2] + matrix[row][col + 2] + matrix[row + 1][col - 2] + matrix[row + 1][col - 1] + matrix[row + 2][col - 1] + matrix[row + 2][col]));
    };
    var paddingMark = function(value, mark, length, paddingLeft) {
        var paddingLength = length - value.toString().length;
        var markContext = '';
        for (var i = 0; i < paddingLength; i++) markContext += mark;
        if (paddingLeft) return (markContext + value.toString());
        else return (value.toString() + markContext);
    };
    var traverseClearEvent = function(childrens) {
        childrens.each(function(i, n) {
            var ele = $(n);
            ele.off('click');
            ele.off('change');
            if (ele.children().length) traverseClearEvent(ele.children());
        });
    };
    var factory = {
        //Normal
        //Merge two or more object data together
        _mergeObject: function() {
            var merged = {};
            var argsLen = arguments.length;
            for (var i = 0; i < argsLen; i++) {
                var obj = arguments[i];
                for (var key in obj) {
                    merged[key] = obj[key];
                }
            }
            return merged;
        },
        //Check a object is array or not
        _isArray: function(obj) {
            return Object.prototype.toString.call(obj) === '[object Array]';
        },
        //Check two simple data are equal or not
        _chkEqual: function(a, b) {
            try {
                return (a.toString().trim() === b.toString().trim());
            } catch (e) {
                return false;
            }
        },
        //Parse a data to integer or zero if it can't
        _toInt: function(data) {
            try {
                return parseInt(data);
            } catch (e) {
                return 0;
            }
        },
        //Parse a data to float or zero if it can't
        _toFloat: function(data) {
            try {
                return parseFloat(data);
            } catch (e) {
                return 0;
            }
        },
        //Parse a hex data to char
        _binary2Int: function(data) {
            try {
                return parseInt(data, 2);
            } catch (e) {
                console.log(e.message);
                return -1;
            }
        },
        _hex2char: function(data) {
            var a = data.toString().trim();
            switch (a.length) {
                case 1:
                    a = '%u000' + a;
                    break;
                case 2:
                    a = '%u00' + a;
                    break;
                case 3:
                    a = '%u0' + a;
                    break;
                case 4:
                    a = '%u' + a;
                    break;
                default:
                    break;
            }
            //* Try to use decodeURI() or decodeURIComponent()
            return unescape(a);
        },
        //Combine a char array with number to a integer number
        _combineNumData: function(chars) {
            var result = 0;
            for (var i = 0; i < chars.length; i++) {
                result += parseInt(String.fromCharCode(chars[i])) * Math.pow(10, (chars.length - (i + 1)));
            }
            return result;
        },
        //A common function to padding mark before or after the value
        _paddingMark: function(value, mark, length, paddingLeft) {
            return paddingMark(value, mark, length, paddingLeft);
        },
        //Use Pythagorean to find a hypotenuse's length
        _getHypotenuse: function(edgeA, edgeB) {
            return Math.sqrt(Math.pow(edgeA, 2) + Math.pow(edgeB, 2));
        },
        //Get a random number between [from] to [to]
        _getRandom: function(from, to) {
            var c = from - to + 1;
            return Math.floor(Math.random() * c + to);
        },
        //Get a quarter index in a sorted array
        _getQuarter: function(start, end) {
            return Math.ceil((end - start) / 4);
        },
        //Sort a array with random order
        _randomSort: function(arr) {
            arr.sort(function(a, b) {
                return Math.random() - Math.random();
            });
        },
        //Translate a matrix position index to an area point
        _translatePtoArea: function(num, radius, isRealPoint) {
            //if (num === 0) return 0;
            if (isRealPoint) return (num * radius);
            return (num * radius + radius / 2);
        },
        //A kind of convolution function (unused)
        _convolutionBase: function(matrix, type) {
            if (!matrix || matrix.length < 5 || matrix[0].length < 5) return null;
            var result = [];
            var tpEdge = [];
            for (var tpi = 0; tpi < matrix[0].length; tpi++) {
                tpEdge.push(0);
            }
            result.push(tpEdge.slice(0), tpEdge.slice(0));
            for (var i = 2; i < matrix.length - 2; i++) {
                var row = [0, 0];
                for (var j = 2; j < matrix[i].length - 2; j++) {
                    switch (type) {
                        case 'S00':
                            row.push(_convolutionS00(matrix, i, j));
                            break;
                        case 'S45':
                            row.push(_convolutionS45(matrix, i, j));
                            break;
                        case 'S90':
                            row.push(_convolutionS90(matrix, i, j));
                            break;
                        case 'S135':
                            row.push(_convolutionS135(matrix, i, j));
                            break;
                        default:
                            break;
                    }
                }
                row.push(0, 0);
                result.push(row);
            }
            result.push(tpEdge.slice(0), tpEdge.slice(0));
            tpEdge = null;
            return result;
        },
        //Gaussian blur a image matrix with a 3*3 operator
        _medianFilter: function(matrix) {
            var tmpInner = [];
            for (var i = 0; i < matrix.length; i++) {
                var row = [];
                for (var j = 0; j < matrix[i].length; j++) {
                    var tmpNum = matrix[i][j];
                    switch (true) {
                        case (i === 0 && j === 0):
                            tmpNum += 25 / 9 * matrix[i][j];
                            tmpNum += matrix[i + 1][j];
                            tmpNum += matrix[i][j + 1];
                            tmpNum += matrix[i + 1][j + 1];
                            break;
                        case (i === (matrix.length - 1) && j === (matrix[i].length - 1)):
                            tmpNum += 25 / 9 * matrix[i][j];
                            tmpNum += matrix[i - 1][j];
                            tmpNum += matrix[i][j - 1];
                            tmpNum += matrix[i - 1][j - 1];
                            break;
                        case (i === (matrix.length - 1) && j === 0):
                            tmpNum += 25 / 9 * matrix[i][j];
                            tmpNum += matrix[i - 1][j];
                            tmpNum += matrix[i - 1][j + 1];
                            tmpNum += matrix[i][j + 1];
                            break;
                        case (i === 0 && j === (matrix[i].length - 1)):
                            tmpNum += 25 / 9 * matrix[i][j];
                            tmpNum += matrix[i][j - 1];
                            tmpNum += matrix[i + 1][j - 1];
                            tmpNum += matrix[i + 1][j];
                            break;
                        case (i === 0 && j <= (matrix[i].length - 1)):
                            tmpNum += 5 / 3 * matrix[i][j];
                            tmpNum += matrix[i][j - 1];
                            tmpNum += matrix[i + 1][j - 1];
                            tmpNum += matrix[i + 1][j];
                            tmpNum += matrix[i][j + 1];
                            tmpNum += matrix[i + 1][j + 1];
                            break;
                        case (j === 0 && i < (matrix.length - 1)):
                            tmpNum += 5 / 3 * matrix[i][j];
                            tmpNum += matrix[i - 1][j];
                            tmpNum += matrix[i - 1][j + 1];
                            tmpNum += matrix[i + 1][j];
                            tmpNum += matrix[i][j + 1];
                            tmpNum += matrix[i + 1][j + 1];
                            break;
                        case (i === (matrix.length - 1)):
                            tmpNum += 5 / 3 * matrix[i][j];
                            tmpNum += matrix[i][j + 1];
                            tmpNum += matrix[i - 1][j + 1];
                            tmpNum += matrix[i - 1][j];
                            tmpNum += matrix[i][j - 1];
                            tmpNum += matrix[i - 1][j - 1];
                            break;
                        case (j === (matrix[i].length - 1)):
                            tmpNum += 5 / 3 * matrix[i][j];
                            tmpNum += matrix[i + 1][j];
                            tmpNum += matrix[i + 1][j - 1];
                            tmpNum += matrix[i - 1][j];
                            tmpNum += matrix[i][j - 1];
                            tmpNum += matrix[i - 1][j - 1];
                            break;
                        default:
                            tmpNum += matrix[i - 1][j - 1];
                            tmpNum += matrix[i - 1][j];
                            tmpNum += matrix[i - 1][j + 1];
                            tmpNum += matrix[i][j + 1];
                            tmpNum += matrix[i + 1][j + 1];
                            tmpNum += matrix[i + 1][j];
                            tmpNum += matrix[i + 1][j - 1];
                            tmpNum += matrix[i][j - 1];
                            break;
                    }
                    tmpNum /= 9;
                    row.push(tmpNum);
                }
                tmpInner.push(row);
            }
            return tmpInner;
        },
        //Use sobel operator to find the edge in a image matrix(Grayscale graphs is good)
        _sobelConvolution: function(matrix) {
            /*
                var canvas = $('.heatmap canvas').get(0);
                var ctx = canvas.getContext("2d");
                var imgData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
                if (!_statData.inEdgeDetectionRange) {
                    _statData.inEdgeDetectionRange = true;
                    var inner = [];
                    var row = [];
                    for (var i = 0; i < imgData.length; i += 4) {
                        if (imgData[i] === null) continue;
                        row.push((((imgData[i] * 299 + imgData[i + 1] * 587 + imgData[i + 2] * 114 + 500) / 1000)));
                        //row.push(imgData[i + 3]);
                        if (row.length === canvas.width) {
                            inner.push(row.slice(0));
                            row.length = 0;
                        }
                    }
                    imgData = inner;
                }
            */
            var tmpInner = [];
            for (var i = 1; i < matrix.length - 1; i++) {
                var row = [];
                for (var j = 1; j < matrix[i].length; j++) {
                    var Gx = (matrix[i + 1][j - 1] + 2 * matrix[i + 1][j] + matrix[i + 1][j + 1]) - (matrix[i - 1][j - 1] + 2 * matrix[i - 1][j] + matrix[i - 1][j + 1]);
                    var Gy = (matrix[i - 1][j - 1] + 2 * matrix[i][j - 1] + matrix[i + 1][j - 1]) - (matrix[i - 1][j + 1] + 2 * matrix[i][j + 1] + matrix[i + 1][j + 1]);
                    row.push(Math.abs(Gx) + Math.abs(Gy));
                }
                tmpInner.push(row);
            }

            var innerMatrix = [];
            var maxValue = 0;
            for (var i = 0; i < tmpInner[0].length; i++) {
                var row = [];
                for (var j = 0; j < tmpInner.length; j++) {
                    row.push(tmpInner[j][i]);
                    if (tmpInner[j][i] > maxValue) maxValue = tmpInner[j][i];
                }
                innerMatrix.push(row);
            }
            return {
                matrix: innerMatrix,
                maxValue: maxValue
            };
        },
        //Refinement a graph with a binary image matrix
        _thinImage: function(matrix, skeletonLimit) {
            /*
                var inner = [];
                var row = [];
                for (var i = 0; i < imgData.length; i += 4) {
                    if (imgData[i] === null) continue;
                    if (imgData[i + 3] > 0) row.push(1);
                    else row.push(0);
                    if (row.length === canvas.width) {
                        inner.push(row.slice(0));
                        row.length = 0;
                    }
                }
                var postData = {};
                binaryImg = inner;
            */
            if (!matrix || !matrix.length || !matrix[0].length) return matrix;
            var ite = (!skeletonLimit || isNaN(parseInt(skeletonLimit))) ? 0 : parseInt(skeletonLimit);
            var width = matrix[0].length;
            var height = matrix.length;
            var count = 0;
            while (true) {
                if (ite && count++ > ite) break;
                var delMark = [];
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        var p1 = matrix[i][j];
                        if (p1 !== 1) continue;
                        var p4 = (j === width - 1) ? 0 : matrix[i][j + 1];
                        var p8 = (j === 0) ? 0 : matrix[i][j - 1];
                        var p2 = (i === 0) ? 0 : matrix[i - 1][j];
                        var p3 = (i === 0 || j === width - 1) ? 0 : matrix[i - 1][j + 1];
                        var p9 = (i === 0 || j === 0) ? 0 : matrix[i - 1][j - 1];
                        var p6 = (i === height - 1) ? 0 : matrix[i + 1][j];
                        var p5 = (i === height - 1 || j === width - 1) ? 0 : matrix[i + 1][j + 1];
                        var p7 = (i === height - 1 || j === 0) ? 0 : matrix[i + 1][j - 1];
                        if ((p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9) >= 2 && (p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9) <= 6) {
                            var ap = 0;
                            if (p2 === 0 && p3 === 1) ++ap;
                            if (p3 === 0 && p4 === 1) ++ap;
                            if (p4 === 0 && p5 === 1) ++ap;
                            if (p5 === 0 && p6 === 1) ++ap;
                            if (p6 === 0 && p7 === 1) ++ap;
                            if (p7 === 0 && p8 === 1) ++ap;
                            if (p8 === 0 && p9 === 1) ++ap;
                            if (p9 === 0 && p2 === 1) ++ap;

                            if (ap === 1 && p2 * p4 * p6 === 0 && p4 * p6 * p8 === 0)
                                delMark.push({
                                    x: i,
                                    y: j
                                });
                        }
                    }
                }
                if (delMark.length <= 0) break;
                else {
                    for (var i = 0; i < delMark.length; i++) {
                        matrix[delMark[i].x][delMark[i].y] = 0;
                    }
                }
                delMark.length = 0;
                for (var i = 0; i < height; i++) {
                    for (var j = 0; j < width; j++) {
                        var p1 = matrix[i][j];
                        if (p1 !== 1) continue;
                        var p4 = (j === width - 1) ? 0 : matrix[i][j + 1];
                        var p8 = (j === 0) ? 0 : matrix[i][j - 1];
                        var p2 = (i === 0) ? 0 : matrix[i - 1][j];
                        var p3 = (i === 0 || j === width - 1) ? 0 : matrix[i - 1][j + 1];
                        var p9 = (i === 0 || j === 0) ? 0 : matrix[i - 1][j - 1];
                        var p6 = (i === height - 1) ? 0 : matrix[i + 1][j];
                        var p5 = (i === height - 1 || j === width - 1) ? 0 : matrix[i + 1][j + 1];
                        var p7 = (i === height - 1 || j === 0) ? 0 : matrix[i + 1][j - 1];
                        if ((p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9) >= 2 && (p2 + p3 + p4 + p5 + p6 + p7 + p8 + p9) <= 6) {
                            var ap = 0;
                            if (p2 === 0 && p3 === 1) ++ap;
                            if (p3 === 0 && p4 === 1) ++ap;
                            if (p4 === 0 && p5 === 1) ++ap;
                            if (p5 === 0 && p6 === 1) ++ap;
                            if (p6 === 0 && p7 === 1) ++ap;
                            if (p7 === 0 && p8 === 1) ++ap;
                            if (p8 === 0 && p9 === 1) ++ap;
                            if (p9 === 0 && p2 === 1) ++ap;

                            if (ap === 1 && p2 * p4 * p8 === 0 && p2 * p6 * p8 === 0)
                                delMark.push({
                                    x: i,
                                    y: j
                                });
                        }
                    }
                }
                if (delMark.length <= 0) break;
                else {
                    for (var i = 0; i < delMark.length; i++) {
                        matrix[delMark[i].x][delMark[i].y] = 0;
                    }
                }
                delMark.length = 0;
            }
            return matrix;
        },
        _getBinaryImage: function(imgData, width) {
            var inner = [];
            var row = [];
            for (var i = 0; i < imgData.length; i += 4) {
                if (imgData[i] === null) continue;
                if (imgData[i + 3] > 20) row.push(1);
                else row.push(0);
                if (row.length === width) {
                    inner.push(row.slice(0));
                    row.length = 0;
                }
            }
            return inner;
        },
        _registerListener: function(container, func) {
            if (typeof func !== 'function' || !this._isArray(container)) return;
            var i = 0;
            for (i; i < container.length; i++) {
                if (container[i] === func) break;
            }
            if (i < container.length) return;
            container.push(func);
        },
        _unRegisterListener: function(container, func) {
            if (typeof func !== 'function' || !this._isArray(container)) return;
            var i = 0;
            for (i; i < container.length; i++) {
                if (container[i] === func) break;
            }
            if (i < container.length) container.splice(i, 1);
        },
        //With prototype.js        
        _getShownDifferentTime: function(nowDate, timestamp) {
            var showTime = nowDate.getDiff(timestamp);
            var contextTime = '';
            //if (showTime.d) contextTime += showTime.d + 'd';
            switch (true) {
                case (showTime.h !== undefined && showTime.h > 0):
                    contextTime += paddingMark(showTime.h, '0', 2, true) + ':';
                    if (showTime.m !== undefined && showTime.m > 0)
                        contextTime += paddingMark(showTime.m, '0', 2, true);
                    else contextTime += '00';
                    break;
                case (showTime.m !== undefined && showTime.m > 0):
                    contextTime += paddingMark(showTime.m, '0', 2, true) + '\'';
                    if (showTime.s !== undefined && showTime.s > 0)
                        contextTime += paddingMark(showTime.s, '0', 2, true) + '\"';
                    else contextTime += '00\"';
                    break;
                case (showTime.s !== undefined && showTime.s > 0):
                    contextTime += paddingMark(showTime.s, '0', 2, true) + '\"';
                    break;
                default:
                    break;
            }
            return contextTime;
        },
        //With jquery
        //Commit a enter key event as a blur event
        _setEnterCommit: function(e) {
            var ev = document.all ? window.event : e;
            if (ev.keyCode == 13) $(ev.target).trigger('blur');
        },
        //Remove event listener that binded by on function
        _clearSubDomEvent: function(baseNode, eveType, func) {
            baseNode.each(function(i, n) {
                var ele = $(n);
                ele.off(eveType, func);
                if (ele.children().length) {
                    _clearSubDomEvent(ele.children());
                }
            });
        },
        _traverseClearEvent: function(childrens) {
            traverseClearEvent(childrens);
        },
        _getJson: function(path) {
            var defaultScale = null;
            $.ajaxSettings.async = false;
            $.getJSON(path, function(result) {
                defaultScale = result;
            });
            $.ajaxSettings.async = true;
            return defaultScale;
        },
        //A normal show message function with class(alert-danger,alert-success)
        //and component whitch id is common-message
        _showMessage: function(type, message) {
            var msgType = '';
            switch (type) {
                case 'warn':
                    msgType = 'alert-danger'; //'common-base-warn';
                    break;
                case 'ok':
                    msgType = 'alert-success'; //'common-base-ok';
                    break;
                default:
                    break;
            }
            if (!msgType || !message) return;
            $('#common-message').html(message);
            $('#common-message').addClass(msgType);
            $('#common-message').fadeIn(66);
            setTimeout(function() {
                $('#common-message').removeClass(msgType);
                $('#common-message').fadeOut(888);
            }, 888);
        },
        //With node
        //Read file data with module fs and module path
        _readFile: function(uri, encode, type) {
            try {
                var fs = require('fs');
                var path = require('path');
                switch (type) {
                    case 'json':
                        return JSON.parse(fs.readFileSync(path.normalize(uri), encode));
                    case 'txt':
                        return fs.readFileSync(path.normalize(uri), encode);
                    default:
                        return null;
                }
            } catch (e) {
                return null;
            }
        },
        //Save a file with module fs and module path
        _saveFile: function(uri, bufferData, rewrite) {
            try {
                if (rewrite) {
                    var fs = require('fs');
                    var path = require('path');
                    fs.writeFile(path.normalize(uri), bufferData, function(err) {
                        if (err) throw err;
                    });
                    fs.open(path.normalize(uri), 'wx', function(err, fd) {
                        if (err) {
                            fs.mkdir(path.dirname(uri), function(err) {
                                if (!err) {
                                    fs.writeFile(path.normalize(uri), bufferData, function(err) {
                                        if (err) throw err;
                                    });
                                }
                            });
                        }
                        fs.close(fd);
                    });
                } else {
                    //Append
                }
            } catch (e) {}
        }
    };
    return factory;
});