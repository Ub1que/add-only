## Overview

Add and remove `.only` near `describe`, `test` easily using CodeLens

## Demo

![demo](./ressources//demo.gif)

## Options

### Basic

`AddOnly.removeAllOnlyButton`
controls the presence of **Remove all only** button in status bar (default is true)

### Templates

In order to give user control over extension behavior, there is `AddOnly.templates` user setting.
Templates is an array where each template is an object which contains **name**, **insertAfterPriority** and **decline** properties.

name
: identifier (e.g. test, it, context, describe) that helps to find call expression.

insertAfterPriority
: priority to specify where '.only' will be inserted.
helps to resolve cases like "test.concurent.each" where '.only' should be inserted after '.concurrent'

decline
: specify where codelens should not be applied. Cases like 'test.skip'

**_The default templates are:_**

    {
        name: 'test',
        insertAfterPriority: ['concurrent', 'test'],
        decline: ['skip']
    },
    {
        name: 'describe',
        insertAfterPriority: ['describe'],
        decline: ['skip']
    }

## Contribute

Please feel free to fork, improve, make pull requests or fill issues.
I'll be glad to fix bugs you encountered or improve the extension.
