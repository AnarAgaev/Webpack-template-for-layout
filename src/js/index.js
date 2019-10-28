let some = event => {
        console.log(event);

    },
    printer = (message) => {
        alert(message);
    };

printer('Hello world!');

[1, 2, 3].map((n) => n + 1);

[1, 2, 3].map(function (n) {
    return n + 1;
});