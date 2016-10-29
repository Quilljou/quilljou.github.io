---
layout: post
title: Atom 使用备忘  
description: A hackable text editor for the 21st Century
date: 2016-10-29 11:49:14
---

#### 由于sublime text在ubuntu下无法输入中文始终没有最好的解决办法，所以转战atom,等待sublime解决好问题在回归，atom由gituhub开发，它的slogan是
>A hackable text editor
for the 21st Century

## 安装atom

[atom官网](https://atom.io/)

```
sudo add-apt-repository ppa:webupd8team/atom
sudo apt-get update
sudo apt-get install atom
```

## atom的扩展包

├── api-docs@0.0.6
├── atom-autocomplete-php@0.19.4
├── atom-beautify@0.29.13
├── atom-bootstrap3@1.2.12
├── atom-html-preview@0.1.22
├── atom-jade@0.3.0
├── atom-jinja2@0.5.0
├── atom-live-server@1.2.5
├── atom-ternjs@0.15.0
├── autocomplete@0.47.0
├── autocomplete-clang@0.10.0
├── autocomplete-paths@1.0.2
├── autocomplete-python@1.8.7
├── autoprefixer@3.3.0
├── blade-snippets@0.2.0
├── block-comment-plus@0.4.0
├── build@0.65.0
├── busy@0.7.0
├── color-picker@2.2.2
├── css-snippets@1.1.0
├── emmet@2.4.3
├── file-icons@1.7.22
├── git-control@0.8.2
├── git-time-machine@1.5.3
├── highlight-selected@0.11.2
├── jade-autocompile@0.8.3
├── jade-beautify@0.1.5
├── jquery-snippets@11.0.0
├── language-blade@0.26.2
├── language-ini@1.16.0
├── language-pug@0.0.19
├── language-svg@0.9.0
├── language-twig@1.6.3
├── language-vue@0.19.0
├── less-than-slash@0.16.0
├── linter@1.11.18
├── linter-eslint@8.0.0
├── linter-gcc@0.6.15
├── linter-php@1.3.1
├── livestyle-atom@0.2.7
├── minimap@4.25.5
├── monokai-seti@0.7.0
├── node-debugger@1.9.1
├── open-in-browsers@0.0.19
├── php-server@0.7.0
├── pigments@0.37.0
├── platformio-ide@1.6.0
├── platformio-ide-terminal@2.2.0
├── python-debugger@0.1.0
├── python-indent@1.0.0
├── python-tools@0.6.8
├── sass-autocompile@0.13.1
├── script@3.10.1
├── seti-syntax@1.0.1
├── seti-ui@1.3.2
├── source-preview-pug@0.2.0
├── svg-preview@0.10.0
├── terminal-plus@0.14.5
├── todo-show@1.7.0
├── tool-bar@1.0.1
├── vue-autocomplete@0.1.1
└── vue-snippets@0.6.0

└── (empty)



## atom sippets

```
'.source.coffee':
  'Console log':
    'prefix': 'log'
    'body': 'console.log $1'
```

atom使用cson来定义snippet，scope可以参见snipppet,多行代码使用`'''code line here'''`

# 参考
1. https://codeforgeek.com/2014/09/install-atom-editor-ubuntu-14-04/
2. placeholder

3. 各种语言的scope

```
ActionScript: source.actionscript.2
AppleScript: source.applescript
ASP: source.asp
Batch FIle: source.dosbatch
C#: source.cs
C++: source.c++
Clojure: source.clojure
CoffeeScript: source.coffee
CSS: source.css
D: source.d
Diff: source.diff
Erlang: source.erlang
Go: source.go
GraphViz: source.dot
Groovy: source.groovy
Haskell: source.haskell
HTML: text.html(.basic)
JSP: text.html.jsp
Java: source.java
Java Properties: source.java-props
Java Doc: text.html.javadoc
JSON: source.json
Javascript: source.js
BibTex: source.bibtex
Latex Log: text.log.latex
Latex Memoir: text.tex.latex.memoir
Latex: text.tex.latex
LESS: source.css.less
TeX: text.tex
Lisp: source.lisp
Lua: source.lua
MakeFile: source.makefile
Markdown: text.html.markdown
Multi Markdown: text.html.markdown.multimarkdown
Matlab: source.matlab
Objective-C: source.objc
Objective-C++: source.objc++
OCaml campl4: source.camlp4.ocaml
OCaml: source.ocaml
OCamllex: source.ocamllex
Perl: source.perl
PHP: source.php
Regular Expression(python): source.regexp.python
Python: source.python
R Console: source.r-console
R: source.r
Ruby on Rails: source.ruby.rails
Ruby HAML: text.haml
SQL(Ruby): source.sql.ruby
Regular Expression: source.regexp
RestructuredText: text.restructuredtext
Ruby: source.ruby
SASS: source.sass
Scala: source.scala
Shell Script: source.shell
SQL: source.sql
Stylus: source.stylus
TCL: source.tcl
HTML(TCL): text.html.tcl
Plain text: text.plain
Textile: text.html.textile
XML: text.xml
XSL: text.xml.xsl
YAML: source.yaml
```
