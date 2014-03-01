/*
 * Uniter - JavaScript PHP interpreter
 * Copyright 2013 Dan Phillimore (asmblah)
 * http://asmblah.github.com/uniter/
 *
 * Released under the MIT license
 * https://github.com/asmblah/uniter/raw/master/MIT-LICENSE.txt
 */

/*global define */
define([
    '../../tools',
    '../../../tools',
    'js/util'
], function (
    engineTools,
    phpTools,
    util
) {
    'use strict';

    describe('PHP Engine function statement default argument value integration', function () {
        var engine;

        function check(scenario) {
            engineTools.check(function () {
                return {
                    engine: engine
                };
            }, scenario);
        }

        beforeEach(function () {
            engine = phpTools.createEngine();
        });

        util.each({
            'argument with no type hint but a default value of null called with a string': {
                code: util.heredoc(function (/*<<<EOS
<?php
    function dumpIt($value = null) {
        var_dump($value);
    }

    dumpIt('world');
EOS
*/) {}),
                expectedResult: null,
                expectedStderr: '',
                expectedStdout: util.heredoc(function (/*<<<EOS
string(5) "world"

EOS
*/) {})
            },
            'argument with no type hint but a default value of null called with no arguments': {
                code: util.heredoc(function (/*<<<EOS
<?php
    function dumpIt($value = null) {
        var_dump($value);
    }

    dumpIt();
EOS
*/) {}),
                expectedResult: null,
                expectedStderr: '',
                expectedStdout: util.heredoc(function (/*<<<EOS
NULL

EOS
*/) {})
            },
            'argument with no type hint but a default value of empty array called with no arguments': {
                code: util.heredoc(function (/*<<<EOS
<?php
    function dumpIt($value = array()) {
        var_dump($value);
    }

    dumpIt();
EOS
*/) {}),
                expectedResult: null,
                expectedStderr: '',
                expectedStdout: util.heredoc(function (/*<<<EOS
array(0) {
}

EOS
*/) {})
            }
        }, function (scenario, description) {
            describe(description, function () {
                check(scenario);
            });
        });
    });
});