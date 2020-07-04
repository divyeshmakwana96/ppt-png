var assert = require('assert');
var Converter = require('../js/convert.js');
const fs = require('fs');
const {
    Arr
} = require('array-helpers');

describe('ppt-png', function() {
    describe('normal', function() {
        this.timeout(10000);
        it('Test if the ppt file can convert to a png.', function(done) {
            new Converter({
                files:          ['test/OPW 733 Tienduizend redenen.ppt'],
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d',
                callback:       function(data) {
                    if (data.failed.length > 0 || data.success.length < 1) {
                        console.log('failure:' + data.failed[0].failure);
                        done(data.failed[0].error);
                    } else {
                        done();
                    }
                }
            }).run();
        });
    });

    describe('promise', function() {
        this.timeout(10000);
        it('Test with the promise.', function(done) {
            new Converter({
                files:  ['test/OPW 733 Tienduizend redenen.ppt'],
                output: 'output/test/'
            })
                .wait()
                .then(function(data) {
                    if (data.failed.length > 0 || data.success.length < 1) {
                        console.log('failure:' + data.failed[0].failure);
                        done(data.failed[0].error);
                    } else {
                        done();
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('failed', function() {
        it('Test if the fail function works on not existing files.', function(done) {
            new Converter({
                files:          ['x.ppt'],
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            })
                .wait()
                .then(function(data) {
                    if (data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('add files', function() {
        it('Test the addFiles function.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            });

            convertTest.addFiles(['test/OPW 733 Tienduizend redenen.ppt']);

            if (convertTest.files.length > 0) {
                done();
            } else {
                done('error');
            }
        });
    });

    describe('reset failed', function() {
        it('Test the resetFailed function.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            });

            convertTest.failed = new Arr([{
                file: 'test/OPW 733 Tienduizend redenen.ppt'
            }]);
            convertTest.resetFailed();

            if (convertTest.failed.length < 1 && convertTest.files.length == 1) {
                done();
            } else {
                done('error');
            }
        });
    });

    describe('fail', function() {
        it('Test if the fail function works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            });

            convertTest
                .wait()
                .then(function(data) {
                    convertTest.fail('test');
                    if (data.failed.length > 0) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('convert to png', function() {
        it('Check if the convert to png works.', function(done) {
            var convertTest = new Converter({
                files:          ['test/OPW 733 Tienduizend redenen.ppt'],
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            }).run();

            var file = convertTest.convertedToPdf(1, [733], 'OPW 733 Tienduizend redenen', false);

            fs.readFile(file, function(error, data) {
                if (error) {
                    done(error);
                } else {
                    done();
                }
            });
        });
    });

    describe('process page', function() {
        it('Check if the process page to png works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  false,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            });

            convertTest.processPage('test/OPW 733 Tienduizend redenen.ppt', true, null);

            convertTest.wait()
                .then(function(data) {
                    if (data.failed.length > 0 || data.success.length < 1) {
                        done();
                    } else {
                        done('error');
                    }
                })
                .catch(function(error) {
                    done(error);
                });
        });
    });

    describe('convert', function() {
        it('Check if the convert fail works.', function(done) {
            var convertTest = new Converter({
                output:         'output/test/',
                invert:         true,
                greyscale:      true,
                deletePdfFile:  true,
                outputType:     'png',
                logLevel:       0,
                fileNameFormat: '_vers_%d'
            });

            console.log(convertTest.convert());
            if (convertTest.convert()) {
                done('error');
            } else {
                done();
            }
        });
    });
});
