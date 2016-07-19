#!/bin/bash
if hash pandoc 2>/dev/null; then
    pandoc -o "./test/presentation.html" "examples/presentation/presentation.md";
    sed '/<!-- insert here -->/r ./test/presentation.html' "./test/wrapper.html" > "./test/index.html";
    rm -f './test/presentation.html';
    open './test/index.html';
else
    echo "you need pandoc for this script"
    echo "run 'brew install pandoc' to fix that"
fi
