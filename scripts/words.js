const isLast = (word) => {
    return $(word).next().length === 0;
};

const getNext = (word) => {
    return $(word).next();
};


const getVisible = () => {
    return document.getElementsByClassName('is-visible');
};


const getFirst = () => {
    return $('.words-wrapper').children().first();
};


const switchWords = (current, next) => {
    $(current).removeClass('is-visible').addClass('is-hidden');
    $(next).removeClass('is-hidden').addClass('is-visible');
};


const getStarted = () => {
    const first = getVisible()[0];
    const next = getNext(first);

    if (next.length !== 0) {
        switchWords(first, next);
    } else {
        $(first).removeClass('is-visible').addClass('is-hidden');
        const newEl = getFirst();
        $(newEl).removeClass('is-hidden').addClass('is-visible');
    }
};


const init = () => {
    setInterval(getStarted, 3000);
};


init();